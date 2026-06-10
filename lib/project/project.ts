"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Project, GetProjectsParams } from "@/types/Project";
import { generateSlug } from "../utils/generateSlug";

//GET PROJECTS
export async function getProjects({
  search = "",
  sort = { column: "created_at", ascending: false },
  page = 1,
  limit = 15,
}: GetProjectsParams) {
  const supabase = await createClient();
  let query = supabase.from("projects").select("*", { count: "exact" });

  //search
  if (search.trim()) {
    const term = `%${search.trim()}%`;
    query = query.or(
      `title.ilike.${term},slug.ilike.${term},client_name.ilike.${term}`,
    );
  }

  //sort
  query = query.order(sort.column, { ascending: sort.ascending });

  //pagination
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) throw new Error(error.message);

  return {
    data: data as Project[],
    totalCount: count ?? 0,
  };
}

// DELETE PROJECT
export async function deleteProject(id: string) {
  const supabase = await createClient();

  const { data: project, error: fetchError } = await supabase
    .from("projects")
    .select("thumbnail")
    .eq("id", id)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  const { error: deleteError } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (deleteError) throw new Error(deleteError.message);

  if (project?.thumbnail) {
    try {
      const url = new URL(project.thumbnail);
      const segments = url.pathname.split("/uploads/");
      if (segments.length > 1) {
        const filePath = segments[1]; 
        const { error: storageError } = await supabase.storage
          .from("uploads")
          .remove([filePath]);

        if (storageError) {
          console.error("Failed to delete thumbnail from storage:", storageError);
        }
      }
    } catch (err) {
      console.error("Error cleaning up thumbnail file:", err);
    }
  }

  revalidatePath("/admin/manage-proyek");
}

//UPLOAD PROJECT IMAGE
export async function uploadProjectImage(formData: FormData): Promise<string> {
  const supabase = await createClient();
  const file = formData.get("file") as File;

  if (!file) throw new Error("Tidak ada file yang diunggah.");

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      "Format file tidak didukung. Gunakan JPEG, PNG, atau WebP.",
    );
  }
  if (file.size > 2 * 1024 * 1024) {
    throw new Error("Ukuran file maksimal 2MB.");
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;

  const { error } = await supabase.storage
    .from("uploads")
    .upload(fileName, file);

  if (error) throw new Error(error.message);

  const {
    data: { publicUrl },
  } = supabase.storage.from("uploads").getPublicUrl(fileName);

  return publicUrl;
}

//CREATE PROJECT
export async function createProject(formData: {
  title: string;
  description?: string;
  client_name?: string;
  project_date?: string;
  thumbnail?: string;
}) {
  const supabase = await createClient();

  //generate slug
  let slug = generateSlug(formData.title);
  let suffix = 1;
  while (true) {
    const { data: existing } = await supabase
      .from("projects")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (!existing) break;
    slug = `${generateSlug(formData.title)}-${suffix}`;
    suffix++;
  }

  const { error } = await supabase.from("projects").insert({
    title: formData.title,
    slug,
    description: formData.description || null,
    client_name: formData.client_name || null,
    project_date: formData.project_date || null,
    thumbnail: formData.thumbnail || null,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/manage-proyek");
  return { success: true, slug };
}

//GET PROJECT BY SLUG
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching project by slug:", error);
    return null;
  }
  return data;
}

//UPDATE PROJECT
export async function updateProject(params: {
  id: string;
  slug: string;
  title?: string;
  description?: string;
  client_name?: string;
  project_date?: string;
  thumbnail?: string;
}) {
  const supabase = await createClient();
  const { id, slug, ...fields } = params;

  const updateData: Record<string, any> = {};
  if (fields.title !== undefined) updateData.title = fields.title;
  if (fields.description !== undefined)
    updateData.description = fields.description;
  if (fields.client_name !== undefined)
    updateData.client_name = fields.client_name;
  if (fields.project_date !== undefined)
    updateData.project_date = fields.project_date;
  if (fields.thumbnail !== undefined) updateData.thumbnail = fields.thumbnail;

  if (Object.keys(updateData).length === 0) {
    return { success: false, message: "No fields to update." };
  }

  const { error } = await supabase
    .from("projects")
    .update(updateData)
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/manage-proyek");
  revalidatePath(`/admin/manage-proyek/${slug}`);
  return { success: true };
}

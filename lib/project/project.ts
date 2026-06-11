"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Project, GetProjectsParams } from "@/types/Project";
import { generateSlug } from "../utils/generateSlug";
import { cache } from "react";

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
          console.error(
            "Failed to delete thumbnail from storage:",
            storageError,
          );
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
export const getProjectBySlug = cache(
  async (slug: string): Promise<Project | null> => {
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
  },
);

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
  const { id, slug: oldSlug, ...fields } = params;

  //current project state
  const { data: current, error: fetchError } = await supabase
    .from("projects")
    .select("title, slug, thumbnail")
    .eq("id", id)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  let newSlug = oldSlug;

  //generate slug
  if (fields.title && fields.title !== current.title) {
    let baseSlug = generateSlug(fields.title);
    let suffix = 1;
    let candidateSlug = baseSlug;
    while (true) {
      const { data: existing } = await supabase
        .from("projects")
        .select("id")
        .eq("slug", candidateSlug)
        .neq("id", id)
        .maybeSingle();
      if (!existing) break;
      candidateSlug = `${baseSlug}-${suffix}`;
      suffix++;
    }
    newSlug = candidateSlug;
  }

  //build update data
  const updateData: Record<string, any> = {};
  if (fields.title !== undefined) updateData.title = fields.title;
  if (fields.description !== undefined)
    updateData.description = fields.description;
  if (fields.client_name !== undefined)
    updateData.client_name = fields.client_name;
  if (fields.project_date !== undefined)
    updateData.project_date = fields.project_date;
  if (fields.thumbnail !== undefined) updateData.thumbnail = fields.thumbnail;

  if (newSlug !== oldSlug) {
    updateData.slug = newSlug;
  }

  if (Object.keys(updateData).length === 0) {
    return { success: false, message: "Tidak ada pembaruan terdeteksi." };
  }

  //update
  const { error: updateError } = await supabase
    .from("projects")
    .update(updateData)
    .eq("id", id);

  if (updateError) throw new Error(updateError.message);

  //clean up old thumbnail
  if (
    fields.thumbnail &&
    fields.thumbnail !== current.thumbnail &&
    current.thumbnail
  ) {
    try {
      const url = new URL(current.thumbnail);
      const segments = url.pathname.split("/uploads/");
      if (segments.length > 1) {
        const filePath = segments[1];
        const { error: storageError } = await supabase.storage
          .from("uploads")
          .remove([filePath]);

        if (storageError) {
          console.error(
            "Failed to delete old project thumbnail:",
            storageError,
          );
        }
      }
    } catch (err) {
      console.error("Error cleaning up old project thumbnail:", err);
    }
  }

  //revalidate paths
  revalidatePath("/admin/manage-proyek");
  revalidatePath(`/admin/manage-proyek/${oldSlug}`);
  if (newSlug !== oldSlug) {
    revalidatePath(`/admin/manage-proyek/${newSlug}`);
  }

  return { success: true, slug: newSlug };
}

export async function getProjectSlugs(): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("projects").select("slug");

  if (error) {
    console.error("Error fetching project slugs:", error);
    return [];
  }

  return (data ?? []).map((p) => p.slug);
}

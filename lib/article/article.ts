"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Article, GetArticlesParams } from "@/types/Article";
import { generateSlug } from "@/lib/utils/generateSlug"

//GET ARTICLES
export async function getArticles({
  search = "",
  sort = { column: "created_at", ascending: false },
  page = 1,
  limit = 15,
}: GetArticlesParams) {
  const supabase = await createClient();
  let query = supabase.from("articles").select("*", { count: "exact" });

  //search
  if (search.trim()) {
    const term = `%${search.trim()}%`;
    query = query.or(
      `title.ilike.${term},slug.ilike.${term},author.ilike.${term}`,
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
    data: data as Article[],
    totalCount: count ?? 0,
  };
}

//DELETE ARTICLE (missing delete image from bucket)
export async function deleteArticle(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/manage-artikel");
}

//UPLOAD ARTICLE THUMBNAIL
export async function uploadArticleImage(formData: FormData): Promise<string> {
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

//CREATE ARTICLE
export async function createArticle(formData: {
  title: string;
  excerpt?: string;
  content?: string;
  author?: string;
  thumbnail?: string;
}) {
  const supabase = await createClient();

  //slug
  let slug = generateSlug(formData.title);
  let suffix = 1;
  while (true) {
    const { data: existing } = await supabase
      .from("articles")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (!existing) break;
    slug = `${slug}-${suffix}`;
    suffix++;
  }

  const { error } = await supabase.from("articles").insert({
    title: formData.title,
    slug,
    excerpt: formData.excerpt || null,
    content: formData.content || null,
    author: formData.author || null,
    thumbnail: formData.thumbnail || null,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/manage-artikel");
  return { success: true, slug };
}

//GET ARTICLE BY SLUG
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching article by slug:", error);
    return null;
  }
  return data;
}

//UPDATE ARTICLE
export async function updateArticle(params: {
  id: string;
  slug: string;
  title?: string;
  excerpt?: string;
  content?: string;
  author?: string;
  thumbnail?: string;
}) {
  const supabase = await createClient();
  const { id, slug, ...fields } = params;

  const updateData: Record<string, any> = {};
  if (fields.title !== undefined) updateData.title = fields.title;
  if (fields.excerpt !== undefined) updateData.excerpt = fields.excerpt;
  if (fields.content !== undefined) updateData.content = fields.content;
  if (fields.author !== undefined) updateData.author = fields.author;
  if (fields.thumbnail !== undefined) updateData.thumbnail = fields.thumbnail;

  if (Object.keys(updateData).length === 0) {
    return { success: false, message: "Tidak ada pembaruan terdeteksi." };
  }

  const { error } = await supabase
    .from("articles")
    .update(updateData)
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/manage-artikel");
  revalidatePath(`/admin/manage-artikel/${slug}`);
  return { success: true };
}

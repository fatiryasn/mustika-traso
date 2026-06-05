"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  thumbnail: string | null;
  created_at: string;
  sub_products: { count: number }[];
}

interface GetProductsParams {
  search?: string;
  sort?: { column: string; ascending: boolean };
  page?: number;
  limit?: number;
}

//generate slug
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

//get products
export async function getProducts({
  search = "",
  sort = { column: "created_at", ascending: false },
  page = 1,
  limit = 15,
}: GetProductsParams) {
  const supabase = await createClient();

  let query = supabase
    .from("products")
    .select("*, sub_products(count)", { count: "exact" });

  // Search
  if (search.trim()) {
    query = query.or(`name.ilike.%${search}%,slug.ilike.%${search}%`);
  }

  // Sort
  query = query.order(sort.column, { ascending: sort.ascending });

  // Pagination
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) throw new Error(error.message);

  return {
    data: data as Product[],
    totalCount: count ?? 0,
  };
}

//delete products
export async function deleteProduct(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/manage-produk");
}

//upload product image
export async function uploadProductImage(formData: FormData): Promise<string> {
  const supabase = await createClient();
  const file = formData.get("file") as File;

  if (!file) throw new Error("Tidak ada file yang diunggah.");

  // Validate file type and size if needed
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      "Format file tidak didukung. Gunakan JPEG, PNG, atau WebP.",
    );
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Ukuran file maksimal 5MB.");
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

//create products
export async function createProduct(formData: {
  name: string;
  description?: string;
  thumbnail?: string; 
  sub_products: {
    name: string;
    size?: string;
    weight?: string;
    price?: number;
  }[];
}) {
  const supabase = await createClient();

  // Generate unique slug
  let slug = generateSlug(formData.name);
  let suffix = 1;
  while (true) {
    const { data: existing } = await supabase
      .from("products")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (!existing) break;
    slug = `${generateSlug(formData.name)}-${suffix}`;
    suffix++;
  }

  // Insert product
  const { data: product, error: productError } = await supabase
    .from("products")
    .insert({
      name: formData.name,
      slug,
      description: formData.description || null,
      thumbnail: formData.thumbnail || null,
    })
    .select()
    .single();

  if (productError) throw new Error(productError.message);

  // Insert sub products if any
  if (formData.sub_products.length > 0) {
    const subProducts = formData.sub_products.map((sp) => ({
      product_id: product.id,
      name: sp.name,
      size: sp.size || null,
      weight: sp.weight || null,
      price: sp.price || null,
    }));

    const { error: subError } = await supabase
      .from("sub_products")
      .insert(subProducts);

    if (subError) throw new Error(subError.message);
  }

  // Revalidate the product list page
  revalidatePath("/admin/manage-produk");
  return { success: true, slug: product.slug };
}


// ---------- New: Detail / Edit ----------

export interface SubProductDetail {
  id: string;
  name: string;
  size: string | null;
  weight: string | null;
  price: number | null;
}

export interface ProductDetail {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  thumbnail: string | null;
  created_at: string;
  updated_at: string;
  sub_products: SubProductDetail[];
}

export async function getProductBySlug(
  slug: string
): Promise<ProductDetail | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, sub_products(*)")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
  return data;
}

interface UpdateProductWithSubProductsParams {
  id: string;
  slug: string; // needed for revalidation
  name?: string;
  description?: string;
  thumbnail?: string;
  sub_products: {
    id?: string; // existing sub‑product ID (keep, but will be re‑inserted anyway)
    name: string;
    size?: string;
    weight?: string;
    price?: number;
  }[];
}

export async function updateProductWithSubProducts(
  params: UpdateProductWithSubProductsParams
) {
  const supabase = await createClient();
  const { id, slug, sub_products, ...productFields } = params;

  // Update product fields (only provided ones)
  const updateData: Record<string, any> = {};
  if (productFields.name !== undefined) updateData.name = productFields.name;
  if (productFields.description !== undefined) updateData.description = productFields.description;
  if (productFields.thumbnail !== undefined) updateData.thumbnail = productFields.thumbnail;
  updateData.updated_at = new Date().toISOString();

  if (Object.keys(updateData).length > 1) {
    const { error: updateError } = await supabase
      .from("products")
      .update(updateData)
      .eq("id", id);
    if (updateError) throw new Error(updateError.message);
  }

  // Replace sub‑products: delete all, then insert the new list
  await supabase.from("sub_products").delete().eq("product_id", id);
  if (sub_products.length > 0) {
    const inserts = sub_products.map((sp) => ({
      product_id: id,
      name: sp.name,
      size: sp.size || null,
      weight: sp.weight || null,
      price: sp.price ?? null,
    }));
    const { error: insertError } = await supabase
      .from("sub_products")
      .insert(inserts);
    if (insertError) throw new Error(insertError.message);
  }

  // Revalidate the list and this detail page
  revalidatePath("/admin/manage-produk");
  revalidatePath(`/admin/manage-produk/${slug}`);
  return { success: true };
}
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Product, GetProductsParams, ProductDetail, UpdateProductWithSubProductsParams } from "@/types/Product";
import { generateSlug } from "@/lib/utils/generateSlug";

//GET PRODUCTS
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

  //search
  if (search.trim()) {
    query = query.or(`name.ilike.%${search}%,slug.ilike.%${search}%`);
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
    data: data as Product[],
    totalCount: count ?? 0,
  };
}

//DELETE PRODUCT
export async function deleteProduct(id: string) {
  const supabase = await createClient();

  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("thumbnail")
    .eq("id", id)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  const { error: deleteError } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (deleteError) throw new Error(deleteError.message);

  if (product?.thumbnail) {
    try {
      const url = new URL(product.thumbnail);
      const segments = url.pathname.split("/uploads/");
      if (segments.length > 1) {
        const filePath = segments[1];
        const { error: storageError } = await supabase.storage
          .from("uploads")
          .remove([filePath]);

        if (storageError) {
          console.error("Failed to delete product thumbnail from storage:", storageError);
        }
      }
    } catch (err) {
      console.error("Error cleaning up product thumbnail file:", err);
    }
  }

  revalidatePath("/admin/manage-produk");
}

//UPLOAD PRODUCT IMAGE
export async function uploadProductImage(formData: FormData): Promise<string> {
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

//CREATE PRODUCT
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

  //generate slug
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

  //insert
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

  //sub product insert
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

  revalidatePath("/admin/manage-produk");
  return { success: true, slug: product.slug };
}

//GET PRODUCT BY SLUG
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
    console.error("Error fetching product:", error);
    return null;
  }
  return data;
}

//UPDATE PRODUCT
export async function updateProductWithSubProducts(
  params: UpdateProductWithSubProductsParams
) {
  const supabase = await createClient();
  const { id, slug, sub_products, ...productFields } = params;

  //master product update
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

  //replace subproduct
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

  revalidatePath("/admin/manage-produk");
  revalidatePath(`/admin/manage-produk/${slug}`);
  return { success: true };
}
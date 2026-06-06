"use server";

import { createClient } from "@/lib/supabase/server";

//GET ADMIN STATS
export async function getAdminStats() {
  const supabase = await createClient();

  const [projectsResult, productsResult, articlesResult] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("articles").select("*", { count: "exact", head: true }),
  ]);

  return {
    projectsCount: projectsResult.count ?? 0,
    productsCount: productsResult.count ?? 0,
    articlesCount: articlesResult.count ?? 0,
  };
}

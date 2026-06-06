"use server";

import { createClient } from "@/lib/supabase/server";

//LOGOUT
export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return {success: true}
}

//LOGIN
export async function login(formData: FormData) {
  const supabase = await createClient();
  
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

//GET PROFILE
export async function getProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    const name =
      user.user_metadata?.full_name || user.email?.split("@")[0] || "Admin";

    return { name: name, email: user.email };
  }
}

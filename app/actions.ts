'use server'

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function addProject(formData: FormData) {
  const name = formData.get("name") as string;
  const status = formData.get("status") as string;
  const url = formData.get("url") as string;
  const repo = formData.get("repo") as string;
  const description = formData.get("description") as string;

  const { error } = await supabase.from("projects").insert({
    name,
    status,
    url: url || null, // Convert empty strings to null
    repo: repo || null,
    description: description || null,
  });

  if (error) {
    console.error("Error adding project:", error);
    return { success: false, error: error.message };
  }

  // This tells Next.js to refresh the dashboard immediately
  revalidatePath("/");
  return { success: true };
}
import { supabaseAdmin } from "../supabase"
import type { ProjectPhoto } from "./projects"

export async function getPhotosByProject(projectId: string): Promise<ProjectPhoto[]> {
  const { data, error } = await supabaseAdmin
    .from("project_photos")
    .select("*")
    .eq("project_id", projectId)
    .order("order", { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function addPhoto(
  projectId: string,
  url: string,
  storagePath: string,
  order: number
): Promise<ProjectPhoto> {
  const { data, error } = await supabaseAdmin
    .from("project_photos")
    .insert({ project_id: projectId, url, storage_path: storagePath, order })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deletePhoto(photoId: string, storagePath: string): Promise<void> {
  await supabaseAdmin.storage.from("project-photos").remove([storagePath])
  const { error } = await supabaseAdmin.from("project_photos").delete().eq("id", photoId)
  if (error) throw error
}

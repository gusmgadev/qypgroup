import { supabaseAdmin } from "../supabase"

export type ProjectPhoto = {
  id: string
  project_id: string
  url: string
  storage_path: string
  order: number
  created_at: string
}

export type Project = {
  id: string
  title: string
  description: string | null
  visible: boolean
  created_at: string
  updated_at: string
  photos?: ProjectPhoto[]
}

export async function getVisibleProjects(): Promise<Project[]> {
  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("*, photos:project_photos(*)")
    .eq("visible", true)
    .order("created_at", { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function getAllProjects(): Promise<Project[]> {
  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("*, photos:project_photos(*)")
    .order("created_at", { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function getProjectById(id: string): Promise<Project | null> {
  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("*, photos:project_photos(*)")
    .eq("id", id)
    .single()
  if (error) return null
  return data
}

export async function createProject(title: string, description: string): Promise<Project> {
  const { data, error } = await supabaseAdmin
    .from("projects")
    .insert({ title, description })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateProject(id: string, title: string, description: string): Promise<Project> {
  const { data, error } = await supabaseAdmin
    .from("projects")
    .update({ title, description, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabaseAdmin.from("projects").delete().eq("id", id)
  if (error) throw error
}

export async function toggleProjectVisible(id: string, visible: boolean): Promise<void> {
  const { error } = await supabaseAdmin
    .from("projects")
    .update({ visible, updated_at: new Date().toISOString() })
    .eq("id", id)
  if (error) throw error
}

import { supabaseAdmin } from "../supabase"

export type Candidate = {
  id: string
  nombre: string
  telefono: string | null
  email: string | null
  puesto: string | null
  detalle: string | null
  cv_url: string | null
  cv_filename: string | null
  status: string
  created_at: string
}

export async function createCandidate(
  data: Omit<Candidate, "id" | "created_at" | "status">
): Promise<Candidate> {
  const { data: candidate, error } = await supabaseAdmin
    .from("candidates")
    .insert(data)
    .select()
    .single()
  if (error) throw error
  return candidate
}

export async function deleteCandidate(id: string): Promise<void> {
  const { data } = await supabaseAdmin
    .from("candidates")
    .select("cv_url")
    .eq("id", id)
    .single()

  if (data?.cv_url) {
    const storagePath = data.cv_url.split("/candidate-cvs/").pop()
    if (storagePath) {
      await supabaseAdmin.storage.from("candidate-cvs").remove([storagePath])
    }
  }

  const { error } = await supabaseAdmin.from("candidates").delete().eq("id", id)
  if (error) throw error
}

export async function getAllCandidates(): Promise<Candidate[]> {
  const { data, error } = await supabaseAdmin
    .from("candidates")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) throw error
  return data ?? []
}

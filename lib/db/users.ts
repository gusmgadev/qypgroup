import { supabaseAdmin } from "../supabase"

export type AdminUser = {
  id: string
  email: string
  password_hash: string
  name: string | null
  created_at: string
}

export async function getUserByEmail(email: string): Promise<AdminUser | null> {
  const { data, error } = await supabaseAdmin
    .from("admin_users")
    .select("*")
    .eq("email", email)
    .single()
  if (error) return null
  return data
}

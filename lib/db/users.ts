import { sql } from "../db"

export type AdminUser = {
  id: string
  email: string
  password_hash: string
  name: string | null
  created_at: string
}

export async function getUserByEmail(email: string): Promise<AdminUser | null> {
  const rows = await sql`SELECT * FROM admin_users WHERE email = ${email} LIMIT 1`
  return (rows[0] as AdminUser) ?? null
}

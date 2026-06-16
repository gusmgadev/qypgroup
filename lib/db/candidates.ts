import { del } from "@vercel/blob"
import { sql } from "../db"

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
  const rows = await sql`
    INSERT INTO candidates (nombre, telefono, email, puesto, detalle, cv_url, cv_filename)
    VALUES (
      ${data.nombre}, ${data.telefono ?? null}, ${data.email ?? null},
      ${data.puesto ?? null}, ${data.detalle ?? null},
      ${data.cv_url ?? null}, ${data.cv_filename ?? null}
    )
    RETURNING *
  `
  return rows[0] as Candidate
}

export async function deleteCandidate(id: string): Promise<void> {
  const rows = await sql`SELECT cv_url FROM candidates WHERE id = ${id} LIMIT 1`
  const cvUrl = rows[0]?.cv_url as string | null

  if (cvUrl) {
    await del(cvUrl)
  }

  await sql`DELETE FROM candidates WHERE id = ${id}`
}

export async function getAllCandidates(): Promise<Candidate[]> {
  const rows = await sql`SELECT * FROM candidates ORDER BY created_at DESC`
  return rows as Candidate[]
}

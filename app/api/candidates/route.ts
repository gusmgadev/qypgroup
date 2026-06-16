import { put } from "@vercel/blob"
import { NextRequest, NextResponse } from "next/server"
import { createCandidate } from "../../../lib/db/candidates"

const ALLOWED_EXTENSIONS = ["pdf", "doc", "docx"]
const MAX_SIZE = 5 * 1024 * 1024 // 5 MB

export async function POST(req: NextRequest) {
  const formData = await req.formData()

  const nombre = (formData.get("nombre") as string | null)?.trim() ?? ""
  const telefono = (formData.get("telefono") as string | null)?.trim() || null
  const email = (formData.get("email") as string | null)?.trim() || null
  const puesto = (formData.get("puesto") as string | null)?.trim() || null
  const detalle = (formData.get("detalle") as string | null)?.trim() || null
  const file = formData.get("archivo") as File | null

  if (!nombre) return NextResponse.json({ error: "El nombre es requerido" }, { status: 400 })
  if (!telefono) return NextResponse.json({ error: "El teléfono es requerido" }, { status: 400 })
  if (!email) return NextResponse.json({ error: "El email es requerido" }, { status: 400 })

  let cv_url: string | null = null
  let cv_filename: string | null = null

  if (file && file.size > 0) {
    const ext = (file.name.split(".").pop() ?? "").toLowerCase()
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json({ error: "El archivo debe ser PDF, DOC o DOCX" }, { status: 400 })
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "El archivo no puede superar 5 MB" }, { status: 400 })
    }

    const filename = `candidate-cvs/${crypto.randomUUID()}.${ext}`
    const arrayBuffer = await file.arrayBuffer()
    const blob = await put(filename, arrayBuffer, {
      access: "public",
      contentType: file.type || "application/octet-stream",
    })

    cv_url = blob.url
    cv_filename = file.name
  }

  const candidate = await createCandidate({ nombre, telefono, email, puesto, detalle, cv_url, cv_filename })
  return NextResponse.json({ ok: true, id: candidate.id }, { status: 201 })
}

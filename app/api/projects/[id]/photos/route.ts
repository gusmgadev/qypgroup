import { NextRequest, NextResponse } from "next/server"
import { auth } from "../../../../../auth"
import { supabaseAdmin } from "../../../../../lib/supabase"
import { addPhoto, deletePhoto, getPhotosByProject } from "../../../../../lib/db/photos"

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const { id: projectId } = await params

  const existingPhotos = await getPhotosByProject(projectId)
  if (existingPhotos.length >= 6) {
    return NextResponse.json({ error: "Máximo 6 fotos por proyecto" }, { status: 400 })
  }

  const formData = await req.formData()
  const file = formData.get("file") as File | null
  if (!file) return NextResponse.json({ error: "No se recibió archivo" }, { status: 400 })

  const ext = file.name.split(".").pop() ?? "jpg"
  const storagePath = `${projectId}/${crypto.randomUUID()}.${ext}`

  const arrayBuffer = await file.arrayBuffer()
  const { error: uploadError } = await supabaseAdmin.storage
    .from("project-photos")
    .upload(storagePath, arrayBuffer, { contentType: file.type, upsert: false })

  if (uploadError) {
    return NextResponse.json({ error: "Error al subir la imagen" }, { status: 500 })
  }

  const { data: publicData } = supabaseAdmin.storage
    .from("project-photos")
    .getPublicUrl(storagePath)

  const photo = await addPhoto(projectId, publicData.publicUrl, storagePath, existingPhotos.length)
  return NextResponse.json(photo, { status: 201 })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const photoId = searchParams.get("photoId")
  const storagePath = searchParams.get("storagePath")

  if (!photoId || !storagePath) {
    return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 })
  }

  await deletePhoto(photoId, storagePath)
  return NextResponse.json({ success: true })
}

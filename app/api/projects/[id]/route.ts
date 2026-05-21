import { NextRequest, NextResponse } from "next/server"
import { auth } from "../../../../auth"
import { getProjectById, updateProject, deleteProject, toggleProjectVisible } from "../../../../lib/db/projects"

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getProjectById(id)
  if (!project) return NextResponse.json({ error: "No encontrado" }, { status: 404 })
  return NextResponse.json(project)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const { title, description, visible } = body

  if (visible !== undefined) {
    await toggleProjectVisible(id, visible)
    return NextResponse.json({ success: true })
  }

  if (!title?.trim()) {
    return NextResponse.json({ error: "El título es obligatorio" }, { status: 400 })
  }

  const project = await updateProject(id, title.trim(), description?.trim() ?? "")
  return NextResponse.json(project)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const { id } = await params
  await deleteProject(id)
  return NextResponse.json({ success: true })
}

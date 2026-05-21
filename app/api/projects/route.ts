import { NextRequest, NextResponse } from "next/server"
import { auth } from "../../../auth"
import { getVisibleProjects, getAllProjects, createProject } from "../../../lib/db/projects"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const all = searchParams.get("all")

  if (all === "true") {
    const session = await auth()
    if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    const projects = await getAllProjects()
    return NextResponse.json(projects)
  }

  const projects = await getVisibleProjects()
  return NextResponse.json(projects)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const body = await req.json()
  const { title, description } = body

  if (!title?.trim()) {
    return NextResponse.json({ error: "El título es obligatorio" }, { status: 400 })
  }

  const project = await createProject(title.trim(), description?.trim() ?? "")
  return NextResponse.json(project, { status: 201 })
}

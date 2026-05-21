import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { getProjectById } from "../../../../../lib/db/projects"
import ProjectForm from "../../../../../components/dashboard/project-form"
import { theme } from "../../../../../lib/theme"

export const dynamic = "force-dynamic"

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getProjectById(id)
  if (!project) notFound()

  return (
    <div style={{ padding: "32px 36px" }}>
      <Link
        href="/dashboard"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          color: theme.colors.textMuted,
          textDecoration: "none",
          fontSize: theme.fontSizes.sm,
          marginBottom: "20px",
        }}
      >
        <ChevronLeft size={16} />
        Volver
      </Link>

      <h1
        style={{
          color: theme.colors.dark,
          fontSize: theme.fontSizes.xl,
          fontWeight: theme.fontWeights.bold,
          margin: "0 0 28px",
        }}
      >
        Editar proyecto
      </h1>

      <ProjectForm project={project} />
    </div>
  )
}

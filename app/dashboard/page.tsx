import Link from "next/link"
import { getAllProjects } from "../../lib/db/projects"
import ProjectsTable from "./projects-table"
import { theme } from "../../lib/theme"
import { PlusCircle } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const projects = await getAllProjects()

  return (
    <div style={{ padding: "32px 36px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "28px",
        }}
      >
        <div>
          <h1
            style={{
              color: theme.colors.dark,
              fontSize: theme.fontSizes.xl,
              fontWeight: theme.fontWeights.bold,
              margin: 0,
            }}
          >
            Proyectos
          </h1>
          <p style={{ color: theme.colors.textMuted, fontSize: theme.fontSizes.sm, margin: "4px 0 0" }}>
            {projects.length} proyecto{projects.length !== 1 ? "s" : ""} en total
          </p>
        </div>

        <Link
          href="/dashboard/projects/new"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            backgroundColor: theme.colors.accent,
            color: "#fff",
            borderRadius: theme.radii.sm,
            textDecoration: "none",
            fontSize: theme.fontSizes.sm,
            fontWeight: theme.fontWeights.bold,
            fontFamily: theme.fonts.primary,
          }}
        >
          <PlusCircle size={16} />
          Nuevo proyecto
        </Link>
      </div>

      <ProjectsTable projects={projects} />
    </div>
  )
}

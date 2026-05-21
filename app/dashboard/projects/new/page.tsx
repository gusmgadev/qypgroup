import ProjectForm from "../../../../components/dashboard/project-form"
import { theme } from "../../../../lib/theme"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function NewProjectPage() {
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
        Nuevo proyecto
      </h1>

      <ProjectForm />
    </div>
  )
}

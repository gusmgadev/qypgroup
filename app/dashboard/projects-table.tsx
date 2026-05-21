"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Pencil, Trash2, Eye, EyeOff, Image as ImageIcon } from "lucide-react"
import { theme } from "../../lib/theme"
import type { Project } from "../../lib/db/projects"

export default function ProjectsTable({ projects: initial }: { projects: Project[] }) {
  const router = useRouter()
  const [projects, setProjects] = useState(initial)

  async function toggleVisible(project: Project) {
    const newVisible = !project.visible
    setProjects((prev) =>
      prev.map((p) => (p.id === project.id ? { ...p, visible: newVisible } : p))
    )
    await fetch(`/api/projects/${project.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visible: newVisible }),
    })
  }

  async function handleDelete(project: Project) {
    if (!confirm(`¿Eliminar "${project.title}"? Esta acción no se puede deshacer.`)) return
    await fetch(`/api/projects/${project.id}`, { method: "DELETE" })
    setProjects((prev) => prev.filter((p) => p.id !== project.id))
    router.refresh()
  }

  if (projects.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "64px 24px",
          backgroundColor: "#fff",
          borderRadius: theme.radii.lg,
          border: `1px solid ${theme.colors.border}`,
        }}
      >
        <ImageIcon size={40} color={theme.colors.border} style={{ margin: "0 auto 16px" }} />
        <p style={{ color: theme.colors.textMuted, fontSize: theme.fontSizes.base, margin: 0 }}>
          No hay proyectos aún.
        </p>
        <Link
          href="/dashboard/projects/new"
          style={{
            display: "inline-block",
            marginTop: "16px",
            color: theme.colors.accent,
            fontSize: theme.fontSizes.sm,
            fontWeight: theme.fontWeights.bold,
            textDecoration: "none",
          }}
        >
          Crear el primero →
        </Link>
      </div>
    )
  }

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: theme.radii.lg,
        border: `1px solid ${theme.colors.border}`,
        overflow: "hidden",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${theme.colors.border}` }}>
            {["Título", "Fotos", "Estado", "Acciones"].map((h) => (
              <th
                key={h}
                style={{
                  padding: "12px 16px",
                  textAlign: "left",
                  fontSize: theme.fontSizes.sm,
                  fontWeight: theme.fontWeights.medium,
                  color: theme.colors.textMuted,
                  fontFamily: theme.fonts.primary,
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {projects.map((project, i) => (
            <tr
              key={project.id}
              style={{
                borderBottom: i < projects.length - 1 ? `1px solid rgba(216,212,154,0.40)` : "none",
              }}
            >
              <td style={{ padding: "14px 16px" }}>
                <p
                  style={{
                    margin: 0,
                    color: theme.colors.text,
                    fontSize: theme.fontSizes.sm,
                    fontWeight: theme.fontWeights.medium,
                  }}
                >
                  {project.title}
                </p>
                {project.description && (
                  <p
                    style={{
                      margin: "2px 0 0",
                      color: theme.colors.textMuted,
                      fontSize: "12px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "300px",
                    }}
                  >
                    {project.description}
                  </p>
                )}
              </td>
              <td style={{ padding: "14px 16px" }}>
                <span style={{ color: theme.colors.textMuted, fontSize: theme.fontSizes.sm }}>
                  {project.photos?.length ?? 0}/6
                </span>
              </td>
              <td style={{ padding: "14px 16px" }}>
                <button
                  onClick={() => toggleVisible(project)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "4px 12px",
                    borderRadius: theme.radii.full,
                    border: "none",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: theme.fontWeights.medium,
                    fontFamily: theme.fonts.primary,
                    backgroundColor: project.visible
                      ? "rgba(29,158,117,0.12)"
                      : "rgba(107,102,66,0.12)",
                    color: project.visible ? theme.colors.success : theme.colors.textMuted,
                    transition: theme.transitions.fast,
                  }}
                >
                  {project.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                  {project.visible ? "Visible" : "Oculto"}
                </button>
              </td>
              <td style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Link
                    href={`/dashboard/projects/${project.id}/edit`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "6px 12px",
                      backgroundColor: "rgba(203,197,138,0.15)",
                      color: theme.colors.dark,
                      borderRadius: theme.radii.sm,
                      textDecoration: "none",
                      fontSize: "12px",
                      fontWeight: theme.fontWeights.medium,
                      fontFamily: theme.fonts.primary,
                    }}
                  >
                    <Pencil size={12} />
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(project)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "6px 12px",
                      backgroundColor: "rgba(226,75,74,0.10)",
                      color: theme.colors.error,
                      border: "none",
                      borderRadius: theme.radii.sm,
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: theme.fontWeights.medium,
                      fontFamily: theme.fonts.primary,
                    }}
                  >
                    <Trash2 size={12} />
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

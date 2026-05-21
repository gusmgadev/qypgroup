"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import PhotoUploader from "./photo-uploader"
import { theme } from "../../lib/theme"
import type { Project, ProjectPhoto } from "../../lib/db/projects"

interface Props {
  project?: Project
}

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.radii.sm,
  backgroundColor: "#fff",
  color: theme.colors.text,
  fontSize: theme.fontSizes.base,
  fontFamily: theme.fonts.primary,
  outline: "none",
  boxSizing: "border-box" as const,
}

const labelStyle = {
  display: "block" as const,
  color: theme.colors.dark,
  fontSize: theme.fontSizes.sm,
  fontWeight: theme.fontWeights.medium,
  marginBottom: "6px",
}

export default function ProjectForm({ project }: Props) {
  const router = useRouter()
  const [title, setTitle] = useState(project?.title ?? "")
  const [description, setDescription] = useState(project?.description ?? "")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [savedProjectId, setSavedProjectId] = useState<string | null>(project?.id ?? null)
  const [photos, setPhotos] = useState<ProjectPhoto[]>(project?.photos ?? [])

  const isEdit = !!project

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!title.trim()) {
      setError("El título es obligatorio")
      return
    }

    setSaving(true)

    if (isEdit && savedProjectId) {
      const res = await fetch(`/api/projects/${savedProjectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), description: description.trim() }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? "Error al guardar")
        setSaving(false)
        return
      }
      setSaving(false)
      router.push("/dashboard")
      router.refresh()
    } else if (!savedProjectId) {
      // Create new project — stay on page so user can add photos
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), description: description.trim() }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? "Error al crear proyecto")
        setSaving(false)
        return
      }
      const created = await res.json()
      setSavedProjectId(created.id)
      setSaving(false)
    } else {
      // Already created, update title/description and finish
      const res = await fetch(`/api/projects/${savedProjectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), description: description.trim() }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? "Error al guardar")
        setSaving(false)
        return
      }
      setSaving(false)
      router.push("/dashboard")
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSave} style={{ maxWidth: "640px" }}>
      <div style={{ marginBottom: "20px" }}>
        <label style={labelStyle}>Título *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej: Construcción de fosa en Comodoro"
          style={inputStyle}
          required
        />
      </div>

      <div style={{ marginBottom: "24px" }}>
        <label style={labelStyle}>Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción del trabajo realizado..."
          rows={4}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      {error && (
        <p style={{ color: theme.colors.error, fontSize: theme.fontSizes.sm, marginBottom: "16px" }}>
          {error}
        </p>
      )}

      {/* Fotos: solo disponibles después de crear el proyecto */}
      {savedProjectId ? (
        <div style={{ marginBottom: "28px" }}>
          <label style={labelStyle}>Fotos</label>
          <PhotoUploader
            projectId={savedProjectId}
            existingPhotos={photos}
            onPhotosChange={setPhotos}
          />
        </div>
      ) : (
        <p
          style={{
            fontSize: theme.fontSizes.sm,
            color: theme.colors.textMuted,
            marginBottom: "24px",
            padding: "12px",
            backgroundColor: "rgba(203,197,138,0.10)",
            borderRadius: theme.radii.sm,
            border: `1px solid ${theme.colors.border}`,
          }}
        >
          Hacé click en "Crear y agregar fotos" para guardar primero y luego subir fotos.
        </p>
      )}

      <div style={{ display: "flex", gap: "12px" }}>
        <button
          type="submit"
          disabled={saving}
          style={{
            padding: "11px 28px",
            background: saving ? "rgba(232,105,26,0.50)" : theme.colors.accent,
            color: "#fff",
            border: "none",
            borderRadius: theme.radii.sm,
            fontSize: theme.fontSizes.sm,
            fontWeight: theme.fontWeights.bold,
            cursor: saving ? "not-allowed" : "pointer",
            fontFamily: theme.fonts.primary,
          }}
        >
          {saving
        ? "Guardando..."
        : isEdit
        ? "Guardar cambios"
        : savedProjectId
        ? "Finalizar"
        : "Crear y agregar fotos"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          style={{
            padding: "11px 20px",
            background: "transparent",
            color: theme.colors.textMuted,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.radii.sm,
            fontSize: theme.fontSizes.sm,
            cursor: "pointer",
            fontFamily: theme.fonts.primary,
          }}
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}

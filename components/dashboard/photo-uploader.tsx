"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { X, Upload } from "lucide-react"
import { theme } from "../../lib/theme"
import type { ProjectPhoto } from "../../lib/db/projects"

interface Props {
  projectId: string
  existingPhotos: ProjectPhoto[]
  onPhotosChange: (photos: ProjectPhoto[]) => void
}

export default function PhotoUploader({ projectId, existingPhotos, onPhotosChange }: Props) {
  const [photos, setPhotos] = useState<ProjectPhoto[]>(existingPhotos)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const canAdd = photos.length < 6

  async function handleFiles(files: FileList) {
    if (!canAdd) return
    setError("")

    const toUpload = Array.from(files).slice(0, 6 - photos.length)
    setUploading(true)

    for (const file of toUpload) {
      const fd = new FormData()
      fd.append("file", file)

      const res = await fetch(`/api/projects/${projectId}/photos`, {
        method: "POST",
        body: fd,
      })

      if (res.ok) {
        const photo: ProjectPhoto = await res.json()
        setPhotos((prev) => {
          const updated = [...prev, photo]
          onPhotosChange(updated)
          return updated
        })
      } else {
        const data = await res.json()
        setError(data.error ?? "Error al subir foto")
        break
      }
    }

    setUploading(false)
  }

  async function handleDelete(photo: ProjectPhoto) {
    const params = new URLSearchParams({ photoId: photo.id, storagePath: photo.storage_path })
    const res = await fetch(`/api/projects/${projectId}/photos?${params}`, { method: "DELETE" })
    if (res.ok) {
      const updated = photos.filter((p) => p.id !== photo.id)
      setPhotos(updated)
      onPhotosChange(updated)
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    if (e.dataTransfer.files.length > 0) handleFiles(e.dataTransfer.files)
  }

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          marginBottom: "12px",
        }}
      >
        {photos.map((photo) => (
          <div
            key={photo.id}
            style={{ position: "relative", aspectRatio: "4/3", borderRadius: theme.radii.sm, overflow: "hidden" }}
          >
            <Image
              src={photo.url}
              alt="Foto del proyecto"
              fill
              style={{ objectFit: "cover" }}
            />
            <button
              onClick={() => handleDelete(photo)}
              style={{
                position: "absolute",
                top: "4px",
                right: "4px",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: "rgba(0,0,0,0.65)",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
              }}
            >
              <X size={14} />
            </button>
          </div>
        ))}

        {canAdd && (
          <div
            onClick={() => inputRef.current?.click()}
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            style={{
              aspectRatio: "4/3",
              borderRadius: theme.radii.sm,
              border: `2px dashed ${theme.colors.border}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              cursor: "pointer",
              backgroundColor: "rgba(203,197,138,0.05)",
              transition: theme.transitions.fast,
            }}
          >
            <Upload size={20} color={theme.colors.textMuted} />
            <span style={{ fontSize: "11px", color: theme.colors.textMuted, textAlign: "center" }}>
              {uploading ? "Subiendo..." : `Agregar\n(${photos.length}/6)`}
            </span>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
      />

      {error && (
        <p style={{ color: theme.colors.error, fontSize: theme.fontSizes.sm, marginTop: "6px" }}>
          {error}
        </p>
      )}

      <p style={{ color: theme.colors.textMuted, fontSize: "11px" }}>
        Máximo 6 fotos. JPG, PNG, WebP.
      </p>
    </div>
  )
}

"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Phone, Mail, FileText, Trash2, Briefcase } from "lucide-react"
import { theme } from "@/lib/theme"
import type { Candidate } from "@/lib/db/candidates"

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function DeleteButton({ onConfirm }: { onConfirm: () => Promise<void> }) {
  const [confirming, setConfirming] = useState(false)
  const [pending, startTransition] = useTransition()

  if (confirming) {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
        <button
          onClick={() => startTransition(async () => { await onConfirm(); setConfirming(false) })}
          disabled={pending}
          style={{
            padding: "3px 10px",
            fontSize: "11px",
            fontWeight: 600,
            background: theme.colors.error,
            color: "#fff",
            border: "none",
            borderRadius: "99px",
            cursor: "pointer",
            fontFamily: theme.fonts.primary,
          }}
        >
          {pending ? "..." : "Sí, eliminar"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          style={{
            padding: "3px 10px",
            fontSize: "11px",
            background: "none",
            color: theme.colors.textMuted,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: "99px",
            cursor: "pointer",
            fontFamily: theme.fonts.primary,
          }}
        >
          Cancelar
        </button>
      </span>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      title="Eliminar candidato y CV"
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "4px",
        color: theme.colors.textMuted,
        display: "flex",
        alignItems: "center",
        opacity: 0.6,
      }}
    >
      <Trash2 size={15} />
    </button>
  )
}

function CandidateRow({ candidate, onDeleted }: { candidate: Candidate; onDeleted: (id: string) => void }) {
  const handleDelete = async () => {
    const res = await fetch(`/api/candidates/${candidate.id}`, { method: "DELETE" })
    if (res.ok) onDeleted(candidate.id)
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr 1.4fr 1fr 1fr auto auto",
        alignItems: "center",
        gap: "16px",
        padding: "14px 20px",
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radii.md,
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Nombre + fecha */}
      <div>
        <p style={{ margin: 0, fontWeight: theme.fontWeights.bold, color: theme.colors.text, fontSize: theme.fontSizes.sm }}>
          {candidate.nombre}
        </p>
        <p style={{ margin: "2px 0 0", color: theme.colors.textMuted, fontSize: "11px" }}>
          {formatDate(candidate.created_at)}
        </p>
        {candidate.detalle && (
          <p style={{
            margin: "4px 0 0",
            color: theme.colors.textMuted,
            fontSize: "11px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical" as const,
          }}>
            {candidate.detalle}
          </p>
        )}
      </div>

      {/* Teléfono */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <Phone size={13} style={{ color: theme.colors.textMuted, flexShrink: 0 }} />
        {candidate.telefono ? (
          <a href={`tel:${candidate.telefono}`} style={{ color: theme.colors.text, fontSize: theme.fontSizes.sm, textDecoration: "none" }}>
            {candidate.telefono}
          </a>
        ) : (
          <span style={{ color: theme.colors.textMuted, fontSize: theme.fontSizes.sm }}>—</span>
        )}
      </div>

      {/* Email */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <Mail size={13} style={{ color: theme.colors.textMuted, flexShrink: 0 }} />
        {candidate.email ? (
          <a href={`mailto:${candidate.email}`} style={{ color: theme.colors.text, fontSize: theme.fontSizes.sm, textDecoration: "none" }}>
            {candidate.email}
          </a>
        ) : (
          <span style={{ color: theme.colors.textMuted, fontSize: theme.fontSizes.sm }}>—</span>
        )}
      </div>

      {/* Puesto */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <Briefcase size={13} style={{ color: theme.colors.textMuted, flexShrink: 0 }} />
        <span style={{ color: theme.colors.text, fontSize: theme.fontSizes.sm }}>
          {candidate.puesto ?? <span style={{ color: theme.colors.textMuted }}>—</span>}
        </span>
      </div>

      {/* CV */}
      <div>
        {candidate.cv_url ? (
          <a
            href={candidate.cv_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              padding: "4px 10px",
              borderRadius: "99px",
              backgroundColor: "rgba(232,105,26,0.10)",
              color: theme.colors.accent,
              fontSize: "12px",
              fontWeight: theme.fontWeights.bold,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            <FileText size={12} />
            Ver CV
          </a>
        ) : (
          <span style={{ color: theme.colors.textMuted, fontSize: theme.fontSizes.sm }}>—</span>
        )}
      </div>

      {/* Eliminar */}
      <DeleteButton onConfirm={handleDelete} />
    </div>
  )
}

export default function CandidatesList({ candidates }: { candidates: Candidate[] }) {
  const [list, setList] = useState(candidates)
  const router = useRouter()

  const handleDeleted = (id: string) => {
    setList((prev) => prev.filter((c) => c.id !== id))
    router.refresh()
  }

  if (list.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px",
          color: theme.colors.textMuted,
          fontSize: theme.fontSizes.sm,
          border: `1px dashed ${theme.colors.border}`,
          borderRadius: theme.radii.md,
        }}
      >
        Todavía no hay candidatos registrados.
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1.4fr 1fr 1fr auto auto",
          gap: "16px",
          padding: "8px 20px",
          marginBottom: "6px",
        }}
      >
        {["Nombre", "Teléfono", "Email", "Puesto", "CV", ""].map((col, i) => (
          <span
            key={i}
            style={{
              color: theme.colors.textMuted,
              fontSize: "11px",
              fontWeight: theme.fontWeights.medium,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {col}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {list.map((c) => (
          <CandidateRow key={c.id} candidate={c} onDeleted={handleDeleted} />
        ))}
      </div>
    </div>
  )
}

"use client"

import { useState, useRef } from "react"
import { X, Paperclip, CheckCircle } from "lucide-react"
import { theme } from "@/lib/theme"

type FormData = {
  nombre: string
  telefono: string
  email: string
  puesto: string
  detalle: string
}

const initialForm: FormData = { nombre: "", telefono: "", email: "", puesto: "", detalle: "" }

const inputStyle = {
  width: "100%",
  padding: "8px 14px",
  borderRadius: "10px",
  border: `1px solid ${theme.colors.border}`,
  backgroundColor: "rgba(255,255,255,0.70)",
  color: theme.colors.text,
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box" as const,
}

const labelStyle = {
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: theme.colors.textMuted,
  marginBottom: "5px",
}

export function StaffModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState<FormData>(initialForm)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.nombre.trim()) { setError("El nombre es requerido"); return }
    if (!formData.telefono.trim()) { setError("El teléfono es requerido"); return }
    if (!formData.email.trim()) { setError("El email es requerido"); return }

    setLoading(true)
    try {
      const fd = new FormData()
      fd.append("nombre", formData.nombre)
      fd.append("telefono", formData.telefono)
      fd.append("email", formData.email)
      fd.append("puesto", formData.puesto)
      fd.append("detalle", formData.detalle)
      if (file) fd.append("archivo", file)

      const res = await fetch("/api/candidates", { method: "POST", body: fd })
      const json = await res.json()
      if (!res.ok) { setError(json.error ?? "Error al enviar"); return }
      setSuccess(true)
    } catch {
      setError("Error de conexión. Intentá de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full"
        style={{
          maxWidth: "680px",
          backgroundColor: theme.colors.background,
          borderRadius: "24px",
          boxShadow: "10px 14px 0px rgba(232,105,26,0.55), 0 24px 48px rgba(0,0,0,0.35)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Vértice naranja */}
        <div className="absolute top-0 left-0" style={{ width: 16, height: 16, backgroundColor: theme.colors.accent, borderRadius: "24px 0 0 0" }} />

        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-3"
          style={{ borderBottom: `1px solid ${theme.colors.border}` }}
        >
          <div>
            <h2 style={{ margin: 0, color: theme.colors.dark, fontSize: "18px", fontWeight: 700 }}>
              Sumate al staff
            </h2>
            <p style={{ margin: "2px 0 0", color: theme.colors.textMuted, fontSize: "13px" }}>
              Envianos tu CV y nos ponemos en contacto
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-full transition-colors hover:bg-black/10"
            style={{ width: 34, height: 34, border: `1px solid ${theme.colors.border}`, flexShrink: 0 }}
          >
            <X size={16} color={theme.colors.dark} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          {success ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <CheckCircle size={48} color={theme.colors.accent} />
              <h3 style={{ margin: 0, color: theme.colors.dark, fontSize: "18px", fontWeight: 700 }}>
                ¡Postulación enviada!
              </h3>
              <p style={{ margin: 0, color: theme.colors.textMuted, fontSize: "14px", maxWidth: "320px" }}>
                Recibimos tu información. Si tu perfil encaja, te contactamos a la brevedad.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2 rounded-full font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: theme.colors.accent, fontSize: "14px" }}
              >
                Cerrar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* Nombre */}
              <div>
                <label style={labelStyle}>Nombre y Apellido <span style={{ color: theme.colors.accent }}>*</span></label>
                <input
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Juan Pérez"
                  style={inputStyle}
                />
              </div>

              {/* Teléfono + Email */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label style={labelStyle}>Teléfono <span style={{ color: theme.colors.accent }}>*</span></label>
                  <input
                    name="telefono"
                    type="tel"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="+54 9 11..."
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email <span style={{ color: theme.colors.accent }}>*</span></label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nombre@mail.com"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Puesto */}
              <div>
                <label style={labelStyle}>Puesto o tarea</label>
                <input
                  name="puesto"
                  value={formData.puesto}
                  onChange={handleChange}
                  placeholder="Ej: Operario de campo, Técnico mecánico..."
                  style={inputStyle}
                />
              </div>

              {/* Detalle */}
              <div>
                <label style={labelStyle}>Comentarios / detalle</label>
                <textarea
                  name="detalle"
                  value={formData.detalle}
                  onChange={handleChange}
                  placeholder="Contanos sobre tu experiencia o agregá información adicional..."
                  rows={2}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>

              {/* Archivo */}
              <div>
                <label style={labelStyle}>Adjuntar CV (PDF, DOC, DOCX — máx 5 MB)</label>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFile}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:opacity-80"
                  style={{
                    border: `1.5px dashed ${theme.colors.border}`,
                    backgroundColor: "rgba(255,255,255,0.50)",
                    color: file ? theme.colors.accent : theme.colors.textMuted,
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  <Paperclip size={15} />
                  {file ? file.name : "Seleccionar archivo"}
                </button>
              </div>

              {error && (
                <p style={{ margin: 0, color: theme.colors.error, fontSize: "13px" }}>{error}</p>
              )}

              <p style={{ margin: 0, color: theme.colors.textMuted, fontSize: "12px" }}>
                <span style={{ color: theme.colors.accent }}>*</span> Campos obligatorios
              </p>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-2 rounded-full font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: theme.colors.accent, fontSize: "14px" }}
                >
                  {loading ? "Enviando..." : "Enviar CV"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

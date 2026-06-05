"use client"

import { useState } from "react"
import Link from "next/link"
import { Home, Phone, Mail, MapPin, Send, MessageCircle, Award, Wrench, Star } from "lucide-react"
import { theme } from "@/lib/theme"

const featureIconMap: Record<string, any> = { MessageCircle, Phone, MapPin }
const statIconMap: Record<string, any> = { Award, Wrench, Star, MapPin }

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? "Error al enviar el mensaje")
      } else {
        setSubmitted(true)
        setFormData({ name: "", company: "", email: "", phone: "", message: "" })
      }
    } catch {
      setError("No se pudo conectar con el servidor")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section
      id="contact"
      className="relative mx-4 md:mx-6 my-3"
      style={{
        borderRadius: "24px",
        boxShadow: "0 8px 40px rgba(42, 37, 16, 0.10)",
        scrollMarginTop: "0",
      }}
    >
      {/* ── ZONA 1: BANNER ───────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ borderRadius: "24px 24px 0 0" }}>
        <img
          src={theme.contact.banner.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.18)", transform: "scale(1.05)" }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(42, 37, 16, 0.80)" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full mb-2"
            style={{
              backgroundColor: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "#FFFFFF",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <Home size={14} />
            Home
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_110px_220px] gap-6 items-center">

            {/* Título y texto — izquierda */}
            <div>
              <p style={{
                color: theme.colors.accent,
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}>
                {theme.contact.banner.eyebrow}
              </p>
              <h2
                className="text-2xl md:text-3xl font-bold"
                style={{ color: "#FFFFFF", lineHeight: "1.15" }}
              >
                {theme.contact.banner.title}
              </h2>
              <div style={{
                width: "40px", height: "3px",
                backgroundColor: theme.colors.accent,
                marginTop: "8px", marginBottom: "8px",
              }} />
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.80)", lineHeight: "1.6" }}>
                {theme.contact.banner.description}
              </p>
            </div>

            {/* Foto cuadrada — centro */}
            <div className="hidden md:block flex-shrink-0">
              <img
                src={theme.contact.banner.imageRight}
                alt="Contacto QYP"
                style={{ width: "110px", height: "110px", borderRadius: "10px", objectFit: "cover" }}
              />
            </div>

            {/* Features apilados — derecha */}
            <div className="hidden md:flex flex-col gap-3">
              {theme.contact.features.map((f, i) => {
                const FeatureIcon = featureIconMap[f.icon]
                return (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: "30px", height: "30px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(232,105,26,0.20)",
                        border: "1px solid rgba(232,105,26,0.40)",
                      }}
                    >
                      {FeatureIcon && <FeatureIcon size={14} color={theme.colors.accent} />}
                    </div>
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>
                      {f.label}
                    </span>
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      </div>

      {/* ── ZONA 2: FORMULARIO + INFO ─────────────────────────────────── */}
      <div style={{ backgroundColor: theme.colors.background, padding: "24px 28px" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Info de contacto */}
          <div
            className="rounded-xl p-5 space-y-4 flex flex-col justify-center"
            style={{
              backgroundColor: theme.colors.dark,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${theme.colors.accent}30` }}
              >
                <Phone size={16} color="#FFFFFF" />
              </div>
              <div>
                <p className="text-xs" style={{ color: "rgba(203,197,138,0.70)" }}>Teléfono</p>
                <p className="text-sm font-medium" style={{ color: "#FFFFFF" }}>{theme.contact.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${theme.colors.accent}30` }}
              >
                <Mail size={16} color="#FFFFFF" />
              </div>
              <div>
                <p className="text-xs" style={{ color: "rgba(203,197,138,0.70)" }}>Email</p>
                <p className="text-sm font-medium" style={{ color: "#FFFFFF" }}>{theme.contact.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${theme.colors.accent}30` }}
              >
                <MapPin size={16} color="#FFFFFF" />
              </div>
              <div>
                <p className="text-xs" style={{ color: "rgba(203,197,138,0.70)" }}>Dirección</p>
                <p className="text-sm font-medium" style={{ color: "#FFFFFF" }}>{theme.contact.address}</p>
              </div>
            </div>

            <iframe
              src={theme.footer.maps.embedUrl}
              width="100%"
              height="145"
              style={{ border: 0, borderRadius: theme.radii.md }}
              allowFullScreen
              loading="lazy"
            />
          </div>

          {/* Formulario */}
          <div
            className="p-5 rounded-xl flex flex-col"
            style={{ backgroundColor: "#FFFFFF", boxShadow: "0 2px 16px rgba(42,37,16,0.08)" }}
          >
            {submitted ? (
              <div className="text-center py-12">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${theme.colors.accent}20` }}
                >
                  <Send size={32} style={{ color: theme.colors.accent }} />
                </div>
                <h4 className="text-xl font-bold mb-2" style={{ color: theme.colors.text }}>
                  ¡Mensaje enviado!
                </h4>
                <p style={{ color: theme.colors.textMuted }}>
                  Gracias por contactarnos. Te responderemos a la brevedad.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                  style={{ backgroundColor: theme.colors.accent, color: "#FFFFFF" }}
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 h-full">
                {[
                  { label: "Nombre", name: "name", type: "text", required: true, placeholder: "Tu nombre" },
                  { label: "Empresa", name: "company", type: "text", required: false, placeholder: "Opcional" },
                  { label: "Email", name: "email", type: "email", required: true, placeholder: "tu@email.com" },
                  { label: "Teléfono", name: "phone", type: "tel", required: false, placeholder: "+54 9..." },
                ].map(({ label, name, type, required, placeholder }) => (
                  <div key={name} className="flex items-center gap-3">
                    <label className="text-sm font-medium flex-shrink-0 w-24 text-right" style={{ color: theme.colors.textMuted }}>
                      {label}
                    </label>
                    <input
                      type={type} name={name} value={formData[name as keyof typeof formData]}
                      onChange={handleChange} required={required}
                      className="flex-1 px-3 py-2 rounded-lg border bg-transparent transition-colors text-sm"
                      style={{ borderColor: theme.colors.border, color: theme.colors.text }}
                      placeholder={placeholder}
                    />
                  </div>
                ))}

                <div className="flex items-start gap-3 flex-1">
                  <label className="text-sm font-medium flex-shrink-0 w-24 text-right pt-2" style={{ color: theme.colors.textMuted }}>
                    Mensaje
                  </label>
                  <textarea
                    name="message" value={formData.message} onChange={handleChange} required
                    className="flex-1 h-full px-3 py-2 rounded-lg border bg-transparent transition-colors resize-none text-sm"
                    style={{ borderColor: theme.colors.border, color: theme.colors.text, minHeight: "90px" }}
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                {error && (
                  <p className="text-sm text-center" style={{ color: theme.colors.error }}>{error}</p>
                )}

                <button
                  type="submit" disabled={isSubmitting}
                  className="w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 disabled:opacity-50"
                  style={{ backgroundColor: theme.colors.accent, color: "#FFFFFF" }}
                >
                  {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── ZONA 3: STATS BAR ────────────────────────────────────────── */}
      <div style={{ backgroundColor: theme.colors.primary, borderRadius: "0 0 24px 24px", padding: "20px 24px" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {theme.contact.stats.map((stat, i) => {
            const StatIcon = statIconMap[stat.icon]
            return (
              <div key={i} className="flex items-center gap-3" style={{
                borderRight: i < theme.contact.stats.length - 1 ? "1px solid rgba(255,255,255,0.55)" : "none",
                paddingRight: i < theme.contact.stats.length - 1 ? "20px" : "0",
                justifyContent: "center",
              }}>
                {StatIcon && <StatIcon size={22} color={theme.colors.dark} />}
                <div>
                  <p className="text-sm font-semibold" style={{ color: theme.colors.dark }}>{stat.line1}</p>
                  <p className="text-xs" style={{ color: theme.colors.textMuted }}>{stat.line2}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </section>
  )
}

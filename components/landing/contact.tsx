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
      className="relative mx-4 md:mx-6 my-3 overflow-hidden"
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

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full mb-8"
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
          <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10 items-center">

            {/* Columna izquierda */}
            <div>
              <p style={{
                color: theme.colors.accent,
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}>
                {theme.contact.banner.eyebrow}
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold"
                style={{ color: "#FFFFFF", lineHeight: "1.15" }}
              >
                {theme.contact.banner.title}
              </h2>
              <div style={{
                width: "40px", height: "3px",
                backgroundColor: theme.colors.accent,
                marginTop: "16px", marginBottom: "16px",
              }} />
              <p className="text-base" style={{ color: "rgba(255,255,255,0.80)", maxWidth: "500px", lineHeight: "1.7" }}>
                {theme.contact.banner.description}
              </p>

              {/* Feature badges */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                {theme.contact.features.map((f, i) => {
                  const FeatureIcon = featureIconMap[f.icon]
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <div
                        className="flex items-center justify-center flex-shrink-0"
                        style={{
                          width: "32px", height: "32px",
                          borderRadius: "50%",
                          backgroundColor: "rgba(232,105,26,0.20)",
                          border: "1px solid rgba(232,105,26,0.40)",
                        }}
                      >
                        {FeatureIcon && <FeatureIcon size={15} color={theme.colors.accent} />}
                      </div>
                      <span className="text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>
                        {f.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Columna derecha — imagen con esquinas naranja */}
            <div className="relative hidden md:block">
              <div className="absolute z-10" style={{ top: "-8px", left: "-8px", width: "24px", height: "24px", backgroundColor: theme.colors.accent }} />
              <div className="absolute z-10" style={{ bottom: "-8px", right: "-8px", width: "24px", height: "24px", backgroundColor: theme.colors.accent }} />
              <img
                src={theme.contact.banner.imageRight}
                alt="Contacto QYP"
                className="w-full object-cover"
                style={{ height: "280px", borderRadius: "12px" }}
              />
            </div>

          </div>
        </div>
      </div>

      {/* ── ZONA 2: FORMULARIO + INFO ─────────────────────────────────── */}
      <div style={{ backgroundColor: theme.colors.background, padding: "40px 24px" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Info de contacto */}
          <div
            className="rounded-2xl p-6 space-y-5 flex flex-col justify-center"
            style={{
              backgroundColor: theme.colors.dark,
              minHeight: "320px",
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${theme.colors.accent}30` }}
              >
                <Phone size={20} color="#FFFFFF" />
              </div>
              <div>
                <p className="text-sm" style={{ color: "rgba(203,197,138,0.70)" }}>Teléfono</p>
                <p className="font-medium" style={{ color: "#FFFFFF" }}>{theme.contact.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${theme.colors.accent}30` }}
              >
                <Mail size={20} color="#FFFFFF" />
              </div>
              <div>
                <p className="text-sm" style={{ color: "rgba(203,197,138,0.70)" }}>Email</p>
                <p className="font-medium" style={{ color: "#FFFFFF" }}>{theme.contact.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${theme.colors.accent}30` }}
              >
                <MapPin size={20} color="#FFFFFF" />
              </div>
              <div>
                <p className="text-sm" style={{ color: "rgba(203,197,138,0.70)" }}>Dirección</p>
                <p className="font-medium" style={{ color: "#FFFFFF" }}>{theme.contact.address}</p>
              </div>
            </div>

            <div className="pt-1">
              <iframe
                src={theme.footer.maps.embedUrl}
                width="100%"
                height="130"
                style={{ border: 0, borderRadius: theme.radii.md }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Formulario */}
          <div
            className="p-5 rounded-2xl"
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
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.text }}>
                    Nombre completo
                  </label>
                  <input
                    type="text" name="name" value={formData.name} onChange={handleChange} required
                    className="w-full px-3 py-2 rounded-lg border bg-transparent transition-colors text-sm"
                    style={{ borderColor: theme.colors.border, color: theme.colors.text }}
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.text }}>
                    Empresa (opcional)
                  </label>
                  <input
                    type="text" name="company" value={formData.company} onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border bg-transparent transition-colors text-sm"
                    style={{ borderColor: theme.colors.border, color: theme.colors.text }}
                    placeholder="Nombre de tu empresa"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.text }}>
                    Email
                  </label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange} required
                    className="w-full px-3 py-2 rounded-lg border bg-transparent transition-colors text-sm"
                    style={{ borderColor: theme.colors.border, color: theme.colors.text }}
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.text }}>
                    Teléfono (opcional)
                  </label>
                  <input
                    type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border bg-transparent transition-colors text-sm"
                    style={{ borderColor: theme.colors.border, color: theme.colors.text }}
                    placeholder="+54 9..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.text }}>
                    Mensaje
                  </label>
                  <textarea
                    name="message" value={formData.message} onChange={handleChange} required rows={3}
                    className="w-full px-3 py-2 rounded-lg border bg-transparent transition-colors resize-none text-sm"
                    style={{ borderColor: theme.colors.border, color: theme.colors.text }}
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                {error && (
                  <p className="text-sm text-center" style={{ color: theme.colors.error }}>{error}</p>
                )}

                <button
                  type="submit" disabled={isSubmitting}
                  className="w-full py-2 rounded-lg font-semibold text-sm transition-all duration-200 disabled:opacity-50"
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
      <div style={{ backgroundColor: theme.colors.dark, borderRadius: "0 0 24px 24px", padding: "20px 24px" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {theme.contact.stats.map((stat, i) => {
            const StatIcon = statIconMap[stat.icon]
            return (
              <div key={i} className="flex items-center gap-3">
                {StatIcon && <StatIcon size={22} color={theme.colors.accent} />}
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>{stat.line1}</p>
                  <p className="text-xs" style={{ color: "rgba(203,197,138,0.70)" }}>{stat.line2}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </section>
  )
}

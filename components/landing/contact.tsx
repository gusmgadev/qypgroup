"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Send } from "lucide-react"
import { theme } from "@/lib/theme"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setFormData({ name: "", email: "", phone: "", message: "" })
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section
      id="contact"
      className="relative py-8 px-4 md:px-6 mx-4 md:mx-6 my-3 overflow-hidden"
      style={{
        borderRadius: "24px",
        boxShadow: "0 8px 40px rgba(42, 37, 16, 0.10)",
        scrollMarginTop: "50px",
      }}
    >
      <img
        src="/images/contacto/contacto.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "blur(8px) brightness(0.85)", transform: "scale(1.05)" }}
      />
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(224, 220, 192, 0.30)" }} />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: theme.colors.dark }}
          >
            Contacto
          </h2>
          <h3
            className="text-2xl md:text-3xl font-semibold"
            style={{ color: "#E8691A", animation: "textShimmer 2.5s ease-in-out infinite" }}
          >
            ¿Necesitás más información?
          </h3>
          <p
            className="mt-2 max-w-2xl mx-auto text-sm"
            style={{ color: theme.colors.textMuted }}
          >
            Escribinos y te respondemos a la brevedad. Estamos para ayudarte.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Columna izquierda — info de contacto */}
          <div
            className="rounded-2xl p-5 space-y-4 flex flex-col justify-center"
            style={{
              minHeight: "320px",
              backgroundColor: "rgba(42, 37, 16, 0.55)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(240, 230, 140, 0.20)",
            }}
          >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${theme.colors.accent}30` }}
                >
                  <Phone size={20} style={{ color: "#FFFFFF" }} />
                </div>
                <div>
                  <p className="text-sm" style={{ color: "rgba(240,230,140,0.75)" }}>Teléfono</p>
                  <p className="font-medium" style={{ color: "#FFFFFF" }}>{theme.contact.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${theme.colors.accent}30` }}
                >
                  <Mail size={20} style={{ color: "#FFFFFF" }} />
                </div>
                <div>
                  <p className="text-sm" style={{ color: "rgba(240,230,140,0.75)" }}>Email</p>
                  <p className="font-medium" style={{ color: "#FFFFFF" }}>{theme.contact.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${theme.colors.accent}30` }}
                >
                  <MapPin size={20} style={{ color: "#FFFFFF" }} />
                </div>
                <div>
                  <p className="text-sm" style={{ color: "rgba(240,230,140,0.75)" }}>Dirección</p>
                  <p className="font-medium" style={{ color: "#FFFFFF" }}>{theme.contact.address}</p>
                </div>
              </div>

              <div className="pt-2">
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

          <div
            className="p-4 rounded-xl"
            style={{ backgroundColor: "#FFFFFF", boxShadow: "0 2px 16px rgba(42, 37, 16, 0.08)" }}
          >
            {submitted ? (
              <div className="text-center py-12">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${theme.colors.accent}20` }}
                >
                  <Send size={32} style={{ color: theme.colors.accent }} />
                </div>
                <h4
                  className="text-xl font-bold mb-2"
                  style={{ color: theme.colors.text }}
                >
                  ¡Mensaje enviado!
                </h4>
                <p style={{ color: theme.colors.textMuted }}>
                  Gracias por contactarnos. Te responderemos a la brevedad.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: theme.colors.text }}
                  >
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border bg-transparent transition-colors text-sm"
                    style={{
                      borderColor: theme.colors.border,
                      color: theme.colors.text,
                    }}
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: theme.colors.text }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border bg-transparent transition-colors text-sm"
                    style={{
                      borderColor: theme.colors.border,
                      color: theme.colors.text,
                    }}
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: theme.colors.text }}
                  >
                    Teléfono (opcional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border bg-transparent transition-colors text-sm"
                    style={{
                      borderColor: theme.colors.border,
                      color: theme.colors.text,
                    }}
                    placeholder="+54 9..."
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: theme.colors.text }}
                  >
                    Mensaje
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg border bg-transparent transition-colors resize-none text-sm"
                    style={{
                      borderColor: theme.colors.border,
                      color: theme.colors.text,
                    }}
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 rounded-lg font-semibold text-sm transition-all duration-200 disabled:opacity-50"
                  style={{
                    backgroundColor: theme.colors.accent,
                    color: "#FFFFFF",
                  }}
                >
                  {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes textShimmer {
          0%, 100% { color: #E8691A; text-shadow: 0 0 8px rgba(232, 105, 26, 0.3); }
          50% { color: #2A2510; text-shadow: none; }
        }
      `}</style>
    </section>
  )
}
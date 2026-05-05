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
      className="py-20 px-4 md:px-12"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: theme.colors.accent }}
          >
            Contacto
          </h2>
          <h3
            className="text-2xl md:text-3xl font-semibold"
            style={{ color: theme.colors.text }}
          >
            ¿Necesitás más información?
          </h3>
          <p
            className="mt-4 max-w-2xl mx-auto"
            style={{ color: theme.colors.textMuted }}
          >
            Escribinos y te respondemos a la brevedad. Estamos para ayudarte.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${theme.colors.accent}20` }}
              >
                <Phone size={20} style={{ color: theme.colors.accent }} />
              </div>
              <div>
                <p className="text-sm" style={{ color: theme.colors.textMuted }}>Teléfono</p>
                <p className="font-medium" style={{ color: theme.colors.text }}>{theme.contact.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${theme.colors.accent}20` }}
              >
                <Mail size={20} style={{ color: theme.colors.accent }} />
              </div>
              <div>
                <p className="text-sm" style={{ color: theme.colors.textMuted }}>Email</p>
                <p className="font-medium" style={{ color: theme.colors.text }}>{theme.contact.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${theme.colors.accent}20` }}
              >
                <MapPin size={20} style={{ color: theme.colors.accent }} />
              </div>
              <div>
                <p className="text-sm" style={{ color: theme.colors.textMuted }}>Dirección</p>
                <p className="font-medium" style={{ color: theme.colors.text }}>{theme.contact.address}</p>
              </div>
            </div>

            <div className="pt-4">
              <iframe
                src={theme.footer.maps.embedUrl}
                width="100%"
                height="200"
                style={{ border: 0, borderRadius: theme.radii.md }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          <div
            className="p-6 rounded-xl"
            style={{ backgroundColor: theme.colors.secondary }}
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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
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
                    className="w-full px-4 py-3 rounded-lg border bg-transparent transition-colors"
                    style={{
                      borderColor: theme.colors.border,
                      color: theme.colors.text,
                    }}
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
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
                    className="w-full px-4 py-3 rounded-lg border bg-transparent transition-colors"
                    style={{
                      borderColor: theme.colors.border,
                      color: theme.colors.text,
                    }}
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: theme.colors.text }}
                  >
                    Teléfono (opcional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border bg-transparent transition-colors"
                    style={{
                      borderColor: theme.colors.border,
                      color: theme.colors.text,
                    }}
                    placeholder="+54 9..."
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: theme.colors.text }}
                  >
                    Mensaje
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border bg-transparent transition-colors resize-none"
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
                  className="w-full py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50"
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
    </section>
  )
}
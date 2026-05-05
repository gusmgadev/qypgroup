"use client"

import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"
import { theme } from "@/lib/theme"

const socialIcons: Record<string, any> = {
  instagram: ({ size = 14, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
  ),
  linkedin: ({ size = 14, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
  ),
}

export function Footer() {
  return (
    <footer className="w-full">
      <div
        className="w-full py-6 px-12 flex flex-col md:flex-row items-center justify-between gap-6"
        style={{ backgroundColor: theme.colors.accent }}
      >
        <div className="text-white text-center md:text-left">
          <h3 className="text-xl font-bold">¿Listo para impulsar tu industria?</h3>
          <p className="text-white/70 text-sm mt-1">
            Contactanos hoy, te asesoramos sin compromiso.
          </p>
        </div>
        <Link
          href={theme.navbar.cta.href}
          className="px-7 py-3 rounded-full font-bold bg-white transition-all duration-200 hover:scale-[1.02] whitespace-nowrap"
          style={{ color: theme.colors.accent }}
        >
          Contactanos ahora
        </Link>
      </div>

      <div
        className="w-full py-9 px-12"
        style={{
          backgroundColor: "#FFFFFF",
          borderTop: `1px solid ${theme.colors.border}`,
        }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <img
              src={theme.logo.path}
              alt="Tecnosur Group"
              width={theme.logo.width}
              height={theme.logo.height}
              className="h-16 w-auto"
            />
            <p className="text-sm" style={{ color: theme.colors.textMuted }}>
              {theme.footer.description}
            </p>
            <div className="flex gap-2">
              {Object.entries(theme.footer.social).map(([key, url]) => {
                if (!url) return null
                const Icon = socialIcons[key as keyof typeof socialIcons]
                return (
                  <Link
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-200"
                    style={{
                      borderColor: "#E0E8F0",
                    }}
                  >
                    <Icon size={14} style={{ color: theme.colors.primary }} />
                  </Link>
                )
              })}
            </div>
          </div>

          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-wide mb-4"
              style={{ color: theme.colors.dark }}
            >
              Servicios
            </h4>
            <ul className="space-y-2">
              {theme.footer.services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="text-sm"
                    style={{ color: theme.colors.textMuted }}
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-wide mb-4"
              style={{ color: theme.colors.dark }}
            >
              Navegación
            </h4>
            <ul className="space-y-2">
              {theme.footer.nav.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-sm"
                    style={{ color: theme.colors.textMuted }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4
              className="text-sm font-semibold uppercase tracking-wide"
              style={{ color: theme.colors.dark }}
            >
              Contacto
            </h4>
            <div className="space-y-2 text-sm" style={{ color: theme.colors.textMuted }}>
              <a href={`tel:${theme.contact.phone}`} className="flex items-center gap-2">
                <Phone size={14} />
                {theme.contact.phone}
              </a>
              <a href={`mailto:${theme.contact.email}`} className="flex items-center gap-2">
                <Mail size={14} />
                {theme.contact.email}
              </a>
              <a
                href={`https://wa.me/${theme.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MapPin size={14} />
                {theme.contact.address}
              </a>
            </div>
            <iframe
              src={theme.footer.maps.embedUrl}
              width="100%"
              height={theme.footer.maps.height}
              style={{ border: 0, borderRadius: theme.radii.md }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

        <div
          className="mt-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
          style={{
            borderTop: `1px solid ${theme.colors.border}`,
            color: theme.colors.textMuted,
          }}
        >
          <span>{theme.footer.copyright}</span>
          <div className="flex gap-6">
            <Link href={theme.footer.legal.privacy}>
              Privacidad
            </Link>
            <Link href={theme.footer.legal.terms}>
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
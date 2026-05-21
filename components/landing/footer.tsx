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
    <footer className="w-full" style={{ backgroundColor: "#000000" }}>
      <div
        className="w-full py-6 px-12 flex flex-col md:flex-row items-center justify-between gap-6"
        style={{ backgroundColor: theme.colors.accent }}
      >
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold" style={{ color: "#F0E68C" }}>¿Listo para impulsar tu industria?</h3>
          <p className="text-sm mt-1" style={{ color: "rgba(240, 230, 140, 0.70)" }}>
            Contactanos hoy, te asesoramos sin compromiso.
          </p>
        </div>
        <Link
          href={theme.navbar.cta.href}
          className="px-7 py-3 rounded-full font-bold transition-all duration-200 hover:scale-[1.02] whitespace-nowrap"
          style={{ backgroundColor: "#FFFFFF", color: theme.colors.dark }}
        >
          Contactanos
        </Link>
      </div>

      <div
        className="mx-4 md:mx-6 my-3 py-9 px-12"
        style={{
          backgroundColor: "rgba(224, 220, 192, 0.25)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: "24px",
          border: "1px solid rgba(200, 185, 80, 0.30)",
          boxShadow: "0 8px 40px rgba(42, 37, 16, 0.10)",
        }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div
              className="flex items-center justify-center"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "9999px",
                padding: "12px",
                width: "80px",
                height: "80px",
              }}
            >
              <img
                src={theme.logo.path}
                alt="QYP Group"
                width={56}
                height={44}
                className="w-full h-auto"
              />
            </div>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.80)" }}>
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
                      borderColor: "rgba(255,255,255,0.40)",
                    }}
                  >
                    <Icon size={14} style={{ color: "#FFFFFF" }} />
                  </Link>
                )
              })}
            </div>
          </div>

          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-wide mb-4"
              style={{ color: "#FFFFFF" }}
            >
              Servicios
            </h4>
            <ul className="space-y-2">
              {theme.footer.services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="text-sm hover:underline decoration-[#e0dec0] underline-offset-[3px] transition-all duration-200"
                    style={{ color: "rgba(255,255,255,0.80)" }}
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
              style={{ color: "#FFFFFF" }}
            >
              Navegación
            </h4>
            <ul className="space-y-2">
              {theme.footer.nav.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-sm hover:underline decoration-[#e0dec0] underline-offset-[3px] transition-all duration-200"
                    style={{ color: "rgba(255,255,255,0.80)" }}
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
              style={{ color: "#FFFFFF" }}
            >
              Contacto
            </h4>
            <div className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.80)" }}>
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
            borderTop: "1px solid rgba(255,255,255,0.20)",
            color: "rgba(255,255,255,0.70)",
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
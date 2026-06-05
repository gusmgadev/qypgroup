"use client"

import { useState } from "react"
import Link from "next/link"
import { X, Home, Truck, Wrench, Package, Shield, Users, Clock, Award, Star, MapPin } from "lucide-react"
import { theme } from "@/lib/theme"

type Service = typeof theme.hero.services[number]

const serviceIconMap: Record<string, any> = { truck: Truck, wrench: Wrench, package: Package }
const featureIconMap: Record<string, any> = { Shield, Users, Clock }
const statIconMap: Record<string, any> = { Award, Wrench, Star, MapPin }

function DetailItem({ detail }: { detail: string }) {
  const isSubitem = detail.trimStart().startsWith("*")
  const label = isSubitem ? detail.trimStart().slice(1).trim() : detail
  return (
    <li className="flex gap-2 items-start" style={{ paddingLeft: isSubitem ? "12px" : "0" }}>
      {isSubitem ? (
        <span style={{ color: theme.colors.textMuted, flexShrink: 0, marginTop: "2px", fontSize: "15px" }}>–</span>
      ) : (
        <span style={{ color: theme.colors.accent, flexShrink: 0, fontWeight: 700, marginTop: "2px", fontSize: "15px" }}>✓</span>
      )}
      <span style={{ color: isSubitem ? theme.colors.textMuted : theme.colors.text, lineHeight: "1.4", fontWeight: isSubitem ? 400 : 600, fontSize: "15px" }}>
        {label}
      </span>
    </li>
  )
}

function Modal({ service, onClose }: { service: Service; onClose: () => void }) {
  const details = service.details ?? []
  const useColumns = details.length > 7

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full"
        style={{
          maxWidth: useColumns ? "800px" : "480px",
          backgroundColor: "#FFFFFF",
          borderRadius: "24px",
          boxShadow: "12px 16px 0px rgba(232,105,26,0.6), 0 24px 48px rgba(0,0,0,0.40)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 z-10" style={{ width: 16, height: 16, backgroundColor: theme.colors.accent }} />

        <div className="relative overflow-hidden" style={{ height: "140px" }}>
          <img src={(service as any).image} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(42,37,16,0.75) 0%, transparent 55%)" }} />
          <h2 className="absolute bottom-3 left-5 text-xl font-bold" style={{ color: "#FFFFFF" }}>
            {service.title}
          </h2>
        </div>

        <div className="px-5 py-4">
          <p className="text-sm mb-3" style={{ color: theme.colors.textMuted }}>
            {service.description}
          </p>
          <div style={{ borderTop: `1px solid ${theme.colors.border}` }} className="pt-3">
            <ul style={{ columnCount: useColumns ? 2 : 1, columnGap: "24px" }} className="space-y-1.5">
              {details.map((detail, idx) => (
                <DetailItem key={idx} detail={detail} />
              ))}
            </ul>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 flex items-center justify-center rounded-full"
          style={{ backgroundColor: theme.colors.dark, color: "#FFFFFF", width: "32px", height: "32px" }}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}

function ServiceCard({ service, onClick }: { service: Service; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  const IconComponent = serviceIconMap[(service as any).icon] ?? Wrench

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer flex flex-col overflow-hidden"
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "20px",
        boxShadow: hovered
          ? "5px 7px 0px rgba(232,105,26,0.95), 0 16px 32px rgba(0,0,0,0.20)"
          : "5px 7px 0px rgba(232,105,26,0.80), 0 12px 24px rgba(0,0,0,0.15)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.30s ease",
      }}
    >
      {/* Header caqui: icono + título + accent line */}
      <div style={{ backgroundColor: theme.colors.primary, padding: "16px 20px" }}>
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center flex-shrink-0"
            style={{ width: "40px", height: "40px", backgroundColor: theme.colors.dark, borderRadius: "8px" }}
          >
            <IconComponent size={20} color="#FFFFFF" />
          </div>
          <h3 className="font-bold text-base" style={{ color: theme.colors.dark }}>
            {service.title}
          </h3>
        </div>
        <div style={{ width: "30px", height: "3px", backgroundColor: theme.colors.accent, marginTop: "10px" }} />
      </div>

      {/* Descripción */}
      <div style={{ padding: "14px 20px" }}>
        <p className="text-sm" style={{ color: theme.colors.textMuted, lineHeight: "1.6" }}>
          {service.description}
        </p>
      </div>

      {/* Imagen */}
      <div className="overflow-hidden" style={{ height: "150px" }}>
        <img
          src={(service as any).image}
          alt={service.title}
          className="w-full h-full object-cover"
          style={{
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
        />
      </div>

      {/* Botón outlined */}
      <div style={{ padding: "12px 20px 16px" }}>
        <span
          className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full"
          style={{
            backgroundColor: hovered ? theme.colors.accent : "transparent",
            color: hovered ? "#FFFFFF" : theme.colors.accent,
            border: `1.5px solid ${theme.colors.accent}`,
            transition: "all 0.25s ease",
          }}
        >
          Ver detalle →
        </span>
      </div>
    </div>
  )
}

export function Services() {
  const [selected, setSelected] = useState<Service | null>(null)

  return (
    <section
      id="services"
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
          src={theme.services.banner.image}
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
                {theme.services.banner.eyebrow}
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold"
                style={{ color: "#FFFFFF", lineHeight: "1.15" }}
              >
                {theme.services.banner.title}
              </h2>
              <div style={{
                width: "40px", height: "3px",
                backgroundColor: theme.colors.accent,
                marginTop: "16px", marginBottom: "16px",
              }} />
              <p className="text-base" style={{ color: "rgba(255,255,255,0.80)", maxWidth: "500px", lineHeight: "1.7" }}>
                {theme.services.banner.description}
              </p>

              {/* Feature badges */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                {theme.services.features.map((f, i) => {
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
                src="/images/servicios/obras.jpg"
                alt="Servicios QYP"
                className="w-full object-cover"
                style={{ height: "280px", borderRadius: "12px" }}
              />
            </div>

          </div>
        </div>
      </div>

      {/* ── ZONA 2: CARDS ────────────────────────────────────────────── */}
      <div style={{ backgroundColor: theme.colors.background, padding: "40px 24px" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {theme.hero.services.map((service, index) => (
            <ServiceCard key={index} service={service} onClick={() => setSelected(service)} />
          ))}
        </div>
      </div>

      {/* ── ZONA 3: STATS BAR ────────────────────────────────────────── */}
      <div style={{ backgroundColor: theme.colors.dark, borderRadius: "0 0 24px 24px", padding: "20px 24px" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {theme.services.stats.map((stat, i) => {
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

      {selected && <Modal service={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}

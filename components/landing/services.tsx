"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { theme } from "@/lib/theme"

type Service = typeof theme.hero.services[number]

function ServiceCard({ service, onClick }: { service: Service; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden cursor-pointer flex flex-col"
      style={{
        backgroundColor: hovered ? "#F5F0E8" : "#FFFFFF",
        boxShadow: hovered
          ? `5px 7px 0px rgba(232,105,26,0.95), 0 16px 32px rgba(0,0,0,0.20)`
          : `5px 7px 0px rgba(232,105,26,0.80), 0 12px 24px rgba(0,0,0,0.15)`,
        borderRadius: "20px",
        transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "all 0.30s ease",
      }}
    >
      {/* Vértice superior izquierdo */}
      <div className="absolute top-0 left-0 z-10" style={{ width: 14, height: 14, backgroundColor: theme.colors.accent }} />

      {/* Imagen */}
      <div className="relative overflow-hidden" style={{ height: "176px" }}>
        <img
          src={(service as any).image}
          alt={service.title}
          className="w-full h-full object-cover"
          style={{
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.5s ease",
            filter: hovered ? "brightness(0.90)" : "brightness(1)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: hovered ? "rgba(232,105,26,0.22)" : "transparent",
            transition: "background-color 0.30s ease",
          }}
        />
        <div className="absolute bottom-0 left-0 z-10" style={{ width: 14, height: 14, backgroundColor: theme.colors.accent }} />
      </div>

      {/* Texto */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold mb-2" style={{ color: theme.colors.text }}>
          {service.title}
        </h3>
        <p className="text-sm flex-1" style={{ color: theme.colors.textMuted }}>
          {service.description}
        </p>

        {/* Botón Ver detalle */}
        <div className="mt-4">
          <span
            className="inline-block text-sm font-semibold px-4 py-2 rounded-full"
            style={{
              backgroundColor: hovered ? theme.colors.accent : "transparent",
              color: hovered ? "#FFFFFF" : theme.colors.accent,
              border: `1.5px solid ${theme.colors.accent}`,
              transition: "all 0.25s ease",
            }}
          >
            Ver detalle
          </span>
        </div>
      </div>
    </div>
  )
}

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
        {/* Vértice naranja */}
        <div className="absolute top-0 left-0 z-10" style={{ width: 16, height: 16, backgroundColor: theme.colors.accent }} />

        {/* Imagen */}
        <div className="relative overflow-hidden" style={{ height: "140px" }}>
          <img src={(service as any).image} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(42,37,16,0.75) 0%, transparent 55%)" }} />
          <h2 className="absolute bottom-3 left-5 text-xl font-bold" style={{ color: "#FFFFFF" }}>
            {service.title}
          </h2>
        </div>

        {/* Contenido */}
        <div className="px-5 py-4">
          <p className="text-sm mb-3" style={{ color: theme.colors.textMuted }}>
            {service.description}
          </p>

          <div style={{ borderTop: `1px solid ${theme.colors.border}` }} className="pt-3">
            <ul
              style={{
                columnCount: useColumns ? 2 : 1,
                columnGap: "24px",
              }}
              className="space-y-1.5"
            >
              {details.map((detail, idx) => (
                <DetailItem key={idx} detail={detail} />
              ))}
            </ul>
          </div>
        </div>

        {/* Botón cerrar */}
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

export function Services() {
  const [selected, setSelected] = useState<Service | null>(null)

  return (
    <section
      id="services"
      className="relative py-8 px-4 md:px-7 mx-4 md:mx-6 my-3 overflow-hidden"
      style={{
        borderRadius: "24px",
        boxShadow: "0 8px 40px rgba(42, 37, 16, 0.10)",
        scrollMarginTop: "50px",
      }}
    >
      <img
        src="/images/hero/hero-5.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "blur(8px) brightness(0.85)", transform: "scale(1.05)" }}
      />
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(224, 220, 192, 0.30)" }} />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-5">
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#FFFFFF" }}>
            Servicios
          </h2>
          <h3 className="text-xl md:text-2xl font-semibold" style={{ color: "#FFFFFF" }}>
            Soluciones integrales para tu industria
          </h3>
          <p className="mt-2 max-w-2xl mx-auto text-sm" style={{ color: "#000000" }}>
            en las etapas del proceso de extracción, producción, transporte y almacenaje
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {theme.hero.services.map((service, index) => (
            <ServiceCard key={index} service={service} onClick={() => setSelected(service)} />
          ))}
        </div>
      </div>

      {selected && <Modal service={selected} onClose={() => setSelected(null)} />}

      <style jsx>{`
        @keyframes textShimmer {
          0%, 100% { color: #E8691A; text-shadow: 0 0 8px rgba(232, 105, 26, 0.3); }
          50% { color: #2A2510; text-shadow: none; }
        }
      `}</style>
    </section>
  )
}

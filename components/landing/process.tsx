"use client"

import { useState } from "react"
import Link from "next/link"
import { Home, Search, FileText, Zap, Award, Wrench, Star, MapPin } from "lucide-react"
import { theme } from "@/lib/theme"

const featureIconMap: Record<string, any> = { Search, FileText, Zap }
const statIconMap: Record<string, any> = { Award, Wrench, Star, MapPin }

function StepCard({ step }: { step: typeof theme.process.steps[number] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative flex flex-col items-center text-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Número */}
      <div
        className="relative z-10 flex items-center justify-center mb-4 font-extrabold text-2xl"
        style={{
          width: "76px",
          height: "76px",
          borderRadius: "50%",
          backgroundColor: hovered ? theme.colors.accent : "#FFFFFF",
          color: hovered ? "#FFFFFF" : theme.colors.accent,
          border: `2px solid ${theme.colors.accent}`,
          boxShadow: hovered
            ? "0 8px 24px rgba(232,105,26,0.35)"
            : "0 4px 12px rgba(0,0,0,0.08)",
          flexShrink: 0,
          transition: "all 0.30s ease",
        }}
      >
        {step.number}
      </div>

      {/* Card */}
      <div
        className="w-full p-5 flex-1 flex flex-col"
        style={{
          backgroundColor: hovered ? theme.colors.accent : "#FFFFFF",
          border: `1px solid ${hovered ? theme.colors.accent : theme.colors.border}`,
          borderRadius: "16px",
          transform: hovered ? "translateY(-8px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 16px 32px rgba(232,105,26,0.20)"
            : "0 2px 8px rgba(0,0,0,0.06)",
          transition: "all 0.30s ease",
          minHeight: "160px",
        }}
      >
        <h3
          className="text-lg font-bold mb-2"
          style={{
            color: hovered ? "#FFFFFF" : theme.colors.dark,
            transition: "color 0.30s ease",
          }}
        >
          {step.title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{
            color: hovered ? "rgba(255,255,255,0.90)" : theme.colors.textMuted,
            transition: "color 0.30s ease",
          }}
        >
          {step.description}
        </p>
      </div>
    </div>
  )
}

export function Process() {
  return (
    <section
      id="process"
      className="relative mb-3"
      style={{
        scrollMarginTop: "0",
      }}
    >
      {/* ── ZONA 1: BANNER ───────────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        <img
          src={theme.process.banner.image}
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
                {theme.process.banner.eyebrow}
              </p>
              <h2
                className="text-2xl md:text-3xl font-bold"
                style={{ color: "#FFFFFF", lineHeight: "1.15" }}
              >
                {theme.process.banner.title}
              </h2>
              <div style={{
                width: "40px", height: "3px",
                backgroundColor: theme.colors.accent,
                marginTop: "8px", marginBottom: "8px",
              }} />
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.80)", lineHeight: "1.6" }}>
                {theme.process.banner.description}
              </p>
            </div>

            {/* Foto cuadrada — centro */}
            <div className="hidden md:block flex-shrink-0">
              <img
                src={theme.process.banner.imageRight}
                alt="Proceso QYP"
                style={{ width: "110px", height: "110px", borderRadius: "10px", objectFit: "cover" }}
              />
            </div>

            {/* Features apilados — derecha */}
            <div className="hidden md:flex flex-col gap-3">
              {theme.process.features.map((f, i) => {
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

      {/* ── ZONA 2: STEPS ────────────────────────────────────────────── */}
      <div style={{ backgroundColor: theme.colors.background, padding: "40px 24px" }}>
        <div className="max-w-6xl mx-auto relative">
          {/* Línea conectora — solo desktop */}
          <div
            className="hidden md:block absolute left-0 right-0 h-px"
            style={{
              top: "32px",
              background: `linear-gradient(to right, transparent 0%, ${theme.colors.accent} 15%, ${theme.colors.accent} 85%, transparent 100%)`,
              opacity: 0.35,
              zIndex: 0,
            }}
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 items-stretch">
            {theme.process.steps.map((step, index) => (
              <StepCard key={index} step={step} />
            ))}
          </div>

          {/* CTA inferior */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <p className="text-base font-medium text-center" style={{ color: theme.colors.textMuted }}>
              ¿Listo para dar el primer paso? Convertimos tu necesidad en un proyecto concreto.
            </p>
            <a
              href="#contact"
              className="flex-shrink-0 px-6 py-2.5 rounded-full font-semibold text-sm text-white transition-all duration-200 hover:scale-[1.04]"
              style={{
                backgroundColor: theme.colors.accent,
                boxShadow: "0 4px 14px rgba(232,105,26,0.40)",
              }}
            >
              Contactanos →
            </a>
          </div>
        </div>
      </div>

      {/* ── ZONA 3: STATS BAR ────────────────────────────────────────── */}
      <div style={{ backgroundColor: theme.colors.primary, padding: "20px 24px" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {theme.process.stats.map((stat, i) => {
            const StatIcon = statIconMap[stat.icon]
            return (
              <div key={i} className="flex items-center gap-3" style={{
                borderRight: i < theme.process.stats.length - 1 ? "1px solid rgba(255,255,255,0.55)" : "none",
                paddingRight: i < theme.process.stats.length - 1 ? "20px" : "0",
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

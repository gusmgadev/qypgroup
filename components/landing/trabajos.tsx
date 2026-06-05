"use client"

import { useState } from "react"
import Link from "next/link"
import { X, Home, Shield, Folder, MapPin, Award, Wrench, Star, Briefcase } from "lucide-react"
import { theme } from "@/lib/theme"
import type { Project } from "@/lib/db/projects"

const featureIconMap: Record<string, any> = { Shield, Folder, MapPin }
const statIconMap: Record<string, any> = { Award, Wrench, Star, MapPin }

function WorkCard({ project }: { project: Project }) {
  const cover = project.photos?.sort((a, b) => a.order - b.order)[0]?.url
  const photoCount = project.photos?.length ?? 0

  return (
    <Link
      href={`/trabajos/${project.id}`}
      className="group flex flex-col overflow-hidden"
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "20px",
        boxShadow: "5px 7px 0px rgba(232,105,26,0.80), 0 12px 24px rgba(0,0,0,0.15)",
        textDecoration: "none",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Header caqui: icono + título + accent line */}
      <div style={{ backgroundColor: theme.colors.primary, padding: "16px 20px" }}>
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center flex-shrink-0"
            style={{ width: "40px", height: "40px", backgroundColor: theme.colors.dark, borderRadius: "8px" }}
          >
            <Briefcase size={20} color="#FFFFFF" />
          </div>
          <h3
            className="font-bold text-base"
            style={{ color: theme.colors.dark, lineHeight: 1.3 }}
          >
            {project.title}
          </h3>
        </div>
        <div style={{ width: "30px", height: "3px", backgroundColor: theme.colors.accent, marginTop: "10px" }} />
      </div>

      {/* Descripción */}
      {project.description && (
        <div style={{ padding: "12px 20px" }}>
          <p
            style={{
              margin: 0,
              color: theme.colors.textMuted,
              fontSize: theme.fontSizes.sm,
              lineHeight: 1.6,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.description}
          </p>
        </div>
      )}

      {/* Foto */}
      <div className="relative overflow-hidden" style={{ height: "160px", backgroundColor: theme.colors.dark }}>
        {cover ? (
          <img
            src={cover}
            alt={project.title}
            className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ opacity: 0.3 }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={theme.colors.secondary} strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}
        {photoCount > 1 && (
          <span
            className="absolute bottom-2 right-2"
            style={{
              backgroundColor: "rgba(0,0,0,0.60)",
              color: "#fff",
              fontSize: "11px",
              padding: "2px 8px",
              borderRadius: theme.radii.full,
            }}
          >
            +{photoCount - 1} fotos
          </span>
        )}
      </div>

      {/* Botón */}
      <div style={{ padding: "12px 20px 16px" }}>
        <span
          className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full"
          style={{
            color: theme.colors.accent,
            border: `1.5px solid ${theme.colors.accent}`,
            transition: "all 0.25s ease",
          }}
        >
          Ver detalles →
        </span>
      </div>
    </Link>
  )
}

function AllWorksModal({ projects, onClose }: { projects: Project[]; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto"
      style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", padding: "60px 16px 32px" }}
      onClick={onClose}
    >
      <div
        className="relative w-full"
        style={{
          maxWidth: "1100px",
          backgroundColor: theme.colors.background,
          borderRadius: "24px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.50)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: `1px solid ${theme.colors.border}` }}
        >
          <h2 style={{ margin: 0, color: theme.colors.dark, fontSize: theme.fontSizes.xl, fontWeight: theme.fontWeights.bold }}>
            Todos los Trabajos
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-full transition-colors hover:bg-black/10"
            style={{ width: 36, height: 36, border: `1px solid ${theme.colors.border}` }}
          >
            <X size={18} color={theme.colors.dark} />
          </button>
        </div>
        <div
          className="p-6"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}
        >
          {projects.map((project) => (
            <WorkCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function TrabajosSection({ projects }: { projects: Project[] }) {
  const [modalOpen, setModalOpen] = useState(false)
  const preview = projects.slice(0, 5)

  return (
    <section
      id="trabajos"
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
          src={theme.trabajos.banner.image}
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
                {theme.trabajos.banner.eyebrow}
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold"
                style={{ color: "#FFFFFF", lineHeight: "1.15" }}
              >
                {theme.trabajos.banner.title}
              </h2>
              <div style={{
                width: "40px", height: "3px",
                backgroundColor: theme.colors.accent,
                marginTop: "16px", marginBottom: "16px",
              }} />
              <p className="text-base" style={{ color: "rgba(255,255,255,0.80)", maxWidth: "500px", lineHeight: "1.7" }}>
                {theme.trabajos.banner.description}
              </p>

              {/* Feature badges */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                {theme.trabajos.features.map((f, i) => {
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
                src={theme.trabajos.banner.imageRight}
                alt="Trabajos QYP"
                className="w-full object-cover"
                style={{ height: "280px", borderRadius: "12px" }}
              />
            </div>

          </div>
        </div>
      </div>

      {/* ── ZONA 2: CARDS ────────────────────────────────────────────── */}
      <div style={{ backgroundColor: theme.colors.background, padding: "40px 24px" }}>
        <div className="max-w-6xl mx-auto">
          {projects.length === 0 ? (
            <p className="text-center py-12" style={{ color: theme.colors.textMuted, fontSize: theme.fontSizes.lg }}>
              Próximamente publicaremos nuestros proyectos.
            </p>
          ) : (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "20px",
                }}
              >
                {preview.map((project) => (
                  <WorkCard key={project.id} project={project} />
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-7 py-2.5 rounded-full font-semibold text-white transition-all duration-200 hover:scale-[1.03]"
                  style={{
                    backgroundColor: theme.colors.accent,
                    fontSize: theme.fontSizes.base,
                    boxShadow: "0 4px 14px rgba(232,105,26,0.45)",
                  }}
                >
                  Ver todos {projects.length > 5 ? `(${projects.length})` : ""}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── ZONA 3: STATS BAR ────────────────────────────────────────── */}
      <div style={{ backgroundColor: theme.colors.dark, borderRadius: "0 0 24px 24px", padding: "20px 24px" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {theme.trabajos.stats.map((stat, i) => {
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

      {modalOpen && <AllWorksModal projects={projects} onClose={() => setModalOpen(false)} />}
    </section>
  )
}

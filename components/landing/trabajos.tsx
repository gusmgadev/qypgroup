"use client"

import { useState } from "react"
import Link from "next/link"
import { X, Home, Shield, Folder, MapPin, Award, Wrench, Star, Briefcase } from "lucide-react"
import { theme } from "@/lib/theme"
import type { Project } from "@/lib/db/projects"

const featureIconMap: Record<string, any> = { Shield, Folder, MapPin }
const statIconMap: Record<string, any> = { Award, Wrench, Star, MapPin }

function WorkCard({ project }: { project: Project }) {
  const sorted = project.photos?.sort((a, b) => a.order - b.order) ?? []
  const photoSlots = [0, 1, 2].map(i => sorted[i]?.url ?? null)
  const hasPhotos = photoSlots.some(Boolean)

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
        height: "100%",
      }}
    >
      {/* Header caqui: icono + título + accent line */}
      <div style={{ backgroundColor: theme.colors.primary, padding: "10px 14px" }}>
        <div className="flex items-center gap-2">
          <div
            className="flex items-center justify-center flex-shrink-0"
            style={{ width: "30px", height: "30px", backgroundColor: theme.colors.dark, borderRadius: "6px" }}
          >
            <Briefcase size={15} color="#FFFFFF" />
          </div>
          <h3
            className="font-bold text-sm"
            style={{ color: theme.colors.dark, lineHeight: 1.3 }}
          >
            {project.title}
          </h3>
        </div>
        <div style={{ width: "24px", height: "2px", backgroundColor: theme.colors.accent, marginTop: "7px" }} />
      </div>

      {/* Descripción */}
      {project.description && (
        <div style={{ padding: "8px 14px" }}>
          <p
            style={{
              margin: 0,
              color: theme.colors.textMuted,
              fontSize: theme.fontSizes.xs,
              lineHeight: 1.5,
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

      {/* Film strip — 3 fotos */}
      <div className="relative overflow-hidden" style={{ height: "100px", backgroundColor: "#111111" }}>
        {/* Perforaciones superior */}
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-evenly px-2 pt-1 pointer-events-none">
          {[0,1,2,3,4,5,6].map(i => (
            <div key={i} style={{ width: "7px", height: "5px", backgroundColor: "#000", borderRadius: "1px", opacity: 0.85 }} />
          ))}
        </div>
        {/* Perforaciones inferior */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-evenly px-2 pb-1 pointer-events-none">
          {[0,1,2,3,4,5,6].map(i => (
            <div key={i} style={{ width: "7px", height: "5px", backgroundColor: "#000", borderRadius: "1px", opacity: 0.85 }} />
          ))}
        </div>

        {hasPhotos ? (
          <div className="flex h-full" style={{ gap: "2px" }}>
            {photoSlots.map((url, i) => (
              <div key={i} className="flex-1 overflow-hidden">
                {url ? (
                  <img
                    src={url}
                    alt={project.title}
                    className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                ) : (
                  <div style={{ width: "100%", height: "100%", backgroundColor: "#222222" }} />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ opacity: 0.3 }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={theme.colors.secondary} strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Botón */}
      <div className="mt-auto" style={{ padding: "8px 14px 10px" }}>
        <span
          className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
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
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}
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
                {theme.trabajos.banner.eyebrow}
              </p>
              <h2
                className="text-2xl md:text-3xl font-bold"
                style={{ color: "#FFFFFF", lineHeight: "1.15" }}
              >
                {theme.trabajos.banner.title}
              </h2>
              <div style={{
                width: "40px", height: "3px",
                backgroundColor: theme.colors.accent,
                marginTop: "8px", marginBottom: "8px",
              }} />
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.80)", lineHeight: "1.6" }}>
                {theme.trabajos.banner.description}
              </p>
            </div>

            {/* Foto cuadrada — centro */}
            <div className="hidden md:block flex-shrink-0">
              <img
                src={theme.trabajos.banner.imageRight}
                alt="Trabajos QYP"
                style={{ width: "110px", height: "110px", borderRadius: "10px", objectFit: "cover" }}
              />
            </div>

            {/* Features apilados — derecha */}
            <div className="hidden md:flex flex-col gap-3">
              {theme.trabajos.features.map((f, i) => {
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

      {/* ── ZONA 2: CARDS ────────────────────────────────────────────── */}
      <div style={{ backgroundColor: theme.colors.background, padding: "40px 24px" }}>
        <div className="max-w-6xl mx-auto">
          {projects.length === 0 ? (
            <p className="text-center py-12" style={{ color: theme.colors.textMuted, fontSize: theme.fontSizes.lg }}>
              Próximamente publicaremos nuestros proyectos.
            </p>
          ) : (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 260px))", justifyContent: "center", alignItems: "stretch", gap: "20px" }}>
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
      <div style={{ backgroundColor: theme.colors.primary, borderRadius: "0 0 24px 24px", padding: "20px 24px" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {theme.trabajos.stats.map((stat, i) => {
            const StatIcon = statIconMap[stat.icon]
            return (
              <div key={i} className="flex items-center gap-3" style={{
                borderRight: i < theme.trabajos.stats.length - 1 ? "1px solid rgba(255,255,255,0.55)" : "none",
                paddingRight: i < theme.trabajos.stats.length - 1 ? "20px" : "0",
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

      {modalOpen && <AllWorksModal projects={projects} onClose={() => setModalOpen(false)} />}
    </section>
  )
}

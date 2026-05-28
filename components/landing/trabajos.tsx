"use client"

import { useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { theme } from "@/lib/theme"
import type { Project } from "@/lib/db/projects"

function WorkCard({ project }: { project: Project }) {
  const cover = project.photos?.sort((a, b) => a.order - b.order)[0]?.url
  const photoCount = project.photos?.length ?? 0

  return (
    <Link
      href={`/trabajos/${project.id}`}
      className="group relative overflow-hidden flex flex-col"
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "20px",
        boxShadow: "5px 7px 0px rgba(232,105,26,0.80), 0 12px 24px rgba(0,0,0,0.15)",
        textDecoration: "none",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div className="absolute top-0 left-0 z-10" style={{ width: 14, height: 14, backgroundColor: theme.colors.accent }} />
      <div className="absolute bottom-0 right-0 z-10" style={{ width: 14, height: 14, backgroundColor: theme.colors.accent }} />

      <div className="relative overflow-hidden" style={{ height: "160px", backgroundColor: theme.colors.dark }}>
        {cover ? (
          <img
            src={cover}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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

      <div style={{ padding: "14px 16px 16px" }}>
        <h3
          style={{
            margin: "0 0 5px",
            color: theme.colors.dark,
            fontSize: theme.fontSizes.base,
            fontWeight: theme.fontWeights.bold,
            lineHeight: 1.3,
          }}
        >
          {project.title}
        </h3>
        {project.description && (
          <p
            style={{
              margin: 0,
              color: theme.colors.textMuted,
              fontSize: theme.fontSizes.sm,
              lineHeight: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.description}
          </p>
        )}
        <p style={{ margin: "8px 0 0", color: theme.colors.accent, fontSize: theme.fontSizes.sm, fontWeight: theme.fontWeights.bold }}>
          Ver detalles →
        </p>
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
          <h2
            style={{
              margin: 0,
              color: theme.colors.dark,
              fontSize: theme.fontSizes.xl,
              fontWeight: theme.fontWeights.bold,
            }}
          >
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
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "20px",
          }}
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
      className="relative py-8 px-4 md:px-7 mx-4 md:mx-6 my-3 overflow-hidden"
      style={{
        borderRadius: "24px",
        boxShadow: "0 8px 40px rgba(42, 37, 16, 0.10)",
        scrollMarginTop: "50px",
      }}
    >
      <img
        src="/images/hero/hero-4.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "blur(8px) brightness(0.85)", transform: "scale(1.05)" }}
      />
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(224, 220, 192, 0.30)" }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-5">
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#FFFFFF" }}>
            Nuestros Trabajos
          </h2>
          <p className="mt-2 max-w-2xl mx-auto text-sm" style={{ color: "#000000" }}>
            Proyectos realizados en la industria petrolera, minera y gasífera
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="text-center py-12" style={{ color: "rgba(255,255,255,0.85)", fontSize: theme.fontSizes.lg }}>
            Próximamente publicaremos nuestros proyectos.
          </p>
        ) : (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, 300px)",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              {preview.map((project) => (
                <WorkCard key={project.id} project={project} />
              ))}
            </div>

            <div className="flex justify-center mt-7">
              <button
                onClick={() => setModalOpen(true)}
                className="px-7 py-2.5 rounded-full font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:bg-[#4A4440]"
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

      {modalOpen && <AllWorksModal projects={projects} onClose={() => setModalOpen(false)} />}
    </section>
  )
}

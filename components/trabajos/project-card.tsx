import Link from "next/link"
import Image from "next/image"
import { theme } from "../../lib/theme"
import type { Project } from "../../lib/db/projects"

export default function ProjectCard({ project }: { project: Project }) {
  const cover = project.photos?.[0]?.url
  const photoCount = project.photos?.length ?? 0

  return (
    <Link
      href={`/trabajos/${project.id}`}
      style={{
        display: "block",
        textDecoration: "none",
        borderRadius: theme.radii.lg,
        overflow: "hidden",
        backgroundColor: "rgba(203,197,138,0.12)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: `1px solid rgba(216,212,154,0.30)`,
        boxShadow: theme.shadows.md,
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        position: "relative",
      }}
      className="project-card"
    >
      {/* Corner accents */}
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "20px",
          height: "20px",
          borderTop: `3px solid ${theme.colors.accent}`,
          borderLeft: `3px solid ${theme.colors.accent}`,
          borderRadius: "4px 0 0 0",
          zIndex: 2,
        }}
      />
      <span
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "20px",
          height: "20px",
          borderBottom: `3px solid ${theme.colors.accent}`,
          borderRight: `3px solid ${theme.colors.accent}`,
          borderRadius: "0 0 4px 0",
          zIndex: 2,
        }}
      />

      {/* Cover photo */}
      <div style={{ position: "relative", aspectRatio: "16/9", backgroundColor: theme.colors.dark }}>
        {cover ? (
          <Image
            src={cover}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.3,
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={theme.colors.secondary} strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}

        {photoCount > 1 && (
          <span
            style={{
              position: "absolute",
              bottom: "8px",
              right: "8px",
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

      {/* Content */}
      <div style={{ padding: "16px 18px 18px" }}>
        <h3
          style={{
            margin: "0 0 6px",
            color: theme.colors.dark,
            fontSize: theme.fontSizes.lg,
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
        <p
          style={{
            margin: "10px 0 0",
            color: theme.colors.accent,
            fontSize: theme.fontSizes.sm,
            fontWeight: theme.fontWeights.bold,
          }}
        >
          Ver detalles →
        </p>
      </div>

    </Link>
  )
}

import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { getProjectById } from "../../../lib/db/projects"
import PhotoGallery from "../../../components/trabajos/photo-gallery"
import { Navbar } from "../../../components/landing/navbar"
import { Footer } from "../../../components/landing/footer"
import { theme } from "../../../lib/theme"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getProjectById(id)
  return { title: project ? `${project.title} | QYP Group` : "Proyecto | QYP Group" }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getProjectById(id)

  if (!project || !project.visible) notFound()

  const photos = project.photos ?? []

  return (
    <main style={{ minHeight: "100vh", backgroundColor: theme.colors.background }}>
      <Navbar />

      {/* Hero — mismo fondo que Servicios */}
      <section
        style={{
          position: "relative",
          paddingTop: "180px",
          paddingBottom: "56px",
          overflow: "hidden",
        }}
      >
        <img
          src="/images/hero/hero-5.jpg"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(8px) brightness(0.85)",
            transform: "scale(1.05)",
          }}
        />
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(224, 220, 192, 0.30)" }} />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <Link
            href="/trabajos"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              color: theme.colors.accent,
              textDecoration: "none",
              fontSize: theme.fontSizes.sm,
              fontWeight: theme.fontWeights.bold,
              marginBottom: "24px",
              fontFamily: theme.fonts.primary,
            }}
          >
            <ChevronLeft size={16} />
            Volver a Trabajos
          </Link>

          <h1
            style={{
              color: theme.colors.dark,
              fontSize: "clamp(26px, 4vw, 44px)",
              fontWeight: theme.fontWeights.bold,
              fontFamily: theme.fonts.primary,
              margin: "0 0 14px",
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </h1>

          {project.description && (
            <p
              style={{
                color: theme.colors.text,
                fontSize: theme.fontSizes.lg,
                lineHeight: 1.7,
                margin: 0,
                maxWidth: "680px",
              }}
            >
              {project.description}
            </p>
          )}
        </div>
      </section>

      {/* Gallery */}
      {photos.length > 0 && (
        <section
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "48px 24px 80px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "3px",
              backgroundColor: theme.colors.accent,
              borderRadius: "2px",
              marginBottom: "32px",
            }}
          />
          <h2
            style={{
              color: theme.colors.dark,
              fontSize: theme.fontSizes.lg,
              fontWeight: theme.fontWeights.bold,
              fontFamily: theme.fonts.primary,
              margin: "0 0 20px",
            }}
          >
            Galería de fotos
          </h2>
          <PhotoGallery photos={photos} />
        </section>
      )}

      <Footer />
    </main>
  )
}

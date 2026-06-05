import { notFound } from "next/navigation"
import Link from "next/link"
import { Home, Shield, Folder, MapPin, Award, Wrench, Star } from "lucide-react"
import { getProjectById } from "../../../lib/db/projects"
import PhotoGallery from "../../../components/trabajos/photo-gallery"
import { theme } from "../../../lib/theme"

export const dynamic = "force-dynamic"

const featureIconMap: Record<string, any> = { Shield, Folder, MapPin }
const statIconMap: Record<string, any> = { Award, Wrench, Star, MapPin }

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getProjectById(id)
  return { title: project ? `${project.title} | QYP Group` : "Proyecto | QYP Group" }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getProjectById(id)

  if (!project || !project.visible) notFound()

  const photos = project.photos?.slice().sort((a, b) => a.order - b.order) ?? []
  const coverUrl = photos[0]?.url ?? "/images/hero/hero-4.jpg"

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#2a2a2a" }}>

      <div
        className="mx-4 md:mx-6 my-3 overflow-hidden"
        style={{ borderRadius: "24px", boxShadow: "0 8px 40px rgba(42,37,16,0.10)" }}
      >

        {/* ── ZONA 1: BANNER ───────────────────────────────────────────── */}
        <div className="relative overflow-hidden" style={{ borderRadius: "24px 24px 0 0" }}>
          <img
            src={coverUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.18)", transform: "scale(1.05)" }}
          />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(42,37,16,0.80)" }} />

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

              {/* Título y texto */}
              <div>
                <p style={{
                  color: theme.colors.accent,
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}>
                  TRABAJOS
                </p>
                <h1
                  className="text-2xl md:text-3xl font-bold"
                  style={{ color: "#FFFFFF", lineHeight: "1.15" }}
                >
                  {project.title}
                </h1>
                <div style={{
                  width: "40px", height: "3px",
                  backgroundColor: theme.colors.accent,
                  marginTop: "8px", marginBottom: "8px",
                }} />
                {project.description && (
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.80)", lineHeight: "1.6" }}>
                    {project.description}
                  </p>
                )}
              </div>

              {/* Foto cuadrada — centro */}
              <div className="hidden md:block flex-shrink-0">
                <img
                  src={coverUrl}
                  alt={project.title}
                  style={{ width: "110px", height: "110px", borderRadius: "10px", objectFit: "cover" }}
                />
              </div>

              {/* Features — derecha */}
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

        {/* ── ZONA 2: GALERÍA ──────────────────────────────────────────── */}
        <div style={{ backgroundColor: theme.colors.background, padding: "40px 24px" }}>
          <div className="max-w-6xl mx-auto">
            {photos.length > 0 ? (
              <PhotoGallery photos={photos} />
            ) : (
              <p className="text-center py-12" style={{ color: theme.colors.textMuted }}>
                Sin fotos disponibles.
              </p>
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

      </div>

    </main>
  )
}

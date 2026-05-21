import { getVisibleProjects } from "../../lib/db/projects"
import ProjectCard from "../../components/trabajos/project-card"
import { Navbar } from "../../components/landing/navbar"
import { Footer } from "../../components/landing/footer"
import { theme } from "../../lib/theme"

export const dynamic = "force-dynamic"

export default async function TrabajosPage() {
  const projects = await getVisibleProjects()

  return (
    <main style={{ minHeight: "100vh", backgroundColor: theme.colors.background }}>
      <Navbar />

      {/* Hero banner — mismo fondo que Servicios */}
      <section
        style={{
          position: "relative",
          paddingTop: "150px",
          paddingBottom: "40px",
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
            textAlign: "center",
            padding: "0 24px",
          }}
        >
          <h1
            className="shimmer-title"
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: theme.fontWeights.bold,
              fontFamily: theme.fonts.primary,
              margin: "0 0 10px",
              lineHeight: 1.15,
              color: "#ffffff",
            }}
          >
            Nuestros Trabajos
          </h1>
          <p
            style={{
              color: theme.colors.dark,
              fontSize: theme.fontSizes.base,
              whiteSpace: "nowrap" as const,
              margin: 0,
            }}
          >
            Proyectos realizados en la industria petrolera, minera y gasífera.
          </p>
        </div>
      </section>

      {/* Projects grid */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "48px 24px 80px",
        }}
      >
        {projects.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 24px" }}>
            <p style={{ color: theme.colors.textMuted, fontSize: theme.fontSizes.lg }}>
              Próximamente publicaremos nuestros proyectos.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}

"use client"

import { theme } from "@/lib/theme"

export function Services() {
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
          <h2
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ color: theme.colors.dark }}
          >
            Servicios
          </h2>
          <h3
            className="text-xl md:text-2xl font-semibold"
            style={{ color: "#E8691A", animation: "textShimmer 2.5s ease-in-out infinite" }}
          >
            Soluciones integrales para tu industria
          </h3>
          <p
            className="mt-2 max-w-2xl mx-auto text-sm"
            style={{ color: theme.colors.textMuted }}
          >
            en las etapas del proceso de extracción, producción, transporte y almacenaje
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {theme.hero.services.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: "#FFFFFF",
                boxShadow: "8px 12px 0px rgba(0,0,0,0.85), 0 16px 32px rgba(0,0,0,0.30)",
                borderRadius: "20px",
              }}
            >
              {/* Vértice superior izquierdo */}
              <div
                className="absolute top-0 left-0 z-10"
                style={{ width: 14, height: 14, backgroundColor: theme.colors.accent }}
              />

              {/* Imagen */}
              <div className="relative overflow-hidden" style={{ height: "176px" }}>
                <img
                  src={(service as any).image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Vértice inferior izquierdo de la imagen */}
                <div
                  className="absolute bottom-0 left-0 z-10"
                  style={{ width: 14, height: 14, backgroundColor: theme.colors.accent }}
                />
              </div>

              {/* Texto */}
              <div className="p-5">
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: theme.colors.text }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm mb-3"
                  style={{ color: theme.colors.textMuted }}
                >
                  {service.description}
                </p>

                {service.details && (
                  <ul className="space-y-1 pt-2" style={{ borderTop: `1px solid ${theme.colors.border}` }}>
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="text-sm flex gap-2">
                        <span style={{ color: theme.colors.accent }}>•</span>
                        <span style={{ color: theme.colors.textMuted }}>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes textShimmer {
          0%, 100% { color: #E8691A; text-shadow: 0 0 8px rgba(232, 105, 26, 0.3); }
          50% { color: #2A2510; text-shadow: none; }
        }
      `}</style>
    </section>
  )
}

"use client"

import { useState } from "react"
import { theme } from "@/lib/theme"

function StepCard({ step, index }: { step: typeof theme.process.steps[number]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative flex flex-col items-center text-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Número */}
      <div
        className="relative z-10 flex items-center justify-center mb-4 font-extrabold text-xl"
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          backgroundColor: hovered ? "#FFFFFF" : theme.colors.accent,
          color: hovered ? theme.colors.accent : "#FFFFFF",
          boxShadow: hovered
            ? `0 0 0 6px rgba(255,255,255,0.15), 0 8px 24px rgba(232,105,26,0.5)`
            : `0 0 0 6px rgba(232,105,26,0.18), 0 4px 16px rgba(232,105,26,0.35)`,
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
          backgroundColor: hovered ? "rgba(232,105,26,0.18)" : "rgba(255,255,255,0.06)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: hovered
            ? `0.5px solid rgba(232,105,26,0.60)`
            : `0.5px solid rgba(203,197,138,0.20)`,
          borderRadius: "16px",
          transform: hovered ? "translateY(-8px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 16px 32px rgba(232,105,26,0.20)"
            : "0 2px 8px rgba(0,0,0,0.10)",
          transition: "all 0.30s ease",
          minHeight: "160px",
        }}
      >
        <h3
          className="text-base font-bold mb-2"
          style={{
            color: hovered ? theme.colors.accent : "#FFFFFF",
            transition: "color 0.30s ease",
          }}
        >
          {step.title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{
            color: hovered ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.65)",
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
      className="relative py-10 px-4 md:px-7 mx-4 md:mx-6 my-3 overflow-hidden"
      style={{
        borderRadius: "24px",
        backgroundColor: theme.colors.dark,
        boxShadow: "0 8px 40px rgba(42, 37, 16, 0.18)",
        scrollMarginTop: "50px",
      }}
    >
      {/* Textura sutil */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 20% 50%, rgba(232,105,26,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(203,197,138,0.06) 0%, transparent 60%)",
          borderRadius: "24px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#FFFFFF" }}>
            Nuestro Proceso
          </h2>
          <p className="text-base md:text-lg font-semibold max-w-4xl mx-auto" style={{ color: theme.colors.primary }}>
            Proveemos soluciones para las necesidades de la industria petrolera, gasífera y minera de la región. En cada etapa del proceso de extracción, producción, transporte y almacenaje.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Línea conectora — solo desktop */}
          <div
            className="hidden md:block absolute top-10 left-0 right-0 h-px"
            style={{
              background: `linear-gradient(to right, transparent 0%, ${theme.colors.accent} 15%, ${theme.colors.accent} 85%, transparent 100%)`,
              opacity: 0.35,
              zIndex: 0,
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 items-stretch">
            {theme.process.steps.map((step, index) => (
              <StepCard key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

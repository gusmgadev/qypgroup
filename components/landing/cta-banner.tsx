"use client"

import Link from "next/link"
import { theme } from "@/lib/theme"

export function CtaBanner() {
  return (
    <div
      className="w-full py-6 px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 mx-4 md:mx-6 my-3"
      style={{
        backgroundColor: theme.colors.accent,
        borderRadius: "24px",
        width: "auto",
      }}
    >
      <div className="text-center md:text-left">
        <h3 className="text-xl font-bold" style={{ color: "#F0E68C" }}>
          ¿Listo para impulsar tu industria?
        </h3>
        <p className="text-sm mt-1" style={{ color: "rgba(240, 230, 140, 0.70)" }}>
          Contactanos hoy, te asesoramos sin compromiso.
        </p>
      </div>
      <Link
        href="#contact"
        className="px-7 py-3 rounded-full font-bold transition-all duration-200 hover:scale-[1.02] whitespace-nowrap"
        style={{ backgroundColor: "#FFFFFF", color: theme.colors.dark }}
      >
        Contactanos
      </Link>
    </div>
  )
}

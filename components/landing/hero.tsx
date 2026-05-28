"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Handshake, UserPlus } from "lucide-react"
import { theme } from "@/lib/theme"
import { StaffModal } from "./staff-modal"
const iconMap: Record<string, any> = {
  truck: ({ size = 16, color = "#000" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
  ),
  package: ({ size = 16, color = "#000" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
  ),
  wrench: ({ size = 16, color = "#000" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
  ),
  handshake: ({ size = 16 }: { size?: number; color?: string }) => (
    <Handshake size={size} color="#FFFFFF" />
  ),
  userplus: ({ size = 16 }: { size?: number; color?: string }) => (
    <UserPlus size={size} color="#FFFFFF" />
  ),
}

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [staffModalOpen, setStaffModalOpen] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % theme.hero.images.length)
    }, theme.hero.slideInterval)
    return () => clearInterval(interval)
  }, [isPaused])

  return (
    <section
      className="relative min-h-screen overflow-hidden flex items-center justify-center mx-4 md:mx-6 my-3"
      style={{ paddingTop: "140px", paddingBottom: "60px", borderRadius: "24px" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0">
        {theme.hero.images.map((src, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-[1.5s]"
            style={{
              opacity: index === currentSlide ? 1 : 0,
            }}
          >
            <img
              src={src}
              alt={`Hero ${index + 1}`}
              className="w-full h-full object-cover"
              style={theme.hero.blurAmount !== "0px" ? {
                filter: `blur(${theme.hero.blurAmount}) brightness(0.9)`,
              } : undefined}
            />
          </div>
        ))}
      </div>

      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(28, 20, 5, 0.38)" }}
      />

      <div className="relative z-10 max-w-[680px] text-center px-6 md:px-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
          <span style={{ color: "#FFFFFF", whiteSpace: "nowrap" }}>{theme.hero.title}</span>
          {theme.hero.titleHighlight && (
            <>
              <br />
              <span
                className="inline-block px-6 py-2 rounded-full text-2xl md:text-3xl lg:text-4xl mt-2"
                style={{
                  backgroundColor: "rgba(28, 20, 5, 0.55)",
                  border: "0.5px solid rgba(240, 230, 140, 0.35)",
                  color: "#E8691A",
                  animation: "highlightShimmer 2.5s ease-in-out infinite",
                }}
              >
                {theme.hero.titleHighlight}
              </span>
            </>
          )}
        </h1>

        <div
          className="flex items-center justify-center gap-3 px-8 py-3 rounded-full mt-6 mb-2"
          style={{
            backgroundColor: "rgba(28, 20, 5, 0.40)",
            border: "0.5px solid rgba(240, 230, 140, 0.35)",
          }}
        >
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ animation: "colorPulse 1.5s ease-in-out infinite" }} />
          <span className="text-xs md:text-sm whitespace-nowrap" style={{ color: "#F5F4E8" }}>{theme.hero.tag}</span>
        </div>

        <div className="flex justify-center gap-3 mt-8">
          <Link
            href={theme.hero.cta.primary.href}
            className="px-6 py-3 rounded-full font-semibold transition-transform hover:scale-[1.02]"
            style={{
              background: `linear-gradient(to right, ${theme.colors.accent}, ${theme.colors.accent})`,
              color: "#FFFFFF",
            }}
          >
            {theme.hero.cta.primary.text}
          </Link>
          <Link
            href={theme.hero.cta.secondary.href}
            className="px-6 py-3 rounded-full font-semibold transition-all"
            style={{
              backgroundColor: "rgba(42, 37, 16, 0.50)",
              backdropFilter: "blur(8px)",
              border: "0.5px solid rgba(240, 230, 140, 0.40)",
              color: "#F5F4E8",
            }}
          >
            {theme.hero.cta.secondary.text}
          </Link>
        </div>
      </div>

      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3">
        {theme.hero.pills.map((pill, index) => {
          const IconComponent = iconMap[pill.icon] || iconMap.truck
          const pillContent = (
            <>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(42,37,16,0.25)" }}
              >
                <IconComponent size={16} color="#1a1508" />
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: "#2A2510" }}>{pill.title}</div>
                <div className="text-xs" style={{ color: "#4A4220" }}>{pill.subtitle}</div>
              </div>
            </>
          )
          const pillStyle = {
            backgroundColor: "rgba(203, 197, 138, 0.90)",
            backdropFilter: "blur(8px)",
            border: "0.5px solid rgba(203, 197, 138, 0.60)",
            animationDelay: `${index * 1}s`,
          }
          if (pill.icon === "userplus") {
            return (
              <button
                key={index}
                onClick={() => setStaffModalOpen(true)}
                className="flex items-center gap-3 px-4 py-3 rounded-full animate-[floatUp_3s_ease-in-out_infinite] cursor-pointer text-left"
                style={pillStyle}
              >
                {pillContent}
              </button>
            )
          }
          return (
            <Link
              href={(pill as any).href ?? "#services"}
              key={index}
              className="flex items-center gap-3 px-4 py-3 rounded-full animate-[floatUp_3s_ease-in-out_infinite] cursor-pointer"
              style={pillStyle}
            >
              {pillContent}
            </Link>
          )
        })}
      </div>

      <div className="absolute bottom-6 left-12 z-20 flex gap-2">
        {theme.hero.images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide ? "w-8 rounded-full" : "w-2 h-2 rounded-full"
            }`}
            style={{
              backgroundColor: index === currentSlide ? theme.colors.accent : theme.colors.border,
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {staffModalOpen && <StaffModal onClose={() => setStaffModalOpen(false)} />}

      <style jsx>{`
        @keyframes floatUp {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes colorPulse {
          0%, 100% { background-color: #F47920; box-shadow: 0 0 8px #F47920; }
          50% { background-color: #22c55e; box-shadow: 0 0 12px #22c55e; }
        }
        @keyframes textShimmer {
          0%, 100% { color: #E8691A; text-shadow: 0 0 8px rgba(232, 105, 26, 0.4); }
          50% { color: #2A2510; text-shadow: none; }
        }
        @keyframes highlightShimmer {
          0%, 100% { color: #E8691A; text-shadow: 0 0 8px rgba(232, 105, 26, 0.4); }
          50% { color: #FFFFFF; text-shadow: 0 0 8px rgba(255, 255, 255, 0.3); }
        }
      `}</style>
    </section>
  )
}
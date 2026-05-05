"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { theme } from "@/lib/theme"
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
}

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % theme.hero.images.length)
    }, theme.hero.slideInterval)
    return () => clearInterval(interval)
  }, [isPaused])

  return (
    <section
      className="relative h-screen overflow-hidden flex items-center justify-center"
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
              style={{
                filter: `blur(${theme.hero.blurAmount}) brightness(0.35)`,
              }}
            />
          </div>
        ))}
      </div>

      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
      />

      <div className="relative z-10 max-w-[680px] text-center px-4 md:px-12">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
          style={{
            backgroundColor: "rgba(255,255,255,0.08)",
            border: "0.5px solid rgba(255,255,255,0.2)",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-white">{theme.hero.tag}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          <span className="text-white">{theme.hero.title.split(theme.hero.titleHighlight)[0]}</span>
          <br />
          <span
            style={{ color: theme.colors.accent }}
          >
            {theme.hero.titleHighlight}
          </span>
        </h1>

        <p
          className="text-lg mt-4 max-w-lg mx-auto"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          {theme.hero.subtitle}
        </p>

        <div className="flex justify-center gap-3 mt-8">
          <Link
            href={theme.hero.cta.primary.href}
            className="px-6 py-3 rounded-full font-semibold transition-transform hover:scale-[1.02]"
            style={{
              background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})`,
              color: "#FFFFFF",
            }}
          >
            {theme.hero.cta.primary.text}
          </Link>
          <Link
            href={theme.hero.cta.secondary.href}
            className="px-6 py-3 rounded-full font-semibold transition-all"
            style={{
              backgroundColor: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(8px)",
              border: "0.5px solid rgba(255,255,255,0.2)",
              color: "#FFFFFF",
            }}
          >
            {theme.hero.cta.secondary.text}
          </Link>
        </div>
      </div>

      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3">
        {theme.hero.pills.map((pill, index) => {
          const IconComponent = iconMap[pill.icon] || iconMap.truck
          return (
            <div
              key={index}
              className="flex items-center gap-3 px-4 py-3 rounded-full animate-[floatUp_3s_ease-in-out_infinite]"
              style={{
                backgroundColor: "rgba(255,255,255,0.10)",
                backdropFilter: "blur(8px)",
                border: "0.5px solid rgba(255,255,255,0.2)",
                animationDelay: `${index * 1}s`,
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${pill.color}44` }}
              >
                <IconComponent size={16} color={pill.color} />
              </div>
              <div className="text-white">
                <div className="text-sm font-semibold">{pill.title}</div>
                <div className="text-xs text-white/60">{pill.subtitle}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="absolute bottom-6 left-12 z-20 flex gap-2">
        {theme.hero.images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide ? "w-8 rounded-full" : "w-2 h-2 rounded-full bg-white/30"
            }`}
            style={{
              backgroundColor: index === currentSlide ? theme.colors.accent : undefined,
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes floatUp {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  )
}
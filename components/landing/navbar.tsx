"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { theme } from "@/lib/theme"

const navItems = [
    { label: "Home", href: "/" },
    { label: "Servicios", href: "#services" },
    { label: "Proceso", href: "#process" },
    { label: "Trabajos", href: "/trabajos" },
  ]

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 20)

      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          setIsHidden(true)
        } else {
          setIsHidden(false)
        }
      } else {
        setIsHidden(false)
      }

      setLastScrollY(currentScrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 60) setIsHidden(false)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  

  return (
    <header
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 transition-transform duration-300"
      style={{ transform: isHidden ? "translateY(-120%)" : "translateY(0)" }}
      onMouseLeave={() => { if (window.scrollY > 200) setIsHidden(true) }}
    >
      <nav
        className="max-w-[1100px] w-full rounded-full transition-all duration-200"
        style={{
          backgroundColor: isScrolled ? "rgba(240, 230, 140, 0.45)" : "rgba(240, 230, 140, 0.28)",
          backdropFilter: isScrolled ? "blur(20px)" : "blur(14px)",
          border: "0.5px solid rgba(200, 185, 80, 0.45)",
          padding: "12px 28px",
        }}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div
              className="flex items-center justify-center"
              style={{
backgroundColor: "#FFFFFF",
                borderRadius: "9999px",
                padding: "16px",
                width: "96px",
                height: "96px",
              }}
            >
              <img
                src={theme.logo.path}
                alt="Tecnosur Group"
                width={72}
                height={58}
                className="w-full h-auto"
              />
            </div>
          </Link>

<div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group px-5 py-1 text-lg font-semibold relative rounded-full text-[#1C1C1E] hover:text-white bg-[rgba(255,255,255,0.35)] hover:bg-[#4A4440] transition-all duration-200"
                style={{
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "0.5px solid rgba(255, 255, 255, 0.50)",
                  width: "140px",
                  textAlign: "center",
                }}
              >
                <span className="relative inline-block">
                  <span className="relative z-10 transition-colors duration-200">{item.label}</span>
                  <span
                    className="absolute bottom-0 left-0 w-full h-0.5 scale-x-0 transition-transform duration-200 origin-left group-hover:scale-x-100"
                    style={{ backgroundColor: theme.colors.accent }}
                  />
                </span>
              </Link>
            ))}
          </div>

          <Link
            href={theme.navbar.cta.href}
            className="hidden md:flex items-center justify-center px-5 py-1 rounded-full font-semibold text-lg text-white bg-[#E8691A] hover:bg-[#4A4440] transition-all duration-200 hover:scale-[1.02]"
            style={{
              width: "140px",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            {theme.navbar.cta.text}
          </Link>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ color: theme.colors.dark }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div
            className="md:hidden mt-2 rounded-2xl p-4"
            style={{
              backgroundColor: "rgba(240, 230, 140, 0.92)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-4 py-3 rounded-lg"
                  style={{ color: theme.colors.dark }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={theme.navbar.cta.href}
                className="block text-center px-5 py-3 rounded-full font-semibold"
                style={{ backgroundColor: theme.colors.accent, color: "#FFFFFF" }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {theme.navbar.cta.text}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
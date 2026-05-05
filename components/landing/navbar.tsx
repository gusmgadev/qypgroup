"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { theme } from "@/lib/theme"

const navItems = ["Servicios", "Proceso", "Clientes", "Contacto"]

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

  const getHref = (item: string) => {
    if (item === "Servicios") return "#services"
    if (item === "Proceso") return "#process"
    if (item === "Clientes") return "#clientes"
    if (item === "Contacto") return "#contact"
    return "/"
  }

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 transition-transform duration-300" style={{ transform: isHidden ? "translateY(-120%)" : "translateY(0)" }}>
      <nav
        className="max-w-[1100px] w-full rounded-full transition-all duration-200"
        style={{
          backgroundColor: isScrolled ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)",
          backdropFilter: isScrolled ? "blur(16px)" : "blur(12px)",
          border: "0.5px solid rgba(255,255,255,0.15)",
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
            {navItems.map((item) => {
              const href = getHref(item)
              return (
                <Link
                  key={item}
                  href={href}
                  className="px-5 py-2 rounded-full text-base font-medium transition-colors duration-200 hover:text-white"
                  style={{ color: "rgba(255,255,255,0.70)" }}
                >
                  {item}
                </Link>
              )
            })}
          </div>

          <Link
            href={theme.navbar.cta.href}
            className="hidden md:block px-5 py-2 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-[1.02]"
            style={{
              backgroundColor: "#FFFFFF",
              color: theme.colors.dark,
            }}
          >
            {theme.navbar.cta.text}
          </Link>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ color: "#FFFFFF" }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div
            className="md:hidden mt-2 rounded-2xl p-4"
            style={{
              backgroundColor: "rgba(15,26,53,0.95)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const href = getHref(item)
                return (
                  <Link
                    key={item}
                    href={href}
                    className="text-white/70 hover:text-white px-4 py-3 rounded-lg hover:bg-white/10"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                )
              })}
              <Link
                href={theme.navbar.cta.href}
                className="mt-2 block text-center px-5 py-3 rounded-full font-semibold bg-white text-black"
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
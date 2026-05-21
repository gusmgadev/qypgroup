"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { LayoutGrid, PlusCircle, LogOut } from "lucide-react"
import { theme } from "../../lib/theme"

export default function DashboardSidebar() {
  const pathname = usePathname()

  const navItems = [
    { label: "Proyectos", href: "/dashboard", icon: LayoutGrid },
    { label: "Nuevo proyecto", href: "/dashboard/projects/new", icon: PlusCircle },
  ]

  return (
    <aside
      style={{
        width: theme.dashboard.sidebarWidth,
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        borderRight: `1px solid ${theme.colors.border}`,
        display: "flex",
        flexDirection: "column",
        padding: "0",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "24px 20px",
          borderBottom: `1px solid ${theme.colors.border}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Image
          src={theme.logo.path}
          alt="QYP Group"
          width={theme.logo.width}
          height={theme.logo.height}
          style={{ objectFit: "contain", width: "auto", height: "56px" }}
        />
      </div>

      {/* Volver a inicio */}
      <div style={{ padding: "12px 16px", borderBottom: `1px solid ${theme.colors.border}`, display: "flex", justifyContent: "center" }}>
        <Link
          href="/"
          className="back-home-btn"
          style={{
            display: "inline-block",
            padding: "5px 14px",
            backgroundColor: "rgba(255,255,255,0.35)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            color: "#1C1C1E",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textDecoration: "none",
            borderRadius: "99px",
            border: "0.5px solid rgba(255,255,255,0.50)",
            transition: "background-color 0.2s ease, color 0.2s ease",
            fontFamily: theme.fonts.primary,
          }}
        >
          ← Inicio
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {navItems.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                borderRadius: theme.radii.sm,
                marginBottom: "4px",
                backgroundColor: active ? "rgba(232,105,26,0.10)" : "transparent",
                color: active ? theme.colors.accent : theme.colors.textMuted,
                textDecoration: "none",
                fontSize: theme.fontSizes.sm,
                fontWeight: active ? theme.fontWeights.bold : theme.fontWeights.regular,
                transition: theme.transitions.fast,
                fontFamily: theme.fonts.primary,
              }}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: "16px 12px", borderTop: `1px solid ${theme.colors.border}` }}>
        <button
          onClick={() => signOut({ callbackUrl: "/auth/signin" })}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            padding: "10px 12px",
            borderRadius: theme.radii.sm,
            background: "none",
            border: "none",
            color: theme.colors.textMuted,
            fontSize: theme.fontSizes.sm,
            cursor: "pointer",
            fontFamily: theme.fonts.primary,
            transition: theme.transitions.fast,
          }}
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}

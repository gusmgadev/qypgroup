"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { signOut } from "next-auth/react"
import { LogOut, ChevronDown, ChevronRight, Briefcase, Users, ShieldCheck, Settings } from "lucide-react"
import { theme } from "../../lib/theme"

const adminItems = [
  { label: "Trabajos",                href: "/dashboard",          icon: Briefcase  },
  { label: "Contactos",               href: "/dashboard/contacts", icon: Users      },
  { label: "Usuarios y permisos",     href: "/dashboard/usuarios", icon: ShieldCheck },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [adminOpen, setAdminOpen] = useState(true)

  const isAdminActive = adminItems.some((i) => pathname === i.href || pathname.startsWith(i.href + "/"))

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
          style={{
            display: "inline-block",
            padding: "5px 14px",
            backgroundColor: theme.colors.background,
            color: theme.colors.textMuted,
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textDecoration: "none",
            borderRadius: "99px",
            border: `1px solid ${theme.colors.border}`,
            fontFamily: theme.fonts.primary,
          }}
        >
          ← Inicio
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>

        {/* Módulo Administración */}
        <button
          onClick={() => setAdminOpen((v) => !v)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: "8px 12px",
            borderRadius: theme.radii.sm,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: theme.fonts.primary,
            marginBottom: "2px",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Settings size={15} style={{ color: isAdminActive ? theme.colors.accent : theme.colors.textMuted }} />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: isAdminActive ? theme.colors.accent : theme.colors.textMuted,
              }}
            >
              Administración
            </span>
          </span>
          {adminOpen
            ? <ChevronDown size={14} style={{ color: theme.colors.textMuted }} />
            : <ChevronRight size={14} style={{ color: theme.colors.textMuted }} />
          }
        </button>

        {adminOpen && (
          <div style={{ paddingLeft: "10px", marginBottom: "8px" }}>
            {/* línea vertical izquierda */}
            <div
              style={{
                borderLeft: `2px solid ${theme.colors.border}`,
                paddingLeft: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
              }}
            >
              {adminItems.map((item) => {
                const Icon = item.icon
                const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                      padding: "9px 10px",
                      borderRadius: theme.radii.sm,
                      backgroundColor: active ? "rgba(232,105,26,0.10)" : "transparent",
                      color: active ? theme.colors.accent : theme.colors.textMuted,
                      textDecoration: "none",
                      fontSize: theme.fontSizes.sm,
                      fontWeight: active ? theme.fontWeights.bold : theme.fontWeights.regular,
                      transition: theme.transitions.fast,
                      fontFamily: theme.fonts.primary,
                    }}
                  >
                    <Icon size={15} />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
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

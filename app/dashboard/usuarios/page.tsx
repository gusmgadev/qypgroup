import { theme } from "@/lib/theme"
import { ShieldCheck } from "lucide-react"

export default function UsuariosPage() {
  return (
    <div style={{ padding: "32px 36px" }}>
      <div style={{ marginBottom: "28px" }}>
        <h1
          style={{
            color: theme.colors.dark,
            fontSize: theme.fontSizes.xl,
            fontWeight: theme.fontWeights.bold,
            margin: 0,
          }}
        >
          Usuarios y permisos
        </h1>
        <p style={{ color: theme.colors.textMuted, fontSize: theme.fontSizes.sm, margin: "4px 0 0" }}>
          Gestión de usuarios, roles y permisos de acceso
        </p>
      </div>

      <div
        style={{
          textAlign: "center",
          padding: "60px 20px",
          border: `1px dashed ${theme.colors.border}`,
          borderRadius: theme.radii.md,
          color: theme.colors.textMuted,
        }}
      >
        <ShieldCheck size={40} style={{ margin: "0 auto 16px", color: theme.colors.border }} />
        <p style={{ margin: 0, fontSize: theme.fontSizes.sm }}>Módulo en desarrollo</p>
      </div>
    </div>
  )
}

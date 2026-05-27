"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { theme } from "../../../lib/theme"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError("Email o contraseña incorrectos")
    } else {
      router.push(theme.auth.redirectAfterLogin)
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: theme.fonts.primary,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#FFFFFF",
          border: `1px solid ${theme.colors.border}`,
          borderRadius: theme.radii.lg,
          padding: "40px 36px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              backgroundColor: theme.colors.background,
              border: `1px solid ${theme.colors.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <Image
              src={theme.logo.path}
              alt="QYP Group"
              width={44}
              height={28}
              style={{ objectFit: "contain" }}
            />
          </div>
          <h1
            style={{
              color: theme.colors.dark,
              fontSize: theme.fontSizes.xl,
              fontWeight: theme.fontWeights.bold,
              margin: 0,
            }}
          >
            Dashboard
          </h1>
          <p
            style={{
              color: theme.colors.textMuted,
              fontSize: theme.fontSizes.sm,
              marginTop: "6px",
            }}
          >
            Ingresá con tu cuenta
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                color: theme.colors.text,
                fontSize: theme.fontSizes.sm,
                fontWeight: theme.fontWeights.medium,
                marginBottom: "6px",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              style={{
                width: "100%",
                padding: "10px 14px",
                background: "#FFFFFF",
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radii.sm,
                color: theme.colors.text,
                fontSize: theme.fontSizes.base,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                color: theme.colors.text,
                fontSize: theme.fontSizes.sm,
                fontWeight: theme.fontWeights.medium,
                marginBottom: "6px",
              }}
            >
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              style={{
                width: "100%",
                padding: "10px 14px",
                background: "#FFFFFF",
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radii.sm,
                color: theme.colors.text,
                fontSize: theme.fontSizes.base,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {error && (
            <p
              style={{
                color: theme.colors.error,
                fontSize: theme.fontSizes.sm,
                marginBottom: "16px",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: loading ? "rgba(232,105,26,0.50)" : theme.colors.accent,
              color: "#fff",
              border: "none",
              borderRadius: theme.radii.sm,
              fontSize: theme.fontSizes.base,
              fontWeight: theme.fontWeights.bold,
              cursor: loading ? "not-allowed" : "pointer",
              transition: theme.transitions.fast,
              fontFamily: theme.fonts.primary,
            }}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  )
}

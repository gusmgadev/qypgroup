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
        background: theme.colors.dark,
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
          backgroundColor: "rgba(250,250,245,0.05)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `1px solid rgba(203,197,138,0.20)`,
          borderRadius: theme.radii.lg,
          padding: "40px 36px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              backgroundColor: "#fff",
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
              color: theme.colors.secondary,
              fontSize: theme.fontSizes.xl,
              fontWeight: theme.fontWeights.bold,
              margin: 0,
            }}
          >
            Dashboard
          </h1>
          <p
            style={{
              color: "rgba(224,222,192,0.60)",
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
                color: theme.colors.secondary,
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
                background: "rgba(255,255,255,0.08)",
                border: `1px solid rgba(203,197,138,0.30)`,
                borderRadius: theme.radii.sm,
                color: "#fff",
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
                color: theme.colors.secondary,
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
                background: "rgba(255,255,255,0.08)",
                border: `1px solid rgba(203,197,138,0.30)`,
                borderRadius: theme.radii.sm,
                color: "#fff",
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

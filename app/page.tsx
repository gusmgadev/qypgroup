import Link from "next/link"
import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { Services } from "@/components/landing/services"
import { Contact } from "@/components/landing/contact"
import { Footer } from "@/components/landing/footer"
import { CenterScroll } from "@/components/landing/center-scroll"

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <CenterScroll />
      <Navbar />

      {/* Botón Login fijo arriba izquierda */}
      <Link
        href="/auth/signin"
        className="login-btn"
        style={{
          position: "fixed",
          left: "20px",
          top: "20px",
          zIndex: 60,
          padding: "8px 20px",
          backgroundColor: "rgba(255,255,255,0.35)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          color: "#1C1C1E",
          fontSize: "13px",
          fontWeight: 600,
          letterSpacing: "0.06em",
          textDecoration: "none",
          borderRadius: "99px",
          border: "0.5px solid rgba(255,255,255,0.50)",
          transition: "background-color 0.2s ease, color 0.2s ease",
        }}
      >
        Login
      </Link>

      <Hero />
      <Services />
      <Contact />
      <Footer />
    </main>
  )
}
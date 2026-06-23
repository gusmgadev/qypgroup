import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { theme } from "@/lib/theme"

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: "Términos y condiciones de uso del sitio web de QYP Group.",
  robots: { index: false, follow: false },
}

export default function TerminosPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: theme.colors.background }}>
      <Navbar />

      <section style={{ maxWidth: "800px", margin: "0 auto", padding: "160px 24px 80px" }}>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm mb-8"
          style={{ color: theme.colors.textMuted }}
        >
          ← Volver al inicio
        </Link>

        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: theme.colors.dark }}
        >
          Términos y Condiciones
        </h1>
        <p className="text-sm mb-10" style={{ color: theme.colors.textMuted }}>
          Última actualización: junio 2026
        </p>

        <div className="space-y-8" style={{ color: theme.colors.text, lineHeight: "1.8" }}>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: theme.colors.dark }}>
              1. Aceptación de los términos
            </h2>
            <p>
              Al acceder y utilizar el sitio web <strong>qypenterprisegroup.com</strong>, aceptás
              los presentes términos y condiciones. Si no estás de acuerdo con alguno de ellos,
              te pedimos que no utilices este sitio.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: theme.colors.dark }}>
              2. Sobre QYP Group
            </h2>
            <p>
              QYP Group (Q&amp;P Group) es una empresa argentina dedicada a la prestación de
              servicios industriales para los sectores de Oil &amp; Gas, Minería y Pesca, con sede
              en Rada Tilly, Chubut, Argentina.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: theme.colors.dark }}>
              3. Uso del sitio
            </h2>
            <p>Este sitio web tiene carácter informativo y comercial. Queda prohibido:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Utilizar el sitio con fines ilícitos o fraudulentos</li>
              <li>Reproducir o distribuir el contenido sin autorización escrita</li>
              <li>Intentar acceder a áreas restringidas del sistema</li>
              <li>Enviar comunicaciones no solicitadas a través del formulario de contacto</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: theme.colors.dark }}>
              4. Propiedad intelectual
            </h2>
            <p>
              Todo el contenido de este sitio (textos, imágenes, logotipos, diseño) es propiedad
              de QYP Group o de sus respectivos titulares. Su reproducción total o parcial sin
              autorización expresa está prohibida.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: theme.colors.dark }}>
              5. Información y presupuestos
            </h2>
            <p>
              La información publicada en este sitio es de carácter general y orientativo.
              Los presupuestos, plazos y condiciones específicas de cada servicio se acuerdan
              de forma individual con cada cliente. QYP Group no asume responsabilidad por
              decisiones tomadas exclusivamente en base al contenido de este sitio.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: theme.colors.dark }}>
              6. Limitación de responsabilidad
            </h2>
            <p>
              QYP Group no se responsabiliza por interrupciones del servicio, errores técnicos
              o daños derivados del uso del sitio web. Nos reservamos el derecho de modificar,
              suspender o discontinuar el sitio en cualquier momento sin previo aviso.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: theme.colors.dark }}>
              7. Ley aplicable
            </h2>
            <p>
              Estos términos se rigen por las leyes de la República Argentina. Cualquier
              controversia será sometida a los tribunales competentes de la provincia de Chubut.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: theme.colors.dark }}>
              8. Contacto
            </h2>
            <p>
              Para consultas relacionadas con estos términos, escribí a{" "}
              <a href={`mailto:${theme.contact.email}`} style={{ color: theme.colors.accent }}>
                {theme.contact.email}
              </a>.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}

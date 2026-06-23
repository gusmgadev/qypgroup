import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { theme } from "@/lib/theme"

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad de QYP Group. Información sobre el tratamiento de datos personales.",
  robots: { index: false, follow: false },
}

export default function PrivacidadPage() {
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
          Política de Privacidad
        </h1>
        <p className="text-sm mb-10" style={{ color: theme.colors.textMuted }}>
          Última actualización: junio 2026
        </p>

        <div className="space-y-8" style={{ color: theme.colors.text, lineHeight: "1.8" }}>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: theme.colors.dark }}>
              1. Responsable del tratamiento
            </h2>
            <p>
              <strong>QYP Group</strong> (Q&amp;P Group), con domicilio en Rada Tilly, Chubut, Argentina,
              es responsable del tratamiento de los datos personales recopilados a través de este sitio web
              (<strong>qypenterprisegroup.com</strong>).
            </p>
            <p className="mt-2">Contacto: <a href={`mailto:${theme.contact.email}`} style={{ color: theme.colors.accent }}>{theme.contact.email}</a></p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: theme.colors.dark }}>
              2. Datos que recopilamos
            </h2>
            <p>A través del formulario de contacto recopilamos únicamente:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Nombre y apellido</li>
              <li>Empresa (opcional)</li>
              <li>Correo electrónico</li>
              <li>Teléfono (opcional)</li>
              <li>Mensaje</li>
            </ul>
            <p className="mt-3">
              No recopilamos datos sensibles ni realizamos perfilado automatizado.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: theme.colors.dark }}>
              3. Finalidad del tratamiento
            </h2>
            <p>Los datos recopilados se utilizan exclusivamente para:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Responder consultas comerciales y técnicas</li>
              <li>Enviar información sobre nuestros servicios cuando fue solicitada</li>
            </ul>
            <p className="mt-3">No compartimos sus datos con terceros ni los utilizamos con fines publicitarios.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: theme.colors.dark }}>
              4. Conservación de datos
            </h2>
            <p>
              Los datos se conservan mientras sean necesarios para gestionar la relación comercial.
              Podés solicitar su eliminación en cualquier momento escribiéndonos a{" "}
              <a href={`mailto:${theme.contact.email}`} style={{ color: theme.colors.accent }}>{theme.contact.email}</a>.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: theme.colors.dark }}>
              5. Derechos del titular
            </h2>
            <p>De acuerdo con la Ley 25.326 de Protección de Datos Personales (Argentina), tenés derecho a:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Acceder a tus datos personales</li>
              <li>Rectificar datos incorrectos o incompletos</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Oponerte al tratamiento de tus datos</li>
            </ul>
            <p className="mt-3">
              Para ejercer cualquiera de estos derechos, escribí a{" "}
              <a href={`mailto:${theme.contact.email}`} style={{ color: theme.colors.accent }}>{theme.contact.email}</a>.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: theme.colors.dark }}>
              6. Cookies
            </h2>
            <p>
              Este sitio no utiliza cookies de seguimiento ni analítica de terceros.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: theme.colors.dark }}>
              7. Cambios en esta política
            </h2>
            <p>
              Nos reservamos el derecho de actualizar esta política. Cualquier cambio será publicado
              en esta misma página con la fecha de actualización.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}

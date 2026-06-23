import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { Services } from "@/components/landing/services"
import { Process } from "@/components/landing/process"
import { TrabajosSection } from "@/components/landing/trabajos"
import { Contact } from "@/components/landing/contact"
import { Footer } from "@/components/landing/footer"
import { CenterScroll } from "@/components/landing/center-scroll"
import { getVisibleProjects } from "@/lib/db/projects"

export const dynamic = "force-dynamic"

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.qypenterprisegroup.com/#organization",
      name: "QYP Group",
      legalName: "Q&P Group",
      url: "https://www.qypenterprisegroup.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.qypenterprisegroup.com/images/logos/logo.png",
        width: 160,
        height: 40,
      },
      description:
        "Empresa de servicios industriales para Oil & Gas, Minería y Pesca. Obras civiles e industriales, servicios de campo y rental de equipos en la Patagonia argentina.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Rada Tilly",
        addressRegion: "Chubut",
        addressCountry: "AR",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+54-297-401-4478",
          contactType: "customer service",
          availableLanguage: "Spanish",
        },
        {
          "@type": "ContactPoint",
          telephone: "+54-297-435-7772",
          contactType: "customer service",
          availableLanguage: "Spanish",
        },
      ],
      email: "info@qypenterprisegroup.com",
      sameAs: [
        "https://instagram.com/qypgroup",
        "https://linkedin.com/company/qypgroup",
      ],
      areaServed: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: -45.9179,
          longitude: -67.548,
        },
        geoRadius: "500000",
      },
      knowsAbout: [
        "Oil & Gas",
        "Minería",
        "Obras civiles industriales",
        "Rental de equipos",
        "Servicios petroleros",
        "Construcción de locaciones",
        "Gasoductos y oleoductos",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.qypenterprisegroup.com/#website",
      url: "https://www.qypenterprisegroup.com",
      name: "QYP Group",
      description: "Obras, Servicios y Rental para Oil & Gas y Minería",
      publisher: { "@id": "https://www.qypenterprisegroup.com/#organization" },
      inLanguage: "es-AR",
    },
    {
      "@type": "WebPage",
      "@id": "https://www.qypenterprisegroup.com/#webpage",
      url: "https://www.qypenterprisegroup.com",
      name: "QYP Group | Obras, Servicios y Rental — Oil & Gas y Minería",
      isPartOf: { "@id": "https://www.qypenterprisegroup.com/#website" },
      about: { "@id": "https://www.qypenterprisegroup.com/#organization" },
      description:
        "Proveemos soluciones para las necesidades de la industria petrolera, minera y gasífera. Obras civiles, servicios de campo y rental de equipos en la Patagonia.",
      inLanguage: "es-AR",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: "https://www.qypenterprisegroup.com",
          },
        ],
      },
    },
    {
      "@type": "Service",
      name: "Obras y Montajes Industriales",
      provider: { "@id": "https://www.qypenterprisegroup.com/#organization" },
      description:
        "Construcción de locaciones, piletas de contención, gasoductos, oleoductos, estructuras metálicas y obras civiles en yacimientos petroleros y mineros.",
      areaServed: "Patagonia, Argentina",
      serviceType: "Construcción Industrial",
    },
    {
      "@type": "Service",
      name: "Servicios de Campo para Oil & Gas",
      provider: { "@id": "https://www.qypenterprisegroup.com/#organization" },
      description:
        "Mantenimiento de caminos, movimiento de suelo, soldaduras, abastecimiento a locaciones remotas, remediación de tierras y provisión de infraestructura transitoria.",
      areaServed: "Patagonia, Argentina",
      serviceType: "Servicios Industriales",
    },
    {
      "@type": "Service",
      name: "Rental de Equipos y Maquinaria",
      provider: { "@id": "https://www.qypenterprisegroup.com/#organization" },
      description:
        "Alquiler de camionetas 4x4, camiones, maquinaria vial, contenedores y vehículos especiales para operaciones en yacimientos petroleros y mineros.",
      areaServed: "Patagonia, Argentina",
      serviceType: "Alquiler de Equipos",
    },
  ],
}

export default async function Home() {
  const projects = await getVisibleProjects().catch(() => [])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-black">
        <CenterScroll />
        <Navbar />
        <Hero />
        <Services />
        <Process />
        <TrabajosSection projects={projects} />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
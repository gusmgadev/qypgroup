import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://www.qypenterprisegroup.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "QYP Group | Obras, Servicios y Rental — Oil & Gas, Minería, Pesca",
    template: "%s | QYP Group",
  },
  description:
    "QYP Group provee soluciones integrales para la industria petrolera, minera y gasífera: obras civiles e industriales, servicios de campo, rental de equipos y maquinaria. Comodoro Rivadavia, Chubut, Argentina.",

  keywords: [
    "Oil Gas Argentina",
    "empresa servicios petroleros Chubut",
    "obras civiles industriales Patagonia",
    "rental equipos Oil Gas",
    "servicios minería Argentina",
    "construcción locaciones petroleras",
    "gasoductos oleoductos Chubut",
    "maquinaria vial Patagonia",
    "contratista Oil Gas Comodoro Rivadavia",
    "servicios industriales Rada Tilly",
    "QYP Group",
    "obras montajes industriales",
    "rental camionetas 4x4 Patagonia",
    "remediación de tierras",
    "estructuras metálicas industriales",
  ],

  authors: [{ name: "QYP Group", url: siteUrl }],
  creator: "QYP Group",
  publisher: "QYP Group",

  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: "QYP Group",
    title: "QYP Group | Obras, Servicios y Rental — Oil & Gas y Minería",
    description:
      "Proveemos soluciones para las necesidades de la industria petrolera, minera y gasífera. Obras civiles, servicios de campo y rental de equipos en la Patagonia argentina.",
    images: [
      {
        // Reemplazar por una imagen 1200x630 diseñada para redes sociales cuando esté lista
        url: "/images/hero/hero-1.jpg",
        width: 1200,
        height: 630,
        alt: "QYP Group — Servicios para Oil & Gas y Minería en Patagonia",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "QYP Group | Obras, Servicios y Rental — Oil & Gas y Minería",
    description:
      "Soluciones integrales para la industria petrolera, minera y gasífera en la Patagonia. Obras, servicios de campo y rental de equipos.",
    images: ["/images/hero/hero-1.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: siteUrl,
  },

  // Agregar favicon.ico y apple-touch-icon.png en /public cuando estén disponibles
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  verification: {
    // google: "TU_CODIGO_DE_VERIFICACION_GOOGLE",  // agregar cuando se verifique en Google Search Console
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

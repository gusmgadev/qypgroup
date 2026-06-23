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
    default: "QYP Group | Obras, Servicios y Rental — Oil & Gas",
    template: "%s | QYP Group",
  },
  description:
    "Empresa de servicios para Oil & Gas y Minería en la Patagonia. Obras civiles, servicios de campo y rental de equipos. Rada Tilly, Chubut, Argentina.",

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
      "Obras civiles, servicios de campo y rental de equipos para Oil & Gas y Minería en Patagonia. Contactanos sin compromiso.",
    images: [
      {
        url: "/images/logos/og-logo.png",
        width: 1659,
        height: 948,
        alt: "QYP Group — Servicios para Oil & Gas y Minería en Patagonia",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "QYP Group | Obras, Servicios y Rental — Oil & Gas y Minería",
    description:
      "Soluciones integrales para la industria petrolera, minera y gasífera en la Patagonia. Obras, servicios de campo y rental de equipos.",
    images: ["/images/logos/og-logo.png"],
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

  icons: {
    icon: [
      { url: "/images/logos/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/logos/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/logos/logo.ico",           type: "image/x-icon" },
    ],
    shortcut: "/images/logos/logo.ico",
    apple:    "/images/logos/apple-touch-icon.png",
    other: [
      { rel: "android-chrome", url: "/images/logos/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "android-chrome", url: "/images/logos/android-chrome-512x512.png", sizes: "512x512" },
    ],
  },

  verification: {
    google: "L2BxVUOE-jzEWbfEmr1R59LBwqSYMf672aQHkPG05mg",
  },

  other: {
    "geo.region":      "AR-U",
    "geo.placename":   "Rada Tilly, Chubut, Argentina",
    "geo.position":    "-45.9179;-67.5481",
    "ICBM":            "-45.9179, -67.5481",
    "theme-color":     "#2A2510",
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

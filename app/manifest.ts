import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "QYP Group — Oil & Gas y Minería",
    short_name: "QYP Group",
    description: "Obras, Servicios y Rental para la industria petrolera, minera y gasífera en la Patagonia.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF5",
    theme_color: "#2A2510",
    icons: [
      { src: "/images/logos/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/images/logos/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  }
}

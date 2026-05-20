// ─────────────────────────────────────────────────────────────────────────────
// lib/theme.ts — Sistema de Diseño Base — Tecnosur Group
// Todos los componentes importan desde acá — un cambio acá cambia todo.
// ─────────────────────────────────────────────────────────────────────────────

export const theme = {

  // ── COLORES ────────────────────────────────────────────────────────────────
  colors: {
    primary:    "#cbc58a",   // caqui — solo badges/detalles (no fondo general)
    secondary:  "#e0dec0",   // caqui muy claro — secciones alternadas y cards
    accent:     "#E8691A",   // naranja rico (CTA, highlights)
    background: "#FAFAF5",   // fondo general caqui casi blanco
    dark:       "#2A2510",   // caqui muy oscuro warm (navbar, footer CTA band)
    text:       "#1C1C1E",   // texto principal (gris oscuro)
    textMuted:  "#6B6642",   // texto secundario warm
    border:     "#D8D49A",   // bordes warm visibles
    success:    "#1D9E75",   // mensajes de éxito
    error:      "#E24B4A",   // mensajes de error
    warning:    "#EF9F27",   // mensajes de advertencia
  },


  // ── TIPOGRAFÍA ─────────────────────────────────────────────────────────────
  fonts: {
    primary:   "Nunito Sans, sans-serif",  // títulos
    secondary: "Nunito Sans, sans-serif",  // cuerpo
  },

  fontSizes: {
    xs:   "11px",
    sm:   "13px",
    base: "16px",
    lg:   "20px",
    xl:   "28px",
    xxl:  "40px",
  },

  fontWeights: {
    regular: 400,
    medium:  500,
    bold:    700,
  },

  // ── ESPACIADO ──────────────────────────────────────────────────────────────
  spacing: {
    xs:  "4px",
    sm:  "8px",
    md:  "16px",
    lg:  "24px",
    xl:  "48px",
    xxl: "80px",
  },

  // ── BORDES ─────────────────────────────────────────────────────────────────
  radii: {
    sm:   "6px",
    md:   "12px",
    lg:   "20px",
    full: "99px",
  },

  // ── SOMBRAS ────────────────────────────────────────────────────────────────
  shadows: {
    sm:  "0 1px 3px rgba(0,0,0,0.08)",
    md:  "0 4px 12px rgba(0,0,0,0.10)",
    nav: "0 2px 8px rgba(0,0,0,0.06)",
  },

  // ── TRANSICIONES ───────────────────────────────────────────────────────────
  transitions: {
    fast:   "0.15s ease",
    normal: "0.25s ease",
    slow:   "0.40s ease",
  },

  // ── BREAKPOINTS ────────────────────────────────────────────────────────────
  breakpoints: {
    mobile:  "640px",
    tablet:  "768px",
    desktop: "1024px",
  },

  // ── NAVBAR ─────────────────────────────────────────────────────────────────
  navbar: {
    height:       "90px",
    heightMobile: "70px",
    cta: {
      text: "Contactanos",
      href: "#contact",
    },
  },

  // ── HERO ───────────────────────────────────────────────────────────────────
  hero: {
    height:          "100vh",
    heightMobile:    "90vh",
    overlayOpacity:  0.75,
    blurAmount:      "0px",
    slideInterval:   3000,
    slideTransition: "1.2s",

    tag:            "SOLUCIONES PARA LA INDUSTRIA DE LA EXPLOTACIÓN, OIL&GAS, MINERIÍA",
    title:          "Obras y Servicios",
    titleHighlight: "Oil &Gas Minería Rental",
    subtitle:       "Proveemos soluciones para las necesidades de la industria petrolera, minera y gasifera", 

    cta: {
      primary:   { text: "Ver Servicios", href: "#services" },
      secondary: { text: "Contactanos",   href: "#contact"  },
    },

    images: [
      "/images/hero/fondo hero.jpg",
      "/images/hero/hero-1.jpg",
      "/images/hero/hero-2.jpg",
      "/images/hero/hero-3.jpg",
      "/images/hero/hero-4.jpg",
      "/images/hero/hero-5.jpg",
    ],

    pills: [
      { title: "Alianzas estratégicas", subtitle: "Sumate a nuestro equipo", color: "#E8691A", icon: "handshake" },
      { title: "Sumate al staff", subtitle: "Envianos tu CV", color: "#1C1C1E", icon: "userplus" },
      
    ],
services: [
      {
        title: "Obras",
        description: "Realizamos la construccion de estructuras de pequeño, mediano y gran porte.",
        icon: "truck",
        image: "/images/servicios/obras.jpg",
        details: [
          "Construccion de fosas de anclaje y testeo",
          "Construccion de piletas para contencion",
          "Cercos perimetrales",
          "Limpieza de Locaciones"
        ]
      },
      {
        title: "Servicios",
        description: "Un equipo de especialistas le ofrece la mas avanzada tecnología y calidad.",
        icon: "wrench",
        image: "/images/servicios/servicios.jpg",
        details: [
          "Mantenimiento y reparacion de equipos",
          "Sistemas integrales de control, calibracion y programacion",
          "Sensores de locación"
        ]
      },
      {
        title: "Rental",
        description: "Contamos con equipos especializados para alquiler, listos para operar.",
        icon: "package",
        image: "/images/servicios/rental.jpg",
        details: [
          "Equipos porta-contenedores",
          "Contenedores modulares",
          "Maquinaria pesada",
          "Vehículos utilitarios"
        ]
      },
    ],
  },

  // ── FOOTER ─────────────────────────────────────────────────────────────────
  footer: {
    description: "Proveemos soluciones para las necesidades de la industria petrolera, minera y gasifera", 
    copyright:   "Q&P Group 2026",

    social: {
      facebook:  "",  // sin Facebook por ahora — dejar vacío o completar si se crea
      instagram: "https://instagram.com/qypgroup",
      linkedin:  "https://linkedin.com/company/qypgroup",
    },

    maps: {
      // PENDIENTE: ir a maps.google.com → buscar la dirección → Compartir → Insertar un mapa → copiar el src del iframe
      embedUrl: "https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d2775.6681423673385!2d-67.5480833!3d-45.9179444!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1778010551049!5m2!1ses!2sar",
      height:   "120px",
    },

    legal: {
      privacy: "/privacidad",
      terms:   "/terminos",
    },

services: [
      { label: "Obras",     href: "#services" },
      { label: "Servicios", href: "#services" },
      { label: "Rental",    href: "#services" },
    ],

    nav: [
      { label: "Home",    href: "/" },
      { label: "Servicios", href: "#services" },
      { label: "Proceso",   href: "#process" },
      { label: "Trabajos",  href: "#trabajos" },
    ],
  },

  // ── CONTACTO ───────────────────────────────────────────────────────────────
  contact: {
    phone:    "+54 2974137806",
    email:    "qypgroup@gmail.com",
    whatsapp: "5492974137806",          // sin + ni espacios — formato para wa.me/
    address:  "Rada Tilly, Chubut, Argentina",
  },

  // ── LOGO ───────────────────────────────────────────────────────────────────
  logo: {
    path:      "/images/logos/logo.png",       // logo sobre fondos claros
    pathWhite: "/images/logos/logo-white.png", // logo sobre fondos oscuros
    width:  160,
    height:  40,
  },

  // ── AUTH ───────────────────────────────────────────────────────────────────
  auth: {
    logo: {
      width:  120,
      height:  32,
    },
    redirectAfterLogin:    "/dashboard",
    redirectAfterLogout:   "/auth/signin",
    redirectAfterRegister: "/auth/signin",
  },

  // ── DASHBOARD ──────────────────────────────────────────────────────────────
  dashboard: {
    sidebarWidth:          "240px",
    sidebarWidthCollapsed: "64px",
    headerHeight:          "60px",
  },

} as const

// ─────────────────────────────────────────────────────────────────────────────
// Tipos exportados
// ─────────────────────────────────────────────────────────────────────────────

export type Theme = typeof theme
export type ThemeColors = typeof theme.colors

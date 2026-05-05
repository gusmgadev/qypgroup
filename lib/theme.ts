// ─────────────────────────────────────────────────────────────────────────────
// lib/theme.ts — Sistema de Diseño Base — Tecnosur Group
// Todos los componentes importan desde acá — un cambio acá cambia todo.
// ─────────────────────────────────────────────────────────────────────────────

export const theme = {

  // ── COLORES ────────────────────────────────────────────────────────────────
  colors: {
    primary:    "#0F0F10",   // negro base (fondo dominante)
    secondary:  "#1C1C1E",   // gris oscuro (cards, bloques)
    accent:     "#F47920",   // naranja del logo Q&P (CTA, highlights)
    background: "#0F0F10",   // fondo general
    dark:       "#000000",   // negro puro (navbar / contrastes)
    text:       "#FFFFFF",   // texto principal
    textMuted:  "#A0A0A0",   // texto secundario
    border:     "#2A2A2A",   // bordes sutiles dark mode
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
    blurAmount:      "4px",
    slideInterval:   3000,
    slideTransition: "1s",

    tag:            "INDUSTRIA PETROLERA, MINERA , GASIFERA Y PESQUERA",
    title:          "Obras civiles e industriales",
    titleHighlight: "Petroleo",
    subtitle:       "Proveemos soluciones llave en mano, para las necesidades de la industria petrolera, minera, gasifera y pesquera de la region", 

    cta: {
      primary:   { text: "Ver Servicios", href: "#services" },
      secondary: { text: "Contactanos",   href: "#contact"  },
    },

    images: [
      "/images/hero/hero-1.jpg",
      "/images/hero/hero-2.jpg",
      "/images/hero/hero-3.jpg",
    ],

    pills: [
      { title: "Construcción fosas de anclaje", subtitle: "Anclas contraviento, tanques aereos", color: "#F47920", icon: "truck" },
      { title: "Constucción de Piletas", subtitle: "Contención de derrames", color: "#0F0F10", icon: "package" },
      { title: "Cercos ", subtitle: "Perimetrales", color: "#1D9E75", icon: "wrench" },
    ],
services: [
      { 
        title: "División de obras y servicios", 
        description: "Realizamos la construccion , desde el proyecto hasta el finde obra, de estructura de pequeño , mediano y gran porte. ", 
        icon: "truck",
        details: [
          "Construccion de fosas de anclaje y testeo de: Anclas contraviento, Tanques aereos de almacenamiento de hidrocarburos y sus derivados bajo normas API 650 Y 620",
          "Construccion de piletas para contencion de derrames",
          "Cercos perimetrales",
          "Limpieza de Locaciones con certificado de deposicón final",
          "Equipos porta-contenedores y contenedores"
        ]
      },
      { 
        title: "Division I+D+I", 
        description: "Un equipo de especialistas le ofrece la mas avanzada tecnología y calidad", 
        icon: "package",
        details: [
          "Mantenimiento y reparacion de equipos: Manometros, registradores de presion diferencia y temperatura, separadores, controladores de neumaticos. Sistemas integrales de control, calibracion y programacion",
          "Sensores de locación: Peso de las herramientas, Torque de mesa, R.P.M, Presión de bomba, Avance de trepano y nivel de pileta"
        ]
      },
    ],
  },

  // ── FOOTER ─────────────────────────────────────────────────────────────────
  footer: {
    description: "Proveemos soluciones llave en mano, para las necesidades de la industria petrolera, minera, gasifera y pesquera de la region", 
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
      { label: "División obras y servicios", href: "#services" },
      { label: "Mantenimiento y reparación", href: "#services" },
    ],

    nav: [
      { label: "Inicio",    href: "/" },
      { label: "Servicios", href: "#services" },
      { label: "Clientes",  href: "#clientes" },
      { label: "Proceso",   href: "#process" },
      { label: "Contacto",  href: "#contact" },
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

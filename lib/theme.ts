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
      text: "Login",
      href: "/auth/signin",
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
    title:          "Obras, Servicios y Rental",
    titleHighlight: "Oil &Gas Minería",
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
      
    ],

    pills: [
      { title: "Escribinos", subtitle: "Te asesoramos sin compromiso", color: "#E8691A", icon: "handshake", href: "#contact" },
      { title: "Sumate al staff", subtitle: "Envianos tu CV", color: "#1C1C1E", icon: "userplus", href: "#services" },
    ],
services: [
      {
        title: "Obras y montajes",
        description: "Ejecutamos obras civiles e industriales de principio a fin: locaciones, piletas para contención, cercos, gasoductos, oleoductos, acueductos, estructuras metálicas, estaciones compresoras, válvulas de corte y estaciones distribuidoras.",
        icon: "truck",
        image: "/images/servicios/obras.jpg",
        details: [
          "Construccion de locaciones",
          "Construccion de piletas para contencion de derrames",
          "Provision y armado de Naves - Gaplones - Tinglados - Techos - Estructuras Metálicas",
          "  * (Con set de planos y memoria de cálculo)",
          "Cercos perimetrales",
          "Gasoductos , oleoductos y acueductos",
          "Estaciones compresoras",
          "Valvulas de corte en gasoductos",
          "Estaciones distribuidras",
          "Obras civiles"
        ]
      },
      {
        title: "Servicios",
        description: "Brindamos soporte operativo integral en locaciones: mantenimiento de caminos y movimiento de suelo, soldaduras, abastecimiento de insumos a destinos remotos, remediación de tierras y provisión de infraestructura transitoria (obradores, pañoles, contenedores y volquetes).",
        icon: "wrench",
        image: "/images/servicios/servicios.jpg",
        details: [
          "Mantenimiento de caminos",
          "Movimiento de suelo",
          "Abastecimiento de insumos generales a locaciones remotas",
          "Soldaduras en general",
          "Remediación de tierras para deposición final",
          "Povisión de obradores y pañoles",
          "Provisión de container de 20 y 40 pies",
          "Provisión de volquetes de limpieza"
        ]
      },
      {
        title: "Rental",
        description: "Contamos con una flota completa lista para operar: automóviles, camionetas 4x4, camiones (chupe, volcadores, porta contenedores), camiones tractores con semiplayo, tanque y tolva, maquinaria vial, vehículos especiales y contenedores de 6 y 12 metros.",
        icon: "package",
        image: "/images/servicios/rental.jpg",
        details: [
          "Automoviles",
          "Camionetas 4x4",
          "Camiones",
          " * Chupe",
          " * Porta Contenedores",
          " * Volcadores",
          " * ",
          "Camiones Tractores",
          " * Carretones",
          " * Sempiplayo",
          " * Tanque",
          " * Volcadores",
          " * Tolva",
          "Maquinas Viales",
          "Vehiculos Especiales",
          "Contenedores",
          " * 6 mts",
          " * 12 mts",
          " * 12 mts HC",

        ]
      },
    ],
  },

  // ── SERVICIOS SECTION ──────────────────────────────────────────────────────
  services: {
    banner: {
      eyebrow:     "SERVICIOS",
      title:       "Soluciones para la industria de la explotación, Oil&Gas y Minería",
      description: "Acompañamos cada etapa de tu proyecto con equipos propios, personal capacitado y experiencia comprobada en la industria petrolera, minera y gasífera.",
      image:       "/images/hero/hero-5.jpg",
    },
    features: [
      { icon: "Shield", label: "Seguridad ante todo" },
      { icon: "Users",  label: "Equipo profesional y capacitado" },
      { icon: "Clock",  label: "Cumplimos tiempos, entregamos resultados" },
    ],
    stats: [
      { icon: "Award",  line1: "Experiencia",     line2: "Comprobada" },
      { icon: "Wrench", line1: "Equipos propios", line2: "y tecnología" },
      { icon: "Star",   line1: "Compromiso con",  line2: "la calidad" },
      { icon: "MapPin", line1: "Cobertura en",    line2: "múltiples regiones" },
    ],
  },

  // ── PROCESO ────────────────────────────────────────────────────────────────
  process: {
    banner: {
      eyebrow:     "PROCESO",
      title:       "Nuestro proceso de trabajo",
      description: "Cada proyecto sigue una metodología clara: relevamiento, propuesta técnica, ejecución y seguimiento post-obra.",
      image:       "/images/hero/hero-1.jpg",
      imageRight:  "/images/hero/hero-3.jpg",
    },
    features: [
      { icon: "Search",   label: "Relevamiento en campo" },
      { icon: "FileText", label: "Propuesta técnica" },
      { icon: "Zap",      label: "Ejecución eficiente" },
    ],
    stats: [
      { icon: "Award",  line1: "Experiencia",     line2: "Comprobada" },
      { icon: "Wrench", line1: "Equipos propios", line2: "y tecnología" },
      { icon: "Star",   line1: "Compromiso con",  line2: "la calidad" },
      { icon: "MapPin", line1: "Cobertura en",    line2: "múltiples regiones" },
    ],
    steps: [
      {
        number: "01",
        title: "Relevamiento",
        description: "Visitamos la locación, evaluamos condiciones de terreno, acceso y requerimientos operativos para definir el alcance del trabajo.",
      },
      {
        number: "02",
        title: "Propuesta Técnica",
        description: "Elaboramos un plan detallado con especificaciones técnicas, cronograma de ejecución y presupuesto ajustado a tu operación.",
      },
      {
        number: "03",
        title: "Ejecución",
        description: "Desplegamos equipos y personal propio, cumpliendo normativas de seguridad y manteniendo comunicación permanente con el cliente.",
      },
      {
        number: "04",
        title: "Entrega y Seguimiento",
        description: "Hacemos entrega formal con documentación completa y brindamos soporte post-obra para garantizar la continuidad operativa.",
      },
    ],
  },

  // ── TRABAJOS ───────────────────────────────────────────────────────────────
  trabajos: {
    banner: {
      eyebrow:     "TRABAJOS",
      title:       "Proyectos realizados en la industria",
      description: "Conocé los trabajos que realizamos en el sector petrolero, minero y gasífero de la región.",
      image:       "/images/hero/hero-4.jpg",
      imageRight:  "/images/servicios/servicios.jpg",
    },
    features: [
      { icon: "Shield",   label: "Trabajos certificados" },
      { icon: "Folder",   label: "Documentación completa" },
      { icon: "MapPin",   label: "En toda la región" },
    ],
    stats: [
      { icon: "Award",  line1: "Experiencia",     line2: "Comprobada" },
      { icon: "Wrench", line1: "Equipos propios", line2: "y tecnología" },
      { icon: "Star",   line1: "Compromiso con",  line2: "la calidad" },
      { icon: "MapPin", line1: "Cobertura en",    line2: "múltiples regiones" },
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
      { label: "Obras y montajes", href: "#services" },
      { label: "Servicios", href: "#services" },
      { label: "Rental",    href: "#services" },
    ],

    nav: [
      { label: "Home",    href: "/" },
      { label: "Servicios", href: "#services" },
      { label: "Proceso",   href: "#process" },
      { label: "Trabajos",  href: "/trabajos" },
    ],
  },

  // ── CONTACTO ───────────────────────────────────────────────────────────────
  contact: {
    banner: {
      eyebrow:     "CONTACTO",
      title:       "Hablemos de tu proyecto",
      description: "Escribinos y te respondemos a la brevedad. Estamos para ayudarte.",
      image:       "/images/contacto/contacto.jpg",
      imageRight:  "/images/hero/hero-2.jpg",
    },
    features: [
      { icon: "MessageCircle", label: "Respuesta rápida" },
      { icon: "Phone",         label: "Atención personalizada" },
      { icon: "MapPin",        label: "Rada Tilly, Chubut" },
    ],
    stats: [
      { icon: "Award",  line1: "Experiencia",     line2: "Comprobada" },
      { icon: "Wrench", line1: "Equipos propios", line2: "y tecnología" },
      { icon: "Star",   line1: "Compromiso con",  line2: "la calidad" },
      { icon: "MapPin", line1: "Cobertura en",    line2: "múltiples regiones" },
    ],
    phone:    "54 297 439-5832",
    email:    "info@qypenterprisegroup.com",
    whatsapp: "54 297 439-5832",          // sin + ni espacios — formato para wa.me/
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

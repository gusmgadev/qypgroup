# CONTEXT.md — QYP Group

> **Cómo usar este archivo:**
> 1. Al iniciar cada chat con la IA, adjuntar este archivo junto con `lib/theme.ts`
> 2. Al terminar cada sesión, actualizar "Funcionalidades implementadas" y "Pendientes"

> **Regla fundamental:** Los valores de colores, tipografía, textos, logos,
> contacto y navegación NO se escriben aquí — todos viven en `lib/theme.ts`.
> Este archivo describe el proyecto. `theme.ts` describe el diseño y los datos.

---

## Descripción general

- **Proyecto:** QYP Group
- **Rubro:** Servicios industriales — Oil & Gas, Minería, Pesca
- **Objetivo:** Landing page para empresa de servicios industriales
- **URL producción:** https://qypgroup.vercel.app
- **Estado:** Etapa 1 - Landing completa con diseño Refined Khaki

---

## Fuente de verdad del diseño y datos

**Todos los valores visuales y de contenido están en `lib/theme.ts`.**
Antes de crear o modificar cualquier componente, adjuntar ese archivo.

| Qué necesitás saber            | Dónde está en theme.ts                            |
|-------------------------------|---------------------------------------------------|
| Colores de la marca            | `theme.colors.*`                                  |
| Tipografía y tamaños           | `theme.fonts.*` / `theme.fontSizes.*`             |
| Logo (claro y blanco)          | `theme.logo.*`                                    |
| Datos de contacto              | `theme.contact.*`                                 |
| Textos del Hero                | `theme.hero.*`                                    |
| Navegación y CTA del navbar    | `theme.navbar.*`                                  |
| Descripción, redes, mapa       | `theme.footer.*`                                  |
| Servicios (3 cards)            | `theme.hero.services.*` (Obras, Servicios, Rental)|
| Pills del hero                 | `theme.hero.pills.*`                              |
| Espaciado, radios, sombras     | `theme.spacing.*` / `theme.radii.*` / `theme.shadows.*` |

**Nunca hardcodear colores, fuentes ni textos en los componentes.**
Siempre importar: `import { theme } from '@/lib/theme'`

---

## Stack tecnológico

- **Framework:** Next.js con App Router
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4 (sin tailwind.config.js — usa `@theme inline` en globals.css)
- **Animaciones:** CSS keyframes via `<style jsx>` dentro de cada componente
- **Iconos:** Lucide React + SVGs inline
- **Formularios:** Implementado (sin backend aún)
- **Deploy:** Vercel

---

## Estructura de carpetas

```
qypgroup/
├── app/
│   └── page.tsx                   # Landing principal
│
├── components/
│   └── landing/
│       ├── navbar.tsx             # Glassmorphism caqui flotante
│       ├── hero.tsx               # Carrusel fullscreen centrado
│       ├── services.tsx           # Cards estilo Halliburton con foto de fondo
│       ├── contact.tsx            # Foto de fondo + formulario
│       ├── footer.tsx             # Banda CTA naranja + footer glassmorphism
│       └── center-scroll.tsx      # (vacío — scroll controlado con CSS)
│
├── lib/
│   └── theme.ts                   # ← FUENTE DE VERDAD
│
├── context/
│   └── CONTEXT.md                 # Este archivo
│
└── public/
    └── images/
        ├── logos/                 # logo.png, logo-white.png
        ├── hero/                  # fondo hero.jpg, hero-1.jpg … hero-5.jpg
        ├── servicios/             # obras.jpg, servicios.jpg, rental.jpg
        └── contacto/              # contacto.jpg
```

---

## Estado actual de cada componente

### Navbar (`navbar.tsx`)
- Glassmorphism caqui: `rgba(240,230,140,0.28–0.45)` + `blur(14–20px)`
- Logo sobre círculo blanco (96×96px), links gris oscuro con subrayado naranja en hover
- Se oculta al hacer scroll hacia abajo (después de 100px)
- Reaparece al hacer scroll hacia arriba O al acercar el mouse al borde superior (< 60px)
- Se oculta al salir el mouse del navbar si se está scrolleado > 200px
- Menú: Home · Servicios · Proceso · Trabajos + botón CTA naranja "Contactanos"

### Hero (`hero.tsx`)
- Carrusel automático: 6 imágenes, intervalo 3s, transición 1.2s, se pausa al hover
- Overlay oscuro warm `rgba(28,20,5,0.38)` + brightness 0.9 en imágenes
- Título blanco + titleHighlight naranja con animación `textShimmer` (naranja → #2A2510)
- Tag badge con dot animado (naranja → verde, animación `colorPulse`)
- Pills flotantes a la derecha (solo desktop) con animación `floatUp`
- CTAs: "Ver Servicios" (naranja) + "Contactanos" (glassmorphism oscuro)
- Dots de navegación en la parte inferior izquierda

### Servicios (`services.tsx`)
- Fondo: `hero-5.jpg` desenfocada (blur 8px, brightness 0.85) + overlay caqui 0.30
- Cards estilo Halliburton: bordes rectos con vértices naranja (14×14px), `borderRadius: 20px`
- Sombra 3D: `6px 10px 0px rgba(0,0,0,0.85)`
- Imagen 176px + texto con título, descripción y bullets naranjas
- `scrollMarginTop: "50px"` para scroll limpio desde el navbar

### Contacto (`contact.tsx`)
- Fondo: `contacto.jpg` desenfocada (blur 8px) + overlay caqui `rgba(224,220,192,0.30)`
- Columna izquierda: card glassmorphism oscura `rgba(42,37,16,0.55)` con teléfono, email, dirección y mapa
- Columna derecha: formulario sobre fondo blanco con sombra sutil
- Animación `textShimmer` en subtítulo
- `scrollMarginTop: "50px"`

### Footer (`footer.tsx`)
- Banda CTA superior: fondo naranja `theme.colors.accent`, título `#F0E68C`, botón blanco
- Footer principal: glassmorphism `rgba(224,220,192,0.25)` + blur 16px + borde dorado
- Logo sobre círculo blanco (80×80px)
- Texto blanco en toda la sección (headings `#FFFFFF`, cuerpo `rgba(255,255,255,0.80)`)
- Links con hover underline en color `#e0dec0` (secondary)
- Columnas: Logo+descripción · Servicios (Obras/Servicios/Rental) · Navegación · Contacto+Mapa

---

## Paleta de colores activa (Refined Khaki)

| Token        | Valor     | Uso                                      |
|-------------|-----------|------------------------------------------|
| `primary`   | `#cbc58a` | Badges y detalles (no fondo general)    |
| `secondary` | `#e0dec0` | Secciones alternadas, cards, footer     |
| `accent`    | `#E8691A` | Naranja rico — CTAs, highlights, bullets |
| `background`| `#FAFAF5` | Fondo general caqui casi blanco         |
| `dark`      | `#2A2510` | Navbar bg, footer CTA band              |
| `text`      | `#1C1C1E` | Texto principal                         |
| `textMuted` | `#6B6642` | Texto secundario warm                   |
| `border`    | `#D8D49A` | Bordes warm                             |

---

## Funcionalidades implementadas

- [x] Navbar glassmorphism caqui flotante con logo en círculo blanco
- [x] Navbar hide/show on scroll + show on mouse near top edge
- [x] Carrusel hero con 6 imágenes (pausa en hover, dots de navegación)
- [x] Animación textShimmer en titleHighlight y subtítulos de secciones
- [x] Pills flotantes clickeables en el hero
- [x] Sección Servicios con fondo foto desenfocada + cards Halliburton + sombra 3D
- [x] Sección Contacto con fondo foto desenfocada + card glassmorphism + formulario
- [x] Footer glassmorphism con banda CTA naranja
- [x] Footer: logo en círculo, texto blanco, hover underline secondary
- [x] Scroll suave a secciones con scroll-margin-top CSS
- [x] Responsive design completo
- [x] Google Maps embed en contacto y footer

---

## Pendientes y próximos pasos

- [ ] Integrar formulario con backend (email / WhatsApp)
- [ ] Sección "Clientes" o "Proyectos realizados"
- [ ] Botón WhatsApp flotante
- [ ] SEO completo (meta tags, og:image)
- [ ] Imágenes hero-1 a hero-4 (actualmente pueden ser placeholder)

---

## Convenciones del proyecto

- **Idioma de la UI:** español
- **Nombres de archivos:** kebab-case
- **Componentes:** PascalCase
- **Estilos:** solo Tailwind + `theme.ts` (sin CSS modules, sin styled-components)
- **Animaciones:** `<style jsx>` con keyframes dentro del componente
- **Imports:** absolutos con `@/`
- **Colores hardcodeados permitidos:** solo valores de overlay rgba() y efectos glassmorphism donde no hay token exacto en theme

---

**Última actualización:** 19/05/2026

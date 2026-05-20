@AGENTS.md

# QYP Group — Instrucciones para Claude

## Contexto del proyecto

Landing page para **QYP Group**, empresa de servicios industriales (Oil & Gas, Minería, Pesca).
Diseño **Refined Khaki**: paleta caqui usada como identidad de marca, aplicada con elegancia —
solo en detalles y acentos, no como fondo dominante.

---

## Regla fundamental

**`lib/theme.ts` es la única fuente de verdad.**
- Todos los colores, textos, imágenes, datos de contacto y navegación están ahí
- Nunca hardcodear colores o textos en componentes — siempre `theme.colors.X`, `theme.contact.X`, etc.
- Antes de modificar cualquier componente, leer `lib/theme.ts`

---

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS v4 (sin `tailwind.config.js` — usa `@theme inline` en `app/globals.css`)
- Animaciones CSS via `<style jsx>` dentro de cada componente (NO Framer Motion)
- Iconos: Lucide React + SVGs inline
- Deploy: Vercel

---

## Componentes de la landing

| Archivo | Descripción |
|---------|-------------|
| `components/landing/navbar.tsx` | Glassmorphism caqui, logo en círculo blanco, hide/show on scroll, muestra al acercar mouse al borde superior |
| `components/landing/hero.tsx` | Carrusel fullscreen 6 imágenes, overlay oscuro warm, título animado, pills flotantes |
| `components/landing/services.tsx` | Fondo foto desenfocada (`hero-5.jpg`), 3 cards Halliburton (vértices naranja, sombra 3D) |
| `components/landing/contact.tsx` | Fondo foto desenfocada (`contacto.jpg`), card glassmorphism izquierda + formulario derecha |
| `components/landing/footer.tsx` | Banda CTA naranja + footer glassmorphism, logo en círculo blanco, texto blanco |
| `app/page.tsx` | Página principal — importa y renderiza todos los componentes |

---

## Paleta activa

```
primary:    #cbc58a   → badges y detalles
secondary:  #e0dec0   → secciones, cards, footer bg
accent:     #E8691A   → naranja CTAs y highlights
background: #FAFAF5   → fondo general
dark:       #2A2510   → navbar, títulos sobre fondos claros
text:       #1C1C1E   → texto principal
textMuted:  #6B6642   → texto secundario
border:     #D8D49A   → bordes
```

---

## Convenciones de estilo

- Secciones: `mx-4 md:mx-6 my-3`, `borderRadius: "24px"`, `boxShadow` sutil
- Glassmorphism: `backgroundColor: rgba(...)` + `backdropFilter: blur(Xpx)` + `WebkitBackdropFilter`
- Animación textShimmer: `color: #E8691A` → `color: #2A2510` con `text-shadow` glow
- `scrollMarginTop: "50px"` en secciones con id para scroll limpio desde navbar
- Footer texto: `#FFFFFF` para headings, `rgba(255,255,255,0.80)` para cuerpo
- Hover links footer: clase Tailwind `hover:underline decoration-[#e0dec0] underline-offset-[3px]`

---

## Imágenes disponibles

```
public/images/
  logos/          logo.png, logo-white.png
  hero/           fondo hero.jpg, hero-1.jpg … hero-5.jpg
  servicios/      obras.jpg, servicios.jpg, rental.jpg
  contacto/       contacto.jpg
```

---

## Lo que NO hacer

- No usar Framer Motion ni librerías de animación externas
- No crear archivos CSS separados — todo en Tailwind o `<style jsx>`
- No hardcodear colores fuera de overlays rgba() o glassmorphism
- No modificar `lib/theme.ts` sin leerlo primero — el usuario lo edita manualmente
- No agregar secciones nuevas sin que el usuario lo pida explícitamente
- No usar `background-clip: text` para gradientes en texto (causa fondo naranja sólido)

---

## Pendientes

- Formulario con backend (email / WhatsApp API)
- Sección "Proyectos realizados"
- Botón WhatsApp flotante
- SEO (meta tags, og:image)

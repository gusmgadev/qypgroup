# CONTEXT.md — QYP Group (Tecnosur Group)

> **Cómo usar este archivo:**
> 1. Copiarlo a la raíz de cada proyecto nuevo
> 2. Reemplazar todos los valores entre `[ ]` con los datos reales
> 3. Al iniciar cada chat con la IA, adjuntarlo junto con `lib/theme.ts`
> 4. Al terminar cada sesión, actualizar "Funcionalidades implementadas" y "Pendientes"

> **Regla fundamental:** Los valores de colores, tipografía, textos, logos,
> contacto y navegación NO se escriben aquí — todos viven en `lib/theme.ts`.
> Este archivo describe el proyecto. `theme.ts` describe el diseño y los datos.

---

## Descripción general

- **Proyecto:** QYP Group (Tecnosur Group)
- **Cliente:** Tecnosur Group
- **Rubro:** Servicios industriales - Hidrogrúas, 3er Eje y Carrocerías
- **Objetivo:** Landing page para empresa de servicios industriales
- **URL producción:** https://qypgroup.vercel.app
- **Fecha inicio:** 2026
- **Estado:** Etapa 1 - Landing completa

---

## Fuente de verdad del diseño y datos

**Todos los valores visuales y de contenido están en `lib/theme.ts`.**
Antes de crear o modificar cualquier componente, adjuntar ese archivo.

| Qué necesitás saber            | Dónde está en theme.ts              |
|-------------------------------|-------------------------------------|
| Colores de la marca            | `theme.colors.*`                    |
| Tipografía y tamaños           | `theme.fonts.*` / `theme.fontSizes.*` |
| Logo (claro y blanco)          | `theme.logo.*`                      |
| Datos de contacto              | `theme.contact.*`                   |
| Textos del Hero                | `theme.hero.*`                      |
| Navegación y CTA del navbar    | `theme.navbar.*`                   |
| Descripción, redes, mapa       | `theme.footer.*`                    |
| Servicios (cards)              | `theme.hero.services.*`             |
| Pills del hero                 | `theme.hero.pills.*`                |
| Espaciado, radios, sombras     | `theme.spacing.*` / `theme.radii.*` / `theme.shadows.*` |
| Transiciones                   | `theme.transitions.*`               |

**Nunca hardcodear colores, fuentes ni textos en los componentes.**
Siempre importar: `import { theme } from '@/lib/theme'`

---

## Stack tecnológico

- **Framework:** Next.js con App Router
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Base de datos:** No implementada
- **Autenticación:** No implementada
- **Email:** No implementado
- **Animaciones:** CSS/Tailwind (sin Framer Motion)
- **Iconos:** Lucide React + SVGs inline
- **Formularios:** Implementado (sin backend)
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
│       ├── navbar.tsx             # Template 2 - Glassmorphism flotante
│       ├── hero.tsx               # Template 3 - Fullscreen centrado
│       ├── services.tsx           # Cards de servicios expandibles
│       ├── contact.tsx            # Formulario de contacto
│       └── footer.tsx             # Template 3 - Banda CTA + minimalista
│
├── lib/
│   └── theme.ts                   # ← FUENTE DE VERDAD
│
├── context/
│   ├── CONTEXT.md                 # Este archivo
│   ├── Biblioteca-Navbar.md      # Templates de navbar
│   ├── Biblioteca-Hero.md         # Templates de hero
│   └── Biblioteca-Footer.md       # Templates de footer
│
└── public/
    └── images/
        ├── logos/                 # logo.png
        └── hero/                  # hero-1.jpg, hero-2.jpg, hero-3.jpg
```

---

## Templates usados actualmente

| Componente   | Template | Descripción |
|--------------|----------|-------------|
| Navbar       | 2        | Glassmorphism flotante, hide on scroll, hover con subrayado |
| Hero         | 3        | Fullscreen centrado con tag amplio, pills flotantes clickeables |
| Servicios    | Custom   | Cards con detalles siempre visibles |
| Contacto     | Custom   | Formulario + info contacto + mapa |
| Footer       | 3        | Banda CTA + 4 columnas |

---

## Funcionalidades implementadas

- [x] Navbar flotante con logo en círculo blanco
- [x] Navbar con hover: color cambia a blanco + subrayado naranja
- [x] Navbar hide on scroll (oculta al bajar, muestra al subir)
- [x] Hero responsive (min-h-screen, padding para no superponer navbar)
- [x] Tag amplio (width 110%) con dot animado (naranja → verde)
- [x] Pills flotantes clickeables que van a #services
- [x] TitleHighlight más pequeño que el resto del título
- [x] Sección servicios con cards
- [x] Servicios con detalles siempre visibles
- [x] Formulario de contacto
- [x] Footer con banda CTA
- [x] Google Maps嵌入
- [x] Responsive design completo
- [x] Deploy en Vercel

---

## Pendientes y próximos pasos

### Crítico

- Ninguno

### Backlog

- Integrar formulario con backend (email)
- Sección "Clientes" o "Proyectos"
- WhatsApp flotante
- SEO completo

---

## Convenciones del proyecto

- **Idioma del código:** español
- **Idioma de la UI:** español
- **Mensajes de error:** español
- **Nombres de archivos:** kebab-case
- **Componentes:** PascalCase
- **Variables:** camelCase
- **Estilos:** solo Tailwind + theme.ts
- **Imports:** absolutos con `@/`

---

## Notas especiales del proyecto

- Colores: primary=#0F0F10 (negro), accent=#F47920 (naranja)
- Logo en círculo blanco en navbar oscuro
- Hero oscuro con overlay gradiente
- Tag con animación de color (naranja → verde)
- Pills del hero son clickeables
- Formulario con validación frontend
- Mapa de Google Maps嵌入

---

**Última actualización:** 05/05/2026
**Actualizado por:** opencode
# CONTEXT.md — QYP Group

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
- **URL producción:** sin deploy aún
- **Fecha inicio:** 2026
- **Estado:** Etapa 1 - Landing en desarrollo

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
- **Formularios:** No implementado
- **Deploy:** Vercel / sin configurar

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
│       └── footer.tsx             # Template 3 - Banda CTA + minimalista
│
├── lib/
│   └── theme.ts                   # ← FUENTE DE VERDAD
│
├── context/
│   ├── CONTEXT.md                 # Este archivo
│   ├── Biblioteca-Navbar.md       # Templates de navbar
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
| Navbar       | 2        | Glassmorphism flotante, hide on scroll |
| Hero         | 3        | Fullscreen centrado con pills flotantes |
| Servicios    | Custom   | Cards con detalles visibles, expandibles |
| Footer       | 3        | Banda CTA + 4 columnas |

---

## Funcionalidades implementadas

- [x] Navbar flotante con logo en círculo blanco
- [x] Hero con slideshow de imágenes
- [x] Sección servicios con cards
- [x] Footer con banda CTA
- [x] Google Maps integrado
- [x] Responsive design
- [ ] Formulario de contacto
- [ ] SEO
- [ ] Deploy

---

## Pendientes y próximos pasos

### Crítico

1. Agregar formulario de contacto
2. SEO base (metadata)

### Próxima sesión

- Agregar sección "Proceso" o "Clientes"
- Ajustar responsive en mobile

### Backlog

- Animaciones adicionales
- Galerías de trabajos realizados
- WhatsApp flotante

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
- Servicios con detalles siempre visibles
- Mapa de Google Maps嵌入

---

**Última actualización:** 05/05/2026
**Actualizado por:** opencode
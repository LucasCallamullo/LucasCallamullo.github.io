// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import mermaid from 'astro-mermaid';

/**
 * Astro configuration.
 *
 * Integrations:
 *   - astro-icon:     Inline SVG icons (Iconify sets).
 *   - astro-mermaid:  Renders ```mermaid code blocks as live diagrams.
 *
 * Vite:
 *   - tailwindcss:    Tailwind v4 plugin (replaces the old integration).
 *   - allowedHosts:   Allow dev server access from ngrok tunnels for mobile testing.
 */
export default defineConfig({
  integrations: [
    icon({
      // Pre-bundle every Lucide icon. Avoids runtime fetches.
      include: {
        lucide: ['*'],
      },
    }),

    mermaid({
      // Base theme for diagrams. `autoTheme` overrides this based on the
      // site's data-theme attribute (light/dark).
      theme: 'default',
      autoTheme: true,
      // Opciones extra para el renderizado
      mermaidConfig: {
        er: {
          useMaxWidth: false,
          layoutDirection: 'TB',    // 'TB' (vertical) o 'LR' (horizontal)
          nodeSpacing: 67,         // Más espacio entre tablas al mismo nivel (default: 140)
          rankSpacing: 50,         // Más espacio vertical entre niveles (default: 80)
          diagramPadding: 12,       // Margen alrededor de todo el diagrama (default: 20)
          minEntityWidth: 80,      // Hace las tablas un poco más anchas (default: 100)
          fontSize: 14              // Letra un poco más grande (default: 12)
        },
        flowchart: {
          useMaxWidth: false
        },
        c4: {
          useMaxWidth: false,

          c4ShapeMargin: 24,     // Más espacio entre cajas (default: 50)
          c4ShapePadding: 8,      // Espacio entre las cajas (default: 20)
          diagramMarginX: 5,      // Margen horizontal del diagrama (default: 50)
          diagramMarginY: -32,      // Margen vertical del diagrama (default: 10)

          width: 204,    // 60

          // Aumentamos el tamaño base de las formas principales
          containerFontSize: 16,   // Tamaño de las cajas de contenedores
          personFontSize: 14,      // Tamaño de los actores
          systemFontSize: 16,      // Tamaño de los sistemas (si usás System_Ext)
          messageFontSize: 12,     // Tamaño del texto en las flechas de relación
          container_dbFontSize: 16,      // Para PostgreSQL y File Storage
          external_systemFontSize: 16,   // Para Google Maps API
          
        },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    server: {
      // Allow ngrok tunnels so the dev server is reachable from other devices.
      allowedHosts: ['.ngrok-free.app', '.ngrok.app', '.ngrok-free.dev'],
    },
  },
});
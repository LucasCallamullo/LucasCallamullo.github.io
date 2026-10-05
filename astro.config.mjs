// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon'; // 1. Import the astro-icon integration

// https://astro.build/config
export default defineConfig({
  integrations: [
    icon({
      include: {
        lucide: ['*'], // Include all Lucide icons
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['.ngrok-free.app', '.ngrok.app', '.ngrok-free.dev']
    }
  }
});
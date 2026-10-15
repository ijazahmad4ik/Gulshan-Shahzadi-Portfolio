import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

// Plugin to serve .html files when clean URLs without extension are requested in dev / preview
function htmlFallbackPlugin(): Plugin {
  return {
    name: 'html-fallback-plugin',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url && !req.url.includes('.') && req.url !== '/') {
          const [pathname, search] = req.url.split('?');
          req.url = `${pathname}.html${search ? `?${search}` : ''}`;
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url && !req.url.includes('.') && req.url !== '/') {
          const [pathname, search] = req.url.split('?');
          req.url = `${pathname}.html${search ? `?${search}` : ''}`;
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), htmlFallbackPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about.html'),
          education: path.resolve(__dirname, 'education.html'),
          skills: path.resolve(__dirname, 'skills.html'),
          services: path.resolve(__dirname, 'services.html'),
          experience: path.resolve(__dirname, 'experience.html'),
          projects: path.resolve(__dirname, 'projects.html'),
          contact: path.resolve(__dirname, 'contact.html'),
          notFound: path.resolve(__dirname, '404.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

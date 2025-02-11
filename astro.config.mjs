import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
    integrations: [icon()],
    site: 'https://portaler.edbpede.net',
    output: 'static',
    build: {
        assets: 'assets',
        inlineStylesheets: 'auto',
        splitting: true,
        sourcemap: false,
        format: 'file'
    },
    vite: {
        css: {
            postcss: {
                plugins: [
                    tailwindcss,
                    autoprefixer,
                ],
            },
        },
        build: {
            cssCodeSplit: true,
            rollupOptions: {
                output: {
                    manualChunks: {
                        'search-filter': ['/src/components/SearchFilter.astro']
                    }
                }
            }
        }
    }
});
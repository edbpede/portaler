import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import icon from 'astro-icon';

export default defineConfig({
    integrations: [tailwind(), icon()],
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
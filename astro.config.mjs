import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
	integrations: [tailwind()],
	site: 'https://portaler.edbpede.dk',
	base: '/portaler',
	output: 'static',
	build: {
		assets: 'assets'
	}
});

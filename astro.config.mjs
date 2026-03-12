// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	site: 'https://casa-nel-verde.it',
	output: 'static',
	trailingSlash: 'always',
	integrations: [sitemap()],
});

import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import WindiCSS from "vite-plugin-windicss";
import { SITE } from "./src/config.mjs";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DEFAULT_OPTIONS = {
	test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
	includePublic: true,
	logStats: true,
	ansiColors: true,
	png: {
		// https://sharp.pixelplumbing.com/api-output#png
		quality: 100,
		compressionLevel: 9,
	},
	jpeg: {
		// https://sharp.pixelplumbing.com/api-output#jpeg
		quality: 100,
	},
	jpg: {
		// https://sharp.pixelplumbing.com/api-output#jpeg
		quality: 100,
	},
	tiff: {
		// https://sharp.pixelplumbing.com/api-output#tiff
		quality: 100,
	},
	// gif does not support lossless compression
	// https://sharp.pixelplumbing.com/api-output#gif
	gif: {},
	webp: {
		// https://sharp.pixelplumbing.com/api-output#webp
		lossless: true,
	},
	avif: {
		// https://sharp.pixelplumbing.com/api-output#avif
		lossless: true,
	},
};

// https://astro.build/config
export default defineConfig({
	// Astro uses this full URL to generate your sitemap and canonical URLs in your final build
	site: SITE.origin,
	base: SITE.basePathname,
	output: "static",
	integrations: [svelte(), sitemap(), mdx(), tailwind()],
	vite: {
		plugins: [WindiCSS()],
		resolve: {
			alias: {
				"~": path.resolve(__dirname, "./src"),
			},
		},
	},
});

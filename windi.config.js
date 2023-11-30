import { defineConfig } from 'windicss/helpers';
/** @type {import('tailwindcss').Config} */

export default defineConfig({
	darkMode: 'false', // or 'media' or 'class'
	corePlugins: {
		container: false,
	},
	theme: {
		extend: {
			colors: {
				fucsia: '#dc3189',
				bgyellow: '#dc9831',
			},
			gridTemplateRows: {
				// Simple 8 row grid
				8: 'repeat(8, minmax(0, 1fr))',
			},
		},
	},
	extract: {
		include: ['./src/**/*.{vue,html,jsx,tsx,astro}', './data/**/*.mdx'],
		exclude: ['node_modules', '.git'],
	},
	plugins: [
		require('windicss/plugin/typography'),
		function ({ addBase }) {
			addBase({
				ul: { listStyleType: 'disc' },
			});
		},
		require('flowbite/plugin'),
	],
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './node_modules/flowbite/**/*.js'],
});

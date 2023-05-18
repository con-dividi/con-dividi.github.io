import { defineConfig } from 'windicss/helpers';

export default defineConfig({
	darkMode: 'media', // or 'media' or 'class'
	corePlugins: {
		container: false,
	},
	theme: {
		extend: {
			colors: {
				fucsia: '#dc3189',
			},
			gridTemplateRows: {
				// Simple 8 row grid
				8: 'repeat(8, minmax(0, 1fr))',
			},
		},
	},
	extract: {
		include: ['./src/**/*.{vue,html,jsx,tsx,astro}'],
		exclude: ['node_modules', '.git'],
	},
	plugins: [require('windicss/plugin/typography')],
});

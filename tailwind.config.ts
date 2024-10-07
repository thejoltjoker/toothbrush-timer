import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins', '"Noto Color Emoji"', 'sans-serif']
			}
		}
	},

	plugins: []
} as Config;

import type { Config } from 'tailwindcss'

const config: Config = {
	content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			fontFamily: {
				satoshi: ['Satoshi', 'sans-serif'],
				roboto: ['Roboto', 'sans-serif'],
			},
			colors: {
				'primary-orange': '#FF5722',
			},
		},
	},
	plugins: [],
};
export default config

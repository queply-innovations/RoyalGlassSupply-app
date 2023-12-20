/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{ts,tsx}'],
	theme: {
		screens: {
			'3xl': '1920px',
		},
		fontFamily: {
			Inter: ['Inter', 'sans-serif'],
			Lato: ['Lato', 'sans-serif'],
		},
		extend: {
			colors: {
				'primary-blue': 'rgb(var(--primary-blue) / <alpha-value>)',
				'primary-red': 'rgb(var(--primary-red) / <alpha-value>)',
				'primary-green': 'rgb(var(--primary-green) / <alpha-value>)',
				'primary-yellow': 'rgb(var(--primary-yellow) / <alpha-value>)',
				'primary-gray': 'rgb(var(--primary-gray) / <alpha-value>)',
				'primary-dark-gray':
					'rgb(var(--primary-dark-gray) / <alpha-value>)',
				'primary-white': 'rgb(var(--primary-white) / <alpha-value>)',
				'primary-background':
					'rgb(var(--primary-background) / <alpha-value>)',
				'border-color': 'rgb(var(--border-color) / 0.1)',
			},
		},
	},
	plugins: [],
};

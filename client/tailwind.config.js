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

				// Shad/cn custom colors
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				'pos-primary-background':
					'rgb(var(--pos-primary-background) / <alpha-value>)',
			},
			keyframes: {
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' },
				},
			},
		},
		animation: {
			'fade-in': 'fade-in 0.3s ease-in-out',
			'fade-out': 'fade-out 0.3s ease-in-out',
			spin: 'spin 1s linear infinite',
		},
	},
	plugins: [],
};

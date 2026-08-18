import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pepper: {
          400: '#f04e28',
          500: '#e8381a',
          600: '#c92e12',
        },
        chop: {
          950: '#0f0d0a',
          900: '#1a1714',
          800: '#242018',
          700: '#2e2820',
          600: '#3d3428',
        },
        cream: {
          50:  '#fdfcf9',
          100: '#f5f0e8',
          200: '#ede4d4',
          400: '#c4b49a',
          600: '#8a7560',
        },
        gold: '#f0a500',
      },
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        display: ['Fraunces', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config

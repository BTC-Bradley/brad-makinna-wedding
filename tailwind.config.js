/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sage: '#9CAF88',
        ivory: '#FFFFF0',
        taupe: '#B5A99C',
        rose: '#E8B4BC',
        earth: '#8B7355',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
        script: ['Dancing Script', 'cursive'],
      },
      backgroundImage: {
        'hero-pattern': "url('/images/hero-bg.jpg')",
      },
    },
  },
  plugins: [typography],
} 
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
        // Primary brand color
        sage: '#9CAF88',
        // Warm summer sand
        sand: '#F4D03F',
        // Fresh ocean blue
        ocean: '#48C9B0',
        // Tropical coral
        coral: '#FF7F50',
        // Summer sky blue
        sky: '#87CEEB',
        // Fresh mint green
        mint: '#98FF98',
        // Soft peach
        peach: '#FFDAB9',
        // Light lavender
        lavender: '#E6E6FA',
        // Warm golden
        golden: '#FFD700',
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
/** @type {import('tailwindcss').Config} */

const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: px0_100,
      text: px0_100,
      fontSize: px0_100,
      colors: {
        'beige': '#9b8f8f',
        'beige-white': '#fdf9f6',
        'choice': '#fde6d5'
      },
      fontFamily: {
        sans:['IBMPlexSansKR'],
      },
    },
  },
  plugins: [
    require('tailwindcss-animate')
  ],
}


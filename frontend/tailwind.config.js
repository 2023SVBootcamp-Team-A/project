/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
import tailwindcssanimate from "tailwindcss-animate";

const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };

// const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'background-img' : "/images/background.png"
      },
      variants: {},
      borderRadius: px0_100,
      text: px0_100,
      fontSize: px0_100,
      colors: {
        beige: "#9b8f8f",
        "beige-white": "#fdf9f6",
        choice: "#fde6d5",
        mainpagegray: "#a59c9b",
        paginationdeepgray: "#d0cfcd",
        paginationlightgray: "#eae9e9",
      },
      fontFamily: {
        sans: ["IBMPlexSansKR"],
      },
    },
  },
  plugins: [tailwindcssanimate],
};

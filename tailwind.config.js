/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#16ABF8",
        white: "#FFFFFF",
        black: "#000000",
      },
    },
  },
  variants: {},
  plugins: [],
};

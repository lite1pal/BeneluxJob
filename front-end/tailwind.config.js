/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "cursive"],
        pt_sans: ["PT Sans", "serif"],
        raleway: ["Raleway", "sans"],
      },
    },
  },
  plugins: [],
};

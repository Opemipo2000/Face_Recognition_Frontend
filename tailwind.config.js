/** @type {import('tailwindcss').Config} */
module.exports = {
   
    content: ["./src/**/*.{js,jsx}", "./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      // colors: {
      //   primary: "#00040f",
      //   secondary: "#00f6ff",
      //   dimWhite: "rgba(255, 255, 255, 0.7)",
      //   dimBlue: "rgba(9, 151, 124, 0.1)",
      // },
      // fontFamily: {
      //   poppins: ["Poppins", "sans-serif"],
      // },
    },
  },
  plugins: [],
}


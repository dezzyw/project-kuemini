/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "pink": "#39DB4A",
        "red" : "FF6868",
        "secondary": "#FFFFF",
        "button" :"#FEA9A9"
      }
    },
  },
  plugins: [require('daisyui')],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'ubuntu':['Ubuntu', 'sans-serif'],
        'roboto':['Roboto', 'sans-serif'],
        'poppins':['Poppins', 'sans-serif'],
        'montserrat':['Montserrat', 'sans-serif'],
        'lato':['Lato', 'sans-serif'],
        'raleway':['Raleway', 'sans-serif'],
        'nunito':['Nunito', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

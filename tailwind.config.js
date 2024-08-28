/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',                // Archivos HTML en la raíz
    './pages/**/*.html',       // Archivos HTML en la carpeta pages
    './scss/**/*.scss',        // Archivos SCSS en todas las subcarpetas de scss
    './javascript/**/*.js',    // Archivos JavaScript en todas las subcarpetas de javascript
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      fontWeight: {
        medium: 400,
        semibold: 600,
        bold: 700,
      },
    },
  },
  plugins: [],
}
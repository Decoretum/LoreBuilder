/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/assets/**/*.{jpeg,jpg,png,gif}"
  ],
  theme: {
    extend: {
      fontFamily: {
        PixelFont: ['PixelFont', 'sans-serif']
      }
    },
  },
  plugins: [],
}
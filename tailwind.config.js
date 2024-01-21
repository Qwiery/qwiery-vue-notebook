/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app.vue",
    "./src/**/*.{js,ts,vue}",
    "./src/components/rendering/*.{js,ts,vue}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: ["grid-cols-4","col-span-4"],
}

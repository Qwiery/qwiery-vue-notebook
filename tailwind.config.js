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
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#586fb4',
          light: '#677cb9',
          'dark-light': 'rgba(82,82,91,.15)',
          "red": "#ff0000",
        },
        secondary: {
          DEFAULT: '#7374AF',
          light: '#ebe4f7',
          'dark-light': 'rgb(128 93 202 / 15%)',
        },
        success: {
          DEFAULT: '#00C2C3',
          light: '#ddf5f0',
          'dark-light': 'rgba(0,171,85,.15)',
        },
        danger: {
          DEFAULT: '#A64D7C',
          light: '#fff5f5',
          'dark-light': 'rgba(231,81,90,.15)',
        },
        warning: {
          DEFAULT: '#E69C24',
          light: '#fff9ed',
          'dark-light': 'rgba(226,160,63,.15)',
        },
        info: {
          DEFAULT: '#89BDEA',
          light: '#e7f7ff',
          'dark-light': 'rgba(33,150,243,.15)',
        },
        dark: {
          DEFAULT: '#52525b',
          light: '#eaeaec',
          'dark-light': 'rgba(82,82,91,0.5)',
        },
        black: {
          DEFAULT: '#71717a',
          light: '#e3e4eb',
          'dark-light': '#71717a',
        },
        white: {
          DEFAULT: '#ffffff',
          light: '#e0e6ed',
          dark: '#888ea8',
        },
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      spacing: {
        4.5: '18px',
      },
      boxShadow: {
        '3xl': '0 2px 2px rgb(224 230 237 / 46%), 1px 6px 7px rgb(224 230 237 / 46%)',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {

            '--tw-prose-invert-headings': theme('colors.white.dark'),
            '--tw-prose-invert-links': theme('colors.white.dark'),
            h1: { fontSize: '40px', marginBottom: '0.5rem', marginTop: 0  },
            h2: { fontSize: '32px', marginBottom: '0.5rem', marginTop: 0 },
            h3: { fontSize: '28px', marginBottom: '0.5rem', marginTop: 0 },
            h4: { fontSize: '24px', marginBottom: '0.5rem', marginTop: 0 },
            h5: { fontSize: '20px', marginBottom: '0.5rem', marginTop: 0 },
            h6: { fontSize: '16px', marginBottom: '0.5rem', marginTop: 0 },
            p: { marginBottom: '0.5rem' },
            li: { margin: 0 },
            img: { margin: 0 },
          },
        },
        zinc:{
          h1: { fontSize: '40px', marginBottom: '0.5rem', marginTop: 0, color:"#ff0000" },
        }
      }),
    },
  },
  plugins: [],
  safelist: ["grid-cols-4","col-span-4"],
}

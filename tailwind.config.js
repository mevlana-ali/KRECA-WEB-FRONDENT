/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2ecc71',
          dark: '#27ae60',
          light: '#a8e6cf',
        },
        navy: {
          DEFAULT: '#1a2b4a',
          light: '#243655',
        }
      },
    },
  },
  plugins: [],
}
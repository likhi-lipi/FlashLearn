/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#fdf6f4',
        foreground: '#4a2c2a',
        primary: '#e3979d',
        secondary: '#f3e8e4',
        accent: '#f9e8e6',
        dark: '#1e1b1b',
        'green-light': '#eef6f1',
      },
      fontFamily: {
        sans: ['"Outfit"', '"Inter"', 'system-ui', 'sans-serif'],
        outfit: ['"Outfit"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

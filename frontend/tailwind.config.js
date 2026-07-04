/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAF5F6',
        primary: '#800020',
        accent: '#800020',
        secondary: '#FCE4EC',
        dark: '#1A1A1A',
        muted: '#4A4A4A',
        'voice-bg': '#FDF2F4',
        'voice-icon': '#800020'
      },
      fontFamily: {
        sans: ['"Outfit"', '"Inter"', 'system-ui', 'sans-serif'],
        outfit: ['"Outfit"', 'sans-serif'],
      }
    },
  },
  plugins: [],
};

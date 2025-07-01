/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#32729F',
        primary_100: '#f4f7fb',
        primary_200: '#d0dded',
        primary_300: '#9bc3de',
        primary_400: '#65a5cb',
        primary_500: '#4189b6',
      },
    },
  },
  plugins: [],
};

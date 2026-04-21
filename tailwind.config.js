/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/views/**/*.ejs', './src/public/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        gold: '#E8B00B',
        'gold-light': 'rgba(232,176,11,.12)',
        'gold-hover': 'rgba(232,176,11,.06)',
        ink: '#1a1916',
        'ink-m': '#504e4b',
        'ink-l': '#97938e',
        bg: '#fafaf8',
        'bg-s': '#f3f1ee',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Montserrat"', '"Helvetica Neue"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

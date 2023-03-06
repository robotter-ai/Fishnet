/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#fff',
        blue: '#0054ff',
        'light-20': '#F6F8FB',
        'dark-20': '#91989C',
        'dark-50': '#223038',
      },
    },
  },
  plugins: [],
};

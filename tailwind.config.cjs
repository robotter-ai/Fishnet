/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#fff',
        blue: '#1DC3CF',
        'light-20': '#F6F8FB',
        'dark-20': '#91989C',
        'icon-bg': '#EDF2FA',
        'dark-50': '#223038',
        'text-dark': '#244141',
        'form-bg': '#F6FAFB',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};

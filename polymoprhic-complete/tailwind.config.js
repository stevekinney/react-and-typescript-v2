/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: { ...colors, primary: colors.purple },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: { ...colors, primary: colors.emerald },
    },
  },
  plugins: [
    plugin(({ theme, addComponents }) => {
      const inputPadding = `${theme('spacing.2')} ${theme('spacing.4')}`;

      addComponents({
        button: {
          backgroundColor: theme('colors.primary.300'),
          borderColor: theme('colors.primary.400'),
          borderWidth: theme('borderWidth.2'),
          padding: inputPadding,
        },
        'button:hover': {
          backgroundColor: theme('colors.primary.400'),
        },
        'button:active': {
          backgroundColor: theme('colors.primary.500'),
        },
        'button:disabled': {
          backgroundColor: theme('colors.primary.50'),
          borderColor: theme('colors.primary.100'),
          color: theme('colors.primary.200'),
          cursor: 'no-allowed',
        },
        'button.small': {
          fontSize: '0.7rem',
          padding: `${theme('spacing.1')} ${theme('spacing.2')}`,
          border: 'none',
          color: theme('colors.red.800'),
          backgroundColor: theme('colors.red.50'),
        },
        'button.secondary': {
          backgroundColor: theme('colors.primary.50'),
        },
        'button.secondary:hover': {
          backgroundColor: theme('colors.primary.100'),
        },
        'button.secondary:active': {
          backgroundColor: theme('colors.primary.200'),
        },
        input: {
          borderWidth: theme('borderWidth.2'),
          padding: inputPadding,
        },
        'input:hover': {
          borderColor: theme('colors.primary.100'),
        },
        'input:focus': {
          borderColor: theme('colors.primary.300'),
          outline: 'none',
        },
      });
    }),
  ],
};

module.exports = {
  content: ['./index.html', './src/**/*.{jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica', 'Roboto', 'Arial', 'sans-serif'],
        cursive: ['RubikVinyl', 'sans-serif'],
        serif: ['Mukta'],
        mono: ['"Fira Code"', 'ui-monospace'],
        display: ['Oswald'],
      },
      colors: {
        'white-dark': '#ebebeb',
        white: '#fbfbfe',

        'dark-dark': '#1f2126',
        dark: '#2d3036',
        'dark-light': '#46484d',

        grey: '#888888',

        red: '#ff5959',
        'red-light': '#ff7373',

        'blue-light': '#5eb2ff',
        blue: '#49a7fc',
        'blue-dark': '#2f81ff',
        'blue-darker': '#185fcc',
        'blue-darkest': '#134187',
      },

      animation: {
        fadeIn: 'fadeIn .3s ease-in-out',
      },
      keyframes: () => ({
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }),
    },
  },
  plugins: [],
};

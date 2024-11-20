/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#1c204b', // Dark blue
        text: '#ffffff', // White
        highlight: '#ff6f00', // Orange
        navbar: '#595b78', // Muted purple/gray
        lightblue: '#add8e6', // Light blue
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        trebuchet: ['Trebuchet MS', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 0px #ff6f00)' },
          '100%': { filter: 'drop-shadow(0 0 10px #ff6f00)' },
        },
        fadeRight: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeInDown: {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      animation: {
        fadeInLeftToRight: 'fadeInLeftToRight 1s ease forwards',
        fadeIn: 'fadeIn 1s ease forwards',
        glow: 'glow 0.5s infinite alternate',
        fadeRight: 'fadeRight 2s ease forwards',
        fadeInDown: 'fadeInDown 2s ease forwards',
      },
    },
  },
  plugins: [],
};

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
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        trebuchet: ['Trebuchet MS', 'sans-serif'],
      },
      keyframes: {
        fadeInLeftToRight: {
          '0%': { opacity: 0, transform: 'translateX(-20px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeInLeftToRight: 'fadeInLeftToRight 1s ease forwards',
        fadeIn: 'fadeIn 1s ease forwards',
      },
    },
  },
  plugins: [],
};

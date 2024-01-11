import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        'blumine': {
          '50': '#f2fafd',
          '100': '#d7eff9',
          '200': '#c1eaf6',
          '300': '#8ad9ef',
          '400': '#4cc5e4',
          '500': '#25aed2',
          '600': '#178db2',
          '700': '#147190',
          '800': '#146078',
          '900': '#164f64',
          '950': '#0f3342',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily:{
        'sans': ['Albert Sans', 'sans-serif'],
        'young': ['Young Serif', 'serif'],
        'albert': ['Albert Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  fontFamily: {
    sans: ['Albert Sans', 'sans-serif'],
    serif: ['Young Serif', 'serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  plugins: [],
};

export default config;
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#ff6b9d', dark: '#e05582', light: '#ff8db5' },
        secondary: { DEFAULT: '#7c5cfc', dark: '#6a48e0' },
        bg: { DEFAULT: '#0b0b1a', card: '#15152a', alt: '#1a1a32' },
        tier: { ss: '#ff3b3b', s: '#ff8800', a: '#ffcc00', b: '#44cc44' },
        gold: '#ffd700',
        dim: '#7777a0',
        border: '#222244',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { ink: 'var(--ink)', paper: 'var(--paper)', accent: 'var(--accent)' },
      fontFamily: {
        display: ['"Cinzel Decorative"', 'Georgia', 'serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

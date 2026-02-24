/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'vs-dark': '#0F1729',
        'vs-navy': '#1C2536',
        'vs-purple': '#7C3AED',
        'vs-blue': '#3B82F6',
        'vs-canvas': '#F8FAFC',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

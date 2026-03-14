/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFF8E7',
        lightAccent: '#FFD77A',
        primaryAccent: '#E6A520',
        darkText: '#7A4A00',
      },
      maxWidth: {
        container: '1200px',
      },
      spacing: {
        section: '120px',
      },
    },
  },
  plugins: [],
}

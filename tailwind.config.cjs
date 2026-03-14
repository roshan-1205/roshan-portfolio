/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F2EAF7',
        lightAccent: '#C59DD9',
        primaryAccent: '#7A3F91',
        darkText: '#2B0D3E',
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

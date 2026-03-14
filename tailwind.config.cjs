/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F5F6F7',
        lightAccent: '#C1C4C8',
        primaryAccent: '#7B7F85',
        darkText: '#2B2E33',
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

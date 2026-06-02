/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sec-dark': '#0B0F19',
        'sec-darker': '#06080D',
        'sec-green': '#10B981',
        'sec-red': '#EF4444',
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%231F2937' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E\")",
      }
    },
  },
  plugins: [],
}

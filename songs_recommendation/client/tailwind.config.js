/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: '#545b6b',
        blue: '#ceeaf7',
        lavender: '#d5c9df',
        green: '#6cb298',
      },
    },
  },
  plugins: [],
}

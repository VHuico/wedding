/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        'dancing-script': ['"Dancing Script"', 'cursive'],
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        'dancing-script': ['"Dancing Script"', 'cursive'],
        'autography': ['Autography', 'cursive'],
      },
      colors: {
        'olive': {
          50: '#f8f9f6',   // Very light olive for backgrounds (replaces pink-50)
          100: '#e8ebdf',  // Light olive for backgrounds  
          200: '#d1d7c1',  // Light olive for borders (replaces pink-200)
          400: '#8a9c5a',  // Medium olive for accents (replaces pink-400)
          500: '#7a8b4f',  // Medium olive for hover states (replaces pink-500)
          600: '#7a8b4f',  // Medium-dark olive
          700: '#7a9158', // Custom olive green
          800: '#5a6b42', // Darker shade for hover states
        }
      }
    },
  },
  plugins: [],
}

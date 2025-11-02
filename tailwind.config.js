/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7c3aed', // purple-600
          hover: '#6d28d9', // purple-700
        },
        secondary: '#a78bfa', // purple-400
        accent: '#c084fc', // purple-300
      },
      spacing: {
        'section': '2rem',
        'container': '1rem',
      },
      borderRadius: {
        'container': '0.5rem',
      },
    },
  },
  plugins: [],
}

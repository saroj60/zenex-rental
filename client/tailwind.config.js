/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0755C9',
          lightBlue: '#EBF2FE',
          darkBlue: '#053E94',
          bg: '#F5F8FC',
          navy: '#0E1726',
          card: '#FFFFFF',
          border: '#E2E8F0',
        },
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(7, 85, 201, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'elevated': '0 10px 25px -5px rgba(7, 85, 201, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

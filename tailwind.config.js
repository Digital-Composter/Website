/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#37996b',
        second: 'rgba(133, 87, 35, 0.6)',
        third: '#2e2e2e',
        alt:'#a0a0a0',
        hv1:'#1b9657'
      },
      boxShadow: {
        '3xl': '0 10px 50px 0px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}

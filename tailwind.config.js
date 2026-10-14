/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4169E1", // Royal Blue
        secondary: "#8A2BE2", // Purple
        accent: "#E0FFFF", // Light Cyan
        dark: "#1A1A2E",
        light: "#F4F7FB"
      },
      fontFamily: {
        sans: ['Inter', 'Hind Siliguri', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

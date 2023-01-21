/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent:"#e54065",
        backgroundColor:"#f4f5f9",
        borderColor:"#cfd2dc",
        textColor:"#636363",
        filterColor:"#e1e4ea",
        readBg:"#f2f2f2",
      }
    },
  },
  plugins: [],
}
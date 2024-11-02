/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navBar-purple-start': '#4a0099',
        'navBar-purple-end':'#4b3fb0', 
        'grey':'#a3a3a3',
        'register-background':'#f0f1f2'
      }
    }
    ,
  },
  plugins: [],
}


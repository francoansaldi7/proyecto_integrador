/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {    
    extend: {
      screens: {
        '2xl': '1920px'
      },
      colors: {
        primary: '#5465FF',
        secondary: '#788BFF',
        background: '#fff',
        'background-dark': '#0A041C',
        'primary-dark': '#1A1034',
        'secondary-dark': '#241E4C',
      },
      backgroundImage: {
        'hero-image': "url('https://th.bing.com/th/id/OIG._T3AfH4Bf128NEInXvKE?pid=ImgGn')",
      }  
    },
  },
  plugins: [],
}


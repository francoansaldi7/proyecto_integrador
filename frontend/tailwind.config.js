/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {

    // screens: {
    //   'tablet': '640px',
    //   // => @media (min-width: 640px) { ... }

    //   'laptop': '1024px',
    //   // => @media (min-width: 1024px) { ... }

    //   'desktop': '1280px',
    //   // => @media (min-width: 1280px) { ... }
    // },
    
    extend: {
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


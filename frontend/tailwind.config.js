/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {    
    extend: {
      keyframes: {
        slowFadeAndPosition: {
          '0%, 100%': { 
            opacity: .4,
            transform: 'translateY(90vh)'
          },
          '25%': { transform: 'translateX(25vw)'},
          '50%': { opacity: 1,
            transform: 'translate(50vw, 45vh)'},
          '75%': { transform: 'translate(0)'},
        }
      },
      animation: {
        slowFadeAndPosition: 'slowFadeAndPosition 120s ease-out infinite',
      },
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


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
        brand: {
          bg: '#080B09',
          surface: '#111713',
          card: '#161F1A',
          forest: '#20392C',
          forestDark: '#172B21',
          gold: '#C5A56A',
          goldLight: '#DFC38E',
          goldDark: '#9C7E44',
          text: '#F4F1E8',
          textMuted: '#A4ADA5',
          border: 'rgba(255, 255, 255, 0.12)',
          borderSubtle: 'rgba(255, 255, 255, 0.06)'
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      }
    },
  },
  plugins: [],
}


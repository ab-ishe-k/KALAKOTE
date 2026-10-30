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
          bg: '#F8FAFC',             // Bright, clean slate-white background
          surface: '#FFFFFF',        // Pure white card surfaces
          card: '#F1F5F9',           // Subtle card hover
          forest: '#166534',         // Deep Emerald/Alpine green
          forestDark: '#14532D',
          gold: '#D97706',           // Vibrant Warm Amber-Gold
          goldLight: '#F59E0B',      // Bright Golden Amber
          goldDark: '#B45309',       // Deep rich ochre gold
          cyan: '#0284C7',           // Crisp cartographic sky blue
          amber: '#EA580C',          // Coal Ember Accent
          text: '#0F172A',           // Crisp Deep Slate text (Ultra readable)
          textMuted: '#64748B',      // Refined slate muted body
          border: 'rgba(15, 23, 42, 0.08)',
          borderSubtle: 'rgba(15, 23, 42, 0.04)'
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


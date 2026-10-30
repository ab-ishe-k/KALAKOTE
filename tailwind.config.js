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
          bg: '#0F1318',             // Refined Deep Charcoal Slate (replaces muddy pitch black #080B09)
          surface: '#171C23',        // Elevated Card Surface
          card: '#1F2630',           // Interactive Card Hover/Focus
          forest: '#20392C',
          forestDark: '#172B21',
          gold: '#D4AF37',           // Vibrant Warm Heritage Gold
          goldLight: '#ECD078',      // Bright Amber Gold
          goldDark: '#A68424',
          cyan: '#38BDF8',           // Tech & Cartographic Accent
          amber: '#F59E0B',          // Coal Ember Accent
          text: '#F8F9FA',           // Crisp Ivory White
          textMuted: '#94A3B8',      // Slate Muted Typography
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


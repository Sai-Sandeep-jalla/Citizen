/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'highlight-orange-primary': '#F97316',
        'highlight-orange-dark': '#EA580C',
        'highlight-orange-light': '#FFF7ED',
        'govt-blue-navy': '#0B1E47',
        'govt-blue-royal': '#1D4ED8',
        'govt-blue-soft': '#EFF6FF',
        'surface-white': '#FFFFFF',
        'surface-bg': '#F8FAFC',
        'border-neutral': '#E2E8F0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%': { transform: 'scale(1.15)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          purple: '#7C3AED',
          pink: '#EC4899',
          cyan: {
            400: '#22D3EE',
            500: '#06B6D4',
            600: '#0891B2'
          },
          sky: {
            600: '#0284C7',
            700: '#0369A1',
            800: '#075985',
            900: '#0C4A6E'
          }
        },
        dark: {
          800: '#1E293B',
          900: '#0F172A'
        },
        light: {
          50: '#F8FAFC',
          100: '#F1F5F9'
        }
      },
      animation: {
        'pulse-accent': 'pulse-accent 6s ease-in-out infinite',
        'float-academic': 'float-academic 8s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 5s ease-in-out infinite'
      },
      keyframes: {
        'pulse-accent': {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' }
        },
        'float-academic': {
          '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' }
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    }
  },
  
  darkMode: 'class'
}
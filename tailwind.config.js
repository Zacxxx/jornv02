/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Game-specific color palette
      colors: {
        'game': {
          'primary': '#2085d1',
          'wood': '#e8cfa6',
          'wood-dark': '#a08262',
          'wood-darker': '#745e46',
          'dark-choc': '#91635d',
          bg: '#edf2f7',
          text: '#2a2929',
        },
        'hud': {
          'hp': '#dc2626',
          'hp-bg': 'rgba(220, 38, 38, 0.2)',
          'mp': '#2563eb',
          'mp-bg': 'rgba(37, 99, 235, 0.2)',
          'energy': '#059669',
          'energy-bg': 'rgba(5, 150, 105, 0.2)',
          'overlay': 'rgba(0, 0, 0, 0.7)',
        }
      },
      
      // Game-specific spacing
      spacing: {
        'hud': '20px',
        'container-gap': '12px',
        'portrait': '38px',
        'portrait-sm': '32px',
        'portrait-xs': '29px',
      },
      
      // Game animations
      animation: {
        'pulse-critical': 'pulse 1s ease-in-out infinite',
        'pulse-warning': 'pulse 2s ease-in-out infinite',
        'gain-flash': 'gain-flash 0.6s ease-out',
        'loss-flash': 'loss-flash 0.6s ease-out',
        'slide-in-right': 'slideInFromRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-in-left': 'slideInFromLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      
      keyframes: {
        'gain-flash': {
          '0%': { backgroundColor: 'rgba(34, 197, 94, 0.3)' },
          '50%': { backgroundColor: 'rgba(34, 197, 94, 0.6)' },
          '100%': { backgroundColor: 'transparent' },
        },
        'loss-flash': {
          '0%': { backgroundColor: 'rgba(239, 68, 68, 0.3)' },
          '50%': { backgroundColor: 'rgba(239, 68, 68, 0.6)' },
          '100%': { backgroundColor: 'transparent' },
        },
        'slideInFromRight': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slideInFromLeft': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      
      // Game-specific typography
      fontFamily: {
        'pixel-1': ['"VT323"', 'monospace'],
        'pixel-2': ['"Pixelify Sans"', 'sans-serif'],
        'game': ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      
      // Game-specific shadows
      boxShadow: {
        'hud': '0 4px 12px rgba(0, 0, 0, 0.4)',
        'hud-hover': '0 8px 20px rgba(0, 0, 0, 0.5)',
        'game-panel': '0 12px 40px rgba(0, 0, 0, 0.4)',
        'portrait': 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 1px 3px rgba(0, 0, 0, 0.4)',
        'portrait-hover': 'inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 2px 6px rgba(0, 0, 0, 0.5)',
      },
      
      // Game-specific backdrop blur
      backdropBlur: {
        'game': '10px',
        'hud': '4px',
      },
      
      // Responsive breakpoints optimized for game UI
      screens: {
        'game-sm': '480px',
        'game-md': '768px',
        'game-lg': '1024px',
        'game-xl': '1200px',
      },
    },
  },
  plugins: [
    // Custom utilities for game-specific needs
    function({ addUtilities }) {
      const newUtilities = {
        '.pixelated': {
          'image-rendering': 'pixelated',
          'image-rendering': '-moz-crisp-edges',
          'image-rendering': 'crisp-edges',
        },
        '.no-select': {
          '-webkit-user-select': 'none',
          '-moz-user-select': 'none',
          '-ms-user-select': 'none',
          'user-select': 'none',
          'pointer-events': 'none',
        },
        '.viewport-scale': {
          'transform': 'scale(var(--ui-scale, 1))',
          'transform-origin': 'top left',
        },
        '.hud-position': {
          'position': 'fixed',
          'top': 'var(--container-padding, 20px)',
          'left': 'var(--container-padding, 20px)',
          'z-index': '1000',
        },
      }
      addUtilities(newUtilities)
    }
  ],
} 
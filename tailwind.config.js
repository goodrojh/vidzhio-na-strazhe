/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#15151A',
          900: '#15151A',
          800: '#23232B',
          700: '#2A2620',
          500: '#5A5A66',
        },
        cream: {
          DEFAULT: '#F7F4EF',
          100: '#FBF9F5',
          200: '#EFEAE1',
          300: '#E4DCCD',
        },
        gold: {
          DEFAULT: '#B68A4E',
          dark: '#9A7238',
          light: '#C7A574',
          soft: '#EFE6D6',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 60px -30px rgba(21, 21, 26, 0.28)',
        card: '0 18px 44px -24px rgba(21, 21, 26, 0.25)',
        gold: '0 14px 30px -12px rgba(182, 138, 78, 0.5)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.8s ease-out both',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#161C3A',
          900: '#0E1226',
          800: '#161C3A',
          700: '#1F2750',
          600: '#2B356B',
        },
        brand: {
          orange: '#F26A21',
          orangeDark: '#D9560F',
          teal: '#1BA9AC',
          tealDark: '#15888A',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'Segoe UI', 'sans-serif'],
        display: ['Montserrat', 'Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 20px 50px -20px rgba(8, 12, 30, 0.45)',
        glow: '0 0 40px -8px rgba(27, 169, 172, 0.5)',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        fadeUp: 'fadeUp 0.7s ease-out both',
      },
    },
  },
  plugins: [],
}

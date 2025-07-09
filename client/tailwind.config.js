/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'acorn': ['Acorn', 'sans-serif'],
        'burtons': ['Burtons', 'cursive'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'eurostile': ['Eurostile', 'sans-serif'],
        'cascadia': ['Cascadia Code', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: '#92FF58',
          50: '#F0FFEA',
          100: '#E0FFD4',
          200: '#C2FFA8',
          300: '#A3FF7C',
          400: '#92FF58',
          500: '#73FF24',
          600: '#55EF00',
          700: '#44BC00',
          800: '#338900',
          900: '#225700',
        },
        dark: {
          DEFAULT: '#0C0C14',
          50: '#19191F',
          100: '#12121C',
          200: '#0C0C14',
          300: '#08080F',
          400: '#050509',
          500: '#020204',
          900: '#000000',
        }
      },
      textShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.2)',
        DEFAULT: '0 2px 4px rgba(0, 0, 0, 0.3)',
        lg: '0 8px 16px rgba(0, 0, 0, 0.5)',
      },
      boxShadow: {
        glow: '0 0 20px rgba(146, 255, 88, 0.5)',
        'glow-lg': '0 0 30px rgba(146, 255, 88, 0.7)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}

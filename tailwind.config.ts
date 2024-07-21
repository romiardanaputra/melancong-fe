/* eslint-disable quotes */
import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import { nextui } from '@nextui-org/react'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{ts,tsx}',
    './public/**/*.html'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        green: {
          500: '#24AE7C',
          600: '#0D2A1F'
        },
        blue: {
          500: '#79B5EC',
          600: '#152432'
        },
        red: {
          500: '#F37877',
          600: '#3E1716',
          700: '#F24E43'
        },
        light: {
          200: '#E8E9E9'
        },
        dark: {
          200: '#0D0F10',
          300: '#131619',
          400: '#1A1D21',
          500: '#363A3D',
          600: '#76828D',
          700: '#ABB8C4'
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans]
      },

      backgroundImage: {
        // any background image you want to use
        bgLanding: "url('./assets/images/bg-landing.webp')"
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate'), nextui()]
} satisfies Config

export default config

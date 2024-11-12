import TailwindForm from '@tailwindcss/forms'
import Typography from '@tailwindcss/typography'
import ScrollBar from 'tailwind-scrollbar'
import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Urbanist', 'sans-serif']
      },
      colors: {
        primary: '#02054E',
        secondary: '#F2BD00'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' }
        }
      },
      animation: {
        marquee: 'marquee 30s linear infinite'
      }
    }
  },
  plugins: [ScrollBar, TailwindForm, Typography]
} satisfies Config

import type { Config } from "tailwindcss"
import { COLORS } from './src/app/constants/color.constants'

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: COLORS,
      screens: {
        'm': '960px',
      },
      fontSize: {
        'xlresp': 'clamp(1rem, 2.5vw, 1.25rem)',
        'lgresp': 'clamp(0.875rem, 2.5vw, 1.125rem)'
      },
      dropShadow: {
        'custom-black': '0 4px 4px  rgba(0, 0, 0, 0.25)', // Определяем кастомную тень
        buttonShadow: ['0 4px 0 var(--shadow-color)'],
      },
    },
  },
  plugins: [],
} satisfies Config

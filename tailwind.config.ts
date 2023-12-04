import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      white: '#FFFFFF',
      sun: '#F7AB0A',
      slate: {
        DEFAULT: '#1F2937',
        400: 'rgb(148 163 184)'
      },
      gray: {
        DEFAULT: '#E5E5E5',
        14: '#242424',
        16: '#292929',
        20: '#333333',
        300: 'rgb(209 213 219)',
        400: 'rgb(156 163 175)',
        500: 'rgb(107 114 128)'
      }
    },
    extend: {
      fontFamily: {
        basefont: ['CascadiaMono', 'Consolas', 'monospace']
      }
    }
  },
  plugins: [require('tailwind-scrollbar')]
}
export default config

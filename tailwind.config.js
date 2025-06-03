import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    transparent: 'transparent',
    current: 'currentColor',
    extend: {
      screens: {
        ssm: '450px',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        dark: 'linear-gradient(105.67deg, #02050E 14.41%, #1D2F23 98.84%)',
        s0: 'linear-gradient(90deg, #C2B7FD 0%, #423C5E 100%)',
        s1: 'radial-gradient(97.67% 126.32% at 50% 0%, #010214 25.78%, #7A61BC 99.83%)',
        s2: 'linear-gradient(90deg, #C2B7FD 0%, #9580F7 100%)',
        
        btn: 'radial-gradient(76.25% 76.25% at 50.3% 23.75%, rgba(27, 205, 89, 0.5) 0%, rgba(179, 232, 84, 0.5) 100%)',
        btnhover: 'radial-gradient(76.25% 76.25% at 50.3% 23.75%, rgba(27, 205, 89, 0.8) 0%, rgba(179, 232, 84, 0.8) 100%)',
        btndark: 'radial-gradient(76.25% 76.25% at 50.3% 23.75%, rgba(27, 205, 89, 0.2) 0%, rgba(179, 232, 84, 0.2) 100%)',
        btndarkhover: 'radial-gradient(76.25% 76.25% at 50.3% 23.75%, rgba(27, 205, 89, 0.12) 0%, rgba(179, 232, 84, 0.12) 100%)',
        btndis: 'linear-gradient(180deg, rgba(159, 179, 159, 0.2) 0%, rgba(190, 255, 186, 0.2) 100%)',

        l1: 'linear-gradient(105.67deg, #02050E 14.41%, #1D2F23 98.84%)'

      },
      animation: {
        'spin-slow': 'spin 2s cubic-bezier(1, 0, 0, 1) infinite'
      },
      colors: {
        // light mode
        primary: { 
          DEFAULT: '#1ECA53',
        },
        border: {
          DEFAULT: '#4A5546',
        },
        tremor: {
          brand: {
            faint: colors.blue[50],
            muted: colors.blue[200],
            subtle: colors.blue[400],
            DEFAULT: '#1ECA53',
            emphasis: colors.blue[700],
            inverted: colors.white,
          },
          background: {
            muted: colors.gray[50],
            subtle: colors.gray[100],
            DEFAULT: colors.white,
            emphasis: colors.gray[700],
          },
          border: {
            DEFAULT: colors.gray[200],
          },
          ring: {
            DEFAULT: colors.gray[200],
          },
          content: {
            subtle: colors.gray[400],
            DEFAULT: colors.gray[500],
            emphasis: colors.gray[700],
            strong: colors.gray[900],
            inverted: colors.white,
          },
        },
        // dark mode
        'dark-tremor': {
          brand: {
            faint: '#0B1229',
            muted: colors.blue[950],
            subtle: colors.blue[800],
            DEFAULT: '#1ECA53',
            emphasis: colors.blue[400],
            inverted: colors.blue[950],
          },
          background: {
            muted: '#131A2B',
            subtle: colors.gray[800],
            DEFAULT: colors.gray[900],
            emphasis: colors.gray[300],
          },
          border: {
            DEFAULT: colors.gray[800],
          },
          ring: {
            DEFAULT: colors.gray[800],
          },
          content: {
            subtle: colors.gray[600],
            DEFAULT: colors.gray[500],
            emphasis: colors.gray[200],
            strong: colors.gray[50],
            inverted: colors.gray[950],
          },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [require('@headlessui/tailwindcss')],
}

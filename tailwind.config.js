/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8F0',
        dark: {
          bg: '#12151A',
          surface: '#1E232B',
          alt: '#272E38',
        },
        yaya: {
          50: '#FFF3EC',
          100: '#FFE3D3',
          400: '#F2894A',
          500: '#E8622C',
          600: '#C94F20',
        },
      },
      borderRadius: {
        card: '1.25rem',
      },
      boxShadow: {
        card: '0 6px 18px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}


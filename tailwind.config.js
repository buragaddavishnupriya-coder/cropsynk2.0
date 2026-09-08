/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        headerBlue: {
          light: '#2563EB',
          DEFAULT: '#1D4ED8',
          dark: '#1E40AF',
          deep: '#0F2B5C',
          surface: '#EFF6FF',
        },
        cropGreen: {
          light: '#4ADE80',
          DEFAULT: '#16A34A',
          dark: '#15803D',
          container: '#DCFCE7',
          glow: '#86EFAC',
        },
        sprout: '#84CC16',
        soil: '#854D0E',
        canvasBg: '#F3F4F6',
        cardBg: '#FFFFFF',
        textPrimary: '#0F172A',
        textSecondary: '#475569',
        textMuted: '#64748B',
        dangerRed: '#DC2626',
        warnAmber: '#F59E0B'
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.03)',
        'card-hover': '0 10px 25px -3px rgba(15, 23, 42, 0.08), 0 4px 10px -2px rgba(15, 23, 42, 0.04)',
        'header': '0 8px 30px -4px rgba(29, 78, 216, 0.25)',
        'glow-green': '0 0 15px rgba(34, 197, 94, 0.45)',
        'glow-blue': '0 0 15px rgba(37, 99, 235, 0.35)',
      }
    },
  },
  plugins: [],
}

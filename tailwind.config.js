/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  darkMode: 'class', // Ativa o modo escuro com classe
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FF2B2B', // vermelho claro (iFood)
          DEFAULT: '#EA1D2C', // vermelho principal (iFood)
          dark: '#B71C1C', // vermelho escuro
          soft: '#FF6F6F', // vermelho suave
          contrast: '#FFFFFF', // contraste para botões
        },
        secondary: {
          light: '#FFE5E5', // secundária clara
          DEFAULT: '#FFC1C1', // secundária principal
          dark: '#B26A6A', // secundária escura
        },
        accent: {
          light: '#FFF8E1', // amarelo claro
          DEFAULT: '#FFD600', // amarelo principal
          dark: '#B29500', // amarelo escuro
        },
        background: {
          light: '#FFFFFF', // branco
          dark: '#121212', // fundo escuro para dark mode
          muted: '#F5F5F5', // fundo neutro
        },
        surface: {
          light: '#F8F9FA',
          dark: '#1E1E1E',
        },
        text: {
          primary: 'rgb(var(--text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
          muted: 'rgb(var(--text-muted) / <alpha-value>)',
          light: '#1F2937', // gray-800 para modo claro
          dark: '#F9FAFB',  // gray-50 para modo escuro
        },
        border: {
          light: '#E5E7EB', // gray-200 para modo claro
          dark: '#374151',  // gray-700 para modo escuro
        },
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
      },
    },
  },
  plugins: [],
}


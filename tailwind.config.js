/** @type {import('tailwindcss').Config} */
export default {
  content: [],
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
          dark: '#181818', // fundo escuro para dark mode
          muted: '#F5F5F5', // fundo neutro
        },
        text: {
          light: '#181818', // texto escuro para light mode
          dark: '#FFFFFF', // texto claro para dark mode
          muted: '#757575', // texto secundário
        },
        border: {
          light: '#E0E0E0',
          dark: '#333333',
        },
      },
    },
  },
  plugins: [],
}


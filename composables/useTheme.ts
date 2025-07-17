import { ref, onMounted, watch } from 'vue'

// Estado global compartilhado (singleton)
const isDarkMode = ref(false)
const isSystemTheme = ref(true)
let isInitialized = false

export function useTheme() {
  // Detecta o modo dark/light
  const updateTheme = () => {
    if (typeof window !== 'undefined') {
      const htmlElement = document.documentElement
      isDarkMode.value = htmlElement.classList.contains('dark')
    }
  }

  // Detecta a preferência de tema do sistema
  const detectSystemTheme = (): boolean => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  }

  // Aplica o tema baseado na preferência do sistema
  const applySystemTheme = () => {
    if (typeof window !== 'undefined') {
      const prefersDark = detectSystemTheme()
      const htmlElement = document.documentElement

      if (prefersDark) {
        htmlElement.classList.add('dark')
      } else {
        htmlElement.classList.remove('dark')
      }

      updateTheme()
      localStorage.setItem('themeMode', 'system')
      isSystemTheme.value = true
    }
  }

  // Aplica a cor do tema na status bar
  const updateStatusBarColor = () => {
    if (typeof window !== 'undefined') {
      // Usa cores do Tailwind CSS definidas no config
      const themeColor = isDarkMode.value
        ? '#121212' // background.dark do Tailwind
        : '#FFFFFF' // background.light do Tailwind

      const statusBarStyle = isDarkMode.value ? 'black' : 'default'

      // Atualiza meta theme-color
      let themeMetaTag = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement
      if (!themeMetaTag) {
        themeMetaTag = document.createElement('meta')
        themeMetaTag.name = 'theme-color'
        document.head.appendChild(themeMetaTag)
      }
      themeMetaTag.content = themeColor

      // Atualiza status bar style
      let statusBarMetaTag = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]') as HTMLMetaElement
      if (!statusBarMetaTag) {
        statusBarMetaTag = document.createElement('meta')
        statusBarMetaTag.name = 'apple-mobile-web-app-status-bar-style'
        document.head.appendChild(statusBarMetaTag)
      }
      statusBarMetaTag.content = statusBarStyle
    }
  }

  // Observa mudanças no tema
  const observeThemeChanges = () => {
    if (typeof window !== 'undefined') {
      // Observa mudanças na classe do documento
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            updateTheme()
          }
        })
      })

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      })

      // Observa mudanças na preferência de tema do sistema
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', (e) => {
        if (isSystemTheme.value) {
          // Só atualiza automaticamente se estiver usando o tema do sistema
          if (e.matches) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
          updateTheme()
        }
      })
    }
  }

  // Inicializa apenas uma vez
  const initialize = () => {
    if (isInitialized || typeof window === 'undefined') return

    isInitialized = true

    // Verifica o modo de tema salvo
    const themeMode = localStorage.getItem('themeMode')
    const savedTheme = localStorage.getItem('theme')

    if (themeMode === 'system' || !themeMode) {
      // Usa o tema do sistema
      applySystemTheme()
    } else if (savedTheme) {
      // Usa o tema manual salvo
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      isSystemTheme.value = false
    } else {
      // Fallback para tema do sistema
      applySystemTheme()
    }

    updateTheme()
    observeThemeChanges()

    // Configura o watcher para status bar apenas uma vez
    watch(isDarkMode, () => {
      updateStatusBarColor()
    }, { immediate: true })
  }

  // Inicializa quando montado
  onMounted(() => {
    initialize()
  })

  // Função para alternar tema manualmente
  const toggleTheme = () => {
    if (typeof window !== 'undefined') {
      const htmlElement = document.documentElement
      htmlElement.classList.toggle('dark')

      // Salva a preferência manual
      const isDark = htmlElement.classList.contains('dark')
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
      localStorage.setItem('themeMode', 'manual')

      isSystemTheme.value = false
      updateTheme()
    }
  }

  // Função para usar o tema do sistema
  const useSystemTheme = () => {
    applySystemTheme()
  }

  return {
    isDarkMode,
    isSystemTheme,
    toggleTheme,
    useSystemTheme,
    updateStatusBarColor
  }
}

import { ref, onMounted, watch } from 'vue'

export function useTheme() {
  const isDarkMode = ref(false)

  // Detecta o modo dark/light
  const updateTheme = () => {
    if (typeof window !== 'undefined') {
      const htmlElement = document.documentElement
      isDarkMode.value = htmlElement.classList.contains('dark')
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
    }
  }

  // Inicializa
  onMounted(() => {
    updateTheme()
    observeThemeChanges()
  })

  // Atualiza status bar quando o tema muda
  watch(isDarkMode, () => {
    updateStatusBarColor()
  }, { immediate: true })

  // Função para alternar tema
  const toggleTheme = () => {
    if (typeof window !== 'undefined') {
      const htmlElement = document.documentElement
      htmlElement.classList.toggle('dark')
      updateTheme()
    }
  }

  return {
    isDarkMode,
    toggleTheme,
    updateStatusBarColor
  }
}

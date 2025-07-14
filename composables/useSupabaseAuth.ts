import { useRouter } from 'vue-router'

export function useSupabaseAuth() {
  const router = useRouter()
  const loginAnon = async () => {
    try {
      const { $supabase } = useNuxtApp() as any
      const { data, error } = await $supabase.auth.signInAnonymously()
      if (error) {
        console.error('Erro no login anônimo:', error)
        alert('Erro ao entrar como visitante: ' + error.message)
        return false
      }
      await router.push('/')
      return true
    } catch (error) {
      console.error('Erro login anônimo:', error)
      alert('Erro ao entrar como visitante!')
      return false
    }
  }

  const logout = async () => {
    try {
      const { $supabase } = useNuxtApp() as any
      await $supabase.auth.signOut()
      await router.push('/login')
    } catch (error) {
      alert('Erro ao sair!')
    }
  }

  return { loginAnon, logout }
}

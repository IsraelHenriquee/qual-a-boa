import { useRouter } from 'vue-router'
import { ref, readonly } from 'vue'

export function useSupabaseAuth() {
  const router = useRouter()
  const loading = ref(false)
  const user = ref(null)

  // Login com email e senha
  const login = async (email: string, password: string) => {
    loading.value = true
    try {
      const { $supabase } = useNuxtApp() as any
      const { data, error } = await $supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) {
        console.error('Erro no login:', error)
        throw new Error(error.message)
      }
      
      user.value = data.user
      await router.push('/')
      return { success: true, user: data.user }
    } catch (error: any) {
      console.error('Erro login:', error)
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  // Criar conta
  const register = async (email: string, password: string, fullName: string) => {
    loading.value = true
    try {
      const { $supabase } = useNuxtApp() as any
      const { data, error } = await $supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      })
      
      if (error) {
        console.error('Erro no registro:', error)
        throw new Error(error.message)
      }
      
      user.value = data.user
      return { success: true, user: data.user, needsConfirmation: !data.session }
    } catch (error: any) {
      console.error('Erro registro:', error)
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  // Login anônimo (já existente)
  const loginAnon = async () => {
    loading.value = true
    try {
      const { $supabase } = useNuxtApp() as any
      const { error } = await $supabase.auth.signInAnonymously()
      if (error) {
        console.error('Erro no login anônimo:', error)
        throw new Error(error.message)
      }
      await router.push('/')
      return { success: true }
    } catch (error: any) {
      console.error('Erro login anônimo:', error)
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  // Logout
  const logout = async () => {
    try {
      const { $supabase } = useNuxtApp() as any
      await $supabase.auth.signOut()
      user.value = null
      await router.push('/login')
    } catch (error) {
      console.error('Erro ao sair:', error)
    }
  }

  // Verificar usuário atual
  const getCurrentUser = async () => {
    try {
      const { $supabase } = useNuxtApp() as any
      const { data: { user: currentUser } } = await $supabase.auth.getUser()
      user.value = currentUser
      return currentUser
    } catch (error) {
      console.error('Erro ao obter usuário:', error)
      return null
    }
  }

  return { 
    login, 
    register, 
    loginAnon, 
    logout, 
    getCurrentUser,
    loading: readonly(loading),
    user: readonly(user)
  }
}

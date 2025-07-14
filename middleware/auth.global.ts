export default defineNuxtRouteMiddleware(async (to, from) => {
  // Permite acesso livre à página de download e login
  if (to.path === '/download' || to.path === '/login') return

  // Só executa no client
  if (process.server) return

  try {
    const { $supabase } = useNuxtApp() as { $supabase: any }
    
    // Verifica se o usuário está autenticado
    const { data: { user }, error } = await $supabase.auth.getUser()
    
    if (error || !user) {
      console.log('Usuário não autenticado, redirecionando para login')
      return navigateTo('/login')
    }
    
    console.log('Usuário autenticado:', user.id)
  } catch (error) {
    console.error('Erro no middleware auth:', error)
    return navigateTo('/login')
  }
})

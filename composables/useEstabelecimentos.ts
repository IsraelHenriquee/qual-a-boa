import { ref } from 'vue'
import type { Categoria, BuscarEstabelecimentosResponse } from '~/types/estabelecimento'

export function useEstabelecimentos() {
  const categorias = ref<Categoria[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const buscarCategorias = async () => {
    loading.value = true
    error.value = null
    try {
      const { $supabase } = useNuxtApp() as any
      const { data, error: err } = await $supabase
        .from('categorias')
        .select('id, categoria, icone') // Busca também o campo icone
        .order('categoria', { ascending: true })
      if (err) throw err
      categorias.value = data || []
    } catch (err: any) {
      error.value = err.message || 'Erro ao buscar categorias'
    } finally {
      loading.value = false
    }
  }

  // Função para buscar estabelecimentos via RPC
  const buscarEstabelecimentos = async (
    p_categoria_id?: number,
    p_comodidades_ids?: number[],
    p_page: number = 1
  ): Promise<BuscarEstabelecimentosResponse> => {
    const { $supabase } = useNuxtApp() as any
    const { data, error } = await $supabase.rpc('buscar_estabelecimentos_iniciais', {
      p_categoria_id,
      p_comodidades_ids,
      p_page
    })
    if (error) {
      console.error(error)
      return { success: false, message: error.message, data: [] }
    }
    return data as BuscarEstabelecimentosResponse
  }

  return {
    categorias,
    loading,
    error,
    buscarCategorias,
    buscarEstabelecimentos
  }
}

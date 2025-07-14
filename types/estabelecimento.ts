export interface Categoria {
  id: number
  categoria: string | null
  icone?: string | null // Nome do ícone flat vindo do banco
}

export interface Estabelecimento {
  id: number
  nome: string
  imagem_capa: string | null
  endereco: string | null
  categoria: string | null
  is_open: boolean
}

export interface BuscarEstabelecimentosResponse {
  success: boolean
  message: string
  data: Estabelecimento[]
}

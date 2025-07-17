export interface Categoria {
  id: number
  categoria: string | null
  icone?: string | null // o icone é um emogi 
}

export interface Subcategoria {
  id: number
  subcategoria: string
}

export interface Estabelecimento {
  id: number
  nome: string
  descricao: string | null
  imagem_capa: string | null
  endereco: string | null
  categoria: string | null
  categoria_id: number | null
  is_open: boolean
  horario_abertura: string | null
  horario_fechamento: string | null,
  bairro: string | null,
  subcategorias: Subcategoria[]
}

export interface BuscarEstabelecimentosResponse {
  success: boolean
  message: string
  data: Estabelecimento[]
}

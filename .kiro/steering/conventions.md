# Convenções de Código

## Idioma e Localização
- **Português brasileiro** para toda interface do usuário
- Mensagens de erro e sucesso em português
- Comentários de código em português
- **Variáveis e funções em português** (diferente do padrão técnico internacional)
- Nomes de arquivos podem manter padrão técnico quando necessário

## Vue.js e Composition API

### Estrutura de Componentes
```vue
<template>
  <!-- HTML sempre em português -->
</template>

<script setup>
// Imports primeiro
import { ref, computed } from 'vue'

// Props e emits
const props = defineProps({
  // Props com tipos TypeScript
})

const emit = defineEmits(['mudanca'])

// Refs e reactive
const carregando = ref(false)

// Computed properties
const eValido = computed(() => {
  // lógica
})

// Métodos
const lidarComEnvio = async () => {
  // lógica
}
</script>

<style scoped>
/* Estilos específicos do componente */
</style>
```

### Convenções de Nomenclatura
- **Componentes**: PascalCase (`FormularioLogin.vue`)
- **Props**: camelCase (`estaCarregando`, `nomeUsuario`)
- **Events**: kebab-case (`@usuario-atualizado`)
- **Refs**: camelCase (`const formularioUsuario = ref({})`)

## Tailwind CSS

### Classes Organizadas
```vue
<div class="
  w-full max-w-md 
  bg-background-light dark:bg-background-dark 
  rounded-xl shadow-2xl 
  p-6 mx-auto 
  backdrop-blur-sm
">
```

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Dark mode: `dark:` prefix

### Cores Customizadas
- `primary` - Vermelho principal (#EA1D2C)
- `secondary` - Cores secundárias
- `background-light/dark` - Fundos
- `text-primary/secondary/muted` - Textos

## TypeScript

### Interfaces
```typescript
interface Usuario {
  id: string
  email: string
  nomeCompleto: string
  criadoEm: Date
}
```

### Composables
```typescript
export function useAutenticacaoSupabase() {
  const carregando = ref(false)
  
  const fazerLogin = async (email: string, senha: string) => {
    // implementação
    return { sucesso: boolean, erro?: string }
  }
  
  return { 
    fazerLogin,
    carregando: readonly(carregando)
  }
}
```

## Tratamento de Erros

### Padrão de Retorno
```typescript
// Sempre retornar objeto com sucesso
return { 
  sucesso: true, 
  dados: resultado 
}

// Em caso de erro
return { 
  sucesso: false, 
  erro: 'Mensagem em português' 
}
```

### Mensagens de Erro
- Sempre em português
- Específicas e úteis para o usuário
- Evitar termos técnicos

## Formulários

### Validação
- Validação client-side
- Mensagens claras em português
- Estados visuais (erro, sucesso, loading)

### Estrutura Padrão
```vue
<BaseInput 
  v-model="formulario.email"
  label="E-mail" 
  placeholder="Digite seu e-mail" 
  type="email"
  :disabled="carregando"
/>
```

## Estado e Stores

### Pinia Stores
```typescript
export const useStoreAutenticacao = defineStore('autenticacao', () => {
  const usuario = ref<Usuario | null>(null)
  const estaAutenticado = computed(() => !!usuario.value)
  
  return { usuario, estaAutenticado }
})
```

## Comentários

### Português para Toda Lógica
```typescript
// Verifica se o usuário tem permissão
if (!usuario.value?.eAdmin) {
  throw new Error('Acesso negado')
}
```

### Comentários Técnicos em Português
```typescript
// TODO: Implementar mecanismo de cache
// FIXME: Tratar caso especial para arrays vazios
// HACK: Solução temporária até refatoração
// NOTE: Esta função será depreciada na v2.0
```

## Commits e Documentação

### Mensagens de Commit
- Em português
- Formato: `tipo: descrição`
- Exemplos: `feat: adiciona login com Google`, `fix: corrige validação de email`

### Documentação
- README em português
- Comentários de código em português para lógica de negócio
- Documentação técnica pode ser em inglês
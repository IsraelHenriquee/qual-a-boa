# Estrutura do Projeto

## Organização de Pastas

```
/
├── components/          # Componentes Vue reutilizáveis
│   ├── Base/           # Componentes base (BaseButton, BaseInput, etc.)
│   └── [Funcionalidade]/ # Componentes específicos por funcionalidade
├── composables/        # Composables Vue (lógica reutilizável)
├── layouts/            # Layouts de página
├── middleware/         # Middleware de rota (auth, etc.)
├── pages/              # Páginas da aplicação (roteamento automático)
├── plugins/            # Plugins Nuxt
├── stores/             # Stores Pinia para gerenciamento de estado
├── assets/             # Assets estáticos (CSS, imagens)
├── public/             # Arquivos públicos (ícones, manifest)
├── server/             # API routes server-side
└── types/              # Definições TypeScript
```

## Convenções de Nomenclatura

### Componentes
- **PascalCase** para nomes de componentes: `FormularioLogin.vue`, `BotaoBase.vue`
- Prefixo "Base" para componentes base reutilizáveis
- Organizar por funcionalidade em subpastas quando necessário

### Composables
- **camelCase** com prefixo "use": `useAutenticacaoSupabase.ts`, `useArmazenamentoLocal.ts`
- Um composable por arquivo
- Exportar função principal como default

### Páginas
- **kebab-case** ou **camelCase**: `index.vue`, `login.vue`
- Seguir estrutura de roteamento do Nuxt

### Stores
- **camelCase** com sufixo "Store": `storeAutenticacao.ts`, `storeUsuario.ts`

## Padrões de Código

### Componentes Vue
- Usar Composition API
- Script setup syntax
- Props com TypeScript
- Emits definidos explicitamente

### Styling
- Tailwind CSS classes
- Scoped styles quando necessário
- Variáveis CSS customizadas para temas somente se necessário
- Mobile-first responsive design

### TypeScript
- Interfaces para tipos complexos
- Type guards para validações
- Evitar `any`, usar `unknown` quando necessário

## Estrutura de Componentes Base

### BotaoBase
- Variantes: primary, secondary, outline
- Estados: disabled, loading
- Slots para conteúdo flexível

### InputBase
- Tipos: text, email, password, etc.
- Labels e placeholders
- Estados de erro e validação

### Abas (Tabs)
- Navegação entre seções
- Estado ativo controlado

## Autenticação e Roteamento

### Middleware Global
- `auth.global.ts` - Proteção de rotas
- Redirecionamento para `/login` se não autenticado
- Exceções para páginas públicas

### Composable de Autenticação
- `useAutenticacaoSupabase` - Gerenciamento de autenticação
- Métodos: fazerLogin, registrar, loginAnonimo, sair
- Estados: carregando, usuario, erro

## Mobile e PWA

### Configurações
- Viewport fixo para mobile
- Manifest.json configurado
- Service Worker automático
- Ícones para diferentes tamanhos

### Capacitor
- Build iOS via `npm run ios:build`
- Configuração em `capacitor.config.ts`
- WebDir apontando para `.output/public`

## Padrões de Desenvolvimento

### Tratamento de Estados
```typescript
// Estado de carregamento
const carregando = ref(false)

// Estado de erro
const erro = ref<string | null>(null)

// Estado de dados
const dados = ref<TipoDados[]>([])
```

### Validação de Formulários
```typescript
const formularioValido = computed(() => {
  return formulario.value.email && 
         formulario.value.senha && 
         formulario.value.senha.length >= 6
})
```

### Chamadas de API
```typescript
const buscarDados = async () => {
  carregando.value = true
  erro.value = null
  
  try {
    const resultado = await api.buscar()
    dados.value = resultado.dados
  } catch (err) {
    erro.value = 'Erro ao carregar dados'
  } finally {
    carregando.value = false
  }
}
```

## Padrões de Performance

### Otimização de Listas
- Usar `v-memo` para listas grandes com dados que mudam pouco
- Lazy loading para imagens com `loading="lazy"`
- Skeleton loading states para melhor UX

```vue
<!-- v-memo para cache inteligente -->
<CardEstabelecimento 
  v-for="item in lista"
  v-memo="[item.id, item.status]"
  :key="item.id"
  :item="item"
/>

<!-- Lazy loading para imagens -->
<img :src="imagem" loading="lazy" />
```

### Error Handling
- Sempre tratar erros de forma consistente
- Usar toast notifications ou modals para feedback
- Fallbacks visuais para estados de erro

### Loading States
- Skeleton loading para componentes pesados
- Estados de loading específicos por ação
- Feedback visual imediato para interações
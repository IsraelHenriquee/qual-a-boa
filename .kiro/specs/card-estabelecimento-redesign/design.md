# Design Document

## Overview

Este documento detalha o design para a repaginação do card de estabelecimentos na página principal do aplicativo "Qual a Boa". O redesign foca em melhorar a experiência visual, otimizar o layout mobile e definir o filtro "Abertos" como padrão.

## Architecture

### Component Structure
```
CardEstabelecimento.vue (redesigned)
├── Image Section
│   ├── Cover Image / Placeholder
│   └── Status Badge (Aberto/Fechado)
├── Content Section
│   ├── Header (Nome + Categoria)
│   ├── Description
│   ├── Location & Hours Info
│   └── Subcategories Tags
└── Interactive Elements
    └── Hover Effects & Animations
```

### State Management
- O filtro "Abertos" será inicializado como `true` no componente `PaginaHome.vue`
- Estado do filtro será mantido reativo para permitir toggle pelo usuário

## Components and Interfaces

### CardEstabelecimento.vue - Redesigned

#### Visual Improvements
1. **Card Container**
   - Aumentar border-radius para 16px (mais moderno)
   - Melhorar shadow com múltiplas camadas
   - Adicionar hover effect com transform scale sutil
   - Gradiente sutil no background para depth

2. **Image Section**
   - Altura otimizada para 180px (melhor proporção)
   - Overlay gradient sutil na parte inferior
   - Placeholder redesenhado com ícone mais elegante
   - Status badge com melhor posicionamento e styling

3. **Content Layout**
   - Padding interno otimizado (16px)
   - Espaçamento vertical consistente (12px entre seções)
   - Typography hierarchy melhorada
   - Cores ajustadas para melhor contraste

#### New Design Elements

**Status Badge Redesign:**
```vue
<div class="absolute top-3 right-3">
  <div class="flex items-center gap-1 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg"
       :class="estabelecimento.is_open ? 'bg-green-500/90' : 'bg-red-500/90'">
    <div class="w-2 h-2 rounded-full bg-white animate-pulse" 
         v-if="estabelecimento.is_open"></div>
    <span class="text-white font-semibold text-xs">
      {{ estabelecimento.is_open ? 'ABERTO' : 'FECHADO' }}
    </span>
  </div>
</div>
```

**Header Section Redesign:**
```vue
<div class="flex items-start justify-between mb-3">
  <h3 class="text-xl font-bold text-gray-900 dark:text-white leading-tight flex-1 pr-3">
    {{ estabelecimento.nome }}
  </h3>
  <div class="flex-shrink-0">
    <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium"
          :class="getCategoryStyle(estabelecimento.categoria)">
      {{ estabelecimento.categoria }}
    </span>
  </div>
</div>
```

**Info Container Redesign:**
```vue
<div class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 
            rounded-xl p-3 border border-gray-200/50 dark:border-gray-600/50">
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
      <div class="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
        <span class="text-primary text-xs">📍</span>
      </div>
      <span class="text-gray-700 dark:text-gray-300 text-sm font-medium">
        {{ estabelecimento.bairro }}
      </span>
    </div>
    
    <div v-if="estabelecimento.horario_abertura" class="flex items-center gap-2">
      <div class="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
        <span class="text-primary text-xs">🕐</span>
      </div>
      <span class="text-gray-700 dark:text-gray-300 text-sm font-medium">
        {{ formatarHorario(estabelecimento.horario_abertura) }} - {{ formatarHorario(estabelecimento.horario_fechamento) }}
      </span>
    </div>
  </div>
</div>
```

### PaginaHome.vue - Filter Default Change

#### Default State Modification
```typescript
// Mudança na inicialização do filtro
const filtroAbertos = ref(true) // Alterado de false para true
```

#### Enhanced Filter Logic
```typescript
const filtrarEstabelecimentos = (query: string) => {
  let base = [...estabelecimentosOriginais.value]
  
  // Aplica filtro de abertos PRIMEIRO (já que é padrão)
  if (filtroAbertos.value) {
    base = base.filter(est => est.is_open === true)
  }
  
  // Aplica filtro de categoria se selecionado
  if (categoriaFiltro.value) {
    base = base.filter(est => est.categoria_id === categoriaFiltro.value)
  }
  
  // Aplica filtro de busca textual se houver
  if (query.trim()) {
    const queryLower = query.trim().toLowerCase()
    base = base.filter(est => 
      est.nome.toLowerCase().includes(queryLower) ||
      (est.descricao && est.descricao.toLowerCase().includes(queryLower)) ||
      (est.bairro && est.bairro.toLowerCase().includes(queryLower))
    )
  }
  
  estabelecimentos.value = base
}
```

## Data Models

### Enhanced Styling Functions

```typescript
// Nova função para estilos de categoria
const getCategoryStyle = (categoria: string | null): string => {
  const categoryStyles: Record<string, string> = {
    'Restaurante': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    'Bar': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    'Balada': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    'Café': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
    'Lanchonete': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
  }
  
  return categoryStyles[categoria || ''] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
}
```

## Error Handling

### Image Loading
- Implementar lazy loading para imagens
- Fallback graceful para imagens quebradas
- Placeholder consistente durante carregamento

### Filter State
- Manter estado do filtro durante navegação
- Feedback visual durante aplicação de filtros
- Tratamento de casos onde não há estabelecimentos abertos

## Testing Strategy

### Visual Testing
1. **Responsive Design**
   - Testar em diferentes tamanhos de tela
   - Verificar quebras de layout
   - Validar legibilidade em dispositivos móveis

2. **Dark Mode**
   - Testar contraste em modo escuro
   - Verificar visibilidade de todos os elementos
   - Validar transições entre modos

3. **Interactive Elements**
   - Testar hover effects
   - Verificar animações suaves
   - Validar feedback visual

### Functional Testing
1. **Filter Behavior**
   - Verificar inicialização com filtro ativo
   - Testar toggle do filtro
   - Validar combinação com outros filtros

2. **Performance**
   - Medir tempo de renderização
   - Testar com listas grandes
   - Verificar memory leaks em animações

### Accessibility Testing
1. **Screen Readers**
   - Testar navegação por teclado
   - Verificar labels apropriados
   - Validar estrutura semântica

2. **Color Contrast**
   - Verificar contraste mínimo WCAG
   - Testar com daltonismo
   - Validar legibilidade

## Animation & Transitions

### Card Hover Effect
```css
.card-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
```

### Status Badge Animation
```css
.status-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

### Loading States
- Skeleton loading para cards
- Smooth transitions durante filtros
- Progressive image loading

## Design Tokens

### Colors
```css
:root {
  --card-bg: #ffffff;
  --card-bg-dark: #1f2937;
  --card-border: #f3f4f6;
  --card-border-dark: #374151;
  --status-open: #10b981;
  --status-closed: #ef4444;
  --category-bg: #f9fafb;
  --category-bg-dark: #374151;
}
```

### Spacing
```css
:root {
  --card-padding: 16px;
  --card-gap: 12px;
  --card-radius: 16px;
  --badge-radius: 9999px;
}
```

### Typography
```css
:root {
  --title-size: 1.25rem;
  --title-weight: 700;
  --body-size: 0.875rem;
  --caption-size: 0.75rem;
}
```
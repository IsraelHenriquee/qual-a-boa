# Design Document

## Visão Geral

Este documento detalha o design para o redesenho da página de login do aplicativo "Qual a Boa". O objetivo é criar uma experiência visual mais consistente, especialmente no modo dark, adicionar o logo do aplicativo e harmonizar o estilo dos componentes para seguir o padrão visual do restante do aplicativo.

## Arquitetura

O redesenho manterá a arquitetura atual dos componentes, focando nas seguintes modificações:

1. Atualização do componente `BaseButton.vue` para harmonizar com o estilo dos inputs
2. Redesenho do componente `LoginForm.vue` para incluir o logo e melhorar a experiência visual
3. Ajustes na página `login.vue` para melhorar o background e a apresentação geral

## Componentes e Interfaces

### BaseButton

O componente `BaseButton` será atualizado para ter um estilo mais consistente com o `BaseInput`:

- Bordas mais arredondadas (rounded-2xl em vez de rounded-md)
- Padding vertical maior (py-4 em vez de py-2)
- Efeitos de hover e focus consistentes com os inputs
- Manter as variantes existentes (primary, secondary, outline)

### LoginForm

O componente `LoginForm` será redesenhado para:

- Adicionar o logo do aplicativo em um container vermelho no topo
- Remover o efeito de glassmorphism que causa problemas no modo dark
- Usar cores sólidas para o background (sem transparência)
- Melhorar o espaçamento e a organização dos elementos
- Adicionar elementos visuais que remetam ao conceito do aplicativo

### Página de Login

A página `login.vue` será ajustada para:

- Melhorar o background para funcionar bem em ambos os modos (claro e escuro)
- Adicionar elementos decorativos que remetam ao conceito de entretenimento e vida noturna (sem exageros)
- Garantir que a página seja responsiva e funcione bem em dispositivos móveis

## Paleta de Cores

Manteremos a paleta de cores definida no `tailwind.config.js`, com foco nas seguintes cores:

- **Primary**: #EA1D2C (vermelho principal)
- **Background Light**: #FFFFFF (modo claro)
- **Background Dark**: #121212 (modo escuro)
- **Accent**: #FFD600 (amarelo para destaques)

Para o modo dark, substituiremos o uso de transparências por cores sólidas mais escuras para evitar problemas visuais.

## Mockups

### Logo no Topo do Formulário

```
┌────────────────────────────┐
│                            │
│    ┌──────────────┐        │
│    │    🍺        │        │
│    │  QUAL A BOA  │        │
│    └──────────────┘        │
│                            │
│    [Tabs de Login/Registro]│
│                            │
│    [Campos do Formulário]  │
│                            │
│    [Botões de Ação]        │
│                            │
└────────────────────────────┘
```

### Botão Redesenhado

```
┌────────────────────────────┐
│                            │
│  ┌──────────────────────┐  │
│  │       ENTRAR         │  │
│  └──────────────────────┘  │
│                            │
└────────────────────────────┘
```

## Responsividade

O design será responsivo, adaptando-se a diferentes tamanhos de tela:

- **Mobile**: Layout vertical com largura máxima de 90% da tela
- **Tablet/Desktop**: Layout centralizado com largura máxima fixa

## Acessibilidade

Manteremos os padrões de acessibilidade:

- Contraste adequado entre texto e background
- Tamanho de fonte legível
- Foco visual claro para navegação por teclado
- Labels descritivos para todos os campos

## Estratégia de Teste

Testaremos o redesenho em:

- Modo claro e modo escuro
- Diferentes tamanhos de tela
- Diferentes navegadores
- Verificação de contraste e legibilidade
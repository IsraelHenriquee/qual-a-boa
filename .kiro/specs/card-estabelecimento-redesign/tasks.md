# Implementation Plan

- [ ] 1. Atualizar filtro padrão para estabelecimentos abertos
  - Modificar inicialização do `filtroAbertos` de `false` para `true` no componente PaginaHome.vue
  - Ajustar lógica de filtro para priorizar estabelecimentos abertos por padrão
  - Testar comportamento do filtro na inicialização da página
  - _Requirements: 2.1, 2.2_

- [x] 2. Redesenhar container principal do card
  - Atualizar classes CSS do container principal com border-radius aumentado (16px)
  - Implementar shadow melhorado com múltiplas camadas
  - Adicionar hover effects com transform scale sutil
  - Criar transições suaves para interações
  - _Requirements: 1.1, 5.1, 5.2_

- [x] 3. Melhorar seção de imagem do card
  - Ajustar altura da imagem para 180px para melhor proporção
  - Implementar placeholder redesenhado com ícone mais elegante
  - Adicionar overlay gradient sutil na parte inferior da imagem
  - Otimizar exibição de imagens para diferentes resoluções
  - _Requirements: 1.2, 1.3, 3.1_

- [x] 4. Redesenhar badge de status (Aberto/Fechado)
  - Implementar novo design com backdrop-blur e transparência
  - Adicionar indicador visual pulsante para estabelecimentos abertos
  - Melhorar posicionamento e styling do badge
  - Criar animação CSS para o efeito pulse
  - _Requirements: 4.1, 4.2, 5.4_

- [ ] 5. Reestruturar seção de cabeçalho do card
  - Reorganizar layout do nome e categoria com melhor hierarquia visual
  - Implementar função `getCategoryStyle` para cores dinâmicas por categoria
  - Ajustar typography com tamanhos e pesos otimizados
  - Melhorar espaçamento entre elementos do cabeçalho
  - _Requirements: 1.4, 4.3, 3.2_

- [ ] 6. Redesenhar container de informações (localização e horário)
  - Implementar novo design com gradiente de background
  - Adicionar ícones circulares para localização e horário
  - Melhorar layout responsivo das informações
  - Otimizar cores e contrastes para dark mode
  - _Requirements: 4.4, 3.1, 3.3_

- [ ] 7. Aprimorar seção de subcategorias
  - Melhorar styling das tags de subcategorias
  - Implementar layout mais compacto e visualmente atrativo
  - Ajustar cores e espaçamentos das tags
  - Otimizar exibição para múltiplas subcategorias
  - _Requirements: 1.4, 3.2, 4.4_

- [ ] 8. Implementar animações e transições CSS
  - Criar classes CSS para hover effects do card
  - Implementar animação pulse para status badge
  - Adicionar transições suaves para mudanças de estado
  - Otimizar performance das animações
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ] 9. Otimizar responsividade mobile
  - Ajustar padding e margins para telas pequenas
  - Verificar legibilidade de textos em dispositivos móveis
  - Otimizar tamanhos de elementos para touch interfaces
  - Testar layout em diferentes resoluções mobile
  - _Requirements: 3.1, 3.2, 3.3_

- [ ] 10. Implementar melhorias de acessibilidade
  - Adicionar labels apropriados para screen readers
  - Verificar contraste de cores conforme WCAG
  - Implementar navegação por teclado adequada
  - Testar compatibilidade com tecnologias assistivas
  - _Requirements: 1.4, 4.1, 4.2_

- [ ] 11. Criar testes unitários para componente redesenhado
  - Escrever testes para renderização do card com diferentes dados
  - Testar comportamento do filtro padrão "Abertos"
  - Verificar funcionamento das funções de formatação
  - Testar responsividade e estados visuais
  - _Requirements: 2.1, 2.2, 1.1_

- [ ] 12. Integrar e testar solução completa
  - Verificar integração entre CardEstabelecimento e PaginaHome
  - Testar performance com listas grandes de estabelecimentos
  - Validar funcionamento em modo escuro
  - Realizar testes de regressão visual
  - _Requirements: 1.1, 2.1, 3.1, 5.1_
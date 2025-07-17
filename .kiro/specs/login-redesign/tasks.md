# Implementation Plan

- [x] 1. Atualizar o componente BaseButton para harmonizar com o estilo dos inputs
  - Modificar o componente para usar bordas mais arredondadas e padding maior
  - Ajustar os efeitos de hover e focus para serem consistentes com os inputs
  - Garantir que todas as variantes (primary, secondary, outline) sejam atualizadas
  - _Requirements: 2.1, 2.2, 2.3_

- [x] 2. Criar o logo para o topo do formulário de login
  - [x] 2.1 Criar um componente para o logo do aplicativo
    - Implementar o logo com o ícone e o texto "Qual a Boa"
    - Estilizar o logo com as cores do aplicativo
    - Garantir que o logo seja responsivo
    - _Requirements: 1.1, 4.1, 4.3_

- [x] 3. Redesenhar o componente LoginForm
  - [x] 3.1 Adicionar o logo no topo do formulário
    - Integrar o componente de logo criado anteriormente
    - Posicionar o logo de forma centralizada no topo do formulário
    - _Requirements: 1.1, 4.1_
  
  - [x] 3.2 Remover o efeito de glassmorphism e melhorar o background
    - Substituir o background com transparência por cores sólidas
    - Ajustar as cores para funcionarem bem em ambos os modos (claro e escuro)
    - _Requirements: 1.2, 4.3_
  
  - [x] 3.3 Melhorar o espaçamento e a organização dos elementos
    - Ajustar o padding e as margens para melhorar a hierarquia visual
    - Garantir consistência no espaçamento entre os elementos
    - _Requirements: 1.3, 3.1_
  
  - [x] 3.4 Atualizar os estilos dos campos de formulário
    - Garantir que todos os campos tenham ícones apropriados
    - Ajustar os estilos de erro e sucesso para serem mais visíveis
    - _Requirements: 3.1, 3.2, 3.3_

- [x] 4. Ajustar a página de login
  - [x] 4.1 Melhorar o background da página
    - Criar um background que funcione bem em ambos os modos (claro e escuro)
    - Adicionar elementos decorativos que remetam ao conceito do aplicativo
    - _Requirements: 1.2, 4.1, 4.2_
  
  - [x] 4.2 Garantir responsividade
    - Testar e ajustar o layout para diferentes tamanhos de tela
    - Garantir que a página seja utilizável em dispositivos móveis
    - _Requirements: 1.3, 4.2_


- [x] 5. Testar e ajustar
  - [x] 5.1 Testar em modo claro e escuro
    - Verificar se todos os elementos estão visíveis e legíveis em ambos os modos
    - Ajustar cores e contrastes conforme necessário
    - _Requirements: 1.2, 4.3_
  
  - [x] 5.2 Testar em diferentes tamanhos de tela
    - Verificar se o layout se adapta corretamente a diferentes tamanhos de tela
    - Ajustar o layout conforme necessário
    - _Requirements: 1.3, 4.2_

    - [x] 6. BaseInput
  - Colocar icone de visualizar senha qunado for senha
  - Verificar porque o input da pagina home de pesquisa o icone está mais para cima e nao centralizado na vertical.
  - _Requirements: X.X_


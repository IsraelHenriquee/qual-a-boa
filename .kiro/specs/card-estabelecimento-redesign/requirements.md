# Requirements Document

## Introduction

Este documento define os requisitos para a repaginação do card de estabelecimentos na página principal do aplicativo "Qual a Boa". O objetivo é modernizar o design visual, melhorar a experiência do usuário e ajustar o comportamento padrão do filtro de estabelecimentos abertos.

## Requirements

### Requirement 1

**User Story:** Como usuário do app, eu quero ver cards de estabelecimentos mais atraentes visualmente, para que eu tenha uma melhor experiência ao navegar pelos locais disponíveis.

#### Acceptance Criteria

1. WHEN o usuário visualiza a lista de estabelecimentos THEN o sistema SHALL exibir cards com design moderno e atrativo
2. WHEN o card possui imagem de capa THEN o sistema SHALL exibir a imagem com melhor proporção e qualidade visual
3. WHEN o card não possui imagem THEN o sistema SHALL exibir um placeholder elegante e consistente
4. WHEN o usuário visualiza as informações do estabelecimento THEN o sistema SHALL apresentar hierarquia visual clara entre nome, categoria, descrição e detalhes

### Requirement 2

**User Story:** Como usuário interessado em locais abertos, eu quero que o filtro "Abertos" esteja ativado por padrão, para que eu veja primeiro os estabelecimentos que estão funcionando no momento.

#### Acceptance Criteria

1. WHEN o usuário acessa a página inicial THEN o sistema SHALL ativar automaticamente o filtro "Abertos" como true
2. WHEN o filtro "Abertos" está ativo THEN o sistema SHALL exibir apenas estabelecimentos com status is_open = true
3. WHEN o usuário desativa o filtro "Abertos" THEN o sistema SHALL exibir todos os estabelecimentos independente do status

### Requirement 3

**User Story:** Como usuário mobile, eu quero que os cards tenham melhor aproveitamento do espaço e sejam mais fáceis de ler, para que eu consiga visualizar mais informações de forma clara em telas pequenas.

#### Acceptance Criteria

1. WHEN o usuário visualiza os cards em dispositivos móveis THEN o sistema SHALL otimizar o layout para telas pequenas
2. WHEN há múltiplas informações no card THEN o sistema SHALL organizar os elementos com espaçamento adequado
3. WHEN o texto é muito longo THEN o sistema SHALL truncar adequadamente mantendo legibilidade
4. WHEN o usuário interage com o card THEN o sistema SHALL fornecer feedback visual apropriado

### Requirement 4

**User Story:** Como usuário que busca estabelecimentos, eu quero ver informações importantes de forma mais destacada, para que eu possa tomar decisões rápidas sobre onde ir.

#### Acceptance Criteria

1. WHEN o estabelecimento está aberto THEN o sistema SHALL destacar visualmente o status "ABERTO" com cor verde
2. WHEN o estabelecimento está fechado THEN o sistema SHALL destacar visualmente o status "FECHADO" com cor vermelha
3. WHEN há horário de funcionamento THEN o sistema SHALL exibir as informações de forma clara e legível
4. WHEN há categoria e subcategorias THEN o sistema SHALL apresentar essas informações de forma organizada e visualmente atrativa

### Requirement 5

**User Story:** Como usuário que navega pelo app, eu quero que os cards tenham animações suaves e transições elegantes, para que a experiência seja mais fluida e moderna.

#### Acceptance Criteria

1. WHEN o usuário faz hover sobre um card THEN o sistema SHALL aplicar efeito de elevação suave
2. WHEN os cards são carregados THEN o sistema SHALL aplicar transições suaves nos elementos visuais
3. WHEN há mudanças de estado THEN o sistema SHALL animar as transições de forma elegante
4. WHEN o usuário interage com elementos do card THEN o sistema SHALL fornecer feedback visual imediato
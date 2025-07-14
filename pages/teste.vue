<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark p-4">
    <h1 class="text-2xl font-bold mb-6 text-primary">Teste de Componentes</h1>
    <BaseInput label="Seu nome" placeholder="Digite seu nome" class="mb-4 max-w-xs" />
    <BaseButton class="mb-2 max-w-xs w-full">Botão Primário</BaseButton>
    <BaseButton variant="secondary" class="max-w-xs w-full">Botão Secundário</BaseButton>
  </div>
</template>

<script setup>
// Nada necessário aqui
</script>

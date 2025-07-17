<template>
  <div class="flex flex-col w-full px-2">
    <CardEstabelecimento
      v-for="estab in estabelecimentos"
      v-memo="[estab.id, estab.is_open, estab.nome, estab.categoria_id]"
      :key="estab.id"
      :estabelecimento="estab"
    />
  </div>
</template>

<script setup lang="ts">
import CardEstabelecimento from './CardEstabelecimento.vue'
import type { Estabelecimento } from '~/types/estabelecimento'

defineProps<{ estabelecimentos: Estabelecimento[] }>()
</script>

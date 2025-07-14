<template>
  <DefaultLayout>
    <div class="text-center mt-10">
      <h1 class="text-2xl font-bold text-primary">Perfil</h1>
      <p>Esta é a página de perfil.</p>
      <BaseButton class="mt-8" @click="logout">Sair (Logout)</BaseButton>
    </div>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '~/layouts/DefaultLayout.vue'
import BaseButton from '~/components/BaseButton.vue'
import { useSupabaseAuth } from '~/composables/useSupabaseAuth'

const { logout } = useSupabaseAuth()
</script>

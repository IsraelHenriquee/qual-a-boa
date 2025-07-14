<template>
  <div class="w-full max-w-md bg-background-light dark:bg-background-dark rounded-xl shadow-2xl p-6 mx-auto backdrop-blur-sm" style="width: 100%; max-width: 24rem;">
    <!-- Tabs -->
    <BaseTabs 
      :tabs="tabs" 
      :active-tab="activeTab" 
      @change="activeTab = $event" 
    />

    <!-- Login Form -->
    <div v-if="activeTab === 'login'" class="space-y-4">
      <BaseInput 
        label="E-mail" 
        placeholder="Digite seu e-mail" 
        type="email"
      />
      <BaseInput 
        label="Senha" 
        placeholder="Digite sua senha" 
        type="password"
      />
      
      <div class="flex items-center justify-end text-sm">
        <BaseButton variant="outline" class="text-xs px-0 py-0 border-none shadow-none hover:shadow-none">
          Esqueceu a senha?
        </BaseButton>
      </div>

      <BaseButton class="w-full">
        Entrar
      </BaseButton>
      
      <BaseButton variant="outline" class="w-full" @click="loginAnon">
        Entrar como visitante
      </BaseButton>
    </div>

    <!-- Register Form -->
    <div v-else class="space-y-4">
      <BaseInput 
        label="Nome completo" 
        placeholder="Digite seu nome completo"
      />
      <BaseInput 
        label="E-mail" 
        placeholder="Digite seu e-mail" 
        type="email"
      />
      <BaseInput 
        label="Senha" 
        placeholder="Crie uma senha segura" 
        type="password"
      />
      <BaseInput 
        label="Confirmar senha" 
        placeholder="Confirme sua senha" 
        type="password"
      />

      <BaseButton class="w-full">
        Criar conta
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSupabaseAuth } from '~/composables/useSupabaseAuth'

const activeTab = ref('login')
const router = useRouter()
const { loginAnon } = useSupabaseAuth()

const tabs = [
  { id: 'login', label: 'Entrar' },
  { id: 'register', label: 'Criar conta' }
]
</script>

<style scoped>
/* Glassmorphism effect */
.backdrop-blur-sm {
  backdrop-filter: blur(10px);
}
</style>

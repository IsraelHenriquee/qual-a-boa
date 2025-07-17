<template>
  <!-- IMPORTANTE: NÃO ALTERAR A LARGURA - DEVE SER FIXA PARA EVITAR MUDANÇA DE TAMANHO ENTRE ABAS -->
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 mx-auto" style="width: 24rem; min-height: 32rem;">
    <!-- Logo -->
    <div class="flex justify-center mb-6">
      <AppLogo />
    </div>

    <!-- Tabs -->
    <BaseTabs :tabs="tabs" :active-tab="activeTab" @change="activeTab = $event" />

    <!-- Error Message -->
    <div v-if="errorMessage"
      class="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-primary rounded-r-lg text-red-700 dark:text-red-300 text-sm flex items-start">
      <svg class="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd" />
      </svg>
      <span>{{ errorMessage }}</span>
    </div>

    <!-- Success Message -->
    <div v-if="successMessage"
      class="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border-l-4 border-success rounded-r-lg text-green-700 dark:text-green-300 text-sm flex items-start">
      <svg class="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clip-rule="evenodd" />
      </svg>
      <span>{{ successMessage }}</span>
    </div>

    <!-- Login Form -->
    <div v-if="activeTab === 'login'" class="space-y-4">
      <BaseInput v-model="loginForm.email" label="E-mail" placeholder="Digite seu e-mail" type="email" icon="email"
        :disabled="loading" />
      <BaseInput v-model="loginForm.password" label="Senha" placeholder="Digite sua senha" type="password"
        icon="password" :disabled="loading" />

      <div class="flex items-center justify-end">
        <BaseButton variant="outline" class="text-sm px-0 py-0 border-none hover:text-primary">
          Esqueceu a senha?
        </BaseButton>
      </div>

      <div class="pt-2">
        <BaseButton class="w-full mb-3" @click="handleLogin"
          :disabled="loading || !loginForm.email || !loginForm.password">
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </BaseButton>

        <BaseButton variant="outline" class="w-full" @click="handleLoginAnon" :disabled="loading">
          {{ loading ? 'Entrando...' : 'Entrar como visitante' }}
        </BaseButton>
      </div>
    </div>

    <!-- Register Form -->
    <div v-else class="space-y-4">
      <BaseInput v-model="registerForm.fullName" label="Nome completo" placeholder="Digite seu nome completo"
        icon="user" :disabled="loading" />
      <BaseInput v-model="registerForm.email" label="E-mail" placeholder="Digite seu e-mail" type="email" icon="email"
        :disabled="loading" />
      <BaseInput v-model="registerForm.password" label="Senha" placeholder="Crie uma senha segura" type="password"
        icon="password" :disabled="loading" />
      <BaseInput v-model="registerForm.confirmPassword" label="Confirmar senha" placeholder="Confirme sua senha"
        type="password" icon="password" :disabled="loading" />

      <div class="pt-2">
        <BaseButton class="w-full" @click="handleRegister" :disabled="loading || !isRegisterFormValid">
          {{ loading ? 'Criando conta...' : 'Criar conta' }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSupabaseAuth } from '~/composables/useSupabaseAuth'
import AppLogo from '~/components/AppLogo.vue'

const activeTab = ref('login')
const router = useRouter()
const { login, register, loginAnon, loading } = useSupabaseAuth()

// Messages
const errorMessage = ref('')
const successMessage = ref('')

// Forms
const loginForm = ref({
  email: '',
  password: ''
})

const registerForm = ref({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const tabs = [
  { id: 'login', label: 'Entrar' },
  { id: 'register', label: 'Criar conta' }
]

// Computed
const isRegisterFormValid = computed(() => {
  return registerForm.value.fullName &&
    registerForm.value.email &&
    registerForm.value.password &&
    registerForm.value.confirmPassword &&
    registerForm.value.password === registerForm.value.confirmPassword &&
    registerForm.value.password.length >= 6
})

// Methods
const clearMessages = () => {
  errorMessage.value = ''
  successMessage.value = ''
}

const handleLogin = async () => {
  clearMessages()

  if (!loginForm.value.email || !loginForm.value.password) {
    errorMessage.value = 'Preencha todos os campos'
    return
  }

  const result = await login(loginForm.value.email, loginForm.value.password)

  if (!result.success) {
    errorMessage.value = result.error || 'Erro ao fazer login'
  }
}

const handleRegister = async () => {
  clearMessages()

  if (!isRegisterFormValid.value) {
    errorMessage.value = 'Preencha todos os campos corretamente'
    return
  }

  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    errorMessage.value = 'As senhas não coincidem'
    return
  }

  if (registerForm.value.password.length < 6) {
    errorMessage.value = 'A senha deve ter pelo menos 6 caracteres'
    return
  }

  const result = await register(
    registerForm.value.email,
    registerForm.value.password,
    registerForm.value.fullName
  )

  if (result.success) {
    if (result.needsConfirmation) {
      successMessage.value = 'Conta criada! Verifique seu email para confirmar.'
    } else {
      successMessage.value = 'Conta criada com sucesso!'
      // Redireciona após um breve delay
      setTimeout(() => {
        router.push('/')
      }, 1500)
    }

    // Limpa o formulário
    registerForm.value = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  } else {
    errorMessage.value = result.error || 'Erro ao criar conta'
  }
}

const handleLoginAnon = async () => {
  clearMessages()
  const result = await loginAnon()

  if (!result.success) {
    errorMessage.value = result.error || 'Erro ao entrar como visitante'
  }
}

// Clear messages when switching tabs
watch(activeTab, () => {
  clearMessages()
})
</script>

<style scoped>
/* Estilos específicos para o formulário de login */
</style>

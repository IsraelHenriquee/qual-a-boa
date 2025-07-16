<template>
  <div class="w-full max-w-md bg-background-light dark:bg-background-dark rounded-xl shadow-2xl p-6 mx-auto backdrop-blur-sm" style="width: 100%; max-width: 24rem;">
    <!-- Tabs -->
    <BaseTabs 
      :tabs="tabs" 
      :active-tab="activeTab" 
      @change="activeTab = $event" 
    />

    <!-- Error Message -->
    <div v-if="errorMessage" class="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300 text-sm">
      {{ errorMessage }}
    </div>

    <!-- Success Message -->
    <div v-if="successMessage" class="mb-4 p-3 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-lg text-green-700 dark:text-green-300 text-sm">
      {{ successMessage }}
    </div>

    <!-- Login Form -->
    <div v-if="activeTab === 'login'" class="space-y-4">
      <BaseInput 
        v-model="loginForm.email"
        label="E-mail" 
        placeholder="Digite seu e-mail" 
        type="email"
        :disabled="loading"
      />
      <BaseInput 
        v-model="loginForm.password"
        label="Senha" 
        placeholder="Digite sua senha" 
        type="password"
        :disabled="loading"
      />
      
      <div class="flex items-center justify-end text-sm">
        <BaseButton variant="outline" class="text-xs px-0 py-0 border-none shadow-none hover:shadow-none">
          Esqueceu a senha?
        </BaseButton>
      </div>

      <BaseButton 
        class="w-full" 
        @click="handleLogin"
        :disabled="loading || !loginForm.email || !loginForm.password"
      >
        {{ loading ? 'Entrando...' : 'Entrar' }}
      </BaseButton>
      
      <BaseButton 
        variant="outline" 
        class="w-full" 
        @click="handleLoginAnon"
        :disabled="loading"
      >
        {{ loading ? 'Entrando...' : 'Entrar como visitante' }}
      </BaseButton>
    </div>

    <!-- Register Form -->
    <div v-else class="space-y-4">
      <BaseInput 
        v-model="registerForm.fullName"
        label="Nome completo" 
        placeholder="Digite seu nome completo"
        :disabled="loading"
      />
      <BaseInput 
        v-model="registerForm.email"
        label="E-mail" 
        placeholder="Digite seu e-mail" 
        type="email"
        :disabled="loading"
      />
      <BaseInput 
        v-model="registerForm.password"
        label="Senha" 
        placeholder="Crie uma senha segura" 
        type="password"
        :disabled="loading"
      />
      <BaseInput 
        v-model="registerForm.confirmPassword"
        label="Confirmar senha" 
        placeholder="Confirme sua senha" 
        type="password"
        :disabled="loading"
      />

      <BaseButton 
        class="w-full"
        @click="handleRegister"
        :disabled="loading || !isRegisterFormValid"
      >
        {{ loading ? 'Criando conta...' : 'Criar conta' }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSupabaseAuth } from '~/composables/useSupabaseAuth'

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
/* Glassmorphism effect */
.backdrop-blur-sm {
  backdrop-filter: blur(10px);
}
</style>

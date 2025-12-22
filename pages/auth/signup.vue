<template>
      <div class="w-full border-[0.5px] border-gray-50 rounded-2xl max-w-lg">
        <div class="bg-white rounded-2xl border-[0.5px] border-gray-50 p-6 sm:p-8 lg:p-10">
          <!-- Logo -->
          <div class="flex justify-center mb-6">
            <div class="flex items-center gap-2">
              <img src="@/assets/img/logo.png" class="h-10 w-auto" />
            </div>
          </div>

          <h2 class="text-2xl font-bold text-center text-gray-900 mb-2">Create Your Account</h2>
          <p class="text-center text-sm text-gray-600 mb-8">Register to access iCCare Biobank platform</p>

          <form @submit.prevent="handleSignup" class="space-y-5">
            <div>
              <label for="fullname" class="block text-sm font-medium text-gray-700 mb-2">Full name</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input id="fullname" v-model="signupForm.fullname" type="text" placeholder="Example@email.com"
                  class="custom-input" required />
              </div>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input id="email" v-model="signupForm.email" type="email" placeholder="Example@email.com"
                  class="custom-input" required />
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input id="password" v-model="signupForm.password" :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••••••••••" class="custom-input" required />
                <button type="button" @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg v-if="!showPassword" class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input id="confirmPassword" v-model="signupForm.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'" placeholder="••••••••••••••••" class="custom-input"
                  required />
                <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg v-if="!showConfirmPassword" class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
            </div>

       <div class="pt-5">
               <button type="submit" :disabled="loading"
              class="w-full bg-[#0284C7] text-sm text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
              {{ loading ? 'Signing Up...' : 'Sign Up' }}
            </button>
       </div>
          </form>

          <p class="text-center text-sm text-[#191A1A] mt-6">
            Already have an account?
            <NuxtLink to="/auth/login" class="text-[#0E7D0E] font-semibold">Sign In</NuxtLink>
          </p>

          <p class="text-center text-sm text-[#191A1A] mt-6">
            By Creating an account you automatically accept to our
            <a href="#" class="text-[#0E7D0E] hover:underline">Terms of Service</a> and
            <a href="#" class="text-[#0E7D0E] hover:underline">Policy Privacy</a>.
          </p>

        </div>
      </div>
</template>

<script setup lang="ts">
import { useSignup } from "@/composables/modules/auth/useSignup"
interface SignupForm {
  fullname: string
  email: string
  password: string
  confirmPassword: string
}

const signupForm = ref<SignupForm>({
  fullname: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const { loading,
  signup } = useSignup()

const handleSignup = async () => {
  if (signupForm.value.password !== signupForm.value.confirmPassword) {
    alert('Passwords do not match')
    return
  }

   // Split full name into first and last name
  const nameParts = signupForm.value.fullname.trim().split(/\s+/)
  const firstName = nameParts[0] || ''
  const lastName = nameParts.slice(1).join(' ') || nameParts[0] || ''

  const payloadObj = {
    first_name: firstName,
    last_name: lastName,
    email: signupForm.value.email,
    password: signupForm.value.password,
    password_confirm: signupForm.value.confirmPassword
  }

  await signup(payloadObj)
}

// Define the layout to use
definePageMeta({
  layout: 'auth'
})

</script>
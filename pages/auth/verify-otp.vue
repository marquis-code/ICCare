<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gray-50">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
        <h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-3">Verify Email Account</h2>
        <p class="text-center text-gray-600 mb-10">Kindly input the code sent to your Email account</p>

        <form @submit.prevent="handleVerify" class="space-y-8">
          <div class="flex justify-center gap-3 sm:gap-4">
            <input
              v-for="(digit, index) in verificationCode"
              :key="index"
              :ref="el => { if (el) inputRefs[index] = el as HTMLInputElement }"
              v-model="verificationCode[index]"
              type="text"
              maxlength="1"
              inputmode="numeric"
              pattern="[0-9]"
              @input="handleInput(index, $event)"
              @keydown="handleKeydown(index, $event)"
              @paste="handlePaste"
              class="w-16 h-16 sm:w-20 sm:h-20 text-center text-2xl font-semibold border-[0.5px] border-gray-100 rounded-xl focus:border-[#0e7490] focus:ring-2 focus:ring-[#0e7490] focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            :disabled="isLoading || !isCodeComplete"
            class="w-full bg-[#0e7490] hover:bg-[#0d5563] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isLoading ? 'Verifying...' : 'Verify' }}
          </button>
        </form>

        <p class="text-center text-sm text-gray-600 mt-6">
          Don't receive code sent? 
          <button
            @click="handleResend"
            :disabled="resendTimer > 0 || isResending"
            class="text-green-600 hover:text-green-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isResending ? 'Sending...' : `Resend ${resendTimer > 0 ? `(${resendTimer})` : ''}` }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const verificationCode = ref<string[]>(['', '', '', ''])
const inputRefs = ref<HTMLInputElement[]>([])
const isLoading = ref(false)
const isResending = ref(false)
const resendTimer = ref(34)
let timerInterval: NodeJS.Timeout | null = null

const isCodeComplete = computed(() => {
  return verificationCode.value.every(digit => digit.length === 1 && /^\d$/.test(digit))
})

const handleInput = (index: number, event: Event) => {
  const input = event.target as HTMLInputElement
  const value = input.value

  // Only allow numbers
  if (!/^\d*$/.test(value)) {
    verificationCode.value[index] = ''
    return
  }

  if (value && index < 3) {
    // Move to next input
    inputRefs.value[index + 1]?.focus()
  }
}

const handleKeydown = (index: number, event: KeyboardEvent) => {
  if (event.key === 'Backspace' && !verificationCode.value[index] && index > 0) {
    // Move to previous input on backspace if current is empty
    inputRefs.value[index - 1]?.focus()
  } else if (event.key === 'ArrowLeft' && index > 0) {
    inputRefs.value[index - 1]?.focus()
  } else if (event.key === 'ArrowRight' && index < 3) {
    inputRefs.value[index + 1]?.focus()
  }
}

const handlePaste = (event: ClipboardEvent) => {
  event.preventDefault()
  const pastedData = event.clipboardData?.getData('text').trim()
  
  if (pastedData && /^\d{4}$/.test(pastedData)) {
    verificationCode.value = pastedData.split('')
    inputRefs.value[3]?.focus()
  }
}

const startResendTimer = () => {
  resendTimer.value = 34
  
  if (timerInterval) {
    clearInterval(timerInterval)
  }
  
  timerInterval = setInterval(() => {
    resendTimer.value--
    if (resendTimer.value <= 0) {
      if (timerInterval) {
        clearInterval(timerInterval)
        timerInterval = null
      }
    }
  }, 1000)
}

const handleVerify = async () => {
  if (!isCodeComplete.value) return

  isLoading.value = true
  try {
    const code = verificationCode.value.join('')
    
    // Your API call here using your existing API factory/composables
    // Example:
    // const { data, error } = await useApiFetch('/auth/verify-otp', {
    //   method: 'POST',
    //   body: { code }
    // })
    
    // if (error.value) {
    //   throw new Error(error.value.message)
    // }
    
    // Navigate to login page after successful verification
    await navigateTo('/auth/login')
  } catch (error) {
    console.error('Verification error:', error)
    // Reset the code on error
    verificationCode.value = ['', '', '', '']
    inputRefs.value[0]?.focus()
    // Handle error appropriately (show toast/notification)
  } finally {
    isLoading.value = false
  }
}

const handleResend = async () => {
  if (resendTimer.value > 0 || isResending.value) return
  
  isResending.value = true
  try {
    // Your API call here using your existing API factory/composables
    // Example:
    // const { data, error } = await useApiFetch('/auth/resend-otp', {
    //   method: 'POST'
    // })
    
    // if (error.value) {
    //   throw new Error(error.value.message)
    // }
    
    // Start the countdown timer
    startResendTimer()
    
    // Show success message (toast/notification)
    console.log('Verification code resent successfully')
  } catch (error) {
    console.error('Resend error:', error)
    // Handle error appropriately
  } finally {
    isResending.value = false
  }
}

onMounted(() => {
  // Focus first input on mount
  nextTick(() => {
    inputRefs.value[0]?.focus()
  })
  
  // Start countdown timer
  startResendTimer()
})

onUnmounted(() => {
  // Cleanup timer on component unmount
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})
</script>
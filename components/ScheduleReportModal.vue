<template>
  <Transition name="modal">
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-50 overflow-y-auto"
      @click.self="handleClose">
      <!-- Backdrop -->
      <div class="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-lg bg-black bg-opacity-50 transition-opacity"></div>
      
      <!-- Modal -->
      <div class="flex min-h-full items-center justify-center p-4">
        <div 
          class="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          @click.stop>
          <!-- Header -->
          <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-green-100 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 class="text-xl font-semibold text-gray-900">Schedule Report</h2>
                <p class="text-sm text-gray-600">Set up automated export scheduling</p>
              </div>
            </div>
            <button 
              @click="handleClose"
              class="text-gray-400 hover:text-gray-600 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
            <!-- Report Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Report Name <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="formData.reportName"
                type="text"
                required
                placeholder="Enter report name"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <!-- Scheduled Period -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Scheduled Period <span class="text-red-500">*</span>
              </label>
              <select 
                v-model="formData.scheduledPeriod"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                <option value="">Select period</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>

            <!-- Recipient Emails -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Recipient Emails
              </label>
              <div class="space-y-2">
                <div 
                  v-for="(email, index) in formData.recipientEmails" 
                  :key="index"
                  class="flex gap-2">
                  <input 
                    v-model="formData.recipientEmails[index]"
                    type="email"
                    placeholder="email@example.com"
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <button 
                    v-if="formData.recipientEmails.length > 1"
                    @click="removeEmail(index)"
                    type="button"
                    class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <button 
                  @click="addEmail"
                  type="button"
                  class="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Email
                </button>
              </div>
            </div>

            <!-- Recipient Roles -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Recipient Roles
              </label>
              <div class="space-y-2">
                <div 
                  v-for="(role, index) in formData.recipientRoles" 
                  :key="index"
                  class="flex gap-2">
                  <input 
                    v-model="formData.recipientRoles[index]"
                    type="text"
                    placeholder="e.g., Lab Manager, Admin"
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <button 
                    v-if="formData.recipientRoles.length > 1"
                    @click="removeRole(index)"
                    type="button"
                    class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <button 
                  @click="addRole"
                  type="button"
                  class="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Role
                </button>
              </div>
            </div>

            <!-- Footer Buttons -->
            <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
              <button 
                type="button"
                @click="handleClose"
                :disabled="loading"
                class="flex-1 px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50">
                Cancel
              </button>
              <button 
                type="submit"
                :disabled="loading"
                class="flex-1 px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                <LoadingSpinner v-if="loading" size="sm" color="text-white" />
                <span>{{ loading ? 'Scheduling...' : 'Schedule Report' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'

interface Props {
  isOpen: boolean
  loading?: boolean
}

interface FormData {
  reportName: string
  scheduledPeriod: string
  recipientEmails: string[]
  recipientRoles: string[]
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<{
  close: []
  submit: [data: FormData]
}>()

const formData = ref<FormData>({
  reportName: '',
  scheduledPeriod: '',
  recipientEmails: [''],
  recipientRoles: ['']
})

const resetForm = () => {
  formData.value = {
    reportName: '',
    scheduledPeriod: '',
    recipientEmails: [''],
    recipientRoles: ['']
  }
}

const handleClose = () => {
  if (!props.loading) {
    resetForm()
    emit('close')
  }
}

const handleSubmit = () => {
  // Filter out empty emails and roles
  const cleanedData = {
    ...formData.value,
    recipientEmails: formData.value.recipientEmails.filter(email => email.trim()),
    recipientRoles: formData.value.recipientRoles.filter(role => role.trim())
  }
  
  emit('submit', cleanedData)
}

const addEmail = () => {
  formData.value.recipientEmails.push('')
}

const removeEmail = (index: number) => {
  formData.value.recipientEmails.splice(index, 1)
}

const addRole = () => {
  formData.value.recipientRoles.push('')
}

const removeRole = (index: number) => {
  formData.value.recipientRoles.splice(index, 1)
}

watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    resetForm()
  }
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
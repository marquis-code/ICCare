<template>
  <Transition name="modal">
    <div 
      v-if="isOpen" 
      class="fixed backdrop-blur-lg inset-0 z-50 overflow-y-auto"
      @click.self="handleClose">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
      
      <!-- Modal -->
      <div class="flex min-h-full items-center justify-center p-4">
        <div 
          class="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          @click.stop>
          <!-- Header -->
          <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-orange-100 rounded-lg">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div>
                <h2 class="text-xl font-semibold text-gray-900">Check & Notify Alerts</h2>
                <p class="text-sm text-gray-600">Monitor threshold levels and send notifications</p>
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
            <!-- Info Banner -->
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex gap-3">
                <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div class="text-sm text-blue-800">
                  <p class="font-medium mb-1">About Alert Notifications</p>
                  <p>This feature checks if an item's current value is below the threshold and triggers notifications via the Notification Microservice if needed.</p>
                </div>
              </div>
            </div>

            <!-- Item -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Item <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="formData.item"
                type="text"
                required
                placeholder="Enter item name or ID"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <p class="mt-1 text-xs text-gray-500">The item to monitor for threshold alerts</p>
            </div>

            <!-- Units -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Units <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="formData.units"
                type="text"
                required
                placeholder="e.g., ml, units, samples"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <p class="mt-1 text-xs text-gray-500">Unit of measurement for the item</p>
            </div>

            <!-- Current Value -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Current Value <span class="text-red-500">*</span>
              </label>
              <input 
                v-model.number="formData.currentValue"
                type="number"
                required
                min="0"
                placeholder="Enter current value"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <p class="mt-1 text-xs text-gray-500">The current quantity or level</p>
            </div>

            <!-- User -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                User <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="formData.user"
                type="text"
                required
                placeholder="Enter username or email"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <p class="mt-1 text-xs text-gray-500">User who will receive the alert notification</p>
            </div>

            <!-- Admin Notes -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Admin Notes
              </label>
              <textarea 
                v-model="formData.adminNotes"
                rows="3"
                placeholder="Add any additional notes or context..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              ></textarea>
              <p class="mt-1 text-xs text-gray-500">Optional notes for the administrator</p>
            </div>

            <!-- Threshold Warning -->
            <div v-if="formData.currentValue" class="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div class="flex gap-3">
                <svg class="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div class="text-sm text-amber-800">
                  <p class="font-medium">Current Value: {{ formData.currentValue }} {{ formData.units }}</p>
                  <p class="mt-1">The system will check if this value is below the configured threshold and send notifications if necessary.</p>
                </div>
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
                class="flex-1 px-6 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                <LoadingSpinner v-if="loading" size="sm" color="text-white" />
                <span>{{ loading ? 'Checking...' : 'Check & Notify' }}</span>
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
  item: string
  units: string
  currentValue: number | null
  user: string
  adminNotes: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<{
  close: []
  submit: [data: FormData]
}>()

const formData = ref<FormData>({
  item: '',
  units: '',
  currentValue: null,
  user: '',
  adminNotes: ''
})

const loading = ref(false)

const resetForm = () => {
  formData.value = {
    item: '',
    units: '',
    currentValue: null,
    user: '',
    adminNotes: ''
  }
}

const handleClose = () => {
  if (!loading.value) {
    resetForm()
    emit('close')
  }
}

const handleSubmit = async () => {
  loading.value = true
  
  try {
    emit('submit', formData.value)
    await new Promise(resolve => setTimeout(resolve, 1000))
    resetForm()
  } finally {
    loading.value = false
  }
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
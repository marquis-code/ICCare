<template>
  <transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 overflow-y-auto"
      @click.self="closeModal"
    >
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

      <!-- Modal Container -->
      <div class="flex min-h-full items-center justify-center p-4">
        <transition
          enter-active-class="transition ease-out duration-300"
          enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            v-if="isOpen"
            class="relative bg-white rounded-lg shadow-xl w-full max-w-3xl"
            @click.stop
          >
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 class="text-xl font-semibold text-gray-900">
                Biosample Details
              </h3>
              <button
                @click="closeModal"
                class="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Modal Body -->
            <div class="p-6 space-y-6">
              <div v-if="data" class="space-y-4">
                <!-- Data Set -->
                <div class="flex flex-col sm:flex-row sm:items-center border-b border-gray-100 pb-4">
                  <div class="w-full sm:w-1/3 text-sm font-medium text-gray-700 mb-1 sm:mb-0">
                    Data Set
                  </div>
                  <div class="w-full sm:w-2/3 text-sm text-gray-900 font-semibold">
                    {{ data.dataSet }}
                  </div>
                </div>

                <!-- Site -->
                <div class="flex flex-col sm:flex-row sm:items-center border-b border-gray-100 pb-4">
                  <div class="w-full sm:w-1/3 text-sm font-medium text-gray-700 mb-1 sm:mb-0">
                    Site Location
                  </div>
                  <div class="w-full sm:w-2/3">
                    <div class="flex items-center gap-2">
                      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span class="text-sm text-gray-900">{{ data.site }}</span>
                    </div>
                  </div>
                </div>

                <!-- Sample Type -->
                <div class="flex flex-col sm:flex-row sm:items-center border-b border-gray-100 pb-4">
                  <div class="w-full sm:w-1/3 text-sm font-medium text-gray-700 mb-1 sm:mb-0">
                    Sample Type
                  </div>
                  <div class="w-full sm:w-2/3">
                    <span
                      :class="[
                        'inline-block px-3 py-1 text-sm rounded-full font-medium',
                        data.type === 'Blood' ? 'bg-green-100 text-green-800' : '',
                        data.type === 'Plasma' ? 'bg-blue-100 text-blue-800' : '',
                        data.type === 'Serum' ? 'bg-orange-100 text-orange-800' : '',
                        data.type === 'Tissue' ? 'bg-pink-100 text-pink-800' : ''
                      ]"
                    >
                      {{ data.type }}
                    </span>
                  </div>
                </div>

                <!-- Date Range -->
                <div class="flex flex-col sm:flex-row sm:items-start border-b border-gray-100 pb-4">
                  <div class="w-full sm:w-1/3 text-sm font-medium text-gray-700 mb-1 sm:mb-0">
                    Collection Date Range
                  </div>
                  <div class="w-full sm:w-2/3 space-y-2">
                    <div class="flex items-center gap-2">
                      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span class="text-sm text-gray-600">From:</span>
                      <span class="text-sm text-gray-900 font-medium">{{ formatDate(data.dateFrom) }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span class="text-sm text-gray-600">To:</span>
                      <span class="text-sm text-gray-900 font-medium">{{ formatDate(data.dateTo) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Sample ID (Additional Info) -->
                <div class="flex flex-col sm:flex-row sm:items-center border-b border-gray-100 pb-4">
                  <div class="w-full sm:w-1/3 text-sm font-medium text-gray-700 mb-1 sm:mb-0">
                    Sample ID
                  </div>
                  <div class="w-full sm:w-2/3 text-sm text-gray-900 font-mono">
                    {{ data.id.toString().padStart(8, '0') }}
                  </div>
                </div>

                <!-- Status (Additional Info) -->
                <div class="flex flex-col sm:flex-row sm:items-center border-b border-gray-100 pb-4">
                  <div class="w-full sm:w-1/3 text-sm font-medium text-gray-700 mb-1 sm:mb-0">
                    Status
                  </div>
                  <div class="w-full sm:w-2/3">
                    <span class="inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      </svg>
                      Active
                    </span>
                  </div>
                </div>

                <!-- Additional Notes -->
                <div class="flex flex-col border-b border-gray-100 pb-4">
                  <div class="text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </div>
                  <div class="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                    Sample collected and processed according to standard protocols. Storage conditions maintained at -80°C.
                  </div>
                </div>
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="flex flex-col sm:flex-row items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
              <button
                @click="exportDetails"
                class="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export
              </button>
              <button
                @click="closeModal"
                class="w-full sm:w-auto px-6 py-2 bg-[#005B8F] text-white rounded-md hover:bg-[#004a73] focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Close
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface ReportData {
  id: number
  dataSet: string
  site: string
  dateFrom: string
  dateTo: string
  type: string
}

interface Props {
  isOpen: boolean
  data: ReportData | null
}

interface Emits {
  (e: 'close'): void
  (e: 'export', data: ReportData): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const formatDate = (dateStr: string): string => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const closeModal = () => {
  emit('close')
}

const exportDetails = () => {
  if (props.data) {
    emit('export', props.data)
  }
}

// Prevent body scroll when modal is open
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>
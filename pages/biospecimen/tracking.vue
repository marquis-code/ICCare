<template>
  <div class="min-h-screen ">
    <div class="">
      <!-- Header -->
      <div class="mb-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 class="text-2xl font-bold text-gray-900">BioSpecimen Tracking</h1>
          
          <div class="flex flex-wrap gap-2">
            <button
              @click="openRequestMovementModal"
              class="px-4 py-3 bg-[#005B8F] text-white rounded hover:bg-[#005B8F] transition flex items-center gap-2 text-sm"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Request Movement
            </button>
            <button
              @click="openRequestDisposalModal"
              class="px-4 py-3 bg-[#005B8F] text-white rounded hover:bg-[#005B8F] transition flex items-center gap-2 text-sm"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Request Disposal
            </button>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <UiSelectInput 
            label="All Status" 
            :options="statusOptions" 
            position="standalone" 
            v-model="filters.status"
          />
          
          <DateRangePicker 
            v-model="filters.dateRange1" 
            label="Date Range" 
            placeholder="Select date range" 
          />
          
          <!-- <DateRangePicker 
            v-model="filters.dateRange2" 
            label="Date Range" 
            placeholder="Select date range" 
          /> -->
          
          <div class="flex items-end gap-2">
            <button
              @click="applyFilters"
              class="flex-1 px-4 py-2 bg-[#005B8F] text-white rounded hover:bg-[#005B8F] transition text-sm font-medium"
            >
              Search
            </button>
            <button
              @click="clearFilters"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition text-sm font-medium"
            >
              Clear Filter
            </button>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="bg-white rounded-lg shadow-sm mb-6">
        <div class="border-b-[0.5px] border-gray-200 overflow-x-auto">
          <div class="flex min-w-max md:min-w-0">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              @click="activeTab = tab.key"
              :class="[
                'px-6 py-6 text-sm font-medium whitespace-nowrap transition',
                activeTab === tab.key
                  ? 'text-[#005B8F] border-b-2 border-[#005B8F]'
                  : 'text-gray-600 hover:text-gray-900'
              ]"
            >
              {{ tab.label }}
              <span
                v-if="tab.count !== undefined"
                :class="[
                  'ml-2 px-2 py-0.5 rounded-full text-xs',
                  tab.key === 'pendingMovement' ? 'bg-orange-100 text-orange-700' :
                  tab.key === 'pendingDisposal' ? 'bg-red-100 text-red-700' :
                  'bg-green-100 text-green-700'
                ]"
              >
                {{ tab.count }}
              </span>
            </button>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full min-w-max">
            <thead class="bg-gray-25">
              <tr>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Sample ID
                </th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Source Location
                </th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Destination Location
                </th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Requested Date
                </th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Approved Date
                </th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Requested By
                </th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y-[0.5px] divide-gray-100">
              <tr v-for="item in filteredData" :key="item.id" class="hover:bg-gray-25">
                <td class="px-4 py-6 text-sm text-gray-900">{{ item.sampleId }}</td>
                <td class="px-4 py-6 text-sm text-gray-600">
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                    {{ item.sourceLocation }}
                  </div>
                </td>
                <td class="px-4 py-6 text-sm text-gray-600">
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                    {{ item.destinationLocation }}
                  </div>
                </td>
                <td class="px-4 py-6 text-sm text-gray-600">{{ item.requestedDate }}</td>
                <td class="px-4 py-6 text-sm text-gray-600">{{ item.approvedDate }}</td>
                <td class="px-4 py-6 text-sm text-gray-600">{{ item.requestedBy }}</td>
                <td class="px-4 py-6 text-sm">
                  <div class="flex gap-2">
                    <button class="px-3 py-1 text-xs border border-red-300 text-red-600 rounded hover:bg-red-50 transition">
                      Reject
                    </button>
                    <button class="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition">
                      Approve
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Request Movement Modal -->
    <Teleport to="body">
      <div
        v-if="showRequestMovementModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        @click.self="closeRequestMovementModal"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <div class="flex items-center gap-2 mb-6">
              <svg class="w-6 h-6 text-[#005B8F]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              <h2 class="text-xl font-bold text-gray-900">Request Movement</h2>
            </div>

            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Sample ID</label>
                  <input
                    v-model="movementForm.sampleId"
                    type="text"
                    placeholder="xxx"
                    class="custom-input"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Requested By</label>
                  <input
                    v-model="movementForm.requestedBy"
                    type="text"
                    placeholder="xxx"
                    class="custom-input"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UiSelectInput 
                  label="Destination Location" 
                  :options="locationOptions" 
                  position="standalone" 
                  v-model="movementForm.destinationLocation"
                />

                <UiSelectInput 
                  label="Source Location" 
                  :options="locationOptions" 
                  position="standalone" 
                  v-model="movementForm.sourceLocation"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Requested Date</label>
                <input
                  v-model="movementForm.requestedDate"
                  type="date"
                  class="custom-input"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  v-model="movementForm.description"
                  rows="4"
                  placeholder="sample input but not"
                  class="custom-input resize-none"
                ></textarea>
              </div>
            </div>

            <div class="flex justify-end gap-3 mt-6">
              <button
                @click="closeRequestMovementModal"
                class="px-6 py-3 border border-gray-300 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                @click="submitMovementRequest"
                class="px-6 py-3 bg-[#005B8F] text-sm text-white rounded-lg hover:bg-[#005B8F] transition"
              >
                Request Movement
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Request Disposal Modal -->
    <Teleport to="body">
      <div
        v-if="showRequestDisposalModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        @click.self="closeRequestDisposalModal"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-lg">
          <div class="p-6">
            <div class="flex items-center gap-2 mb-6">
              <svg class="w-6 h-6 text-[#005B8F]" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              <h2 class="text-xl font-bold text-gray-900">Dispose Biosample</h2>
            </div>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Disposal Reasons</label>
                <textarea
                  v-model="disposalForm.reasons"
                  rows="3"
                  placeholder="sample input but not"
                  class="custom-input resize-none"
                ></textarea>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UiSelectInput 
                  label="Disposal Method" 
                  :options="disposalMethodOptions" 
                  position="standalone" 
                  v-model="disposalForm.method"
                />

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Requested By</label>
                  <input
                    v-model="disposalForm.requestedBy"
                    type="text"
                    placeholder="xxx"
                    class="custom-input"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Disposal Date</label>
                <input
                  v-model="disposalForm.date"
                  type="date"
                  class="custom-input"
                />
              </div>
            </div>

            <div class="flex justify-end gap-3 mt-6">
              <button
                @click="closeRequestDisposalModal"
                class="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                @click="submitDisposalRequest"
                class="px-6 py-2 bg-[#005B8F] text-white rounded hover:bg-[#005B8F] transition"
              >
                Dispose BioSample
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface DateRange {
  from: string
  to: string
}

interface BioSpecimen {
  id: string
  sampleId: string
  sourceLocation: string
  destinationLocation: string
  requestedDate: string
  approvedDate: string
  requestedBy: string
  status: 'pendingMovement' | 'pendingDisposal' | 'completeMovement' | 'completeDisposal'
}

// Filters
const filters = ref({
  status: 'All Status',
  dateRange1: { from: '', to: '' } as DateRange,
  dateRange2: { from: '', to: '' } as DateRange
})

const statusOptions = ref([
  'All Status',
  'Pending Movement',
  'Pending Disposal',
  'Complete Movement',
  'Complete Disposal'
])

const locationOptions = ref([
  'Freezer 9-156, Rack 1A',
  'Freezer 9-201, Rack 2-B',
  'Freezer 8-105, Rack 3C',
  'Cold Storage Unit 5'
])

const disposalMethodOptions = ref([
  'Incineration',
  'Autoclaving',
  'Chemical Treatment',
  'Biohazard Disposal'
])

// Tabs
const activeTab = ref('pendingMovement')

const tabs = computed(() => [
  { key: 'pendingMovement', label: 'Pending Movement', count: 3 },
  { key: 'pendingDisposal', label: 'Pending Disposal', count: 3 },
  { key: 'completeMovement', label: 'Complete Movement', count: 3 },
  { key: 'completeDisposal', label: 'Complete Disposal', count: 3 }
])

// Sample data
const sampleData = ref<BioSpecimen[]>([
  {
    id: '1',
    sampleId: 'MH-12343023',
    sourceLocation: 'Freezer 9-156, Rack 1A',
    destinationLocation: 'Freezer A-201, Rack 2-B',
    requestedDate: 'Jan 15, 2024, 09:30 AM',
    approvedDate: 'Jan 15, 2024, 09:30 AM',
    requestedBy: 'John Ramirez',
    status: 'pendingMovement'
  },
  {
    id: '2',
    sampleId: 'MH-12343023',
    sourceLocation: 'Freezer 9-156, Rack 1A',
    destinationLocation: 'Freezer A-201, Rack 2-B',
    requestedDate: 'Jan 15, 2024, 09:30 AM',
    approvedDate: 'Jan 15, 2024, 09:30 AM',
    requestedBy: 'John Ramirez',
    status: 'pendingMovement'
  },
  {
    id: '3',
    sampleId: 'MH-12343023',
    sourceLocation: 'Freezer 9-156, Rack 1A',
    destinationLocation: 'Freezer A-201, Rack 2-B',
    requestedDate: 'Jan 15, 2024, 09:30 AM',
    approvedDate: 'Jan 15, 2024, 09:30 AM',
    requestedBy: 'John Ramirez',
    status: 'pendingMovement'
  },
  {
    id: '4',
    sampleId: 'MH-13743023',
    sourceLocation: 'Freezer 9-156, Rack 1A',
    destinationLocation: 'Freezer A-201, Rack 2-B',
    requestedDate: 'Jan 15, 2024, 09:30 AM',
    approvedDate: 'Jan 15, 2024, 09:30 AM',
    requestedBy: 'John Ramirez',
    status: 'completeMovement'
  },
  {
    id: '5',
    sampleId: 'MH-13743023',
    sourceLocation: 'Freezer 9-156, Rack 1A',
    destinationLocation: 'Freezer A-201, Rack 2-B',
    requestedDate: 'Jan 15, 2024, 09:30 AM',
    approvedDate: 'Jan 15, 2024, 09:30 AM',
    requestedBy: 'John Ramirez',
    status: 'completeMovement'
  },
  {
    id: '6',
    sampleId: 'MH-13743023',
    sourceLocation: 'Freezer 9-156, Rack 1A',
    destinationLocation: 'Freezer A-201, Rack 2-B',
    requestedDate: 'Jan 15, 2024, 09:30 AM',
    approvedDate: 'Jan 15, 2024, 09:30 AM',
    requestedBy: 'John Ramirez',
    status: 'completeMovement'
  }
])

// Filtered data based on active tab
const filteredData = computed(() => {
  return sampleData.value.filter(item => item.status === activeTab.value)
})

// Modals
const showRequestMovementModal = ref(false)
const showRequestDisposalModal = ref(false)

const movementForm = ref({
  sampleId: '',
  requestedBy: '',
  destinationLocation: '',
  sourceLocation: '',
  requestedDate: '',
  description: ''
})

const disposalForm = ref({
  reasons: '',
  method: '',
  requestedBy: '',
  date: ''
})

const openRequestMovementModal = () => {
  showRequestMovementModal.value = true
}

const closeRequestMovementModal = () => {
  showRequestMovementModal.value = false
  movementForm.value = {
    sampleId: '',
    requestedBy: '',
    destinationLocation: '',
    sourceLocation: '',
    requestedDate: '',
    description: ''
  }
}

const openRequestDisposalModal = () => {
  showRequestDisposalModal.value = true
}

const closeRequestDisposalModal = () => {
  showRequestDisposalModal.value = false
  disposalForm.value = {
    reasons: '',
    method: '',
    requestedBy: '',
    date: ''
  }
}

const submitMovementRequest = () => {
  console.log('Movement request:', movementForm.value)
  closeRequestMovementModal()
}

const submitDisposalRequest = () => {
  console.log('Disposal request:', disposalForm.value)
  closeRequestDisposalModal()
}

const applyFilters = () => {
  console.log('Applying filters:', filters.value)
}

const clearFilters = () => {
  filters.value = {
    status: 'All Status',
    dateRange1: { from: '', to: '' },
    dateRange2: { from: '', to: '' }
  }
}

definePageMeta({
    layout: 'dashboard'
})
</script>
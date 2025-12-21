<template>
  <div class="min-h-screen">
    <div class="">
      <!-- Header -->
      <div class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 class="text-3xl font-bold text-gray-900">Attribute</h1>
        <button
          @click="toggleFormView"
          class="px-6 py-2.5 bg-[#005B8F] text-white rounded-lg hover:bg-[#005B8F] transition font-medium flex items-center gap-2 w-fit"
        >
          <svg v-if="!showForm" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          {{ showForm ? 'Back to List' : 'Create New Attribute' }}
        </button>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
        <div class="">
          <div class="grid grid-cols-3 gap-6">
                        <div class="w-full md:w-auto">
              <DateRangePicker 
                v-model="filters.dateRange" 
                label="" 
                placeholder="Date Range" 
              />
            </div>

            <div class="w-full md:w-auto">
              <UiSelectInput 
                label="" 
                :options="typeOptions" 
                position="standalone" 
                v-model="filters.type"
                placeholder="All Types"
              />
            </div>

            <div class="w-full md:w-auto">
              <UiSelectInput 
                label="" 
                :options="locationOptions" 
                position="standalone" 
                v-model="filters.location"
                placeholder="All Locations"
              />
            </div>

          </div>

<section>

            <div class="flex-1 min-w-0">
              <input
                v-model="filters.search"
                type="text"
                placeholder="Filter Table"
                class="custom-input"
              />
            </div>
              <div class="flex gap-2 pt-3">
            <button
              @click="applySearch"
              class="px-6 py-2 bg-[#005B8F] text-white rounded-lg hover:bg-[#005B8F] transition font-medium"
            >
              Search
            </button>
            <button
              @click="clearFilters"
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Clear Filter
            </button>
          </div>
</section>
        </div>
      </div>

      <!-- Form View -->
      <div v-if="showForm" class="bg-white rounded-lg shadow-sm p-6 md:p-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ editingAttribute ? 'Edit Attribute' : 'Create New Attribute' }}
        </h2>
        
        <div class="">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Site ID -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Site ID
              </label>
              <UiSelectInput 
                label="" 
                :options="siteIdOptions" 
                position="standalone" 
                v-model="formData.siteId"
                placeholder="Select Site ID"
              />
            </div>

            <!-- Site Name -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Site Name
              </label>
              <UiSelectInput 
                label="" 
                :options="siteNameOptions" 
                position="standalone" 
                v-model="formData.siteName"
                placeholder="Select Site Name"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Sample Serial Number -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Sample Serial Number
              </label>
              <UiSelectInput 
                label="" 
                :options="serialNumberOptions" 
                position="standalone" 
                v-model="formData.serialNumber"
                placeholder="Select Serial Number"
              />
            </div>

            <!-- Sample Label -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Sample Label
              </label>
              <UiSelectInput 
                label="" 
                :options="sampleLabelOptions" 
                position="standalone" 
                v-model="formData.sampleLabel"
                placeholder="Select Sample Label"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <!-- Other Fields/Fields -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Other Fields/Fields
              </label>
              <UiSelectInput 
                label="" 
                :options="otherFieldsOptions" 
                position="standalone" 
                v-model="formData.otherFields"
                placeholder="Select Field"
              />
            </div>

            <!-- Status -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Status
              </label>
              <UiSelectInput 
                label="" 
                :options="statusOptions" 
                position="standalone" 
                v-model="formData.status"
                placeholder="Select Status"
              />
            </div>
          </div>

          <!-- Submit Buttons -->
          <div class="flex justify-end gap-3">
            <button
              @click="cancelForm"
              class="px-6 py-2.5 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition font-medium"
            >
              Cancel
            </button>
            <button
              @click="saveAttribute"
              class="px-8 py-2.5 bg-[#005B8F] text-white rounded hover:bg-[#005B8F] transition font-medium"
            >
              {{ editingAttribute ? 'Update Attribute' : 'Create Attribute' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Table View -->
      <div v-else class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full min-w-max">
            <thead class="bg-gray-25">
              <tr>
                <th class="px-6 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  ID
                </th>
                <th class="px-6 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Site ID
                </th>
                <th class="px-6 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Site Name
                </th>
                <th class="px-6 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Sample Serial Number
                </th>
                <th class="px-6 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Sample Label
                </th>
                <th class="px-6 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Other Fields
                </th>
                <th class="px-6 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Created Date
                </th>
                <th class="px-6 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y-[0.5px] divide-gray-100">
              <tr v-if="filteredAttributes.length === 0">
                <td colspan="9" class="px-6 py-8 text-center text-gray-500">
                  No attributes found. Click "Create New Attribute" to add one.
                </td>
              </tr>
              <tr 
                v-for="attribute in filteredAttributes" 
                :key="attribute.id" 
                class="hover:bg-gray-25 transition"
              >
                <td class="px-6 py-6 text-sm text-gray-900 font-medium">
                  {{ attribute.id }}
                </td>
                <td class="px-6 py-6 text-sm text-gray-600">
                  {{ attribute.siteId }}
                </td>
                <td class="px-6 py-6 text-sm text-gray-600">
                  {{ attribute.siteName }}
                </td>
                <td class="px-6 py-6 text-sm text-gray-600">
                  {{ attribute.serialNumber }}
                </td>
                <td class="px-6 py-6 text-sm text-gray-600">
                  {{ attribute.sampleLabel }}
                </td>
                <td class="px-6 py-6 text-sm text-gray-600">
                  {{ attribute.otherFields }}
                </td>
                <td class="px-6 py-6 text-sm">
                  <span 
                    :class="[
                      'px-2 py-1 rounded-full text-xs font-medium',
                      attribute.status === 'Active' ? 'bg-green-100 text-green-700' :
                      attribute.status === 'Inactive' ? 'bg-gray-100 text-gray-700' :
                      'bg-yellow-100 text-yellow-700'
                    ]"
                  >
                    {{ attribute.status }}
                  </span>
                </td>
                <td class="px-6 py-6 text-sm text-gray-600">
                  {{ attribute.createdDate }}
                </td>
                <td class="px-6 py-6 text-sm">
                  <div class="flex gap-2">
                    <button
                      @click="editAttribute(attribute)"
                      class="text-[#005B8F] hover:text-[#005B8F] font-medium"
                      title="Edit"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      @click="deleteAttribute(attribute.id)"
                      class="text-red-600 hover:text-red-800 font-medium"
                      title="Delete"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="filteredAttributes.length > 0" class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing <span class="font-medium">{{ filteredAttributes.length }}</span> of 
            <span class="font-medium">{{ attributes.length }}</span> attributes
          </div>
          <div class="flex gap-2">
            <button class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition">
              Previous
            </button>
            <button class="px-3 py-1 bg-[#005B8F] text-white rounded text-sm">
              1
            </button>
            <button class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface DateRange {
  from: string
  to: string
}

interface Attribute {
  id: number
  siteId: string
  siteName: string
  serialNumber: string
  sampleLabel: string
  otherFields: string
  status: string
  createdDate: string
}

// View state
const showForm = ref(false)
const editingAttribute = ref<Attribute | null>(null)

// Filters
const filters = ref({
  type: 'All Types',
  location: 'All Locations',
  dateRange: { from: '', to: '' } as DateRange,
  search: ''
})

const typeOptions = ref([
  'All Types',
  'Type A',
  'Type B',
  'Type C'
])

const locationOptions = ref([
  'All Locations',
  'Memorial Hospital',
  'Central Lab',
  'Research Facility'
])

// Form Data
const formData = ref({
  siteId: '',
  siteName: '',
  serialNumber: '',
  sampleLabel: '',
  otherFields: '',
  status: 'Active'
})

const siteIdOptions = ref([
  'Memorial Hospital',
  'Central Lab',
  'Research Facility',
  'North Campus'
])

const siteNameOptions = ref([
  'Freezer-0A',
  'Freezer-0B',
  'Freezer-1A',
  'Freezer-1B',
  'Storage-A1',
  'Storage-B2'
])

const serialNumberOptions = ref([
  'Freezer-0A',
  'SN-001234',
  'SN-002345',
  'SN-003456'
])

const sampleLabelOptions = ref([
  'Freezer-0A',
  'Sample-A',
  'Sample-B',
  'Sample-C',
  'Control-1',
  'Control-2'
])

const otherFieldsOptions = ref([
  'Freezer-0A',
  'Field-Option-1',
  'Field-Option-2',
  'Field-Option-3'
])

const statusOptions = ref([
  'Active',
  'Inactive',
  'Pending'
])

// Attributes data
const attributes = ref<Attribute[]>([
  {
    id: 1,
    siteId: 'Memorial Hospital',
    siteName: 'Freezer-0A',
    serialNumber: 'SN-001234',
    sampleLabel: 'Sample-A',
    otherFields: 'Field-Option-1',
    status: 'Active',
    createdDate: 'Jan 15, 2024'
  },
  {
    id: 2,
    siteId: 'Central Lab',
    siteName: 'Freezer-1A',
    serialNumber: 'SN-002345',
    sampleLabel: 'Sample-B',
    otherFields: 'Field-Option-2',
    status: 'Active',
    createdDate: 'Jan 16, 2024'
  },
  {
    id: 3,
    siteId: 'Research Facility',
    siteName: 'Storage-A1',
    serialNumber: 'SN-003456',
    sampleLabel: 'Control-1',
    otherFields: 'Field-Option-3',
    status: 'Inactive',
    createdDate: 'Jan 17, 2024'
  },
  {
    id: 4,
    siteId: 'Memorial Hospital',
    siteName: 'Freezer-0B',
    serialNumber: 'SN-004567',
    sampleLabel: 'Sample-C',
    otherFields: 'Field-Option-1',
    status: 'Pending',
    createdDate: 'Jan 18, 2024'
  }
])

// Computed
const filteredAttributes = computed(() => {
  let filtered = attributes.value

  // Apply search filter
  if (filters.value.search) {
    const searchLower = filters.value.search.toLowerCase()
    filtered = filtered.filter(attr => 
      attr.siteId.toLowerCase().includes(searchLower) ||
      attr.siteName.toLowerCase().includes(searchLower) ||
      attr.serialNumber.toLowerCase().includes(searchLower) ||
      attr.sampleLabel.toLowerCase().includes(searchLower) ||
      attr.otherFields.toLowerCase().includes(searchLower) ||
      attr.status.toLowerCase().includes(searchLower)
    )
  }

  // Apply location filter
  if (filters.value.location && filters.value.location !== 'All Locations') {
    filtered = filtered.filter(attr => attr.siteId === filters.value.location)
  }

  return filtered
})

// Methods
const toggleFormView = () => {
  showForm.value = !showForm.value
  if (!showForm.value) {
    resetForm()
  }
}

const applySearch = () => {
  console.log('Applying search with filters:', filters.value)
}

const clearFilters = () => {
  filters.value = {
    type: 'All Types',
    location: 'All Locations',
    dateRange: { from: '', to: '' },
    search: ''
  }
}

const resetForm = () => {
  formData.value = {
    siteId: '',
    siteName: '',
    serialNumber: '',
    sampleLabel: '',
    otherFields: '',
    status: 'Active'
  }
  editingAttribute.value = null
}

const cancelForm = () => {
  showForm.value = false
  resetForm()
}

const saveAttribute = () => {
  if (editingAttribute.value) {
    // Update existing attribute
    const index = attributes.value.findIndex(a => a.id === editingAttribute.value!.id)
    if (index !== -1) {
      attributes.value[index] = {
        ...editingAttribute.value,
        ...formData.value
      }
    }
  } else {
    // Create new attribute
    const newAttribute: Attribute = {
      id: attributes.value.length + 1,
      ...formData.value,
      createdDate: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    }
    attributes.value.unshift(newAttribute)
  }
  
  showForm.value = false
  resetForm()
}

const editAttribute = (attribute: Attribute) => {
  editingAttribute.value = attribute
  formData.value = {
    siteId: attribute.siteId,
    siteName: attribute.siteName,
    serialNumber: attribute.serialNumber,
    sampleLabel: attribute.sampleLabel,
    otherFields: attribute.otherFields,
    status: attribute.status
  }
  showForm.value = true
}

const deleteAttribute = (id: number) => {
  if (confirm('Are you sure you want to delete this attribute?')) {
    const index = attributes.value.findIndex(a => a.id === id)
    if (index !== -1) {
      attributes.value.splice(index, 1)
    }
  }
}

definePageMeta({
    layout: 'dashboard'
})
</script>
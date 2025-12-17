<template>
  <NuxtLayout name="dashboard">
    <div class="min-h-screen">
      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <!-- Page Header -->
        <div class="mb-6 sm:mb-8">
          <h1 class="text-2xl font-semibold text-gray-900">Reports</h1>
          <p class="mt-2 text-sm text-gray-600">
            Generate and export biosample datasets for analysis or sharing.
          </p>
        </div>

        <!-- Filter & Dataset Selection Card v  -->
        <div class="mb-6">
          <div class="flex justify-between items-center pb-6">
            <h2 class="text-l font-medium text-gray-900">
              Filter & Dataset Selection
            </h2>
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-end">
              <button @click="resetFilters"
                class="w-full sm:w-auto outline-none px-6 py-2.5 border-[0.5px] border-gray-300 text-gray-700 rounded-xl transition-colors">
                Reset Filter
              </button>
              <button @click="applyFilters"
                class="w-full sm:w-auto outline-none px-6 py-2.5 bg-[#005B8F] text-white rounded-xl  transition-colors">
                View Results
              </button>
            </div>
          </div>

          <!-- Select Dataset - Using MultiSelect Component -->
        <section class="bg-white rounded-xl p-6 spacee-y-4 shadow-sm border-[0.5px] border-gray-100">
                    <div>
                    <DateRangePicker v-model="dateRange" label="Date Range" placeholder="Select date range" />
                  </div>
                  <div class="my-6">
                    <MultiSelect v-model="selectedDatasets" :options="datasetOptions" label="Select Dataset"
                      placeholder="Choose one or more datasets" :searchable="true" :select-all="true" />
                  </div>

                  <!-- Filter Row -->
                  <div class="grid grid-cols-2 gap-6">
                    <!-- Sites -->
                    <div>
                      <UiSelectInput label="Sites" :options="sites" position="standalone" v-model="filters.site" />
                    </div>


                    <!-- Sample Types -->
                    <div>
                      <UiSelectInput label="Sample Types" :options="sampleTypes" position="standalone" v-model="filters.site" />
                    </div>

                    <!-- Action Buttons -->
                  </div>
        </section>

          <!-- Results Table Card -->
          <div class="bg-white rounded-lg mt-10 shadow-sm border-[0.5px] border-gray-100 overflow-hidden">
            <!-- Mobile View -->
            <div class="block lg:hidden">
              <div v-if="filteredData.length === 0" class="p-8 text-center text-gray-500">
                No results found. Please adjust your filters.
              </div>
              <div v-else class="divide-y divide-gray-200">
                <div v-for="item in paginatedData" :key="item.id" class="p-4 hover:bg-gray-50">
                  <div class="flex justify-between items-start mb-2">
                    <div class="font-medium text-gray-900">{{ item.dataSet }}</div>
                    <span :class="getSampleTypeBadgeClass(item.type)">
                      {{ item.type }}
                    </span>
                  </div>
                  <div class="text-sm text-gray-600 space-y-1">
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{{ item.site }}</span>
                    </div>
                    <div>Date: {{ item.dateFrom }} - {{ item.dateTo }}</div>
                  </div>
                  <button @click="viewDetails(item)"
                    class="mt-3 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View
                  </button>
                </div>
              </div>
            </div>

            <!-- Desktop Table View -->
            <div class="hidden lg:block overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-50">
                <thead class="bg-gray-25">
                  <tr>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SN
                    </th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data Set
                    </th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Site
                    </th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date (From)
                    </th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date (To)
                    </th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-50">
                  <tr v-if="filteredData.length === 0">
                    <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                      No results found. Please adjust your filters.
                    </td>
                  </tr>
                  <tr v-for="(item, index) in paginatedData" :key="item.id" class="hover:bg-gray-25">
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-900">
                      {{ (currentPage - 1) * itemsPerPage + index + 1 }}
                    </td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-900">
                      {{ item.dataSet }}
                    </td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-600">
                      <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {{ item.site }}
                      </div>
                    </td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-600">
                      {{ item.dateFrom }}
                    </td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-600">
                      {{ item.dateTo }}
                    </td>
                    <td class="px-6 py-6 whitespace-nowrap">
                      <span :class="getSampleTypeBadgeClass(item.type)">
                        {{ item.type }}
                      </span>
                    </td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm">
                      <button @click="viewDetails(item)"
                        class="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
                        title="View Details">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div v-if="filteredData.length > 0" class="px-4 py-3 bg-gray-25 border-t border-gray-100 sm:px-6">
              <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="text-sm text-gray-700">
                  Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
                  {{ Math.min(currentPage * itemsPerPage, filteredData.length) }} of
                  {{ filteredData.length }} results
                </div>
                <div class="flex gap-2">
                  <button @click="currentPage--" :disabled="currentPage === 1"
                    class="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100">
                    Previous
                  </button>
                  <button v-for="page in visiblePages" :key="page" @click="currentPage = page" :class="[
                    'px-3 py-1 border rounded-md',
                    currentPage === page
                      ? 'bg-[#005B8F] text-white border-blue-600'
                      : 'border-gray-300 hover:bg-gray-100'
                  ]">
                    {{ page }}
                  </button>
                  <button @click="currentPage++" :disabled="currentPage === totalPages"
                    class="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100">
                    Next
                  </button>
                </div>
              </div>
            </div>

            <!-- Download Options Footer -->
            <div v-if="filteredData.length > 0"
              class="bg-blue-900 px-4 py-4 sm:px-6 flex flex-col sm:flex-row items-center justify-end gap-3">
              <span class="text-white font-medium text-sm sm:text-base">Download Options:</span>
              <div class="flex flex-wrap gap-3 justify-center sm:justify-end">
                <button @click="downloadData('csv')"
                  class="flex items-center gap-2 px-4 py-2 bg-white text-blue-900 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  CSV
                </button>
                <button @click="downloadData('excel')"
                  class="flex items-center gap-2 px-4 py-2 bg-white text-blue-900 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  EXCEL
                </button>
                <button @click="downloadData('json')"
                  class="flex items-center gap-2 px-4 py-2 bg-white text-blue-900 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  JSON
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detail Modal -->
      <DetailModal :is-open="isModalOpen" :data="selectedItem" @close="closeModal" @export="exportSingleItem" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import MultiSelect, { type MultiSelectOption } from '~/components/MultiSelect.vue'
import DateRangePicker, { type DateRange } from '~/components/DateRangePicker.vue'
import DetailModal from '~/components/DetailModal.vue'

interface ReportData {
  id: number
  dataSet: string
  site: string
  dateFrom: string
  dateTo: string
  type: string
}


const sites = ref([
  'Memorial Hospital', 'Central Hospital', 'General Hospital'
])

const sampleTypes = ref([
  'Blood', 'Plasma', 'Serum', 'Tissue'
])

interface Filters {
  site: string
  sampleType: string
}

// State
const selectedDatasets = ref<string[]>([])
const dateRange = ref<DateRange>({ from: '', to: '' })
const filters = ref<Filters>({
  site: '',
  sampleType: ''
})

const currentPage = ref(1)
const itemsPerPage = ref(10)
const isModalOpen = ref(false)
const selectedItem = ref<ReportData | null>(null)

// Dataset Options for MultiSelect
const datasetOptions: MultiSelectOption[] = [
  { value: 'clinical', label: 'Clinical Data' },
  { value: 'laboratory', label: 'Laboratory Data' },
  { value: 'research', label: 'Research Data' },
  { value: 'genomic', label: 'Genomic Data' },
  { value: 'imaging', label: 'Imaging Data' }
]

// Sample Data - Extended
const allData = ref<ReportData[]>([
  {
    id: 1,
    dataSet: 'Clinical Data',
    site: 'Memorial Hospital',
    dateFrom: '2024-01-01',
    dateTo: '2024-01-31',
    type: 'Blood'
  },
  {
    id: 2,
    dataSet: 'Laboratory Data',
    site: 'Central Hospital',
    dateFrom: '2024-01-15',
    dateTo: '2024-02-15',
    type: 'Plasma'
  },
  {
    id: 3,
    dataSet: 'Research Data',
    site: 'General Hospital',
    dateFrom: '2024-02-01',
    dateTo: '2024-02-28',
    type: 'Serum'
  },
  {
    id: 4,
    dataSet: 'Clinical Data',
    site: 'Memorial Hospital',
    dateFrom: '2024-03-01',
    dateTo: '2024-03-31',
    type: 'Tissue'
  },
  {
    id: 5,
    dataSet: 'Genomic Data',
    site: 'Central Hospital',
    dateFrom: '2024-01-10',
    dateTo: '2024-01-25',
    type: 'Blood'
  },
  {
    id: 6,
    dataSet: 'Imaging Data',
    site: 'General Hospital',
    dateFrom: '2024-02-10',
    dateTo: '2024-03-10',
    type: 'Tissue'
  },
  {
    id: 7,
    dataSet: 'Laboratory Data',
    site: 'Memorial Hospital',
    dateFrom: '2024-03-15',
    dateTo: '2024-04-15',
    type: 'Plasma'
  },
  {
    id: 8,
    dataSet: 'Research Data',
    site: 'Central Hospital',
    dateFrom: '2024-01-20',
    dateTo: '2024-02-20',
    type: 'Serum'
  }
])

// Computed
const filteredData = computed(() => {
  return allData.value.filter((item) => {
    // Dataset filter
    if (selectedDatasets.value.length > 0) {
      const itemDatasetValue = datasetOptions.find(
        opt => opt.label.toLowerCase() === item.dataSet.toLowerCase()
      )?.value
      if (!itemDatasetValue || !selectedDatasets.value.includes(itemDatasetValue)) {
        return false
      }
    }

    // Site filter
    if (filters.value.site && item.site.toLowerCase() !== filters.value.site.toLowerCase()) {
      return false
    }

    // Sample type filter
    if (filters.value.sampleType && item.type.toLowerCase() !== filters.value.sampleType.toLowerCase()) {
      return false
    }

    // Date range filter
    if (dateRange.value.from && item.dateFrom < dateRange.value.from) {
      return false
    }
    if (dateRange.value.to && item.dateTo > dateRange.value.to) {
      return false
    }

    return true
  })
})

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredData.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPerPage.value)
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Methods
const getSampleTypeBadgeClass = (type: string): string => {
  const baseClasses = 'px-3 py-1 text-xs rounded-full font-medium'
  const typeClasses: Record<string, string> = {
    'Blood': 'bg-green-100 text-green-800',
    'Plasma': 'bg-blue-100 text-blue-800',
    'Serum': 'bg-orange-100 text-orange-800',
    'Tissue': 'bg-pink-100 text-pink-800'
  }
  return `${baseClasses} ${typeClasses[type] || 'bg-gray-100 text-gray-800'}`
}

const resetFilters = () => {
  filters.value = {
    site: '',
    sampleType: ''
  }
  selectedDatasets.value = []
  dateRange.value = { from: '', to: '' }
  currentPage.value = 1
}

const applyFilters = () => {
  currentPage.value = 1
}

const viewDetails = (item: ReportData) => {
  selectedItem.value = item
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedItem.value = null
}

const exportSingleItem = (item: ReportData) => {
  downloadJSON([item], `biosample_${item.id}_details`)
}

const downloadData = (format: 'csv' | 'excel' | 'json') => {
  const data = filteredData.value

  if (format === 'csv') {
    downloadCSV(data)
  } else if (format === 'excel') {
    downloadExcel(data)
  } else if (format === 'json') {
    downloadJSON(data)
  }
}

const downloadCSV = (data: ReportData[]) => {
  const headers = ['SN', 'Data Set', 'Site', 'Date (From)', 'Date (To)', 'Type']
  const csvRows = [headers.join(',')]

  data.forEach((item, index) => {
    const row = [
      index + 1,
      `"${item.dataSet}"`,
      `"${item.site}"`,
      item.dateFrom,
      item.dateTo,
      item.type
    ]
    csvRows.push(row.join(','))
  })

  const csvContent = csvRows.join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', `biosample_reports_${Date.now()}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const downloadExcel = (data: ReportData[]) => {
  let table = '<table><thead><tr>'
  const headers = ['SN', 'Data Set', 'Site', 'Date (From)', 'Date (To)', 'Type']

  headers.forEach(header => {
    table += `<th>${header}</th>`
  })
  table += '</tr></thead><tbody>'

  data.forEach((item, index) => {
    table += '<tr>'
    table += `<td>${index + 1}</td>`
    table += `<td>${item.dataSet}</td>`
    table += `<td>${item.site}</td>`
    table += `<td>${item.dateFrom}</td>`
    table += `<td>${item.dateTo}</td>`
    table += `<td>${item.type}</td>`
    table += '</tr>'
  })

  table += '</tbody></table>'

  const blob = new Blob([table], { type: 'application/vnd.ms-excel' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', `biosample_reports_${Date.now()}.xls`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const downloadJSON = (data: ReportData[], filename?: string) => {
  const jsonContent = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonContent], { type: 'application/json' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', `${filename || `biosample_reports_${Date.now()}`}.json`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>
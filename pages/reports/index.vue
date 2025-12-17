<template>
  <NuxtLayout name="dashboard">
  <div class="min-h-screen">
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <!-- Page Header -->
      <div class="mb-6 sm:mb-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Reports</h1>
        <p class="mt-2 text-sm sm:text-base text-gray-600">
          Generate and export biosample datasets for analysis or sharing.
        </p>
      </div>

      <!-- Filter & Dataset Selection Card -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
        <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
          Filter & Dataset Selection
        </h2>

        <!-- Select Dataset -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Select Dataset
          </label>
          <select
            v-model="selectedDatasets"
            multiple
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Choose one or more datasets</option>
            <option value="clinical">Clinical Data</option>
            <option value="laboratory">Laboratory Data</option>
            <option value="research">Research Data</option>
          </select>
        </div>

        <!-- Filter Row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <!-- Sites -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Sites</label>
            <select
              v-model="filters.site"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Sites</option>
              <option value="memorial">Memorial Hospital</option>
              <option value="central">Central Hospital</option>
              <option value="general">General Hospital</option>
            </select>
          </div>

          <!-- Date Range From -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Date Range (From)
            </label>
            <div class="relative">
              <input
                v-model="filters.dateFrom"
                type="text"
                placeholder="mm/dd/yyyy"
                @focus="showDateFromPicker = true"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                readonly
              />
              <!-- Custom Date Picker From -->
              <div
                v-if="showDateFromPicker"
                class="absolute z-50 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-72"
              >
                <div class="flex justify-between items-center mb-4">
                  <button
                    @click="changeMonth('from', -1)"
                    class="p-1 hover:bg-gray-100 rounded"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span class="font-semibold">{{ currentMonthYearFrom }}</span>
                  <button
                    @click="changeMonth('from', 1)"
                    class="p-1 hover:bg-gray-100 rounded"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <div class="grid grid-cols-7 gap-1 mb-2">
                  <div v-for="day in ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']" :key="day" class="text-center text-xs font-semibold text-gray-600 py-1">
                    {{ day }}
                  </div>
                </div>
                <div class="grid grid-cols-7 gap-1">
                  <button
                    v-for="day in calendarDaysFrom"
                    :key="day.date"
                    @click="selectDate('from', day.date)"
                    :disabled="!day.isCurrentMonth"
                    :class="[
                      'p-2 text-sm rounded hover:bg-blue-50',
                      day.isCurrentMonth ? 'text-gray-900' : 'text-gray-300',
                      day.isSelected ? 'bg-blue-600 text-white hover:bg-blue-700' : '',
                      !day.isCurrentMonth ? 'cursor-not-allowed' : 'cursor-pointer'
                    ]"
                  >
                    {{ day.day }}
                  </button>
                </div>
                <div class="mt-4 flex justify-end gap-2">
                  <button
                    @click="showDateFromPicker = false"
                    class="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    @click="clearDate('from')"
                    class="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Date Range To -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Date Range (To)
            </label>
            <div class="relative">
              <input
                v-model="filters.dateTo"
                type="text"
                placeholder="mm/dd/yyyy"
                @focus="showDateToPicker = true"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                readonly
              />
              <!-- Custom Date Picker To -->
              <div
                v-if="showDateToPicker"
                class="absolute z-50 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-72"
              >
                <div class="flex justify-between items-center mb-4">
                  <button
                    @click="changeMonth('to', -1)"
                    class="p-1 hover:bg-gray-100 rounded"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span class="font-semibold">{{ currentMonthYearTo }}</span>
                  <button
                    @click="changeMonth('to', 1)"
                    class="p-1 hover:bg-gray-100 rounded"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <div class="grid grid-cols-7 gap-1 mb-2">
                  <div v-for="day in ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']" :key="day" class="text-center text-xs font-semibold text-gray-600 py-1">
                    {{ day }}
                  </div>
                </div>
                <div class="grid grid-cols-7 gap-1">
                  <button
                    v-for="day in calendarDaysTo"
                    :key="day.date"
                    @click="selectDate('to', day.date)"
                    :disabled="!day.isCurrentMonth"
                    :class="[
                      'p-2 text-sm rounded hover:bg-blue-50',
                      day.isCurrentMonth ? 'text-gray-900' : 'text-gray-300',
                      day.isSelected ? 'bg-blue-600 text-white hover:bg-blue-700' : '',
                      !day.isCurrentMonth ? 'cursor-not-allowed' : 'cursor-pointer'
                    ]"
                  >
                    {{ day.day }}
                  </button>
                </div>
                <div class="mt-4 flex justify-end gap-2">
                  <button
                    @click="showDateToPicker = false"
                    class="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    @click="clearDate('to')"
                    class="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Sample Types -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Sample Types
            </label>
            <select
              v-model="filters.sampleType"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Type</option>
              <option value="blood">Blood</option>
              <option value="plasma">Plasma</option>
              <option value="serum">Serum</option>
              <option value="tissue">Tissue</option>
            </select>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-end">
          <button
            @click="resetFilters"
            class="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Reset Filter
          </button>
          <button
            @click="applyFilters"
            class="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            View Results
          </button>
        </div>
      </div>

      <!-- Results Table Card -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <!-- Mobile View -->
        <div class="block lg:hidden">
          <div v-if="filteredData.length === 0" class="p-8 text-center text-gray-500">
            No results found. Please adjust your filters.
          </div>
          <div v-else class="divide-y divide-gray-200">
            <div
              v-for="item in paginatedData"
              :key="item.id"
              class="p-4 hover:bg-gray-50"
            >
              <div class="flex justify-between items-start mb-2">
                <div class="font-medium text-gray-900">{{ item.dataSet }}</div>
                <span
                  :class="[
                    'px-2 py-1 text-xs rounded-full',
                    item.type === 'Blood' ? 'bg-green-100 text-green-800' : '',
                    item.type === 'Plasma' ? 'bg-blue-100 text-blue-800' : '',
                    item.type === 'Serum' ? 'bg-orange-100 text-orange-800' : '',
                    item.type === 'Tissue' ? 'bg-pink-100 text-pink-800' : ''
                  ]"
                >
                  {{ item.type }}
                </span>
              </div>
              <div class="text-sm text-gray-600 space-y-1">
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{{ item.site }}</span>
                </div>
                <div>Date: {{ item.dateFrom }} - {{ item.dateTo }}</div>
              </div>
              <button
                @click="viewDetails(item)"
                class="mt-3 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center justify-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View
              </button>
            </div>
          </div>
        </div>

        <!-- Desktop Table View -->
        <div class="hidden lg:block overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SN
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data Set
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Site
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date (From)
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date (To)
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="filteredData.length === 0">
                <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                  No results found. Please adjust your filters.
                </td>
              </tr>
              <tr
                v-for="(item, index) in paginatedData"
                :key="item.id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ (currentPage - 1) * itemsPerPage + index + 1 }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.dataSet }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {{ item.site }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {{ item.dateFrom }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {{ item.dateTo }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'px-3 py-1 text-xs rounded-full font-medium',
                      item.type === 'Blood' ? 'bg-green-100 text-green-800' : '',
                      item.type === 'Plasma' ? 'bg-blue-100 text-blue-800' : '',
                      item.type === 'Serum' ? 'bg-orange-100 text-orange-800' : '',
                      item.type === 'Tissue' ? 'bg-pink-100 text-pink-800' : ''
                    ]"
                  >
                    {{ item.type }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    @click="viewDetails(item)"
                    class="text-gray-600 hover:text-gray-900"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="filteredData.length > 0" class="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="text-sm text-gray-700">
              Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to 
              {{ Math.min(currentPage * itemsPerPage, filteredData.length) }} of 
              {{ filteredData.length }} results
            </div>
            <div class="flex gap-2">
              <button
                @click="currentPage--"
                :disabled="currentPage === 1"
                class="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                Previous
              </button>
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'px-3 py-1 border rounded-md',
                  currentPage === page
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 hover:bg-gray-100'
                ]"
              >
                {{ page }}
              </button>
              <button
                @click="currentPage++"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <!-- Download Options Footer -->
        <div v-if="filteredData.length > 0" class="bg-blue-900 px-4 py-4 sm:px-6 flex flex-col sm:flex-row items-center justify-end gap-3">
          <span class="text-white font-medium text-sm sm:text-base">Download Options:</span>
          <div class="flex flex-wrap gap-3 justify-center sm:justify-end">
            <button
              @click="downloadData('csv')"
              class="flex items-center gap-2 px-4 py-2 bg-white text-blue-900 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              CSV
            </button>
            <button
              @click="downloadData('excel')"
              class="flex items-center gap-2 px-4 py-2 bg-white text-blue-900 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              EXCEL
            </button>
            <button
              @click="downloadData('json')"
              class="flex items-center gap-2 px-4 py-2 bg-white text-blue-900 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              JSON
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface ReportData {
  id: number
  dataSet: string
  site: string
  dateFrom: string
  dateTo: string
  type: string
}

interface Filters {
  site: string
  dateFrom: string
  dateTo: string
  sampleType: string
}

interface CalendarDay {
  day: number
  date: string
  isCurrentMonth: boolean
  isSelected: boolean
}

// State
const selectedDatasets = ref<string[]>([])
const filters = ref<Filters>({
  site: '',
  dateFrom: '',
  dateTo: '',
  sampleType: ''
})

const showDateFromPicker = ref(false)
const showDateToPicker = ref(false)
const currentMonthFrom = ref(new Date())
const currentMonthTo = ref(new Date())

const currentPage = ref(1)
const itemsPerPage = ref(10)

// Sample Data
const allData = ref<ReportData[]>([
  {
    id: 1,
    dataSet: 'Clinical Data',
    site: 'Memorial Hospital',
    dateFrom: '2024-01-01',
    dateTo: '2024-01-01',
    type: 'Blood'
  },
  {
    id: 2,
    dataSet: 'Clinical Data',
    site: 'Memorial Hospital',
    dateFrom: '2024-01-01',
    dateTo: '2024-01-01',
    type: 'Plasma'
  },
  {
    id: 3,
    dataSet: 'Clinical Data',
    site: 'Memorial Hospital',
    dateFrom: '2024-01-01',
    dateTo: '2024-01-01',
    type: 'Serum'
  },
  {
    id: 4,
    dataSet: 'Clinical Data',
    site: 'Memorial Hospital',
    dateFrom: '2024-01-01',
    dateTo: '2024-01-01',
    type: 'Tissue'
  }
])

// Computed
const currentMonthYearFrom = computed(() => {
  return currentMonthFrom.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const currentMonthYearTo = computed(() => {
  return currentMonthTo.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const calendarDaysFrom = computed((): CalendarDay[] => {
  return generateCalendarDays(currentMonthFrom.value, filters.value.dateFrom)
})

const calendarDaysTo = computed((): CalendarDay[] => {
  return generateCalendarDays(currentMonthTo.value, filters.value.dateTo)
})

const filteredData = computed(() => {
  return allData.value.filter((item) => {
    if (filters.value.site && item.site.toLowerCase() !== filters.value.site.toLowerCase()) {
      return false
    }
    if (filters.value.sampleType && item.type.toLowerCase() !== filters.value.sampleType.toLowerCase()) {
      return false
    }
    if (filters.value.dateFrom && item.dateFrom < filters.value.dateFrom) {
      return false
    }
    if (filters.value.dateTo && item.dateTo > filters.value.dateTo) {
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
const generateCalendarDays = (monthDate: Date, selectedDate: string): CalendarDay[] => {
  const days: CalendarDay[] = []
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startingDayOfWeek = firstDay.getDay()
  const daysInMonth = lastDay.getDate()
  
  // Previous month days
  const prevMonthLastDay = new Date(year, month, 0).getDate()
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i
    const date = formatDate(new Date(year, month - 1, day))
    days.push({ day, date, isCurrentMonth: false, isSelected: false })
  }
  
  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = formatDate(new Date(year, month, day))
    days.push({
      day,
      date,
      isCurrentMonth: true,
      isSelected: date === selectedDate
    })
  }
  
  // Next month days
  const remainingDays = 42 - days.length
  for (let day = 1; day <= remainingDays; day++) {
    const date = formatDate(new Date(year, month + 1, day))
    days.push({ day, date, isCurrentMonth: false, isSelected: false })
  }
  
  return days
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const formatDisplayDate = (dateStr: string): string => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

const changeMonth = (type: 'from' | 'to', direction: number) => {
  if (type === 'from') {
    currentMonthFrom.value = new Date(
      currentMonthFrom.value.getFullYear(),
      currentMonthFrom.value.getMonth() + direction,
      1
    )
  } else {
    currentMonthTo.value = new Date(
      currentMonthTo.value.getFullYear(),
      currentMonthTo.value.getMonth() + direction,
      1
    )
  }
}

const selectDate = (type: 'from' | 'to', date: string) => {
  if (type === 'from') {
    filters.value.dateFrom = formatDisplayDate(date)
    showDateFromPicker.value = false
  } else {
    filters.value.dateTo = formatDisplayDate(date)
    showDateToPicker.value = false
  }
}

const clearDate = (type: 'from' | 'to') => {
  if (type === 'from') {
    filters.value.dateFrom = ''
    showDateFromPicker.value = false
  } else {
    filters.value.dateTo = ''
    showDateToPicker.value = false
  }
}

const resetFilters = () => {
  filters.value = {
    site: '',
    dateFrom: '',
    dateTo: '',
    sampleType: ''
  }
  selectedDatasets.value = []
  currentPage.value = 1
}

const applyFilters = () => {
  currentPage.value = 1
}

const viewDetails = (item: ReportData) => {
  console.log('View details:', item)
  // Implement view details logic
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
  link.setAttribute('download', `reports_${Date.now()}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const downloadExcel = (data: ReportData[]) => {
  // Create a simple HTML table for Excel
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
  link.setAttribute('download', `reports_${Date.now()}.xls`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const downloadJSON = (data: ReportData[]) => {
  const jsonContent = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonContent], { type: 'application/json' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `reports_${Date.now()}.json`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Close date pickers when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    showDateFromPicker.value = false
    showDateToPicker.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
<template>
  <NuxtLayout name="dashboard">
    <div class="space-y-6">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Total Specimen -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-medium text-gray-600">Total Specimen</h3>
            <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div class="flex items-end justify-between">
            <div>
              <p class="text-3xl font-bold text-gray-900">{{ stats.totalSpecimen.toLocaleString() }}</p>
              <p class="text-sm text-green-600 mt-1 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                12% from last month
              </p>
            </div>
          </div>
        </div>

        <!-- Utilization -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-medium text-gray-600">Utilization</h3>
            <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <div class="flex items-end justify-between">
            <div>
              <p class="text-3xl font-bold text-gray-900">{{ stats.utilization.toLocaleString() }}</p>
              <p class="text-sm text-green-600 mt-1 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                12% from last month
              </p>
            </div>
          </div>
        </div>

        <!-- Alerts -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-medium text-gray-600">Alerts</h3>
            <div class="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
          </div>
          <div class="flex items-end justify-between">
            <div>
              <p class="text-3xl font-bold text-gray-900">{{ stats.alerts.toLocaleString() }}</p>
              <p class="text-sm text-green-600 mt-1 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                12% from last month
              </p>
            </div>
          </div>
        </div>

        <!-- Recent Transfer -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-medium text-gray-600">Recent Transfer</h3>
            <div class="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
          </div>
          <div class="flex items-end justify-between">
            <div>
              <p class="text-3xl font-bold text-gray-900">{{ stats.recentTransfer.toLocaleString() }}</p>
              <p class="text-sm text-green-600 mt-1 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                12% from last month
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Freezer Capacity -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Freezer Capacity</h3>
            <span class="text-sm text-gray-500">Current Status</span>
          </div>
          <div class="flex items-center justify-between gap-8">
            <div class="flex-1">
              <canvas ref="donutChartRef" class="max-w-[250px] mx-auto"></canvas>
            </div>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-4 h-4 rounded-sm bg-[#1e6b8c]"></div>
                <span class="text-sm text-gray-600">80 Storage 45%</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-4 h-4 rounded-sm bg-[#2ecc71]"></div>
                <span class="text-sm text-gray-600">80 Storage 45%</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-4 h-4 rounded-sm bg-[#4a90e2]"></div>
                <span class="text-sm text-gray-600">80 Storage 45%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Sample Inventory -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Sample Inventory</h3>
            <span class="text-sm text-gray-500">Current Status</span>
          </div>
          <div>
            <canvas ref="lineChartRef" class="w-full" style="height: 250px;"></canvas>
          </div>
        </div>
      </div>

      <!-- Recent Transfers Table -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Recent Transfers</h3>
          <div class="flex items-center gap-3">
            <button
              @click="showFilterModal = true"
              class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span class="text-sm font-medium">Filter</span>
            </button>
            <button
              @click="exportData"
              class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span class="text-sm font-medium">Export</span>
            </button>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="text-left py-4 px-4 text-sm font-semibold text-gray-700">Transfer ID</th>
                <th class="text-left py-4 px-4 text-sm font-semibold text-gray-700">Sample Location</th>
                <th class="text-left py-4 px-4 text-sm font-semibold text-gray-700">Destination</th>
                <th class="text-left py-4 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th class="text-left py-4 px-4 text-sm font-semibold text-gray-700">Date/Time</th>
                <th class="text-left py-4 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="transfer in transfers"
                :key="transfer.id"
                class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td class="py-4 px-4">
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-900">{{ transfer.id }}</span>
                    <button
                      @click="copyToClipboard(transfer.id)"
                      class="text-gray-400 hover:text-gray-600 transition-colors"
                      title="Copy Transfer ID"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td class="py-4 px-4 text-sm text-gray-700">{{ transfer.sampleLocation }}</td>
                <td class="py-4 px-4 text-sm text-gray-700">{{ transfer.destination }}</td>
                <td class="py-4 px-4">
                  <span
                    class="px-3 py-1 rounded-full text-xs font-medium"
                    :class="{
                      'bg-green-100 text-green-700': transfer.status === 'Completed',
                      'bg-orange-100 text-orange-700': transfer.status === 'Pending',
                      'bg-blue-100 text-blue-700': transfer.status === 'In-Transit'
                    }"
                  >
                    {{ transfer.status }}
                  </span>
                </td>
                <td class="py-4 px-4 text-sm text-gray-700">{{ transfer.dateTime }}</td>
                <td class="py-4 px-4">
                  <div class="flex items-center gap-2">
                    <button
                      @click="viewTransfer(transfer)"
                      class="text-gray-600 hover:text-blue-600 transition-colors"
                      title="View"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      @click="editTransfer(transfer)"
                      class="text-gray-600 hover:text-blue-600 transition-colors"
                      title="Edit"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Filter Modal -->
    <Teleport to="body">
      <div
        v-if="showFilterModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="showFilterModal = false"
      >
        <div class="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Filter Transfers</h3>
            <button
              @click="showFilterModal = false"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="in-transit">In-Transit</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <input
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div class="flex gap-3 pt-4">
              <button
                @click="applyFilters"
                class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply Filters
              </button>
              <button
                @click="resetFilters"
                class="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </NuxtLayout>
</template>

<script setup lang="ts">
import Chart from 'chart.js/auto'

interface Transfer {
  id: string
  sampleLocation: string
  destination: string
  status: 'Completed' | 'Pending' | 'In-Transit'
  dateTime: string
}

const stats = ref({
  totalSpecimen: 24500,
  utilization: 24500,
  alerts: 24500,
  recentTransfer: 24500
})

const transfers = ref<Transfer[]>([
  {
    id: 'TRF-2025-001',
    sampleLocation: 'Lab A - Freezer 2',
    destination: 'Lab B - Freezer 3',
    status: 'Completed',
    dateTime: 'Jan 15, 2024 10:23'
  },
  {
    id: 'TRF-2025-001',
    sampleLocation: 'Lab A - Freezer 2',
    destination: 'Lab B - Freezer 3',
    status: 'Pending',
    dateTime: 'Jan 15, 2024 16:30'
  },
  {
    id: 'TRF-2025-001',
    sampleLocation: 'Lab A - Freezer 2',
    destination: 'Lab B - Freezer 3',
    status: 'Completed',
    dateTime: 'Jan 15, 2024 10:23'
  },
  {
    id: 'TRF-2025-001',
    sampleLocation: 'Lab A - Freezer 2',
    destination: 'Lab B - Freezer 3',
    status: 'In-Transit',
    dateTime: 'Jan 15, 2024 10:23'
  }
])

const showFilterModal = ref(false)
const donutChartRef = ref<HTMLCanvasElement | null>(null)
const lineChartRef = ref<HTMLCanvasElement | null>(null)
let donutChart: Chart | null = null
let lineChart: Chart | null = null

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    alert('Transfer ID copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const viewTransfer = (transfer: Transfer) => {
  console.log('Viewing transfer:', transfer)
  // Navigate to detail page or open modal
}

const editTransfer = (transfer: Transfer) => {
  console.log('Editing transfer:', transfer)
  // Navigate to edit page or open modal
}

const exportData = () => {
  // Implement CSV export
  const csv = [
    ['Transfer ID', 'Sample Location', 'Destination', 'Status', 'Date/Time'],
    ...transfers.value.map(t => [t.id, t.sampleLocation, t.destination, t.status, t.dateTime])
  ].map(row => row.join(',')).join('\n')
  
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'transfers.csv'
  a.click()
  window.URL.revokeObjectURL(url)
}

const applyFilters = () => {
  showFilterModal.value = false
  // Apply filter logic here
}

const resetFilters = () => {
  showFilterModal.value = false
  // Reset filter logic here
}

const initCharts = () => {
  // Donut Chart
  if (donutChartRef.value) {
    const ctx = donutChartRef.value.getContext('2d')
    if (ctx) {
      donutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Storage 1', 'Storage 2', 'Storage 3'],
          datasets: [{
            data: [45, 45, 10],
            backgroundColor: ['#1e6b8c', '#2ecc71', '#4a90e2'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          cutout: '70%',
          plugins: {
            legend: {
              display: false
            }
          }
        }
      })
    }
  }

  // Line Chart
  if (lineChartRef.value) {
    const ctx = lineChartRef.value.getContext('2d')
    if (ctx) {
      lineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            data: [12000, 14000, 13000, 16000, 15000, 17000, 19000, 18000, 20000, 21000, 22000, 24000],
            borderColor: '#1e6b8c',
            backgroundColor: 'transparent',
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              grid: {
                color: '#f3f4f6'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      })
    }
  }
}

onMounted(() => {
  nextTick(() => {
    initCharts()
  })
})

onUnmounted(() => {
  if (donutChart) {
    donutChart.destroy()
  }
  if (lineChart) {
    lineChart.destroy()
  }
})
</script>
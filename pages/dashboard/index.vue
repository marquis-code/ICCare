<template>
  <NuxtLayout name="dashboard">
    <div class="space-y-6">
      <!-- Stats Cards -->
      <OverviewStats :stats="statsData" />

      <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Freezer Capacity -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-medium text-gray-900">Freezer Capacity</h3>
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
            <h3 class="text-lg font-medium text-gray-900">Sample Inventory</h3>
            <span class="text-sm text-gray-500">Current Status</span>
          </div>
          <div>
            <canvas ref="lineChartRef" class="w-full" style="height: 250px;"></canvas>
          </div>
        </div>
      </div>

      <!-- Recent Transfers Table -->
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Recent Transfers</h3>
          <div class="flex items-center gap-3">
            <button @click="showFilterModal = true"
              class="flex px-6 py-3.5 items-center gap-2  bg-[#EAF7FF] rounded-lg transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.0001 12V19.88C14.0401 20.18 13.9401 20.5 13.7101 20.71C13.6176 20.8027 13.5077 20.8762 13.3868 20.9264C13.2658 20.9766 13.1361 21.0024 13.0051 21.0024C12.8742 21.0024 12.7445 20.9766 12.6235 20.9264C12.5025 20.8762 12.3926 20.8027 12.3001 20.71L10.2901 18.7C10.1811 18.5933 10.0982 18.4629 10.0479 18.319C9.99763 18.175 9.98127 18.0213 10.0001 17.87V12H9.97013L4.21013 4.62C4.04774 4.41153 3.97446 4.14726 4.00632 3.88493C4.03817 3.6226 4.17257 3.38355 4.38013 3.22C4.57013 3.08 4.78013 3 5.00013 3H19.0001C19.2201 3 19.4301 3.08 19.6201 3.22C19.8277 3.38355 19.9621 3.6226 19.9939 3.88493C20.0258 4.14726 19.9525 4.41153 19.7901 4.62L14.0301 12H14.0001Z" fill="#005B8F"/>
              </svg>
              <span class="text-sm font-medium">Filter</span>
            </button>
            <button @click="exportData"
              class="flex px-6 py-3.5 items-center gap-2  bg-[#005B8F] text-white rounded-lg  transition-colors">
              <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_2004_743)">
                  <path d="M3.01562 0C1.9125 0 1.01562 0.896875 1.01562 2V14C1.01562 15.1031 1.9125 16 3.01562 16H11.0156C12.1187 16 13.0156 15.1031 13.0156 14V11H15.4563L14.4875 11.9688C14.1938 12.2625 14.1938 12.7375 14.4875 13.0281C14.7812 13.3187 15.2563 13.3219 15.5469 13.0281L17.7969 10.7781C18.0906 10.4844 18.0906 10.0094 17.7969 9.71875L15.5469 7.46875C15.2531 7.175 14.7781 7.175 14.4875 7.46875C14.1969 7.7625 14.1938 8.2375 14.4875 8.52812L15.4563 9.49687H13.0156V5.325C13.0156 4.79375 12.8062 4.28438 12.4312 3.90937L9.1 0.584375C8.725 0.209375 8.21875 0 7.6875 0H3.01562ZM11.1875 5.5H8.26562C7.85 5.5 7.51562 5.16563 7.51562 4.75V1.82812L11.1875 5.5ZM7.01562 10.25C7.01562 9.83438 7.35 9.5 7.76562 9.5H11.0156V11H7.76562C7.35 11 7.01562 10.6656 7.01562 10.25Z" fill="white"/>
                </g>
                <defs>
                  <clipPath id="clip0_2004_743">
                    <rect width="18" height="16" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <span class="text-sm font-medium">Export</span>
            </button>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto rounded-xl border-[0.5px] border-gray-50">
          <table class="w-full rounded-t-xl">
            <thead>
              <tr class="border-b bg-[#F6F6F6]  border-gray-100">
                <th class="text-left py-6 px-4 text-sm font-semibold text-gray-700">Transfer ID</th>
                <th class="text-left py-6 px-4 text-sm font-semibold text-gray-700">Sample Location</th>
                <th class="text-left py-6 px-4 text-sm font-semibold text-gray-700">Destination</th>
                <th class="text-left py-6 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th class="text-left py-6 px-4 text-sm font-semibold text-gray-700">Date/Time</th>
                <th class="text-left py-6 px-4 text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <!-- Loading State with Pulse Animation -->
            <tbody v-if="fetchingAllTrackingRequests">
              <tr v-for="i in 5" :key="`skeleton-${i}`" class="border-b border-gray-50 animate-pulse">
                <td class="py-6 px-4">
                  <div class="flex items-center gap-2">
                    <div class="h-4 bg-gray-200 rounded w-32"></div>
                    <div class="h-6 w-6 bg-gray-200 rounded"></div>
                  </div>
                </td>
                <td class="py-6 px-4">
                  <div class="h-4 bg-gray-200 rounded w-40"></div>
                </td>
                <td class="py-6 px-4">
                  <div class="h-4 bg-gray-200 rounded w-40"></div>
                </td>
                <td class="py-6 px-4">
                  <div class="h-6 bg-gray-200 rounded-full w-24"></div>
                </td>
                <td class="py-6 px-4">
                  <div class="h-4 bg-gray-200 rounded w-36"></div>
                </td>
                <td class="py-6 px-4">
                  <div class="h-5 w-5 bg-gray-200 rounded"></div>
                </td>
              </tr>
            </tbody>
            <!-- Empty State -->
            <tbody v-else-if="formattedTransfers.length === 0">
              <tr>
                <td colspan="6" class="py-16 text-center">
                  <div class="flex flex-col items-center justify-center gap-3">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-gray-300">
                      <path d="M32 8C18.745 8 8 18.745 8 32C8 45.255 18.745 56 32 56C45.255 56 56 45.255 56 32C56 18.745 45.255 8 32 8ZM32 12C43.028 12 52 20.972 52 32C52 43.028 43.028 52 32 52C20.972 52 12 43.028 12 32C12 20.972 20.972 12 32 12ZM28 24V40H36V24H28ZM24 28H20V36H24V28ZM44 28V36H40V28H44Z" fill="currentColor"/>
                    </svg>
                    <div>
                      <p class="text-gray-900 font-medium text-lg">No transfers found</p>
                      <p class="text-gray-500 text-sm mt-1">There are no transfer records to display at the moment</p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr v-for="transfer in formattedTransfers" :key="transfer.id"
                class="border-b border-gray-50 hover:bg-gray-20 transition-colors">
                <td class="py-6 px-4">
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-900">{{ transfer.id }}</span>
                    <button @click="copyToClipboard(transfer.id)"
                      class="text-gray-400 hover:text-gray-600 transition-colors" title="Copy Transfer ID">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.24 2H11.346C9.582 2 8.184 2 7.091 2.148C5.965 2.3 5.054 2.62 4.336 3.341C3.617 4.062 3.298 4.977 3.147 6.107C3 7.205 3 8.608 3 10.379V16.217C3 17.725 3.92 19.017 5.227 19.559C5.16 18.649 5.16 17.374 5.16 16.312V11.302C5.16 10.021 5.16 8.916 5.278 8.032C5.405 7.084 5.691 6.176 6.425 5.439C7.159 4.702 8.064 4.415 9.008 4.287C9.888 4.169 10.988 4.169 12.265 4.169H15.335C16.611 4.169 17.709 4.169 18.59 4.287C18.3261 3.61329 17.8653 3.03474 17.2678 2.62678C16.6702 2.21883 15.9635 2.00041 15.24 2Z" fill="#E1E1E1"/>
                        <path d="M6.59961 11.3968C6.59961 8.67077 6.59961 7.30777 7.44361 6.46077C8.28661 5.61377 9.64361 5.61377 12.3596 5.61377H15.2396C17.9546 5.61377 19.3126 5.61377 20.1566 6.46077C21.0006 7.30777 20.9996 8.67077 20.9996 11.3968V16.2168C20.9996 18.9428 20.9996 20.3058 20.1566 21.1528C19.3126 21.9998 17.9546 21.9998 15.2396 21.9998H12.3596C9.64461 21.9998 8.28661 21.9998 7.44361 21.1528C6.59961 20.3058 6.59961 18.9428 6.59961 16.2168V11.3968Z" fill="#E1E1E1"/>
                      </svg>
                    </button>
                  </div>
                </td>
                <td class="py-6 px-4 text-sm text-gray-700">{{ transfer.sampleLocation }}</td>
                <td class="py-6 px-4 text-sm text-gray-700">{{ transfer.destination }}</td>
                <td class="py-6 px-4">
                  <span class="px-3 py-1 rounded-full text-xs font-medium" :class="{
                    'bg-green-100 text-green-700': transfer.status === 'Completed',
                    'bg-orange-100 text-orange-700': transfer.status === 'Pending',
                    'bg-blue-100 text-blue-700': transfer.status === 'In-Transit',
                    'bg-red-100 text-red-700': transfer.status === 'Rejected'
                  }">
                    {{ transfer.status }}
                  </span>
                </td>
                <td class="py-6 px-4 text-sm text-gray-700">{{ transfer.dateTime }}</td>
                <td class="py-6 px-4">
                  <button @click="viewTransfer(transfer)" class="text-gray-600 hover:text-blue-600 transition-colors"
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
      </div>
    </div>

    <!-- Filter Modal -->
    <Teleport to="body">
      <div v-if="showFilterModal" class="fixed bg-black/50 backdrop-blur-lg inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
        @click.self="showFilterModal = false">
        <div class="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-medium text-gray-900">Filter Transfers</h3>
            <button @click="showFilterModal = false" class="text-gray-400 hover:text-gray-600 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <UiSelectInput 
                v-model="selectedStatus" 
                label="Status"
                :options="statuses"
                position="standalone"
              />
            </div>

            <div>
              <CoreDateRangePicker v-model="dateRange" />
            </div>

            <div class="flex gap-3 pt-4">
              <button @click="applyFilters"
                class="flex-1 bg-[#005B8F] text-sm text-white px-4 py-3 rounded-lg  transition-colors">
                Apply Filters
              </button>
              <button @click="resetFilters"
                class="flex-1 border-[0.5px] text-sm border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Transfer Details Modal -->
    <Teleport to="body">
      <div v-if="showDetailsModal && selectedTransfer" class="fixed bg-black/50 backdrop-blur-lg inset-0 flex items-center justify-center z-[9999] p-4"
        @click.self="closeDetailsModal">
        <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <!-- Header -->
          <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h3 class="text-xl font-semibold text-gray-900">Transfer Details</h3>
            <button @click="closeDetailsModal" class="text-gray-400 hover:text-gray-600 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="p-6 space-y-6">
            <!-- Transfer ID & Status -->
            <div class="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <p class="text-sm text-gray-500 mb-1">Transfer ID</p>
                <div class="flex items-center gap-2">
                  <p class="text-lg font-semibold text-gray-900">{{ selectedTransfer.id }}</p>
                  <button @click="copyToClipboard(selectedTransfer.id)"
                    class="text-gray-400 hover:text-gray-600 transition-colors" title="Copy Transfer ID">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.24 2H11.346C9.582 2 8.184 2 7.091 2.148C5.965 2.3 5.054 2.62 4.336 3.341C3.617 4.062 3.298 4.977 3.147 6.107C3 7.205 3 8.608 3 10.379V16.217C3 17.725 3.92 19.017 5.227 19.559C5.16 18.649 5.16 17.374 5.16 16.312V11.302C5.16 10.021 5.16 8.916 5.278 8.032C5.405 7.084 5.691 6.176 6.425 5.439C7.159 4.702 8.064 4.415 9.008 4.287C9.888 4.169 10.988 4.169 12.265 4.169H15.335C16.611 4.169 17.709 4.169 18.59 4.287C18.3261 3.61329 17.8653 3.03474 17.2678 2.62678C16.6702 2.21883 15.9635 2.00041 15.24 2Z" fill="#E1E1E1"/>
                      <path d="M6.59961 11.3968C6.59961 8.67077 6.59961 7.30777 7.44361 6.46077C8.28661 5.61377 9.64361 5.61377 12.3596 5.61377H15.2396C17.9546 5.61377 19.3126 5.61377 20.1566 6.46077C21.0006 7.30777 20.9996 8.67077 20.9996 11.3968V16.2168C20.9996 18.9428 20.9996 20.3058 20.1566 21.1528C19.3126 21.9998 17.9546 21.9998 15.2396 21.9998H12.3596C9.64461 21.9998 8.28661 21.9998 7.44361 21.1528C6.59961 20.3058 6.59961 18.9428 6.59961 16.2168V11.3968Z" fill="#E1E1E1"/>
                    </svg>
                  </button>
                </div>
              </div>
              <span class="px-4 py-2 rounded-full text-sm font-medium" :class="{
                'bg-green-100 text-green-700': selectedTransfer.status === 'Completed',
                'bg-orange-100 text-orange-700': selectedTransfer.status === 'Pending',
                'bg-blue-100 text-blue-700': selectedTransfer.status === 'In-Transit',
                'bg-red-100 text-red-700': selectedTransfer.status === 'Rejected'
              }">
                {{ selectedTransfer.status }}
              </span>
            </div>

            <!-- Sample Information -->
            <div class="space-y-3">
              <h4 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Sample Information</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-gray-50 rounded-lg p-4">
                  <p class="text-xs text-gray-500 mb-1">Sample Serial No.</p>
                  <p class="text-sm font-medium text-gray-900">{{ selectedTransfer.rawData?.sample_serial_no || 'N/A' }}</p>
                </div>
                <div class="bg-gray-50 rounded-lg p-4">
                  <p class="text-xs text-gray-500 mb-1">Sample UUID</p>
                  <p class="text-sm font-medium text-gray-900 break-all">{{ selectedTransfer.rawData?.sample_uuid || 'N/A' }}</p>
                </div>
              </div>
            </div>

            <!-- Location Details -->
            <div class="space-y-3">
              <h4 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Location Details</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Source Location -->
                <div class="bg-blue-50 rounded-lg p-4">
                  <p class="text-xs font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Source Location
                  </p>
                  <div class="space-y-2">
                    <div v-if="selectedTransfer.rawData?.source_location?.site">
                      <p class="text-xs text-gray-600">Site</p>
                      <p class="text-sm font-medium text-gray-900">{{ selectedTransfer.rawData.source_location.site }}</p>
                    </div>
                    <div v-if="selectedTransfer.rawData?.source_location?.freezer">
                      <p class="text-xs text-gray-600">Freezer</p>
                      <p class="text-sm font-medium text-gray-900">{{ selectedTransfer.rawData.source_location.freezer }}</p>
                    </div>
                    <div class="grid grid-cols-3 gap-2">
                      <div v-if="selectedTransfer.rawData?.source_location?.rack">
                        <p class="text-xs text-gray-600">Rack</p>
                        <p class="text-sm font-medium text-gray-900">{{ selectedTransfer.rawData.source_location.rack }}</p>
                      </div>
                      <div v-if="selectedTransfer.rawData?.source_location?.box">
                        <p class="text-xs text-gray-600">Box</p>
                        <p class="text-sm font-medium text-gray-900">{{ selectedTransfer.rawData.source_location.box }}</p>
                      </div>
                      <div v-if="selectedTransfer.rawData?.source_location?.position">
                        <p class="text-xs text-gray-600">Position</p>
                        <p class="text-sm font-medium text-gray-900">{{ selectedTransfer.rawData.source_location.position }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Destination Location -->
                <div class="bg-green-50 rounded-lg p-4">
                  <p class="text-xs font-semibold text-green-900 mb-3 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Destination Location
                  </p>
                  <div class="space-y-2">
                    <div v-if="selectedTransfer.rawData?.destination_location?.site">
                      <p class="text-xs text-gray-600">Site</p>
                      <p class="text-sm font-medium text-gray-900">{{ selectedTransfer.rawData.destination_location.site }}</p>
                    </div>
                    <div v-if="selectedTransfer.rawData?.destination_location?.freezer">
                      <p class="text-xs text-gray-600">Freezer</p>
                      <p class="text-sm font-medium text-gray-900">{{ selectedTransfer.rawData.destination_location.freezer }}</p>
                    </div>
                    <div class="grid grid-cols-3 gap-2">
                      <div v-if="selectedTransfer.rawData?.destination_location?.rack">
                        <p class="text-xs text-gray-600">Rack</p>
                        <p class="text-sm font-medium text-gray-900">{{ selectedTransfer.rawData.destination_location.rack }}</p>
                      </div>
                      <div v-if="selectedTransfer.rawData?.destination_location?.box">
                        <p class="text-xs text-gray-600">Box</p>
                        <p class="text-sm font-medium text-gray-900">{{ selectedTransfer.rawData.destination_location.box }}</p>
                      </div>
                      <div v-if="selectedTransfer.rawData?.destination_location?.position">
                        <p class="text-xs text-gray-600">Position</p>
                        <p class="text-sm font-medium text-gray-900">{{ selectedTransfer.rawData.destination_location.position }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Request Information -->
            <div class="space-y-3">
              <h4 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Request Information</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-gray-50 rounded-lg p-4">
                  <p class="text-xs text-gray-500 mb-1">Request Type</p>
                  <p class="text-sm font-medium text-gray-900">{{ selectedTransfer.rawData?.request_type || 'N/A' }}</p>
                </div>
                <div class="bg-gray-50 rounded-lg p-4">
                  <p class="text-xs text-gray-500 mb-1">Requested At</p>
                  <p class="text-sm font-medium text-gray-900">{{ selectedTransfer.dateTime }}</p>
                </div>
                <div class="bg-gray-50 rounded-lg p-4">
                  <p class="text-xs text-gray-500 mb-1">Requested By</p>
                  <p class="text-sm font-medium text-gray-900">{{ selectedTransfer.rawData?.requested_by || 'N/A' }}</p>
                </div>
                <div class="bg-gray-50 rounded-lg p-4">
                  <p class="text-xs text-gray-500 mb-1">Approved By</p>
                  <p class="text-sm font-medium text-gray-900">{{ selectedTransfer.rawData?.approved_by || 'Pending' }}</p>
                </div>
                <div v-if="selectedTransfer.rawData?.approved_at" class="bg-gray-50 rounded-lg p-4">
                  <p class="text-xs text-gray-500 mb-1">Approved At</p>
                  <p class="text-sm font-medium text-gray-900">{{ formatDateTime(selectedTransfer.rawData.approved_at) }}</p>
                </div>
              </div>
            </div>

            <!-- Notes & Rejection Reason -->
            <div v-if="selectedTransfer.rawData?.notes || selectedTransfer.rawData?.rejection_reason" class="space-y-3">
              <h4 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Additional Information</h4>
              <div v-if="selectedTransfer.rawData?.notes" class="bg-gray-50 rounded-lg p-4">
                <p class="text-xs text-gray-500 mb-2">Notes</p>
                <p class="text-sm text-gray-900 whitespace-pre-wrap">{{ selectedTransfer.rawData.notes }}</p>
              </div>
              <div v-if="selectedTransfer.rawData?.rejection_reason" class="bg-red-50 rounded-lg p-4">
                <p class="text-xs text-red-700 font-semibold mb-2">Rejection Reason</p>
                <p class="text-sm text-red-900">{{ selectedTransfer.rawData.rejection_reason }}</p>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4">
            <button @click="closeDetailsModal"
              class="w-full bg-[#005B8F] text-white px-4 py-3 rounded-lg hover:bg-[#004a73] transition-colors">
              Close
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </NuxtLayout>
</template>

<script setup lang="ts">
import Chart from 'chart.js/auto'
import { useGetDashboardData } from "@/composables/modules/reporting/useGetDashboardData"
import { useGetAllTrackingRequests } from '@/composables/modules/track/useGetAllTrackingRequests'
import { useCustomToast } from "@/composables/core/useCustomToast"

const { dashboardData, loading } = useGetDashboardData()
  const { showToast } = useCustomToast()
const { 
  loading: fetchingAllTrackingRequests,
  allRequests,
  getAllTrackingRequests 
} = useGetAllTrackingRequests()

interface Transfer {
  id: string
  sampleLocation: string
  destination: string
  status: 'Completed' | 'Pending' | 'In-Transit' | 'Rejected'
  dateTime: string
  rawData?: any
}

const dateRange = ref<{ start: Date | null; end: Date | null }>({
  start: null,
  end: null
})

const selectedStatus = ref("")

const statuses = ref([
  "Completed",
  "Pending",
  "In-Transit",
  "Rejected"
])

const showFilterModal = ref(false)
const showDetailsModal = ref(false)
const selectedTransfer = ref<Transfer | null>(null)
const donutChartRef = ref<HTMLCanvasElement | null>(null)
const lineChartRef = ref<HTMLCanvasElement | null>(null)
let donutChart: Chart | null = null
let lineChart: Chart | null = null

// Format location object to readable string
const formatLocation = (location: any): string => {
  if (!location) return 'N/A'
  const parts = []
  if (location.site) parts.push(location.site)
  if (location.freezer) parts.push(location.freezer)
  if (location.rack) parts.push(location.rack)
  if (location.box) parts.push(location.box)
  if (location.position) parts.push(`Pos ${location.position}`)
  return parts.join(' - ') || 'N/A'
}

// Format date to readable string
const formatDateTime = (dateString: string): string => {
  if (!dateString) return 'N/A'
  try {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return dateString
  }
}

// Transform backend data to table format
const formattedTransfers = computed<Transfer[]>(() => {
  if (!allRequests.value || allRequests.value.length === 0) {
    return []
  }

  return allRequests.value.map((request: any) => ({
    id: request.request_id || 'N/A',
    sampleLocation: formatLocation(request.source_location),
    destination: formatLocation(request.destination_location),
    status: request.request_status || 'Pending',
    dateTime: formatDateTime(request.requested_at),
    rawData: request
  }))
})

// Filter transfers based on selected filters
const filteredTransfers = computed(() => {
  let filtered = formattedTransfers.value

  // Filter by status
  if (selectedStatus.value) {
    filtered = filtered.filter(t => t.status === selectedStatus.value)
  }

  // Filter by date range
  if (dateRange.value.start && dateRange.value.end) {
    filtered = filtered.filter(t => {
      const transferDate = new Date(t.rawData.requested_at)
      return transferDate >= dateRange.value.start! && transferDate <= dateRange.value.end!
    })
  }

  return filtered
})

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
            showToast({
              title: "Success",
              message: 'Transfer ID copied to clipboard!',
              toastType: "success",
              duration: 3000,
            })
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const viewTransfer = (transfer: Transfer) => {
  selectedTransfer.value = transfer
  showDetailsModal.value = true
}

const closeDetailsModal = () => {
  showDetailsModal.value = false
  selectedTransfer.value = null
}

const exportData = () => {
  const dataToExport = filteredTransfers.value.length > 0 ? filteredTransfers.value : formattedTransfers.value
  
  const csv = [
    ['Transfer ID', 'Sample Location', 'Destination', 'Status', 'Date/Time'],
    ...dataToExport.map(t => [t.id, t.sampleLocation, t.destination, t.status, t.dateTime])
  ].map(row => row.join(',')).join('\n')

  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `transfers_${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  window.URL.revokeObjectURL(url)
}

const applyFilters = () => {
  showFilterModal.value = false
  // Filters are automatically applied via computed property
}

const resetFilters = () => {
  selectedStatus.value = ""
  dateRange.value = { start: null, end: null }
  showFilterModal.value = false
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

onMounted(async () => {
  // Fetch tracking requests
  await getAllTrackingRequests()
  
  // Initialize charts
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

const statsData = {
  totalSpecimen: 24500,
  totalSpecimen12Percent: 12,
  utilization: 24500,
  utilization12Percent: 12,
  alerts: 24500,
  alerts12Percent: 12,
  recentTransfer: 24500,
  recentTransfer12Percent: 12
}
</script>
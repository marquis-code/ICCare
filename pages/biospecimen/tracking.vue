<template>
  <div class="min-h-screen">
    <div class="flex">
      <main class="mx-auto container">
        <div class="mb-6  rounded-xl bg-[#005B8F] px-6 md:px-8 py-4">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 class="text-xl font-bold text-white">BioSpecimen Tracking</h1>

            <div class="flex flex-wrap gap-2">
              <button @click="openRequestMovementModal"
                      class="px-4 py-3 font-semibold bg-[#D8F1FE] text-[#005B8F] rounded-lg transition flex items-center gap-2 text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Request Movement
              </button>
              <button @click="openRequestDisposalModal"
                      class="px-4 py-3 font-semibold bg-[#D8F1FE] text-[#005B8F] rounded-lg transition flex items-center gap-2 text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Request Disposal
              </button>
            </div>
          </div>
        </div>

        <!-- Filters -->
        <div class="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <UiSelectInput label="Status" :options="statusOptions" position="standalone" v-model="filters.status" />
            <UiAnimatedInput label="Start date" type="date" v-model="filters.dateRange.from" />
            <UiAnimatedInput label="End date" type="date" v-model="filters.dateRange.to" />
          </div>
          <div class="space-x-6">
            <button @click="applyFilters" :disabled="isLoadingAnyData"
                    class="flex-1 px-4 py-2 bg-[#005B8F] text-white rounded hover:bg-[#004a73] transition text-sm font-medium disabled:opacity-50">
              {{ isLoadingAnyData ? 'Loading...' : 'Search' }}
            </button>
            <button @click="clearFilters" :disabled="isLoadingAnyData"
                    class="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition text-sm font-medium disabled:opacity-50">
              Clear Filter
            </button>
          </div>
        </div>

        <!-- Tabs Section -->
        <div class="bg-white rounded-lg shadow-sm mb-6">
          <!-- Tab Headers -->
          <div class="border-b border-gray-200">
            <nav class="flex -mb-px overflow-x-auto" aria-label="Tabs">
              <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
                'whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors',
                activeTab === tab.id
                  ? 'border-[#005B8F] text-[#005B8F]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]">
                <component :is="tab.icon" class="w-5 h-5" />
                {{ tab.label }}
                <span :class="[
                  'px-2 py-0.5 rounded-full text-xs font-medium',
                  tab.badgeClass
                ]">
                  {{ tab.count }}
                </span>
              </button>
            </nav>
          </div>

          <!-- Tab Content -->
          <div class="overflow-x-auto">
            <!-- Pending Movement Tab -->
            <div v-show="activeTab === 'pending-movement'">
              <div v-if="loadingPendingTracking" class="flex items-center justify-center py-12">
                <svg class="animate-spin h-8 w-8 text-[#005B8F]" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
              </div>
              <div v-else-if="pendingMovementData.length === 0" class="px-6 py-12 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p class="mt-2 text-gray-500">No pending movement requests</p>
              </div>
              <table v-else class="w-full min-w-max">
                <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Sample ID
                  </th>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Source
                    Location</th>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Destination Location</th>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Requested
                    Date</th>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Approved
                    Date</th>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Requested
                    By</th>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Action
                  </th>
                </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-100">
                <tr v-for="item in pendingMovementData" :key="item.id" class="hover:bg-gray-50">
                  <td class="px-4 py-4 text-sm text-gray-900">{{ item.sampleId }}</td>
                  <td class="px-4 py-4 text-sm text-gray-600">
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clip-rule="evenodd" />
                      </svg>
                      {{ item.sourceLocation }}
                    </div>
                  </td>
                  <td class="px-4 py-4 text-sm text-gray-600">
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clip-rule="evenodd" />
                      </svg>
                      {{ item.destinationLocation }}
                    </div>
                  </td>
                  <td class="px-4 py-4 text-sm text-gray-600">{{ item.requestedDate }}</td>
                  <td class="px-4 py-4 text-sm text-gray-600">{{ item.approvedDate }}</td>
                  <td class="px-4 py-4 text-sm text-gray-600">{{ item.requestedBy }}</td>
                  <td class="px-4 py-4 text-sm">
                    <div class="flex gap-2">
                      <button @click="openRejectModal(item, 'tracking')"
                              class="px-3 py-1 text-xs border border-red-300 text-red-600 rounded hover:bg-red-50 transition">
                        Reject
                      </button>
                      <button @click="openApproveModal(item, 'tracking')"
                              class="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition">
                        Approve
                      </button>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>

            <!-- Pending Disposal Tab -->
            <div v-show="activeTab === 'pending-disposal'">
              <div v-if="loadingPendingDisposal" class="flex items-center justify-center py-12">
                <svg class="animate-spin h-8 w-8 text-[#005B8F]" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
              </div>
              <div v-else-if="pendingDisposalData.length === 0" class="px-6 py-12 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <p class="mt-2 text-gray-500">No pending disposal requests</p>
              </div>
              <table v-else class="w-full min-w-max">
                <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Sample ID
                  </th>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Source
                    Location</th>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Destination Location</th>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Requested
                    Date</th>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Approved
                    Date</th>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Requested
                    By</th>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status
                  </th>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Action
                  </th>
                </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-100">
                <tr v-for="item in pendingDisposalData" :key="item.id" class="hover:bg-gray-50">
                  <td class="px-4 py-4 text-sm text-gray-900">{{ item.sampleId }}</td>
                  <td class="px-4 py-4 text-sm text-gray-600">
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clip-rule="evenodd" />
                      </svg>
                      {{ item.sourceLocation }}
                    </div>
                  </td>
                  <td class="px-4 py-4 text-sm text-gray-600">
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clip-rule="evenodd" />
                      </svg>
                      {{ item.destinationLocation }}
                    </div>
                  </td>
                  <td class="px-4 py-4 text-sm text-gray-600">{{ item.requestedDate }}</td>
                  <td class="px-4 py-4 text-sm text-gray-600">{{ item.approvedDate }}</td>
                  <td class="px-4 py-4 text-sm text-gray-600">{{ item.requestedBy }}</td>
                  <td class="px-4 py-4 text-sm text-gray-600">-</td>
                  <td class="px-4 py-4 text-sm">
                    <div class="flex gap-2">
                      <button @click="openRejectModal(item, 'disposal')"
                              class="px-3 py-1 text-xs border border-red-300 text-red-600 rounded hover:bg-red-50 transition">
                        Reject
                      </button>
                      <button @click="openApproveModal(item, 'disposal')"
                              class="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition">
                        Approve
                      </button>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>

            <!-- Complete Movement Tab -->
            <div v-show="activeTab === 'complete-movement'">
              <div v-if="loadingCompletedTracking" class="flex items-center justify-center py-12">
                <svg class="animate-spin h-8 w-8 text-[#005B8F]" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
              </div>
              <div v-else-if="completeMovementData.length === 0" class="px-6 py-12 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="mt-2 text-gray-500">No completed movement requests</p>
              </div>
              <table v-else class="w-full min-w-max">
                <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Sample ID
                  </th>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Source
                    Location</th>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Destination Location</th>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Requested
                    Date</th>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Approved
                    Date</th>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Requested
                    By</th>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Description</th>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status
                  </th>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Action
                  </th>
                </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-100">
                <tr v-for="item in completeMovementData" :key="item.id" class="hover:bg-gray-50">
                  <td class="px-4 py-4 text-sm text-gray-900">{{ item.sampleId }}</td>
                  <td class="px-4 py-4 text-sm text-gray-600">
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clip-rule="evenodd" />
                      </svg>
                      {{ item.sourceLocation }}
                    </div>
                  </td>
                  <td class="px-4 py-4 text-sm text-gray-600">
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clip-rule="evenodd" />
                      </svg>
                      {{ item.destinationLocation }}
                    </div>
                  </td>
                  <td class="px-4 py-4 text-sm text-gray-600">{{ item.requestedDate }}</td>
                  <td class="px-4 py-4 text-sm text-gray-600">{{ item.approvedDate }}</td>
                  <td class="px-4 py-4 text-sm text-gray-600">{{ item.requestedBy }}</td>
                  <td class="px-4 py-4 text-sm text-gray-600">{{ item.description || 'N/A' }}</td>
                  <td class="px-4 py-4 text-sm">
                      <span :class="[
                        'px-3 py-1 rounded-full text-xs font-medium',
                        item.completionStatus === 'Confirmed' || item.completionStatus === 'confirmed' ? 'bg-green-100 text-green-700' :
                          item.completionStatus === 'Moved' || item.completionStatus === 'moved' ? 'bg-blue-100 text-blue-700' :
                            item.completionStatus === 'Approved' || item.completionStatus === 'approved' ? 'bg-orange-100 text-orange-700' :
                              item.completionStatus === 'completed' ? 'bg-green-100 text-green-700' :
                                'bg-gray-100 text-gray-700'
                      ]">
                        {{ item.completionStatus }}
                      </span>
                  </td>
                  <td class="px-4 py-4 text-sm">
                    <button @click="openViewDetailsModal(item, 'tracking')"
                            class="p-2 hover:bg-gray-100 rounded transition">
                      <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fill-rule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clip-rule="evenodd" />
                      </svg>
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>

            <!-- Complete Disposal Tab -->
            <div v-show="activeTab === 'complete-disposal'">
              <div v-if="loadingCompletedDisposal" class="flex items-center justify-center py-12">
                <svg class="animate-spin h-8 w-8 text-[#005B8F]" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
              </div>
              <div v-else-if="completeDisposalData.length === 0" class="px-6 py-12 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="mt-2 text-gray-500">No completed disposal requests</p>
              </div>
              <table v-else class="w-full min-w-max">
                <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Sample ID
                  </th>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Source
                    Location</th>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Destination Location</th>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Requested
                    Date</th>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Approved
                    Date</th>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Requested
                    By</th>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Description</th>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status
                  </th>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Action
                  </th>
                </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-100">
                <tr v-for="item in completeDisposalData" :key="item.id" class="hover:bg-gray-50">
                  <td class="px-4 py-4 text-sm text-gray-900">{{ item.sampleId }}</td>
                  <td class="px-4 py-4 text-sm text-gray-600">
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clip-rule="evenodd" />
                      </svg>
                      {{ item.sourceLocation }}
                    </div>
                  </td>
                  <td class="px-4 py-4 text-sm text-gray-600">
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clip-rule="evenodd" />
                      </svg>
                      {{ item.destinationLocation }}
                    </div>
                  </td>
                  <td class="px-4 py-4 text-sm text-gray-600">{{ item.requestedDate }}</td>
                  <td class="px-4 py-4 text-sm text-gray-600">{{ item.approvedDate }}</td>
                  <td class="px-4 py-4 text-sm text-gray-600">{{ item.requestedBy }}</td>
                  <td class="px-4 py-4 text-sm text-gray-600">{{ item.description || 'N/A' }}</td>
                  <td class="px-4 py-4 text-sm">
                      <span :class="[
                        'px-3 py-1 rounded-full text-xs font-medium',
                        item.completionStatus === 'Confirmed' || item.completionStatus === 'confirmed' ? 'bg-green-100 text-green-700' :
                          item.completionStatus === 'Moved' || item.completionStatus === 'moved' ? 'bg-blue-100 text-blue-700' :
                            item.completionStatus === 'Approved' || item.completionStatus === 'approved' ? 'bg-orange-100 text-orange-700' :
                              item.completionStatus === 'completed' ? 'bg-green-100 text-green-700' :
                                'bg-gray-100 text-gray-700'
                      ]">
                        {{ item.completionStatus }}
                      </span>
                  </td>
                  <td class="px-4 py-4 text-sm">
                    <button @click="openViewDetailsModal(item, 'disposal')"
                            class="p-2 hover:bg-gray-100 rounded transition">
                      <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fill-rule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clip-rule="evenodd" />
                      </svg>
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Request Movement Modal -->
    <Teleport to="body">
      <div
          v-if="showRequestMovementModal"
          class="fixed inset-0 bg-black backdrop-blur-lg bg-opacity-50 flex items-center justify-center p-4 z-[9999]"
          @click.self="closeRequestMovementModal"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <div class="flex items-center gap-2 mb-6">
              <svg class="w-6 h-6 text-[#005B8F]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              <h2 class="text-xl font-bold text-gray-900">Request Movement</h2>
            </div>

            <div class="space-y-6">
              <!-- Sample and Request Info -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <UiSelectInput
                    :options="samples"
                    label="Sample UUID"
                    v-model="movementForm.sample_uuid"
                >
                  <!-- Custom option display in dropdown -->
                  <template #default="{ option }">
                    <div class="flex flex-col">
                      <span class="font-medium">{{ option.sample_label }}</span>
                      <span class="text-xs text-gray-500">UUID: {{ option.uuid }}</span>
                    </div>
                  </template>

                  <!-- Custom selected label display -->
                  <template #selected-label="{ option }">
                    {{ option.sample_label }}
                  </template>
                </UiSelectInput>

                <UiAnimatedInput
                    label="Requested By"
                    v-model="movementForm.request_by"
                    type="text"
                />
                <UiSelectInput
                    v-model="movementForm.movement_type"
                    :options="['transfer', 'immediate', 'temporary']"
                    label="Movement Type"
                />
              </div>

              <!-- Source Location -->
              <div class="border-t pt-4">
                <h3 class="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Source Location</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <UiSelectInput
                      v-model="movementForm.source_site"
                      :options="siteOptions"
                      label="Site"
                  />
                  <UiSelectInput
                      v-model="movementForm.source_freezer"
                      :options="freezerOptions"
                      label="Freezer"
                  />
                  <UiSelectInput
                      v-model="movementForm.source_rack"
                      :options="rackOptions"
                      label="Rack"
                  />
                  <UiSelectInput
                      v-model="movementForm.source_box"
                      :options="boxOptions"
                      label="Box"
                  />
                  <UiAnimatedInput
                      label="Position"
                      v-model="movementForm.source_position"
                      type="number"
                  />
                </div>
              </div>

              <!-- Destination Location -->
              <div class="border-t pt-4">
                <h3 class="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Destination Location</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <UiSelectInput
                      v-model="movementForm.destination_site"
                      :options="siteOptions"
                      label="Site"
                  />
                  <UiSelectInput
                      v-model="movementForm.destination_freezer"
                      :options="freezerOptions"
                      label="Freezer"
                  />
                  <UiSelectInput
                      v-model="movementForm.destination_rack"
                      :options="rackOptions"
                      label="Rack"
                  />
                  <UiSelectInput
                      v-model="movementForm.destination_box"
                      :options="boxOptions"
                      label="Box"
                  />
                  <UiAnimatedInput
                      label="Position"
                      v-model="movementForm.destination_position"
                      type="number"
                  />
                </div>
              </div>

              <!-- Dates and Time -->
              <div class="border-t pt-4">
                <h3 class="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Schedule</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <UiAnimatedInput
                      v-model="movementForm.reservation_time"
                      type="datetime-local"
                      label="Reservation Time"
                  />
                  <UiAnimatedInput
                      v-model="movementForm.start_date_time"
                      type="datetime-local"
                      label="Start Date & Time"
                  />
                  <UiAnimatedInput
                      v-model="movementForm.end_date_time"
                      type="datetime-local"
                      label="End Date & Time"
                  />
                </div>
              </div>

              <!-- Approvers -->
              <div class="border-t pt-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Approved By (Optional)</label>
                <div class="flex gap-2">
                  <UiAnimatedInput
                      v-model="approverInput"
                      type="text"
                      label="Add Approver"
                      @keyup.enter="addApprover"
                  />
                  <button
                      @click="addApprover"
                      type="button"
                      class="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition text-sm"
                  >
                    Add
                  </button>
                </div>
                <div v-if="movementForm.approved_by.length > 0" class="mt-2 flex flex-wrap gap-2">
                  <span
                      v-for="(approver, index) in movementForm.approved_by"
                      :key="index"
                      class="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {{ approver }}
                    <button
                        @click="removeApprover(index)"
                        type="button"
                        class="hover:text-blue-900"
                    >
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </span>
                </div>
              </div>
            </div>

            <div class="flex justify-end gap-3 mt-6">
              <button
                  @click="closeRequestMovementModal"
                  type="button"
                  :disabled="trackingSample"
                  class="px-6 py-3 border border-gray-300 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                  @click="submitMovementRequest"
                  type="button"
                  :disabled="trackingSample"
                  class="px-6 py-3 bg-[#005B8F] text-sm text-white rounded-lg hover:bg-[#004a73] transition disabled:opacity-50 flex items-center gap-2"
              >
                <span v-if="trackingSample">
                  <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                <span>{{ trackingSample ? 'Processing...' : 'Request Movement' }}</span>
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
          class="fixed inset-0 backdrop-blur-lg bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]"
          @click.self="closeRequestDisposalModal"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl">
          <div class="p-6">
            <div class="flex items-center gap-2 mb-6">
              <svg class="w-6 h-6 text-[#005B8F]" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              <h2 class="text-xl font-bold text-gray-900">Dispose Biosample</h2>
            </div>

            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UiSelectInput
                    :options="samples"
                    label="Sample UUID"
                    v-model="disposalForm.sample_uuid"
                >
                  <!-- Custom option display in dropdown -->
                  <template #default="{ option }">
                    <div class="flex flex-col">
                      <span class="font-medium">{{ option.sample_label }}</span>
                      <span class="text-xs text-gray-500">UUID: {{ option.uuid }}</span>
                    </div>
                  </template>

                  <!-- Custom selected label display -->
                  <template #selected-label="{ option }">
                    {{ option.sample_label }}
                  </template>
                </UiSelectInput>
                <UiAnimatedInput
                    label="Requested By"
                    v-model="disposalForm.request_by"
                    type="text"
                />
              </div>

              <div>
                <UiAnimatedInput
                    label="Approved By"
                    v-model="disposalForm.approved_by"
                    type="text"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Reason for Disposal</label>
                <textarea
                    v-model="disposalForm.reason_for_disposal"
                    rows="4"
                    placeholder="Enter the reason for disposal..."
                    class="custom-input"
                ></textarea>
              </div>

              <div class="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="mark-disposed"
                    v-model="disposalForm.mark_as_disposed"
                    class="custom-checkbox"
                />
                <label for="mark-disposed" class="text-sm font-medium text-gray-700">
                  Mark as Disposed (uncheck to only record usage)
                </label>
              </div>
            </div>

            <div class="flex justify-end gap-3 mt-6">
              <button
                  @click="closeRequestDisposalModal"
                  type="button"
                  :disabled="loading"
                  class="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                  @click="submitDisposalRequest"
                  type="button"
                  :disabled="loading"
                  class="px-6 py-2 bg-[#005B8F] text-white rounded hover:bg-[#004a73] transition disabled:opacity-50 flex items-center gap-2"
              >
                <span v-if="loading">
                  <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                <span>{{ loading ? 'Processing...' : (disposalForm.mark_as_disposed ? 'Dispose BioSample' : 'Record Usage') }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- View Details Modal -->
 <!-- View Details Modal -->
    <Teleport to="body">
      <div
          v-if="showViewDetailsModal"
          class="fixed inset-0 backdrop-blur-lg bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]"
          @click.self="closeViewDetailsModal"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <!-- Header -->
            <div class="flex items-center gap-3 mb-6">
              <button
                  @click="closeViewDetailsModal"
                  class="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 class="text-xl font-bold text-gray-900">{{ selectedType === 'tracking' ? 'Movement' : 'Disposal' }} Details</h2>
            </div>

            <div v-if="selectedItem" class="space-y-6">
              <!-- Movement Information -->
              <div>
                <h3 class="text-base font-semibold text-[#005B8F] mb-4">Movement Information</h3>
                <div class="space-y-4">
                  <!-- Sample ID -->
                  <div class="flex justify-between items-start py-2">
                    <span class="text-sm text-gray-700">Sample ID</span>
                    <span class="text-sm font-medium text-gray-900 text-right">{{ selectedItem.sampleId || 'Not available' }}</span>
                  </div>
                  
                  <!-- Source Location -->
                  <div class="flex justify-between items-start py-2">
                    <span class="text-sm text-gray-700">Source Location</span>
                    <span class="text-sm font-medium text-gray-900 text-right">{{ selectedItem.sourceLocation || 'Not available' }}</span>
                  </div>
                  
                  <!-- Destination Location -->
                  <div class="flex justify-between items-start py-2">
                    <span class="text-sm text-gray-700">Destination Location</span>
                    <span class="text-sm font-medium text-gray-900 text-right">{{ selectedItem.destinationLocation || 'Not available' }}</span>
                  </div>
                  
                  <!-- Requested Date -->
                  <div class="flex justify-between items-start py-2">
                    <span class="text-sm text-gray-700">Requested Date</span>
                    <span class="text-sm font-medium text-gray-900 text-right">{{ selectedItem.requestedDate || 'Not available' }}</span>
                  </div>
                  
                  <!-- Approved Date -->
                  <div class="flex justify-between items-start py-2">
                    <span class="text-sm text-gray-700">Approved Date</span>
                    <span class="text-sm font-medium text-gray-900 text-right">{{ selectedItem.approvedDate || 'Pending approval' }}</span>
                  </div>
                  
                  <!-- Requested by -->
                  <div class="flex justify-between items-start py-2">
                    <span class="text-sm text-gray-700">Requested by</span>
                    <span class="text-sm font-medium text-gray-900 text-right">{{ selectedItem.requestedBy || 'Not available' }}</span>
                  </div>
                  
                  <!-- Received by (if available from details) -->
                  <div v-if="selectedItem.receivedBy" class="flex justify-between items-start py-2">
                    <span class="text-sm text-gray-700">Received by</span>
                    <span class="text-sm font-medium text-gray-900 text-right">{{ selectedItem.receivedBy }}</span>
                  </div>
                  
                  <!-- Request Reason -->
                  <div v-if="selectedItem.description" class="flex justify-between items-start py-2">
                    <span class="text-sm text-gray-700">Request Reason</span>
                    <span class="text-sm font-medium text-gray-900 text-right max-w-xs">{{ selectedItem.description }}</span>
                  </div>
                </div>
              </div>

              <!-- Timeline Progress -->
              <div class="relative pl-8 space-y-6 mt-8">
                <!-- Vertical line -->
                <div class="absolute left-4 top-3 bottom-3 w-0.5 bg-gray-200"></div>

                <!-- Movement Requested -->
                <div class="relative">
                  <div class="absolute -left-[1.9rem] top-1 w-6 h-6 rounded-full bg-gray-300 border-4 border-white flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <div class="bg-gray-50 rounded-lg p-4">
                    <h4 class="font-semibold text-gray-900 mb-1">Movement Requested</h4>
                    <p class="text-sm text-gray-600">
                      {{ selectedItem.requestedDate || 'Date not available' }}
                      <span v-if="selectedItem.requestedBy"> by {{ selectedItem.requestedBy }}</span>
                    </p>
                  </div>
                </div>

                <!-- Request Approved -->
                <div class="relative" v-if="selectedItem.approvedDate && selectedItem.approvedDate !== 'N/A' && selectedItem.approvedDate !== 'Pending approval'">
                  <div class="absolute -left-[1.9rem] top-1 w-6 h-6 rounded-full bg-blue-500 border-4 border-white flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <div class="bg-gray-50 rounded-lg p-4">
                    <h4 class="font-semibold text-gray-900 mb-1">Request Approved</h4>
                    <p class="text-sm text-gray-600">
                      {{ selectedItem.approvedDate }}
                      <span v-if="selectedItem.approvedBy"> by {{ selectedItem.approvedBy }}</span>
                    </p>
                  </div>
                </div>

                <!-- Sample Moved -->
                <div class="relative" v-if="selectedItem.completionStatus && (selectedItem.completionStatus.toLowerCase() === 'completed' || selectedItem.completionStatus.toLowerCase() === 'moved' || selectedItem.completionStatus.toLowerCase() === 'confirmed')">
                  <div class="absolute -left-[1.9rem] top-1 w-6 h-6 rounded-full bg-green-500 border-4 border-white flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <div class="bg-gray-50 rounded-lg p-4">
                    <h4 class="font-semibold text-gray-900 mb-1">Sample Moved</h4>
                    <p class="text-sm text-gray-600">
                      {{ selectedItem.movedDate || selectedItem.approvedDate || 'Date not available' }}
                      <span v-if="selectedItem.movedBy"> by {{ selectedItem.movedBy }}</span>
                      <span v-else-if="selectedItem.requestedBy"> by {{ selectedItem.requestedBy }}</span>
                    </p>
                  </div>
                </div>

                <!-- Transfer Confirmed -->
                <div class="relative" v-if="selectedItem.completionStatus && selectedItem.completionStatus.toLowerCase() === 'confirmed'">
                  <div class="absolute -left-[1.9rem] top-1 w-6 h-6 rounded-full bg-purple-500 border-4 border-white flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <div class="bg-gray-50 rounded-lg p-4">
                    <h4 class="font-semibold text-gray-900 mb-1">Transfer Confirmed</h4>
                    <p class="text-sm text-gray-600">
                      {{ selectedItem.confirmedDate || selectedItem.approvedDate || 'Date not available' }}
                      <span v-if="selectedItem.confirmedBy"> by {{ selectedItem.confirmedBy }}</span>
                      <span v-else> by Receiving Lab</span>
                    </p>
                  </div>
                </div>

                <!-- Rejected State (if applicable) -->
                <div class="relative" v-if="selectedItem.completionStatus && selectedItem.completionStatus.toLowerCase() === 'rejected'">
                  <div class="absolute -left-[1.9rem] top-1 w-6 h-6 rounded-full bg-red-500 border-4 border-white flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <div class="bg-red-50 rounded-lg p-4">
                    <h4 class="font-semibold text-red-900 mb-1">Request Rejected</h4>
                    <p class="text-sm text-red-700">
                      {{ selectedItem.approvedDate || 'Date not available' }}
                      <span v-if="selectedItem.approvedBy"> by {{ selectedItem.approvedBy }}</span>
                    </p>
                    <p v-if="selectedItem.rejectionReason" class="text-sm text-red-600 mt-2">
                      Reason: {{ selectedItem.rejectionReason }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Approve Confirmation Modal -->
    <Teleport to="body">
      <div
          v-if="showApproveModal"
          class="fixed inset-0 bg-black backdrop-blur-lg bg-opacity-50 flex items-center justify-center p-4 z-[9999]"
          @click.self="closeApproveModal"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div class="p-6">
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h2 class="text-xl font-bold text-gray-900 text-center mb-2">Approve Request</h2>
            <p class="text-sm text-gray-600 text-center mb-6">
              Are you sure you want to approve this {{ getRequestType }} request for sample <span class="font-semibold">{{ selectedItem?.sampleId }}</span>?
            </p>

            <div class="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Source:</span>
                <span class="text-gray-900 font-medium">{{ selectedItem?.sourceLocation }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Destination:</span>
                <span class="text-gray-900 font-medium">{{ selectedItem?.destinationLocation }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Requested By:</span>
                <span class="text-gray-900 font-medium">{{ selectedItem?.requestedBy }}</span>
              </div>
            </div>

            <div class="flex gap-3">
              <button
                  @click="closeApproveModal"
                  :disabled="loadingApproveTracking || loadingApproveDisposal"
                  class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                  @click="confirmApprove"
                  :disabled="loadingApproveTracking || loadingApproveDisposal"
                  class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <span v-if="loadingApproveTracking || loadingApproveDisposal">
                  <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                <span>{{ (loadingApproveTracking || loadingApproveDisposal) ? 'Processing...' : 'Approve' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Reject Confirmation Modal -->
    <Teleport to="body">
      <div
          v-if="showRejectModal"
          class="fixed inset-0 bg-black backdrop-blur-lg bg-opacity-50 flex items-center justify-center p-4 z-[9999]"
          @click.self="closeRejectModal"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div class="p-6">
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            <h2 class="text-xl font-bold text-gray-900 text-center mb-2">Reject Request</h2>
            <p class="text-sm text-gray-600 text-center mb-6">
              Are you sure you want to reject this {{ getRequestType }} request for sample <span class="font-semibold">{{ selectedItem?.sampleId }}</span>?
            </p>

            <div class="bg-gray-50 rounded-lg p-4 mb-4 space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Source:</span>
                <span class="text-gray-900 font-medium">{{ selectedItem?.sourceLocation }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Destination:</span>
                <span class="text-gray-900 font-medium">{{ selectedItem?.destinationLocation }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Requested By:</span>
                <span class="text-gray-900 font-medium">{{ selectedItem?.requestedBy }}</span>
              </div>
            </div>

            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Reason for Rejection</label>
              <textarea
                  v-model="rejectionReason"
                  rows="3"
                  placeholder="Please provide a reason for rejecting this request..."
                  class="custom-input"
              ></textarea>
            </div>

            <div class="flex gap-3">
              <button
                  @click="closeRejectModal"
                  :disabled="loadingRejectTracking || loadingRejectDisposal"
                  class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                  @click="confirmReject"
                  :disabled="loadingRejectTracking || loadingRejectDisposal || !rejectionReason.trim()"
                  class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <span v-if="loadingRejectTracking || loadingRejectDisposal">
                  <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                <span>{{ (loadingRejectTracking || loadingRejectDisposal) ? 'Processing...' : 'Reject' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTrackSample } from "@/composables/modules/biosample/useTrackSample"
import { useDisposeSample } from "@/composables/modules/biosample/useDisposeSample"
import { useGetSites } from '@/composables/modules/sites/useGetSites'
import { useGetFreezers } from '@/composables/modules/freezer/useGetFreezers'
import { useGetRacks } from '@/composables/modules/racks/useGetRacks'
import { useGetBoxes } from '@/composables/modules/box/useGetBoxes'
import { useGetAllSamples } from "@/composables/modules/biosample/useGetAllSamples"
import { useApproveDisposalRequest } from '@/composables/modules/dispose/useApproveDisposalRequest'
import { useRejectDisposalRequest } from '@/composables/modules/dispose/useRejectDisposalRequest'
import { useGetPendingDisposalRequests } from '@/composables/modules/dispose/useGetPendingDisposalRequests'
import { useGetCompletedDisposalRequests } from '@/composables/modules/dispose/useGetCompletedDisposalRequests'
import { useApproveTrackingRequest } from '@/composables/modules/track/useApproveTrackingRequest'
import { useRejectTrackingRequest } from '@/composables/modules/track/useRejectTrackingRequest'
import { useGetPendingTrackingRequests } from '@/composables/modules/track/useGetPendingTrackingRequests'
import { useGetCompletedTrackingRequests } from '@/composables/modules/track/useGetCompletedTrackingRequests'

// Tracking composables
const { loading: loadingApproveTracking, approveTrackingRequest } = useApproveTrackingRequest()
const { loading: loadingRejectTracking, rejectTrackingRequest } = useRejectTrackingRequest()
const { loading: loadingPendingTracking, pendingRequests: pendingTrackingRequests, getPendingTrackingRequests } = useGetPendingTrackingRequests()
const { loading: loadingCompletedTracking, completedRequests: completedTrackingRequests, getCompletedTrackingRequests } = useGetCompletedTrackingRequests()

// Disposal composables
const { loading: loadingApproveDisposal, approveDisposalRequest } = useApproveDisposalRequest()
const { loading: loadingRejectDisposal, rejectDisposalRequest } = useRejectDisposalRequest()
const { loading: loadingPendingDisposal, pendingRequests: pendingDisposalRequests, getPendingDisposalRequests } = useGetPendingDisposalRequests()
const { loading: loadingCompletedDisposal, completedRequests: completedDisposalRequests, getCompletedDisposalRequests } = useGetCompletedDisposalRequests()

// Other composables
const { loading: trackingSample, trackingData, trackSample } = useTrackSample()
const { loading, disposeSample } = useDisposeSample()
const { loading: loadingSites, sites, getSites } = useGetSites()
const { loading: loadingRacks, racks, getRacks } = useGetRacks()
const { loading: loadingFreezers, freezers, getFreezers } = useGetFreezers()
const { loading: loadingBoxes, boxes, getBoxes } = useGetBoxes()
const { samples, loading: fetchingSamples } = useGetAllSamples()

// Add these new refs for tabs
const activeTab = ref('pending-movement')

// Define SVG icon components
const ClockIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  `
}

const TrashIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  `
}

const CheckCircleIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  `
}

const tabs = computed(() => [
  {
    id: 'pending-movement',
    label: 'Pending Movement',
    icon: ClockIcon,
    count: pendingMovementData.value.length,
    badgeClass: 'bg-orange-100 text-orange-700'
  },
  {
    id: 'pending-disposal',
    label: 'Pending Disposal',
    icon: TrashIcon,
    count: pendingDisposalData.value.length,
    badgeClass: 'bg-red-100 text-red-700'
  },
  {
    id: 'complete-movement',
    label: 'Complete Movement',
    icon: CheckCircleIcon,
    count: completeMovementData.value.length,
    badgeClass: 'bg-green-100 text-green-700'
  },
  {
    id: 'complete-disposal',
    label: 'Complete Disposal',
    icon: CheckCircleIcon,
    count: completeDisposalData.value.length,
    badgeClass: 'bg-green-100 text-green-700'
  }
])

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
  description?: string
  completionStatus?: 'Confirmed' | 'Moved' | 'Approved' | 'pending' | 'completed' | 'approved' | 'rejected' | 'confirmed' | 'moved'
  request_id?: string
}

const selectedType = ref<'tracking' | 'disposal'>('tracking')

// Filters
const filters = ref({
  status: 'All Status',
  dateRange: { from: '', to: '' } as DateRange
})

const statusOptions = ref([
  'All Status',
  'Pending Movement',
  'Pending Disposal',
  'Complete Movement',
  'Complete Disposal'
])

// Helper functions
const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatLocation = (location: any) => {
  if (!location) return 'N/A'
  if (typeof location === 'string') return location

  const parts = []
  if (location.site) parts.push(`Site: ${location.site}`)
  if (location.freezer) parts.push(`Freezer: ${location.freezer}`)
  if (location.rack) parts.push(`Rack: ${location.rack}`)
  if (location.box) parts.push(`Box: ${location.box}`)
  if (location.position) parts.push(`Pos: ${location.position}`)

  return parts.length > 0 ? parts.join(', ') : 'N/A'
}

// Data transformation helpers
const transformTrackingRequest = (request: any): BioSpecimen => {
  return {
    id: request.request_id || request.id,
    sampleId: request.sample_uuid || request.sample_id || 'N/A',
    sourceLocation: formatLocation(request.source_location || request.source_attributes),
    destinationLocation: formatLocation(request.destination_location || request.destination_attributes),
    requestedDate: formatDate(request.requested_date || request.created_at || request.request_date),
    approvedDate: formatDate(request.approved_date || request.approval_date),
    requestedBy: request.requested_by || request.request_by || 'N/A',
    status: request.status === 'pending' ? 'pendingMovement' : 'completeMovement',
    description: request.description || request.reason || request.notes,
    completionStatus: request.completion_status || request.status,
    request_id: request.request_id || request.id
  }
}

const transformDisposalRequest = (request: any): BioSpecimen => {
  return {
    id: request.request_id || request.id,
    sampleId: request.sample_uuid || request.sample_id || 'N/A',
    sourceLocation: formatLocation(request.source_location || request.location),
    destinationLocation: 'Disposal Unit',
    requestedDate: formatDate(request.requested_date || request.created_at || request.request_date),
    approvedDate: formatDate(request.approved_date || request.approval_date),
    requestedBy: request.requested_by || request.request_by || 'N/A',
    status: request.status === 'pending' ? 'pendingDisposal' : 'completeDisposal',
    description: request.reason_for_disposal || request.reason || request.description,
    completionStatus: request.completion_status || request.status,
    request_id: request.request_id || request.id
  }
}

// Dynamic options from composables
const siteOptions = computed(() => {
  if (!sites.value || sites.value.length === 0) return []
  return sites.value.map((site: any) => site.site_name)
})

const freezerOptions = computed(() => {
  if (!freezers.value || freezers.value.length === 0) return []
  return freezers.value.map((freezer: any) => freezer.freezer_name)
})

const rackOptions = computed(() => {
  if (!racks.value || racks.value.length === 0) return []
  return racks.value.map((rack: any) => rack.rack_name)
})

const boxOptions = computed(() => {
  if (!boxes.value || boxes.value.length === 0) return []
  return boxes.value.map((box: any) => box.box_name)
})

// Filtered data for each section using composables
const pendingMovementData = computed(() => {
  if (!pendingTrackingRequests.value || pendingTrackingRequests.value.length === 0) return []
  return pendingTrackingRequests.value.map(transformTrackingRequest)
})

const pendingDisposalData = computed(() => {
  if (!pendingDisposalRequests.value || pendingDisposalRequests.value.length === 0) return []
  return pendingDisposalRequests.value.map(transformDisposalRequest)
})

const completeMovementData = computed(() => {
  if (!completedTrackingRequests.value || completedTrackingRequests.value.length === 0) return []
  return completedTrackingRequests.value.map(transformTrackingRequest)
})

const completeDisposalData = computed(() => {
  if (!completedDisposalRequests.value || completedDisposalRequests.value.length === 0) return []
  return completedDisposalRequests.value.map(transformDisposalRequest)
})

// Computed property to get request type based on selected type
const getRequestType = computed(() => {
  return selectedType.value === 'tracking' ? 'movement' : 'disposal'
})

// Loading state
const isLoadingAnyData = computed(() => {
  return loadingPendingTracking.value || loadingCompletedTracking.value ||
      loadingPendingDisposal.value || loadingCompletedDisposal.value
})

// Modals
const showRequestMovementModal = ref(false)
const showRequestDisposalModal = ref(false)
const showViewDetailsModal = ref(false)
const showApproveModal = ref(false)
const showRejectModal = ref(false)
const selectedItem = ref<BioSpecimen | null>(null)
const rejectionReason = ref('')

const movementForm = ref({
  sample_uuid: '',
  source_site: '',
  source_freezer: '',
  source_rack: '',
  source_box: '',
  source_position: '',
  destination_site: '',
  destination_freezer: '',
  destination_rack: '',
  destination_box: '',
  destination_position: '',
  movement_type: 'transfer',
  reservation_time: '',
  start_date_time: '',
  end_date_time: '',
  request_by: '',
  approved_by: [] as string[]
}) as any

const disposalForm = ref({
  sample_uuid: '',
  request_by: '',
  approved_by: '',
  reason_for_disposal: '',
  mark_as_disposed: true
}) as any

// Load initial data
onMounted(async () => {
  await Promise.all([
    getSites(),
    getFreezers(),
    getRacks(),
    getBoxes(),
    getPendingTrackingRequests(),
    getCompletedTrackingRequests(),
    getPendingDisposalRequests(),
    getCompletedDisposalRequests()
  ])
})

// Approver management
const approverInput = ref('')
const addApprover = () => {
  if (approverInput.value.trim() && !movementForm.value.approved_by.includes(approverInput.value.trim())) {
    movementForm.value.approved_by.push(approverInput.value.trim())
    approverInput.value = ''
  }
}
const removeApprover = (index: number) => {
  movementForm.value.approved_by.splice(index, 1)
}

const openRequestMovementModal = () => {
  showRequestMovementModal.value = true
}

const closeRequestMovementModal = () => {
  showRequestMovementModal.value = false
  movementForm.value = {
    sample_uuid: '',
    source_site: '',
    source_freezer: '',
    source_rack: '',
    source_box: '',
    source_position: '',
    destination_site: '',
    destination_freezer: '',
    destination_rack: '',
    destination_box: '',
    destination_position: '',
    movement_type: 'transfer',
    reservation_time: '',
    start_date_time: '',
    end_date_time: '',
    request_by: '',
    approved_by: []
  }
}

const openRequestDisposalModal = () => {
  showRequestDisposalModal.value = true
}

const closeRequestDisposalModal = () => {
  showRequestDisposalModal.value = false
  disposalForm.value = {
    sample_uuid: '',
    request_by: '',
    approved_by: '',
    reason_for_disposal: '',
    mark_as_disposed: true
  }
}

const openViewDetailsModal = (item: BioSpecimen, type: 'tracking' | 'disposal') => {
  selectedItem.value = item
  selectedType.value = type
  showViewDetailsModal.value = true
}

const closeViewDetailsModal = () => {
  showViewDetailsModal.value = false
  selectedItem.value = null
}

const openApproveModal = (item: BioSpecimen, type: 'tracking' | 'disposal') => {
  selectedItem.value = item
  selectedType.value = type
  showApproveModal.value = true
}

const closeApproveModal = () => {
  showApproveModal.value = false
  selectedItem.value = null
}

const openRejectModal = (item: BioSpecimen, type: 'tracking' | 'disposal') => {
  selectedItem.value = item
  selectedType.value = type
  showRejectModal.value = true
}

const closeRejectModal = () => {
  showRejectModal.value = false
  selectedItem.value = null
  rejectionReason.value = ''
}

const confirmApprove = async () => {
  if (!selectedItem.value || !selectedItem.value.request_id) return

  if (selectedType.value === 'tracking') {
    const result = await approveTrackingRequest(selectedItem.value.request_id)
    if (result) {
      await Promise.all([
        getPendingTrackingRequests(),
        getCompletedTrackingRequests()
      ])
    }
  } else {
    const result = await approveDisposalRequest(selectedItem.value.request_id)
    if (result) {
      await Promise.all([
        getPendingDisposalRequests(),
        getCompletedDisposalRequests()
      ])
    }
  }

  closeApproveModal()
}

const confirmReject = async () => {
  if (!selectedItem.value || !selectedItem.value.request_id || !rejectionReason.value.trim()) return

  if (selectedType.value === 'tracking') {
    const result = await rejectTrackingRequest(selectedItem.value.request_id, rejectionReason.value)
    if (result) {
      await Promise.all([
        getPendingTrackingRequests(),
        getCompletedTrackingRequests()
      ])
    }
  } else {
    const result = await rejectDisposalRequest(selectedItem.value.request_id, rejectionReason.value)
    if (result) {
      await Promise.all([
        getPendingDisposalRequests(),
        getCompletedDisposalRequests()
      ])
    }
  }

  closeRejectModal()
}

const submitMovementRequest = async () => {
  // Helper function to convert date to ISO format
  const toISOString = (dateValue: any) => {
    if (!dateValue) return null
    // If it's already a Date object, convert it
    if (dateValue instanceof Date) {
      return dateValue.toISOString()
    }
    // If it's a string, create a Date object first
    return new Date(dateValue).toISOString()
  }

  const payload = {
    sample_uuid: movementForm.value.sample_uuid.uuid,
    source_attributes: {
      site: movementForm.value.source_site,
      freezer: movementForm.value.source_freezer,
      rack: movementForm.value.source_rack,
      box: movementForm.value.source_box,
      position: parseInt(movementForm.value.source_position)
    },
    destination_attributes: {
      site: movementForm.value.destination_site,
      freezer: movementForm.value.destination_freezer,
      rack: movementForm.value.destination_rack,
      box: movementForm.value.destination_box,
      position: parseInt(movementForm.value.destination_position)
    },
    request_type: movementForm.value.movement_type,
    reservation_time: toISOString(movementForm.value.reservation_time),
    start_date_time: toISOString(movementForm.value.start_date_time),
    end_date_time: toISOString(movementForm.value.end_date_time),
    request_by: movementForm.value.request_by,
    approved_by: movementForm.value.approved_by
  }

  const result = await trackSample(payload)
  if (result) {
    await Promise.all([
      getPendingTrackingRequests(),
      getCompletedTrackingRequests()
    ])
    closeRequestMovementModal()
  }
}

const submitDisposalRequest = async () => {
  const payload = {
    sample_uuid: disposalForm.value.sample_uuid.uuid,
    request_by: disposalForm.value.request_by,
    approved_by: disposalForm.value.approved_by,
    reason_for_disposal: disposalForm.value.reason_for_disposal,
    mark_as_disposed: disposalForm.value.mark_as_disposed
  }

  const result = await disposeSample(payload)
  if (result) {
    await Promise.all([
      getPendingDisposalRequests(),
      getCompletedDisposalRequests()
    ])
    closeRequestDisposalModal()
  }
}

const applyFilters = async () => {
  const params: any = {}

  if (filters.value.dateRange.from) {
    params.date_from = filters.value.dateRange.from
  }

  if (filters.value.dateRange.to) {
    params.date_to = filters.value.dateRange.to
  }

  await Promise.all([
    getPendingTrackingRequests(params),
    getCompletedTrackingRequests(params),
    getPendingDisposalRequests(params),
    getCompletedDisposalRequests(params)
  ])
}

const clearFilters = async () => {
  filters.value = {
    status: 'All Status',
    dateRange: { from: '', to: '' }
  }

  await Promise.all([
    getPendingTrackingRequests(),
    getCompletedTrackingRequests(),
    getPendingDisposalRequests(),
    getCompletedDisposalRequests()
  ])
}

const getInitials = (name: string) => {
  return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
}

definePageMeta({
  layout: 'dashboard'
})
</script>
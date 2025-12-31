<template>
  <div class="min-h-screen">
    <div class="flex">
      <main class="mx-auto container">
        <div class="mb-6">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 class="text-xl font-bold text-gray-900">BioSpecimen Tracking</h1>

            <div class="flex flex-wrap gap-2">
              <button @click="openRequestMovementModal"
                class="px-4 py-3 bg-[#005B8F] text-white rounded hover:bg-[#004a73] transition flex items-center gap-2 text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Request Movement
              </button>
              <button @click="openRequestDisposalModal"
                class="px-4 py-3 bg-[#005B8F] text-white rounded hover:bg-[#004a73] transition flex items-center gap-2 text-sm">
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
                    <td class="px-4 py-4 text-sm text-gray-600">{{ item.requestContinue9: 46 AMedBy }}</td>
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
    <!-- Keep all your existing modals here -->
  </div>
</template>
<script setup lang="ts">
// ... existing imports ...

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

// ... rest of your existing script code ...
</script>
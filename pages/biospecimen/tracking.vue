<template>
  <div class="min-h-screen">
    <div class="flex">
      <main class="mx-auto container">
        <div class="mb-6 rounded-xl bg-[#DCF1FF] text-[#005B8F] py-4 px-6">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
           <div>
             <h1 class="text-xl font-bold bg-[#DCF1FF] text-[#005B8F]">BioSpecimen Tracking</h1>
            <p class="text-base bg-[#DCF1FF] text-[#005B8F] mt-1">Monitor movement requests, approvals, and disposal workflows</p>
           </div>

            <div class="flex flex-wrap gap-2">
              <button @click="openRequestMovementModal"
                      class="px-4 py-3 font-semibold text-[#DCF1FF] bg-[#005B8F] rounded-lg transition flex items-center gap-2 text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Request Movement
              </button>
              <button @click="openRequestDisposalModal"
                      class="px-4 py-3 font-semibold text-[#DCF1FF] bg-[#005B8F] rounded-lg transition flex items-center gap-2 text-sm">
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
            <UiAnimatedInput label="Start date" type="date" v-model="filters.dateRange.from" />
            <UiAnimatedInput label="End date" type="date" v-model="filters.dateRange.to" />
            <div class="space-x-6">
              <button @click="applyFilters" :disabled="isLoadingAnyData"
                      class="flex-1 px-4 py-2 bg-[#005B8F] text-white rounded hover:bg-[#004a73] transition text-sm font-medium disabled:opacity-50">
                {{ isLoadingAnyData ? 'Loading...' : 'Search' }}
              </button>
              <button @click="clearFilters" :disabled="isLoadingAnyData"
                      class="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-25 transition text-sm font-medium disabled:opacity-50">
                Clear Filter
              </button>
            </div>
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
          <div>
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
                <div v-else-if="paginatedPendingMovement.length === 0" class="px-6 py-12 text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p class="mt-2 text-gray-500">No pending movement requests</p>
                </div>
                <div v-else>
                  <div class="overflow-x-auto">
                <table class="w-full min-w-max">
                  <thead class="bg-gray-25">
                  <tr>
                    <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Sample SN</th>
                    <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Source Location</th>
                    <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Destination Location</th>
                    <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Requested Date</th>
                    <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Approved Date</th>
                    <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Requested By</th>
                    <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Description</th>
                    <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Action</th>
                  </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-100">
                  <tr v-for="item in paginatedPendingMovement" :key="item.id" class="hover:bg-gray-25">
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
                    <td class="px-4 py-4 text-sm text-gray-600">{{ item.description ?? 'N/a' }}</td>
                    <!-- <td class="px-4 py-4 text-sm">
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
                    </td> -->
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
                <div class="p-4 border-t-[0.5px]">
              <Pagination 
                  v-if="paginatedPendingMovement.length > 0"
                  v-model:currentPage="pendingMovementPage" 
                  v-model:pageSize="pendingMovementPageSize"
                  :totalItems="pendingMovementTotal" 
                  :pageSizeOptions="[10, 25, 50, 100]" 
                />
                </div>
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
              <div v-else>
                <div class="overflow-x-auto">
                                  <table class="w-full min-w-max">
                <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Sample SN
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
                  <!-- <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status
                  </th> -->
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
                  <!-- <td class="px-4 py-4 text-sm text-gray-600">-</td> -->
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
              </div>
              <div class="p-4 border-t-[0.5px]">
                                              <Pagination 
  v-if="pendingDisposalData.length > 0"
  v-model:currentPage="pendingDisposalPage" 
  v-model:pageSize="pendingDisposalPageSize"
  :totalItems="pendingDisposalTotal" 
  :pageSizeOptions="[10, 25, 50, 100]" 
/>
              </div>
            </div>

            <!-- Complete Movement Tab -->
            <div  v-show="activeTab === 'complete-movement'">
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
              <div v-else>
                <div class="overflow-x-auto">
              <table class="w-full min-w-maxo">
                <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Sample SN
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
                  <!-- <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status
                  </th> -->
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
                  <!-- <td class="px-4 py-4 text-sm">
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
                  </td> -->
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
              </div>
              <div class="p-4 border-t-[0.5px]">
                              <Pagination 
  v-if="completeMovementData.length > 0"
  v-model:currentPage="completeMovementPage" 
  v-model:pageSize="completeMovementPageSize"
  :totalItems="completeMovementTotal" 
  :pageSizeOptions="[10, 25, 50, 100]" 
/>
              </div>
            </div>

            <!-- Complete Disposal Tab -->
            <div  v-show="activeTab === 'complete-disposal'">
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
              <div v-else>
                <div class="overflow-x-auto">
                                  <table class="w-full min-w-max">
                <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Sample SN
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
                  <!-- <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status
                  </th> -->
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
                  <!-- <td class="px-4 py-4 text-sm">
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
                  </td> -->
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
              <div class="p-4 border-t-[0.5px]">
                <Pagination 
                    v-if="completeDisposalData.length > 0"
                    v-model:currentPage="completeDisposalPage" 
                    v-model:pageSize="completeDisposalPageSize"
                    :totalItems="completeDisposalTotal" 
                    :pageSizeOptions="[10, 25, 50, 100]" 
                  />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Request Movement Modal -->
    <Teleport to="body">
      <div
          v-if="showRequestMovementModal"
          class="fixed inset-0 bg-black bg-black/50 backdrop-blur-lg bg-opacity-50 flex items-center justify-center p-4 z-[9999]"
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
                    @update:modelValue="onSampleSelect"
                >
                  <template #default="{ option }">
                    <div class="flex flex-col">
                      <span class="font-medium">{{ option.sample_label }}</span>
                      <span class="text-xs text-gray-500">UUID: {{ option.uuid }}</span>
                    </div>
                  </template>
                  <template #selected-label="{ option }">
                    {{ option.sample_label }}
                  </template>
                </UiSelectInput>

                <UiAnimatedInput
                    label="Requested By"
                    v-model="movementForm.request_by"
                    type="text"
                    :readonly="true"
                    class="bg-gray-25"
                />
                <UiSelectInput
                    v-model="movementForm.movement_type"
                    :options="['Immediate', 'Reservation']"
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
                      :disabled="true"
                  />
                  <UiSelectInput
                      v-model="movementForm.source_freezer"
                      :options="sourceFreezersForDisplay"
                      label="Freezer"
                      :disabled="true"
                  />
                  <UiSelectInput
                      v-model="movementForm.source_rack"
                      :options="sourceRacksForDisplay"
                      label="Rack"
                      :disabled="true"
                  />
                  <UiSelectInput
                      v-model="movementForm.source_box"
                      :options="sourceBoxesForDisplay"
                      label="Box"
                      :disabled="true"
                  />
                  <UiAnimatedInput
                      label="Position"
                      v-model="movementForm.source_position"
                      type="number"
                      :readonly="true"
                      class="bg-gray-25"
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
                      @update:modelValue="onDestinationSiteChange"
                  />
                  <UiSelectInput
                      v-model="movementForm.destination_freezer"
                      :options="filteredDestinationFreezers"
                      label="Freezer"
                      @update:modelValue="onDestinationFreezerChange"
                      :disabled="!movementForm.destination_site"
                  />
                  <UiSelectInput
                      v-model="movementForm.destination_rack"
                      :options="filteredDestinationRacks"
                      label="Rack"
                      @update:modelValue="onDestinationRackChange"
                      :disabled="!movementForm.destination_freezer"
                  />
                  <UiSelectInput
                      v-model="movementForm.destination_box"
                      :options="filteredDestinationBoxes"
                      label="Box"
                      @update:modelValue="onDestinationBoxChange(movementForm.destination_box)"
                      :disabled="!movementForm.destination_rack"
                  />
                  <!-- Replace the current position input with this: -->
<div v-if="movementForm.destination_box" class="md:col-span-3">
  <label class="block text-sm font-medium text-gray-700 mb-2">
    Select Position <span class="text-red-500">*</span>
  </label>

  <!-- Current Selection Display -->
  <div class="bg-gray-25 p-3 rounded-lg border border-gray-50 mb-3">
    <div class="text-xs text-gray-600 flex items-center gap-1 flex-wrap">
      <span>{{ movementForm.destination_site || 'Select Site' }}</span>
      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
      <span>{{ movementForm.destination_freezer || 'Select Freezer' }}</span>
      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
      <span>{{ movementForm.destination_rack || 'Select Rack' }}</span>
      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
      <span>{{ movementForm.destination_box || 'Select Box' }}</span>
      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
      <span class="font-semibold text-blue-600">
        {{ getPositionLabel(movementForm.destination_position) }}
      </span>
    </div>
  </div>

  <!-- Loading State -->
  <div v-if="fetchingOccupancy" class="text-center py-8">
    <svg class="animate-spin h-8 w-8 text-[#005B8F] mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <p class="mt-2 text-sm text-gray-600">Loading box occupancy...</p>
  </div>

  <!-- Box Grid -->
   <div v-else-if="boxTemplate" class="overflow-x-auto rounded-lg bg-gray-25 p-3">
  <div class="grid gap-2 mb-4" :style="{ gridTemplateColumns: `repeat(${boxTemplate.columns}, minmax(0, 1fr))` }">
    <template v-for="row in boxTemplate.rows" :key="row">
      <button
        v-for="col in boxTemplate.columns"
        :key="`${row}-${col}`"
        type="button"
        @click="selectPosition(row, col)"
        :class="[
          'w-full aspect-square text-xs font-semibold rounded-lg border-[0.5px] transition-all duration-200 transform hover:scale-105',
          movementForm.destination_position === getPositionNumber(row, col)
            ? 'bg-[#005B8F] text-white border-blue-700 shadow-lg scale-110'
            : isPositionOccupied(row, col)
              ? 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed opacity-60'
              : 'bg-white text-gray-700 border-gray-100 hover:border-blue-400 hover:shadow-md'
        ]"
        :disabled="isPositionOccupied(row, col) || trackingSample"
      >
        {{ getRowLabel(row) }}{{ col }}
      </button>
    </template>
  </div>
</div>
   <!-- <div v-else-if="boxTemplate" class="overflow-x-auto rounded-lg bg-gray-25 p-3">
  <div class="grid gap-2 mb-4" :style="{ gridTemplateColumns: `repeat(${boxTemplate.columns}, minmax(0, 1fr))` }">
    <template v-for="row in boxTemplate.rows" :key="row">
      <button
        v-for="col in boxTemplate.columns"
        :key="`${row}-${col}`"
        type="button"
        @click="selectPosition(row, col)"
        :class="[
          'w-full aspect-square text-xs font-semibold rounded-lg border-[0.5px] transition-all duration-200 transform hover:scale-105',
          movementForm.destination_position === getPositionNumber(row, col)
            ? 'bg-[#005B8F] text-white border-blue-700 shadow-lg scale-110'
            : isPositionOccupied(row, col)
              ? 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed opacity-60'
              : 'bg-white text-gray-700 border-gray-100 hover:border-blue-400 hover:shadow-md'
        ]"
        :disabled="isPositionOccupied(row, col) || trackingSample"
      >
        {{ getRowLabel(row) }}{{ col }}
      </button>
    </template>
  </div>
</div> -->
  <!-- <div v-else-if="boxTemplate" class="overflow-x-auto rounded-lg bg-gray-25 p-3">
    <div class="inline-block min-w-full">
      <div class="grid gap-2 mb-4">
        <div v-for="row in boxTemplate.rows" :key="row" class="flex gap-2">
          <button
            v-for="col in boxTemplate.columns"
            :key="`${row}-${col}`"
            type="button"
            @click="selectPosition(row, col)"
            :class="[
              'w-10 h-10 text-xs font-semibold rounded-lg border transition-all duration-200 transform hover:scale-105',
              movementForm.destination_position === getPositionNumber(row, col)
                ? 'bg-[#005B8F] text-white border-blue-700 shadow-lg scale-110'
                : isPositionOccupied(row, col)
                  ? 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed opacity-60'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:shadow-md'
            ]"
            :disabled="isPositionOccupied(row, col) || trackingSample"
          >
            {{ getRowLabel(row) }}{{ col }}
          </button>
        </div>
      </div>
    </div>
  </div> -->

  <!-- Box Statistics -->
  <div v-if="boxOccupancyData?.statistics" class="mt-4 bg-white p-4 rounded-lg border-[0.5px] border-gray-50">
    <h4 class="text-sm font-semibold text-gray-700 mb-3">Box Statistics</h4>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="text-center">
        <p class="text-xs text-gray-600">Total</p>
        <p class="text-lg font-bold text-gray-900">{{ boxOccupancyData.statistics.total_positions }}</p>
      </div>
      <div class="text-center">
        <p class="text-xs text-gray-600">Occupied</p>
        <p class="text-lg font-bold text-red-600">{{ boxOccupancyData.statistics.occupied }}</p>
      </div>
      <div class="text-center">
        <p class="text-xs text-gray-600">Available</p>
        <p class="text-lg font-bold text-green-600">{{ boxOccupancyData.statistics.available }}</p>
      </div>
      <div class="text-center">
        <p class="text-xs text-gray-600">Utilization</p>
        <p class="text-lg font-bold text-blue-600">{{ boxOccupancyData.statistics.utilization_percentage }}%</p>
      </div>
    </div>
  </div>

  <!-- Legend -->
  <div class="flex flex-wrap gap-4 text-sm bg-white p-3 rounded-lg border-[0.5px] border-gray-50 mt-4">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 bg-white border[0.5px] border-gray-300 rounded-lg"></div>
      <span class="text-gray-700">Available</span>
    </div>
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 bg-gray-300 border-[0.5px] border-gray-400 rounded-lg"></div>
      <span class="text-gray-700">Occupied</span>
    </div>
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 bg-[#005B8F] border[0.5px] border-blue-700 rounded-lg"></div>
      <span class="text-gray-700">Selected</span>
    </div>
  </div>
</div>

<!-- Empty State -->
<div v-else class="md:col-span-3 text-center py-8 bg-gray-25 rounded-lg">
  <svg class="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
  </svg>
  <p class="text-sm text-gray-600">Select a box to view available positions</p>
</div>
                  <!-- <UiAnimatedInput
                      label="Position"
                      v-model="movementForm.destination_position"
                      type="number"
                      :disabled="!movementForm.destination_box"
                  /> -->
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
            </div>

            <div class="flex justify-end gap-3 mt-6">
              <button
                  @click="closeRequestMovementModal"
                  type="button"
                  :disabled="trackingSample"
                  class="px-6 py-3 border border-gray-300 text-sm text-gray-700 rounded-lg hover:bg-gray-25 transition disabled:opacity-50"
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
      class="fixed inset-0 bg-black/50 backdrop-blur-lg bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]"
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
          <div>
            <UiSelectInput
                :options="samples"
                label="Sample UUID"
                v-model="disposalForm.sample_uuid"
            >
              <template #default="{ option }">
                <div class="flex flex-col">
                  <span class="font-medium">{{ option.sample_label }}</span>
                  <span class="text-xs text-gray-500">UUID: {{ option.uuid }}</span>
                </div>
              </template>
              <template #selected-label="{ option }">
                {{ option.sample_label }}
              </template>
            </UiSelectInput>
          </div>

          <div>
            <UiAnimatedInput
                label="Disposal Method"
                v-model="disposalForm.disposal_method"
                type="text"
            />
          </div>

          <div>
            <UiAnimatedInput
                v-model="disposalForm.reason_for_disposal"
                :rows="4"
                type="textarea"
                label="Reason for Disposal"
            />
          </div>

          <div>
            <UiAnimatedInput
                v-model="disposalForm.notes"
                :rows="4"
                type="textarea"
                label="Additional Notes (Optional)"
            />
          </div>

          <div class="flex items-center gap-2">
            <input
                type="checkbox"
                id="mark-disposed"
                v-model="disposalForm.mark_as_disposed"
                class="custom-checkbox w-4 h-4 text-[#005B8F] border-gray-300 rounded focus:ring-[#005B8F]"
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
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-25 transition disabled:opacity-50"
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
    <Teleport to="body">
      <div
          v-if="showViewDetailsModal"
          class="fixed inset-0 bg-black/50 backdrop-blur-lg bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]"
          @click.self="closeViewDetailsModal"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="p-6">
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
              <div>
                <h3 class="text-base font-semibold text-[#005B8F] mb-4">Movement Information</h3>
                <div class="space-y-4">
                  <div class="flex justify-between items-start py-2">
                    <span class="text-sm text-gray-700">Sample SN</span>
                    <span class="text-sm font-medium text-gray-900 text-right">{{ selectedItem.sampleId || 'Not available' }}</span>
                  </div>
                  <div class="flex justify-between items-start py-2">
                    <span class="text-sm text-gray-700">Source Location</span>
                    <span class="text-sm font-medium text-gray-900 text-right">{{ selectedItem.sourceLocation || 'Not available' }}</span>
                  </div>
                  <div class="flex justify-between items-start py-2">
                    <span class="text-sm text-gray-700">Destination Location</span>
                    <span class="text-sm font-medium text-gray-900 text-right">{{ selectedItem.destinationLocation || 'Not available' }}</span>
                  </div>
                  <div class="flex justify-between items-start py-2">
                    <span class="text-sm text-gray-700">Requested Date</span>
                    <span class="text-sm font-medium text-gray-900 text-right">{{ selectedItem.requested_at || 'Not available' }}</span>
                  </div>
                  <div class="flex justify-between items-start py-2">
                    <span class="text-sm text-gray-700">Approved Date</span>
                    <span class="text-sm font-medium text-gray-900 text-right">{{ selectedItem.approved_at || 'Pending approval' }}</span>
                  </div>
                  <div class="flex justify-between items-start py-2">
                    <span class="text-sm text-gray-700">Requested by</span>
                    <span class="text-sm font-medium text-gray-900 text-right">{{ selectedItem.requestedBy || 'Not available' }}</span>
                  </div>
                  <div v-if="selectedItem.receivedBy" class="flex justify-between items-start py-2">
                    <span class="text-sm text-gray-700">Received by</span>
                    <span class="text-sm font-medium text-gray-900 text-right">{{ selectedItem.receivedBy }}</span>
                  </div>
                  <div v-if="selectedItem.description" class="flex justify-between items-start py-2">
                    <span class="text-sm text-gray-700">Request Reason</span>
                    <span class="text-sm font-medium text-gray-900 text-right max-w-xs">{{ selectedItem.description }}</span>
                  </div>
                </div>
              </div>

              <div class="relative pl-8 space-y-6 mt-8">
                <div class="absolute left-4 top-3 bottom-3 w-0.5 bg-gray-200"></div>

                <div class="relative">
                  <div class="absolute -left-[1.9rem] top-1 w-6 h-6 rounded-full bg-gray-300 border-4 border-white flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <div class="bg-gray-25 rounded-lg p-4">
                    <h4 class="font-semibold text-gray-900 mb-1">Movement Requested</h4>
                    <p class="text-sm text-gray-600">
                      {{ selectedItem.requested_at || 'Date not available' }}
                      <span v-if="selectedItem.requested_by"> by {{ selectedItem.requested_by }}</span>
                    </p>
                  </div>
                </div>

                <div class="relative" v-if="selectedItem.approved_at && selectedItem.approved_at !== 'N/A' && selectedItem.approved_at !== 'Pending approval'">
                  <div class="absolute -left-[1.9rem] top-1 w-6 h-6 rounded-full bg-blue-500 border-4 border-white flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <div class="bg-gray-25 rounded-lg p-4">
                    <h4 class="font-semibold text-gray-900 mb-1">Request Approved</h4>
                    <p class="text-sm text-gray-600">
                      {{ selectedItem.approved_at }}
                      <span v-if="selectedItem.approved_by"> by {{ selectedItem.approved_by }}</span>
                    </p>
                  </div>
                </div>

                <div class="relative" v-if="selectedItem.completionStatus && (selectedItem.completionStatus.toLowerCase() === 'completed' || selectedItem.completionStatus.toLowerCase() === 'moved' || selectedItem.completionStatus.toLowerCase() === 'confirmed')">
                  <div class="absolute -left-[1.9rem] top-1 w-6 h-6 rounded-full bg-green-500 border-4 border-white flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <div class="bg-gray-25 rounded-lg p-4">
                    <h4 class="font-semibold text-gray-900 mb-1">Sample Moved</h4>
                    <p class="text-sm text-gray-600">
                      {{ selectedItem.movedDate || selectedItem.approvedDate || 'Date not available' }}
                      <span v-if="selectedItem.movedBy"> by {{ selectedItem.movedBy }}</span>
                      <span v-else-if="selectedItem.requestedBy"> by {{ selectedItem.requestedBy }}</span>
                    </p>
                  </div>
                </div>

                <div class="relative" v-if="selectedItem.completionStatus && selectedItem.completionStatus.toLowerCase() === 'confirmed'">
                  <div class="absolute -left-[1.9rem] top-1 w-6 h-6 rounded-full bg-purple-500 border-4 border-white flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <div class="bg-gray-25 rounded-lg p-4">
                    <h4 class="font-semibold text-gray-900 mb-1">Transfer Confirmed</h4>
                    <p class="text-sm text-gray-600">
                      {{ selectedItem.confirmedDate || selectedItem.approved_at || 'Date not available' }}
                      <span v-if="selectedItem.confirmedBy"> by {{ selectedItem.confirmedBy }}</span>
                      <span v-else> by Receiving Lab</span>
                    </p>
                  </div>
                </div>

                <div class="relative" v-if="selectedItem.completionStatus && selectedItem.completionStatus.toLowerCase() === 'rejected'">
                  <div class="absolute -left-[1.9rem] top-1 w-6 h-6 rounded-full bg-red-500 border-4 border-white flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <div class="bg-red-50 rounded-lg p-4">
                    <h4 class="font-semibold text-red-900 mb-1">Request Rejected</h4>
                    <p class="text-sm text-red-700">
                      {{ selectedItem.approved_at || 'Date not available' }}
                      <span v-if="selectedItem.approved_by"> by {{ selectedItem.approved_by }}</span>
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
          class="fixed inset-0 bg-black bg-black/50 backdrop-blur-lg bg-opacity-50 flex items-center justify-center p-4 z-[9999]"
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

            <div class="bg-gray-25 rounded-lg p-4 mb-6 space-y-2">
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
                  class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-25 transition font-medium disabled:opacity-50"
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
          class="fixed inset-0 bg-black bg-black/50 backdrop-blur-lg bg-opacity-50 flex items-center justify-center p-4 z-[9999]"
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

            <div class="bg-gray-25 rounded-lg p-4 mb-4 space-y-2">
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
                  class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-25 transition font-medium disabled:opacity-50"
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
import { ref, computed, onMounted, watch } from 'vue'
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
import { usePagination } from '@/composables/core/usePagination'
import { useGetBoxOccupancy } from "@/composables/modules/box/useGetBoxOccupancy"
import { useGetUtilizationLevel } from "@/composables/modules/reporting/useGetUtilizationLevel"
import { useUser } from '@/composables/modules/auth/user'
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
const { 
  loading: utilizationLoading,
  utilizationData,
  getUtilizationLevel 
} = useGetUtilizationLevel()
const { loading: fetchingOccupancy, occupancy, getBoxOccupancy } = useGetBoxOccupancy()
// Other composables
const { loading: trackingSample, trackingData, trackSample } = useTrackSample()
const { loading, disposeSample } = useDisposeSample()
const { loading: loadingSites, sites, getSites } = useGetSites()
const { loading: loadingRacks, racks, getRacks } = useGetRacks()
const { loading: loadingFreezers, freezers, getFreezers } = useGetFreezers()
const { loading: loadingBoxes, boxes, getBoxes } = useGetBoxes()
const { samples, loading: fetchingSamples } = useGetAllSamples()
const { user } = useUser()

const boxOccupancyData = ref<any>(null)
const boxTemplate = computed(() => boxOccupancyData.value?.template)

// Get current user
const currentUser = computed(() => {
  // Try to get from Nuxt auth or your auth system
  // This is a placeholder - adjust based on your auth implementation
//   if (process.client) {
//     return localStorage.getItem('userName') || localStorage.getItem('userEmail') || 'Current User'
//   }
  return `${user.value?.first_name || user.value?.last_name}`
})

const activeTab = ref('pending-movement')

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

const transformTrackingRequest = (request: any): BioSpecimen => {
  return {
    id: request.request_id || request.id,
    sampleId: request.sample_serial_no,
    sourceLocation: formatLocation(request.source_location || request.source_attributes),
    destinationLocation: formatLocation(request.destination_location || request.destination_attributes),
    requestedDate: formatDate(request?.requested_at),
    approvedDate: formatDate(request?.approved_at),
    requestedBy: request.requested_by || request.request_by || 'N/A',
    status: request.status === 'pending' ? 'pendingMovement' : 'completeMovement',
    description: request.description || request.reason || request.notes,
    completionStatus: request.completion_status || request.status,
    request_id: request.request_id || request.id,
    ...request
  }
}

const transformDisposalRequest = (request: any): BioSpecimen => {
  return {
    id: request.request_id || request.id,
    sampleId: request.sample_serial_no,
    sourceLocation: formatLocation(request.source_location || request.location),
    destinationLocation: 'Disposal Unit',
    requestedDate: formatDate(request?.requested_at),
    approvedDate: formatDate(request?.approved_at),
    requestedBy: request.requested_by || request.request_by || 'N/A',
    status: request.status === 'pending' ? 'pendingDisposal' : 'completeDisposal',
    description: request.reason_for_disposal || request.reason || request.description,
    completionStatus: request.completion_status || request.status,
    request_id: request.request_id || request.id,
    ...request
  }
}

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

// Source location display options (for disabled dropdowns)
const sourceFreezersForDisplay = computed(() => {
  if (!movementForm.value.source_freezer) return []
  return [movementForm.value.source_freezer]
})

const sourceRacksForDisplay = computed(() => {
  if (!movementForm.value.source_rack) return []
  return [movementForm.value.source_rack]
})

const sourceBoxesForDisplay = computed(() => {
  if (!movementForm.value.source_box) return []
  return [movementForm.value.source_box]
})

// Hierarchical filtering for destination location - FETCHES FROM API
const filteredDestinationFreezers = computed(() => {
  if (!movementForm.value.destination_site || !freezers.value) return []
  return freezers.value.map((freezer: any) => freezer.freezer_name)
    // .filter((f: any) => f.site_name === movementForm.value.destination_site)
    // .map((f: any) => f.freezer_name)
})

const filteredDestinationRacks = computed(() => {
  if (!movementForm.value.destination_freezer || !racks.value) return []
  return racks.value.map((rack: any) => rack.rack_name)
    // .filter((r: any) => r.freezer_name === movementForm.value.destination_freezer)
    // .map((r: any) => r.rack_name)
})

const filteredDestinationBoxes = computed(() => {
  if (!movementForm.value.destination_rack || !boxes.value) return []
  return boxes.value.map((box: any) => box.box_name)
    // .filter((b: any) => b.rack_name === movementForm.value.destination_rack)
    // .map((b: any) => b.box_name)
})

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


const checkUtilization = async () => {  
  // Find the actual freezer_id from the freezers array
  const selectedFreezer = freezers.value?.find((freezer: any) => freezer.freezer_name === movementForm)
  if (selectedFreezer) {
    await getUtilizationLevel(selectedFreezer.freezer_id)
  }
}

// Helper functions to get IDs from names
const getSiteIdByName = (siteName: string): string => {
  const site = sites.value?.find((s: any) => s.site_name === siteName)
  return site?.site_id || ''
}

const getFreezerIdByName = (freezerName: string): string => {
  const freezer = freezers.value?.find((f: any) => f.freezer_name === freezerName)
  return freezer?.freezer_id || ''
}

const getRackIdByName = (rackName: string): string => {
  const rack = racks.value?.find((r: any) => r.rack_name === rackName)
  return rack?.rack_id || ''
}

const getBoxIdByName = (boxName: string): string => {
  const box = boxes.value?.find((b: any) => b.box_name === boxName)
  return box?.box_id || ''
}


// Pagination
const {
  currentPage: pendingMovementPage,
  pageSize: pendingMovementPageSize,
  totalItems: pendingMovementTotal,
  paginatedItems: paginatedPendingMovement,
  resetPagination: resetPendingMovement
} = usePagination(pendingMovementData, {
  initialPage: 1,
  initialPageSize: 10,
  pageSizeOptions: [10, 25, 50, 100]
})

const {
  currentPage: pendingDisposalPage,
  pageSize: pendingDisposalPageSize,
  totalItems: pendingDisposalTotal,
  paginatedItems: paginatedPendingDisposal,
  resetPagination: resetPendingDisposal
} = usePagination(pendingDisposalData, {
  initialPage: 1,
  initialPageSize: 10,
  pageSizeOptions: [10, 25, 50, 100]
})

const {
  currentPage: completeMovementPage,
  pageSize: completeMovementPageSize,
  totalItems: completeMovementTotal,
  paginatedItems: paginatedCompleteMovement,
  resetPagination: resetCompleteMovement
} = usePagination(completeMovementData, {
  initialPage: 1,
  initialPageSize: 10,
  pageSizeOptions: [10, 25, 50, 100]
})

const {
  currentPage: completeDisposalPage,
  pageSize: completeDisposalPageSize,
  totalItems: completeDisposalTotal,
  paginatedItems: paginatedCompleteDisposal,
  resetPagination: resetCompleteDisposal
} = usePagination(completeDisposalData, {
  initialPage: 1,
  initialPageSize: 10,
  pageSizeOptions: [10, 25, 50, 100]
})

const getRequestType = computed(() => {
  return selectedType.value === 'tracking' ? 'movement' : 'disposal'
})

const isLoadingAnyData = computed(() => {
  return loadingPendingTracking.value || loadingCompletedTracking.value ||
      loadingPendingDisposal.value || loadingCompletedDisposal.value
})

const showRequestMovementModal = ref(false)
const showRequestDisposalModal = ref(false)
const showViewDetailsModal = ref(false)
const showApproveModal = ref(false)
const showRejectModal = ref(false)
const selectedItem = ref<BioSpecimen | null>(null)
const rejectionReason = ref('')

// const movementForm = ref({
//   sample_uuid: '',
//   source_site: '',
//   source_freezer: '',
//   source_rack: '',
//   source_box: '',
//   source_position: '',
//   destination_site: '',
//   destination_freezer: '',
//   destination_rack: '',
//   destination_box: '',
//   destination_position: '',
//   movement_type: 'transfer',
//   reservation_time: '',
//   start_date_time: '',
//   end_date_time: '',
//   request_by: currentUser.value
// }) as any

// const movementForm = ref({
//   sample_uuid: '',
//   source_site: '',
//   source_site_id: '',
//   source_freezer: '',
//   source_freezer_id: '',
//   source_rack: '',
//   source_rack_id: '',
//   source_box: '',
//   source_box_id: '',
//   source_position: '',
//   destination_site: '',
//   destination_site_id: '',
//   destination_freezer: '',
//   destination_freezer_id: '',
//   destination_rack: '',
//   destination_rack_id: '',
//   destination_box: '',
//   destination_box_id: '',
//   destination_position: '',
//   movement_type: 'Immediate',
//   reservation_time: '',
//   start_date_time: '',
//   end_date_time: '',
//   request_by: currentUser.value
// }) as any

const movementForm = ref({
  sample_uuid: '',
  source_site: '',
  source_site_id: '',
  source_freezer: '',
  source_freezer_id: '',
  source_rack: '',
  source_rack_id: '',
  source_box: '',
  source_box_id: '',
  source_position: null as number | null,  // ✅ Allow null for zero value
  destination_site: '',
  destination_site_id: '',
  destination_freezer: '',
  destination_freezer_id: '',
  destination_rack: '',
  destination_rack_id: '',
  destination_box: '',
  destination_box_id: '',
  destination_position: null as number | null,  // ✅ Allow null for zero value
  movement_type: 'Immediate',
  reservation_time: '',
  start_date_time: '',
  end_date_time: '',
  request_by: currentUser.value
}) as any

const disposalForm = ref({
  sample_uuid: '',
  notes: "",
  disposal_method: "",
  // request_by: currentUser.value,
  reason_for_disposal: '',
  mark_as_disposed: true
}) as any

// Sample selection handler
// const onSampleSelect = (sample: any) => {
//   if (sample && sample.storage_location) {
//     movementForm.value.source_site = sample.storage_location.site || ''
//     movementForm.value.source_freezer = sample.storage_location.freezer || ''
//     movementForm.value.source_rack = sample.storage_location.rack || ''
//     movementForm.value.source_box = sample.storage_location.box || ''
//     movementForm.value.source_position = sample.storage_location.position || ''
//   }
// }

// const onSampleSelect = (sample: any) => {
//   if (sample && sample.storage_location) {
//     // Store both names and IDs for source location
//     movementForm.value.source_site = sample.storage_location.site || ''
//     movementForm.value.source_site_id = getSiteIdByName(sample.storage_location.site || '')
//     movementForm.value.source_freezer = sample.storage_location.freezer || ''
//     movementForm.value.source_freezer_id = getFreezerIdByName(sample.storage_location.freezer || '')
//     movementForm.value.source_rack = sample.storage_location.rack || ''
//     movementForm.value.source_rack_id = getRackIdByName(sample.storage_location.rack || '')
//     movementForm.value.source_box = sample.storage_location.box || ''
//     movementForm.value.source_box_id = getBoxIdByName(sample.storage_location.box || '')
//     movementForm.value.source_position = sample.storage_location.position || ''
//   }
// }

// const onSampleSelect = async (sample: any) => {
//   console.log('Selected sample:', sample) // Debug log to see the structure
  
//   if (sample && sample.storage_location) {
//     // The storage_location contains IDs, not names
//     // Store the IDs directly
//     const sourceLocation = sample.storage_location
    
//     movementForm.value.source_site_id = sourceLocation.site || ''
//     movementForm.value.source_freezer_id = sourceLocation.freezer || ''
//     movementForm.value.source_rack_id = sourceLocation.rack || ''
//     movementForm.value.source_box_id = sourceLocation.box || ''
//     movementForm.value.source_position = sourceLocation.position || ''
    
//     // Now find the display names from the IDs
//     const site = sites.value?.find((s: any) => s.site_id === sourceLocation.site)
//     const freezer = freezers.value?.find((f: any) => f.freezer_id === sourceLocation.freezer)
//     const rack = racks.value?.find((r: any) => r.rack_id === sourceLocation.rack)
//     const box = boxes.value?.find((b: any) => b.box_id === sourceLocation.box)
    
//     movementForm.value.source_site = site?.site_name || sourceLocation.site || ''
//     movementForm.value.source_freezer = freezer?.freezer_name || sourceLocation.freezer || ''
//     movementForm.value.source_rack = rack?.rack_name || sourceLocation.rack || ''
//     movementForm.value.source_box = box?.box_name || sourceLocation.box || ''
    
//     // Load the necessary data if not already loaded
//     if (sourceLocation.site && !freezers.value?.some((f: any) => f.site_id === sourceLocation.site)) {
//       await getFreezers({ site_id: sourceLocation.site })
//     }
//     if (sourceLocation.freezer && !racks.value?.some((r: any) => r.freezer_id === sourceLocation.freezer)) {
//       const selectedFreezer = freezers.value?.find((f: any) => f.freezer_id === sourceLocation.freezer)
//       if (selectedFreezer) {
//         await getRacks({ site_id: selectedFreezer.site_id, freezer_id: sourceLocation.freezer })
//       }
//     }
//     if (sourceLocation.rack && !boxes.value?.some((b: any) => b.rack_id === sourceLocation.rack)) {
//       const selectedRack = racks.value?.find((r: any) => r.rack_id === sourceLocation.rack)
//       if (selectedRack) {
//         await getBoxes({ 
//           site_id: selectedRack.site_id, 
//           freezer_id: selectedRack.freezer_id, 
//           rack_id: sourceLocation.rack 
//         })
//       }
//     }
//   }
// }

// Destination location handlers
// const onDestinationSiteChange = async () => {
//     console.log('Destination site changed to:', movementForm.value, sites.value)
//   const selectedSite = sites.value?.find((site: any) => site.site_name === movementForm.value.destination_site)
//   console.log('Selected site:', selectedSite)
//   if (selectedSite) {
//     await getFreezers({site_id: selectedSite.site_id})
//   }
//   movementForm.value.destination_freezer = ''
//   movementForm.value.destination_rack = ''
//   movementForm.value.destination_box = ''
//   movementForm.value.destination_position = ''
// }


// const onDestinationFreezerChange = async () => {
//   const selectedFreezer = freezers.value?.find((f: any) => f.freezer_name === movementForm.value.destination_freezer)
//   if (selectedFreezer) {
//     await getRacks({site_id: selectedFreezer.site_id, freezer_id: selectedFreezer.freezer_id})
//   }
//   movementForm.value.destination_rack = ''
//   movementForm.value.destination_box = ''
//   movementForm.value.destination_position = ''
// }

// const onDestinationRackChange = async () => {
//   const selectedRack = racks.value?.find((r: any) => r.rack_name === movementForm.value.destination_rack)
//   if (selectedRack) {
//     await getBoxes({site_id: selectedRack.site_id, freezer_id: selectedRack.freezer_id, rack_id: selectedRack.rack_id})
//   }
//   movementForm.value.destination_box = ''
//   movementForm.value.destination_position = ''
// }


// const onDestinationBoxChange = async (boxName: string) => {
//   movementForm.value.destination_position = ''
//   boxOccupancyData.value = null

//   if (!boxName) return

//   // Find the selected box to get its ID
//   const selectedBox = boxes.value?.find((b: any) => b.box_name === boxName)
//   if (!selectedBox) return

//   const selectedSite = sites.value?.find((s: any) => s.site_name === movementForm.value.destination_site)
//   const selectedFreezer = freezers.value?.find((f: any) => f.freezer_name === movementForm.value.destination_freezer)
//   const selectedRack = racks.value?.find((r: any) => r.rack_name === movementForm.value.destination_rack)

//   if (selectedSite && selectedFreezer && selectedRack && selectedBox) {
//     const result = await getBoxOccupancy({
//       site_id: selectedSite.site_id,
//       freezer_id: selectedFreezer.freezer_id,
//       rack_id: selectedRack.rack_id,
//       box_id: selectedBox.box_id
//     })

//     if (result) {
//       boxOccupancyData.value = result
//     }
//   }
// }

const onSampleSelect = async (sample: any) => {
  console.log('Selected sample:', sample)
  
  if (sample && sample.storage_location) {
    const sourceLocation = sample.storage_location
    
    // Store IDs directly
    movementForm.value.source_site_id = sourceLocation.site || ''
    movementForm.value.source_freezer_id = sourceLocation.freezer || ''
    movementForm.value.source_rack_id = sourceLocation.rack || ''
    movementForm.value.source_box_id = sourceLocation.box || ''
    // ✅ Position is already zero-based from the system
    movementForm.value.source_position = sourceLocation.position !== undefined ? sourceLocation.position : null
    
    // Find display names from IDs
    const site = sites.value?.find((s: any) => s.site_id === sourceLocation.site)
    const freezer = freezers.value?.find((f: any) => f.freezer_id === sourceLocation.freezer)
    const rack = racks.value?.find((r: any) => r.rack_id === sourceLocation.rack)
    const box = boxes.value?.find((b: any) => b.box_id === sourceLocation.box)
    
    movementForm.value.source_site = site?.site_name || sourceLocation.site || ''
    movementForm.value.source_freezer = freezer?.freezer_name || sourceLocation.freezer || ''
    movementForm.value.source_rack = rack?.rack_name || sourceLocation.rack || ''
    movementForm.value.source_box = box?.box_name || sourceLocation.box || ''
    
    // Load necessary data if not already loaded
    if (sourceLocation.site && !freezers.value?.some((f: any) => f.site_id === sourceLocation.site)) {
      await getFreezers({ site_id: sourceLocation.site })
    }
    if (sourceLocation.freezer && !racks.value?.some((r: any) => r.freezer_id === sourceLocation.freezer)) {
      const selectedFreezer = freezers.value?.find((f: any) => f.freezer_id === sourceLocation.freezer)
      if (selectedFreezer) {
        await getRacks({ site_id: selectedFreezer.site_id, freezer_id: sourceLocation.freezer })
      }
    }
    if (sourceLocation.rack && !boxes.value?.some((b: any) => b.rack_id === sourceLocation.rack)) {
      const selectedRack = racks.value?.find((r: any) => r.rack_id === sourceLocation.rack)
      if (selectedRack) {
        await getBoxes({ 
          site_id: selectedRack.site_id, 
          freezer_id: selectedRack.freezer_id, 
          rack_id: sourceLocation.rack 
        })
      }
    }
  }
}

const onDestinationSiteChange = async (siteName: string) => {
  const siteId = getSiteIdByName(siteName)
  movementForm.value.destination_site_id = siteId
  
  if (siteId) {
    await getFreezers({ site_id: siteId })
  }
  
  movementForm.value.destination_freezer = ''
  movementForm.value.destination_freezer_id = ''
  movementForm.value.destination_rack = ''
  movementForm.value.destination_rack_id = ''
  movementForm.value.destination_box = ''
  movementForm.value.destination_box_id = ''
  movementForm.value.destination_position = ''
  boxOccupancyData.value = null
}

const onDestinationFreezerChange = async (freezerName: string) => {
  const freezerId = getFreezerIdByName(freezerName)
  movementForm.value.destination_freezer_id = freezerId
  
  if (movementForm.value.destination_site_id && freezerId) {
    await getRacks({ 
      site_id: movementForm.value.destination_site_id, 
      freezer_id: freezerId 
    })
  }
  
  movementForm.value.destination_rack = ''
  movementForm.value.destination_rack_id = ''
  movementForm.value.destination_box = ''
  movementForm.value.destination_box_id = ''
  movementForm.value.destination_position = ''
  boxOccupancyData.value = null
}

const onDestinationRackChange = async (rackName: string) => {
  const rackId = getRackIdByName(rackName)
  movementForm.value.destination_rack_id = rackId
  
  if (movementForm.value.destination_site_id && 
      movementForm.value.destination_freezer_id && 
      rackId) {
    await getBoxes({ 
      site_id: movementForm.value.destination_site_id, 
      freezer_id: movementForm.value.destination_freezer_id, 
      rack_id: rackId 
    })
  }
  
  movementForm.value.destination_box = ''
  movementForm.value.destination_box_id = ''
  movementForm.value.destination_position = ''
  boxOccupancyData.value = null
}

// const onDestinationBoxChange = async (boxName: string) => {
//   movementForm.value.destination_position = ''
//   boxOccupancyData.value = null

//   if (!boxName) return

//   const boxId = getBoxIdByName(boxName)
//   movementForm.value.destination_box_id = boxId

//   if (movementForm.value.destination_site_id && 
//       movementForm.value.destination_freezer_id && 
//       movementForm.value.destination_rack_id && 
//       boxId) {
//     const result = await getBoxOccupancy({
//       site_id: movementForm.value.destination_site_id,
//       freezer_id: movementForm.value.destination_freezer_id,
//       rack_id: movementForm.value.destination_rack_id,
//       box_id: boxId
//     })

//     if (result) {
//       boxOccupancyData.value = result
//     }
//   }
// }


// Add these helper methods
// const getRowLabel = (rowIndex: number): string => {
//   return String.fromCharCode(64 + rowIndex) // 1=A, 2=B, etc.
// }

const onDestinationBoxChange = async (boxName: string) => {
  movementForm.value.destination_position = null  // ✅ Reset to null instead of empty string
  boxOccupancyData.value = null

  if (!boxName) return

  const boxId = getBoxIdByName(boxName)
  movementForm.value.destination_box_id = boxId

  if (movementForm.value.destination_site_id && 
      movementForm.value.destination_freezer_id && 
      movementForm.value.destination_rack_id && 
      boxId) {
    const result = await getBoxOccupancy({
      site_id: movementForm.value.destination_site_id,
      freezer_id: movementForm.value.destination_freezer_id,
      rack_id: movementForm.value.destination_rack_id,
      box_id: boxId
    })

    if (result) {
      boxOccupancyData.value = result
    }
  }
}

const getRowLabel = (rowIndex: number): string => {
  return String.fromCharCode(64 + rowIndex) // 1=A, 2=B, etc.
}


// const getPositionNumber = (row: number, col: number): number => {
//   return (row - 1) * (boxTemplate.value?.columns || 10) + col
// }

const getPositionNumber = (row: number, col: number): number => {
  // Returns zero-based position index (0, 1, 2...)
  return (row - 1) * (boxTemplate.value?.columns || 10) + col - 1
}

// const getPositionLabel = (position: number): string => {
//   if (!position || !boxTemplate.value) return 'Select Position'
  
//   const cols = boxTemplate.value.columns
//   const row = Math.floor((position - 1) / cols) + 1
//   const col = ((position - 1) % cols) + 1
  
//   return `${getRowLabel(row)}${col}`
// }

const getPositionLabel = (position: number): string => {
  if (position === null || position === undefined || !boxTemplate.value) return 'Select Position'
  
  const cols = boxTemplate.value.columns
  // Position is already zero-based, so use it directly
  const row = Math.floor(position / cols) + 1
  const col = (position % cols) + 1
  
  return `${getRowLabel(row)}${col}`
}




// const isPositionOccupied = (row: number, col: number): boolean => {
//   if (!boxOccupancyData.value) return false
  
//   const position = getPositionNumber(row, col)
//   const positionIndex = position - 1
  
//   return boxOccupancyData.value.occupancy[positionIndex] === 1
// }

const isPositionOccupied = (row: number, col: number): boolean => {
  if (!boxOccupancyData.value) return false
  
  const position = getPositionNumber(row, col)
  
  // Check if position is in the occupancy array with value 1 (occupied)
  // Position is already zero-based, so use it directly as the array index
  return boxOccupancyData.value.occupancy[position] === 1
}


// const selectPosition = (row: number, col: number) => {
//   if (isPositionOccupied(row, col)) return
//   movementForm.value.destination_position = getPositionNumber(row, col)
// }

const selectPosition = (row: number, col: number) => {
  if (isPositionOccupied(row, col)) return
  movementForm.value.destination_position = getPositionNumber(row, col)
}


// Watch for destination site changes to fetch freezers
watch(() => movementForm.value.destination_site, async (newSite) => {
  if (newSite) {
    const selectedSite = sites.value?.find((site: any) => site.site_name === newSite)
    if (selectedSite) {
      await getFreezers({site_id: selectedSite.site_id})
    }
  }
  // Reset dependent fields
  movementForm.value.destination_freezer = ''
  movementForm.value.destination_rack = ''
  movementForm.value.destination_box = ''
  movementForm.value.destination_position = ''
})

// Watch for destination freezer changes to fetch racks
watch(() => movementForm.value.destination_freezer, async (newFreezer) => {
  if (newFreezer) {
    const selectedFreezer = freezers.value?.find((f: any) => f.freezer_name === newFreezer)
    if (selectedFreezer) {
      await getRacks({site_id: selectedFreezer.site_id, freezer_id: selectedFreezer.freezer_id} )
    }
  }
  // Reset dependent fields
  movementForm.value.destination_rack = ''
  movementForm.value.destination_box = ''
  movementForm.value.destination_position = ''
})

// Watch for destination rack changes to fetch boxes
watch(() => movementForm.value.destination_rack, async (newRack) => {
  if (newRack) {
    const selectedRack = racks.value?.find((r: any) => r.rack_name === newRack)
    if (selectedRack) {
      await getBoxes({site_id: selectedRack.site_id, freezer_id: selectedRack.freezer_id, rack_id: selectedRack.rack_id})
    }
  }
  // Reset dependent fields
  movementForm.value.destination_box = ''
  movementForm.value.destination_position = ''
})


watch(() => movementForm.value.destination_box, async (newBox) => {
  if (newBox) {
    await onDestinationBoxChange(newBox)
  } else {
    boxOccupancyData.value = null
    movementForm.value.destination_position = ''
  }
})


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

const openRequestMovementModal = () => {
  showRequestMovementModal.value = true
  movementForm.value.request_by = currentUser.value
}

// const closeRequestMovementModal = () => {
//   showRequestMovementModal.value = false
//   movementForm.value = {
//     sample_uuid: '',
//     source_site: '',
//     source_freezer: '',
//     source_rack: '',
//     source_box: '',
//     source_position: '',
//     destination_site: '',
//     destination_freezer: '',
//     destination_rack: '',
//     destination_box: '',
//     destination_position: '',
//     movement_type: 'transfer',
//     reservation_time: '',
//     start_date_time: '',
//     end_date_time: '',
//     request_by: currentUser.value
//   }
// }

// const closeRequestMovementModal = () => {
//   showRequestMovementModal.value = false
//   movementForm.value = {
//     sample_uuid: '',
//     source_site: '',
//     source_site_id: '',
//     source_freezer: '',
//     source_freezer_id: '',
//     source_rack: '',
//     source_rack_id: '',
//     source_box: '',
//     source_box_id: '',
//     source_position: '',
//     destination_site: '',
//     destination_site_id: '',
//     destination_freezer: '',
//     destination_freezer_id: '',
//     destination_rack: '',
//     destination_rack_id: '',
//     destination_box: '',
//     destination_box_id: '',
//     destination_position: '',
//     movement_type: 'Immediate',
//     reservation_time: '',
//     start_date_time: '',
//     end_date_time: '',
//     request_by: currentUser.value
//   }
//   boxOccupancyData.value = null
// }

const closeRequestMovementModal = () => {
  showRequestMovementModal.value = false
  movementForm.value = {
    sample_uuid: '',
    source_site: '',
    source_site_id: '',
    source_freezer: '',
    source_freezer_id: '',
    source_rack: '',
    source_rack_id: '',
    source_box: '',
    source_box_id: '',
    source_position: null,  // ✅ Reset to null
    destination_site: '',
    destination_site_id: '',
    destination_freezer: '',
    destination_freezer_id: '',
    destination_rack: '',
    destination_rack_id: '',
    destination_box: '',
    destination_box_id: '',
    destination_position: null,  // ✅ Reset to null
    movement_type: 'Immediate',
    reservation_time: '',
    start_date_time: '',
    end_date_time: '',
    request_by: currentUser.value
  }
  boxOccupancyData.value = null
}


const openRequestDisposalModal = () => {
  showRequestDisposalModal.value = true
  disposalForm.value.request_by = currentUser.value
}

const closeRequestDisposalModal = () => {
  showRequestDisposalModal.value = false
  disposalForm.value = {
    sample_uuid: '',
    request_by: currentUser.value,
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
  const toISOString = (dateValue: any) => {
    if (!dateValue) return null
    if (dateValue instanceof Date) {
      return dateValue.toISOString()
    }
    return new Date(dateValue).toISOString()
  }

  const payload = {
    sample_uuid: movementForm.value.sample_uuid.uuid,
    source_attributes: {
      site: movementForm.value.source_site_id,
      freezer: movementForm.value.source_freezer_id,
      rack: movementForm.value.source_rack_id,
      box: movementForm.value.source_box_id,
      position: parseInt(movementForm.value.source_position)
    },
    destination_attributes: {
      site: movementForm.value.destination_site_id,
      freezer: movementForm.value.destination_freezer_id,
      rack: movementForm.value.destination_rack_id,
      box: movementForm.value.destination_box_id,
      position: parseInt(movementForm.value.destination_position)
    },
    request_type: movementForm.value.movement_type,
    approved_by: [user.value?.user_id],
    reservation_time: toISOString(movementForm.value.reservation_time),
    start_date_time: toISOString(movementForm.value.start_date_time),
    end_date_time: toISOString(movementForm.value.end_date_time),
    request_by: user.value?.user_id
  }

  console.log('Movement request payload:', payload) // Debug log

  const result = await trackSample(payload)
  if (result) {
    await Promise.all([
      getPendingTrackingRequests(),
      getCompletedTrackingRequests()
    ])
    closeRequestMovementModal()
  }
}

// const submitMovementRequest = async () => {
//   const toISOString = (dateValue: any) => {
//     if (!dateValue) return null
//     if (dateValue instanceof Date) {
//       return dateValue.toISOString()
//     }
//     return new Date(dateValue).toISOString()
//   }

//   const payload = {
//     sample_uuid: movementForm.value.sample_uuid.uuid,
//     source_attributes: {
//       site: movementForm.value.source_site,
//       freezer: movementForm.value.source_freezer,
//       rack: movementForm.value.source_rack,
//       box: movementForm.value.source_box,
//       position: parseInt(movementForm.value.source_position)
//     },
//     destination_attributes: {
//       site: movementForm.value.destination_site,
//       freezer: movementForm.value.destination_freezer,
//       rack: movementForm.value.destination_rack,
//       box: movementForm.value.destination_box,
//       position: parseInt(movementForm.value.destination_position)
//     },
//     request_type: movementForm.value.movement_type,
//     approved_by: [user.value?.user_id],
//     reservation_time: toISOString(movementForm.value.reservation_time),
//     start_date_time: toISOString(movementForm.value.start_date_time),
//     end_date_time: toISOString(movementForm.value.end_date_time),
//     request_by: user.value?.user_id
//   }

//   const result = await trackSample(payload)
//   if (result) {
//     await Promise.all([
//       getPendingTrackingRequests(),
//       getCompletedTrackingRequests()
//     ])
//     closeRequestMovementModal()
//   }
// }

// const submitMovementRequest = async () => {
//   const toISOString = (dateValue: any) => {
//     if (!dateValue) return null
//     if (dateValue instanceof Date) {
//       return dateValue.toISOString()
//     }
//     return new Date(dateValue).toISOString()
//   }

//   // Get IDs for source location (in case they're not already set)
//   const sourceSiteId = getSiteIdByName(movementForm.value.source_site)
//   const sourceFreezerId = getFreezerIdByName(movementForm.value.source_freezer)
//   const sourceRackId = getRackIdByName(movementForm.value.source_rack)
//   const sourceBoxId = getBoxIdByName(movementForm.value.source_box)

//   const payload = {
//     sample_uuid: movementForm.value.sample_uuid.uuid,
//     source_attributes: {
//       site: sourceSiteId,
//       freezer: sourceFreezerId,
//       rack: sourceRackId,
//       box: sourceBoxId,
//       position: parseInt(movementForm.value.source_position)
//     },
//     destination_attributes: {
//       site: movementForm.value.destination_site_id,
//       freezer: movementForm.value.destination_freezer_id,
//       rack: movementForm.value.destination_rack_id,
//       box: movementForm.value.destination_box_id,
//       position: parseInt(movementForm.value.destination_position)
//     },
//     request_type: movementForm.value.movement_type,
//     approved_by: [user.value?.user_id],
//     reservation_time: toISOString(movementForm.value.reservation_time),
//     start_date_time: toISOString(movementForm.value.start_date_time),
//     end_date_time: toISOString(movementForm.value.end_date_time),
//     request_by: user.value?.user_id
//   }

//   const result = await trackSample(payload)
//   if (result) {
//     await Promise.all([
//       getPendingTrackingRequests(),
//       getCompletedTrackingRequests()
//     ])
//     closeRequestMovementModal()
//   }
// }

const submitDisposalRequest = async () => {
  const payload = {
    sample_uuid: disposalForm.value.sample_uuid.uuid,
    notes: disposalForm.value.notes,
    disposal_method: disposalForm.value.disposal_method,
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
  
  resetPendingMovement()
  resetPendingDisposal()
  resetCompleteMovement()
  resetCompleteDisposal()
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

  resetPendingMovement()
  resetPendingDisposal()
  resetCompleteMovement()
  resetCompleteDisposal()
}

definePageMeta({
  layout: 'dashboard'
})
</script>
<template>
  <div class="min-h-screen">
    <div class="flex">
      <!-- Header -->
       <main class="mx-auto container">
      <div class="mb-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 class="text-xl font-bold text-gray-900">BioSpecimen Tracking</h1>
          
          <div class="flex flex-wrap gap-2">
            <button
              @click="openRequestMovementModal"
              class="px-4 py-3 bg-[#005B8F] text-white rounded hover:bg-[#004a73] transition flex items-center gap-2 text-sm"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Request Movement
            </button>
            <button
              @click="openRequestDisposalModal"
              class="px-4 py-3 bg-[#005B8F] text-white rounded hover:bg-[#004a73] transition flex items-center gap-2 text-sm"
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
                  label="Status" 
                  :options="statusOptions" 
                  position="standalone" 
                   v-model="filters.status"
                />
                <UiAnimatedInput label="Start date"  type="date" v-model="filters.dateRange.from" />
              <UiAnimatedInput label="End date" type="date" v-model="filters.dateRange.to" />
        </div>
        <div class="space-x-6">
            <button
              @click="applyFilters"
              :disabled="isLoadingAnyData"
              class="flex-1 px-4 py-2 bg-[#005B8F] text-white rounded hover:bg-[#004a73] transition text-sm font-medium disabled:opacity-50"
            >
              {{ isLoadingAnyData ? 'Loading...' : 'Search' }}
            </button>
            <button
              @click="clearFilters"
              :disabled="isLoadingAnyData"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition text-sm font-medium disabled:opacity-50"
            >
              Clear Filter
            </button>
          </div>
      </div>

      <!-- Pending Movement Section -->
      <div class="bg-white rounded-lg shadow-sm mb-6">
        <div class="border-b border-gray-200 px-6 py-4">
          <div class="flex items-center gap-2">
            <h2 class="text-base font-medium text-gray-900">Pending Movement</h2>
            <span class="px-2 py-0.5 rounded-full text-xs bg-orange-100 text-orange-700 font-medium">
              {{ pendingMovementData.length }}
            </span>
          </div>
        </div>

        <div class="overflow-x-auto">
          <div v-if="loadingPendingTracking" class="flex items-center justify-center py-8">
            <svg class="animate-spin h-8 w-8 text-[#005B8F]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <div v-else-if="pendingMovementData.length === 0" class="px-6 py-8 text-center text-gray-500">
            No pending movement requests
          </div>
          <table v-else class="w-full min-w-max">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Sample ID</th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Source Location</th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Destination Location</th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Requested Date</th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Approved Date</th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Requested By</th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100">
              <tr v-for="item in pendingMovementData" :key="item.id" class="hover:bg-gray-50">
                <td class="px-4 py-4 text-sm text-gray-900">{{ item.sampleId }}</td>
                <td class="px-4 py-4 text-sm text-gray-600">
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                    {{ item.sourceLocation }}
                  </div>
                </td>
                <td class="px-4 py-4 text-sm text-gray-600">
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                    {{ item.destinationLocation }}
                  </div>
                </td>
                <td class="px-4 py-4 text-sm text-gray-600">{{ item.requestedDate }}</td>
                <td class="px-4 py-4 text-sm text-gray-600">{{ item.approvedDate }}</td>
                <td class="px-4 py-4 text-sm text-gray-600">{{ item.requestedBy }}</td>
                <td class="px-4 py-4 text-sm">
                  <div class="flex gap-2">
                    <button 
                      @click="openRejectModal(item, 'tracking')"
                      class="px-3 py-1 text-xs border border-red-300 text-red-600 rounded hover:bg-red-50 transition"
                    >
                      Reject
                    </button>
                    <button 
                      @click="openApproveModal(item, 'tracking')"
                      class="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                    >
                      Approve
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pending Disposal Section -->
      <div class="bg-white rounded-lg shadow-sm mb-6">
        <div class="border-b border-gray-200 px-6 py-4">
          <div class="flex items-center gap-2">
            <h2 class="text-base font-medium text-gray-900">Pending Disposal</h2>
            <span class="px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-700 font-medium">
              {{ pendingDisposalData.length }}
            </span>
          </div>
        </div>

        <div class="overflow-x-auto">
          <div v-if="loadingPendingDisposal" class="flex items-center justify-center py-8">
            <svg class="animate-spin h-8 w-8 text-[#005B8F]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <div v-else-if="pendingDisposalData.length === 0" class="px-6 py-8 text-center text-gray-500">
            No pending disposal requests
          </div>
          <table v-else class="w-full min-w-max">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Sample ID</th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Source Location</th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Destination Location</th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Requested Date</th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Approved Date</th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Requested By</th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100">
              <tr v-for="item in pendingDisposalData" :key="item.id" class="hover:bg-gray-50">
                <td class="px-4 py-4 text-sm text-gray-900">{{ item.sampleId }}</td>
                <td class="px-4 py-4 text-sm text-gray-600">
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                    {{ item.sourceLocation }}
                  </div>
                </td>
                <td class="px-4 py-4 text-sm text-gray-600">
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
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
                    <button 
                      @click="openRejectModal(item, 'disposal')"
                      class="px-3 py-1 text-xs border border-red-300 text-red-600 rounded hover:bg-red-50 transition"
                    >
                      Reject
                    </button>
                    <button 
                      @click="openApproveModal(item, 'disposal')"
                      class="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                    >
                      Approve
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Complete Movement Section -->
      <div class="bg-white rounded-lg shadow-sm mb-6">
        <div class="border-b border-gray-200 px-6 py-4">
          <div class="flex items-center gap-2">
            <h2 class="text-base font-medium text-gray-900">Complete Movement</h2>
            <span class="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700 font-medium">
              {{ completeMovementData.length }}
            </span>
          </div>
        </div>

        <div class="overflow-x-auto">
          <div v-if="loadingCompletedTracking" class="flex items-center justify-center py-8">
            <svg class="animate-spin h-8 w-8 text-[#005B8F]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <div v-else-if="completeMovementData.length === 0" class="px-6 py-8 text-center text-gray-500">
            No completed movement requests
          </div>
          <table v-else class="w-full min-w-max">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Sample ID</th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Source Location</th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Destination Location</th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Requested Date</th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Approved Date</th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Requested By</th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Description</th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100">
              <tr v-for="item in completeMovementData" :key="item.id" class="hover:bg-gray-50">
                <td class="px-4 py-4 text-sm text-gray-900">{{ item.sampleId }}</td>
                <td class="px-4 py-4 text-sm text-gray-600">
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                    {{ item.sourceLocation }}
                  </div>
                </td>
                <td class="px-4 py-4 text-sm text-gray-600">
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                    {{ item.destinationLocation }}
                  </div>
                </td>
                <td class="px-4 py-4 text-sm text-gray-600">{{ item.requestedDate }}</td>
                <td class="px-4 py-4 text-sm text-gray-600">{{ item.approvedDate }}</td>
                <td class="px-4 py-4 text-sm text-gray-600">{{ item.requestedBy }}</td>
                <td class="px-4 py-4 text-sm text-gray-600">{{ item.description || 'N/A' }}</td>
                <td class="px-4 py-4 text-sm">
                  <span 
                    :class="[
                      'px-3 py-1 rounded-full text-xs font-medium',
                      item.completionStatus === 'Confirmed' || item.completionStatus === 'confirmed' ? 'bg-green-100 text-green-700' :
                      item.completionStatus === 'Moved' || item.completionStatus === 'moved' ? 'bg-blue-100 text-blue-700' :
                      item.completionStatus === 'Approved' || item.completionStatus === 'approved' ? 'bg-orange-100 text-orange-700' :
                      item.completionStatus === 'completed' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    ]"
                  >
                    {{ item.completionStatus }}
                  </span>
                </td>
                <td class="px-4 py-4 text-sm">
                  <button 
                    @click="openViewDetailsModal(item, 'tracking')"
                    class="p-2 hover:bg-gray-100 rounded transition"
                  >
                    <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Complete Disposal Section -->
      <div class="bg-white rounded-lg shadow-sm mb-6">
        <div class="border-b border-gray-200 px-6 py-4">
          <div class="flex items-center gap-2">
            <h2 class="text-base font-medium text-gray-900">Complete Disposal</h2>
            <span class="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700 font-medium">
              {{ completeDisposalData.length }}
            </span>
          </div>
        </div>

        <div class="overflow-x-auto">
          <div v-if="loadingCompletedDisposal" class="flex items-center justify-center py-8">
            <svg class="animate-spin h-8 w-8 text-[#005B8F]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <div v-else-if="completeDisposalData.length === 0" class="px-6 py-8 text-center text-gray-500">
            No completed disposal requests
          </div>
          <table v-else class="w-full min-w-max">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Sample ID</th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Source Location</th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Destination Location</th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Requested Date</th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Approved Date</th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Requested By</th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Description</th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                <th class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100">
              <tr v-for="item in completeDisposalData" :key="item.id" class="hover:bg-gray-50">
                <td class="px-4 py-4 text-sm text-gray-900">{{ item.sampleId }}</td>
                <td class="px-4 py-4 text-sm text-gray-600">
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                    {{ item.sourceLocation }}
                  </div>
                </td>
                <td class="px-4 py-4 text-sm text-gray-600">
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                    {{ item.destinationLocation }}
                  </div>
                </td>
                <td class="px-4 py-4 text-sm text-gray-600">{{ item.requestedDate }}</td>
                <td class="px-4 py-4 text-sm text-gray-600">{{ item.approvedDate }}</td>
                <td class="px-4 py-4 text-sm text-gray-600">{{ item.requestedBy }}</td>
                <td class="px-4 py-4 text-sm text-gray-600">{{ item.description || 'N/A' }}</td>
                <td class="px-4 py-4 text-sm">
                  <span 
                    :class="[
                      'px-3 py-1 rounded-full text-xs font-medium',
                      item.completionStatus === 'Confirmed' || item.completionStatus === 'confirmed' ? 'bg-green-100 text-green-700' :
                      item.completionStatus === 'Moved' || item.completionStatus === 'moved' ? 'bg-blue-100 text-blue-700' :
                      item.completionStatus === 'Approved' || item.completionStatus === 'approved' ? 'bg-orange-100 text-orange-700' :
                      item.completionStatus === 'completed' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    ]"
                  >
                    {{ item.completionStatus }}
                  </span>
                </td>
                <td class="px-4 py-4 text-sm">
                  <button 
                    @click="openViewDetailsModal(item, 'disposal')"
                    class="p-2 hover:bg-gray-100 rounded transition"
                  >
                    <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
    </div>


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
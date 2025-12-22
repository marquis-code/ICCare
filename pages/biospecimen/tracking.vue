<template>
  <div class="min-h-screen">
    <div class="">
      <!-- Header -->
      <div class="mb-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 class="text-2xl font-bold text-gray-900">BioSpecimen Tracking</h1>
          
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
          
          <div class="flex items-end gap-2">
            <button
              @click="applyFilters"
              class="flex-1 px-4 py-2 bg-[#005B8F] text-white rounded hover:bg-[#004a73] transition text-sm font-medium"
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
                <th v-if="isCompletedTab" class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Description
                </th>
                <th v-if="isCompletedTab" class="px-4 py-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Status
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
                
                <!-- Description column for completed tabs -->
                <td v-if="isCompletedTab" class="px-4 py-6 text-sm text-gray-600">
                  {{ item.description || 'N/A' }}
                </td>
                
                <!-- Status column for completed tabs -->
                <td v-if="isCompletedTab" class="px-4 py-6 text-sm">
                  <span 
                    :class="[
                      'px-3 py-1 rounded-full text-xs font-medium',
                      item.completionStatus === 'Confirmed' ? 'bg-green-100 text-green-700' :
                      item.completionStatus === 'Moved' ? 'bg-blue-100 text-blue-700' :
                      item.completionStatus === 'Approved' ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-100 text-gray-700'
                    ]"
                  >
                    {{ item.completionStatus }}
                  </span>
                </td>
                
                <!-- Action column -->
                <td class="px-4 py-6 text-sm">
                  <!-- Pending tabs: Approve/Reject buttons -->
                  <div v-if="!isCompletedTab" class="flex gap-2">
                    <button 
                      @click="openRejectModal(item)"
                      class="px-3 py-1 text-xs border border-red-300 text-red-600 rounded hover:bg-red-50 transition"
                    >
                      Reject
                    </button>
                    <button 
                      @click="openApproveModal(item)"
                      class="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                    >
                      Approve
                    </button>
                  </div>
                  
                  <!-- Completed tabs: View Details button -->
                  <button 
                    v-else
                    @click="openViewDetailsModal(item)"
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
                  class="custom-input"
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
                class="px-6 py-3 bg-[#005B8F] text-sm text-white rounded-lg hover:bg-[#004a73] transition"
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
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005B8F] focus:border-transparent resize-none"
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
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005B8F] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Disposal Date</label>
                <input
                  v-model="disposalForm.date"
                  type="date"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005B8F] focus:border-transparent"
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
                class="px-6 py-2 bg-[#005B8F] text-white rounded hover:bg-[#004a73] transition"
              >
                Dispose BioSample
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
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        @click.self="closeViewDetailsModal"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <!-- Modal Header -->
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-blue-100 rounded-lg">
                  <svg class="w-6 h-6 text-[#005B8F]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h2 class="text-xl font-bold text-gray-900">Movement Details</h2>
                  <p class="text-sm text-gray-500">Complete information about the specimen movement</p>
                </div>
              </div>
              <button
                @click="closeViewDetailsModal"
                class="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Details Content -->
            <div v-if="selectedItem" class="space-y-6">
              <!-- Sample Information -->
              <div>
                <h3 class="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Sample Information</h3>
                <div class="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-medium text-gray-500 mb-1">Sample ID</label>
                    <p class="text-sm font-semibold text-gray-900">{{ selectedItem.sampleId }}</p>
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-500 mb-1">Status</label>
                    <span 
                      :class="[
                        'inline-block px-3 py-1 rounded-full text-xs font-medium',
                        selectedItem.completionStatus === 'Confirmed' ? 'bg-green-100 text-green-700' :
                        selectedItem.completionStatus === 'Moved' ? 'bg-blue-100 text-blue-700' :
                        selectedItem.completionStatus === 'Approved' ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-700'
                      ]"
                    >
                      {{ selectedItem.completionStatus }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Location Details -->
              <div>
                <h3 class="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Location Details</h3>
                <div class="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div class="flex items-start gap-3">
                    <div class="p-2 bg-white rounded-lg">
                      <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <label class="block text-xs font-medium text-gray-500 mb-1">Source Location</label>
                      <p class="text-sm text-gray-900">{{ selectedItem.sourceLocation }}</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-center">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>

                  <div class="flex items-start gap-3">
                    <div class="p-2 bg-white rounded-lg">
                      <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <label class="block text-xs font-medium text-gray-500 mb-1">Destination Location</label>
                      <p class="text-sm text-gray-900">{{ selectedItem.destinationLocation }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Timeline -->
              <div>
                <h3 class="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Timeline</h3>
                <div class="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-medium text-gray-500 mb-1">Requested Date</label>
                    <p class="text-sm text-gray-900">{{ selectedItem.requestedDate }}</p>
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-500 mb-1">Approved Date</label>
                    <p class="text-sm text-gray-900">{{ selectedItem.approvedDate }}</p>
                  </div>
                </div>
              </div>

              <!-- Personnel -->
              <div>
                <h3 class="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Personnel</h3>
                <div class="bg-gray-50 rounded-lg p-4">
                  <label class="block text-xs font-medium text-gray-500 mb-1">Requested By</label>
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-[#005B8F] rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      {{ getInitials(selectedItem.requestedBy) }}
                    </div>
                    <p class="text-sm text-gray-900">{{ selectedItem.requestedBy }}</p>
                  </div>
                </div>
              </div>

              <!-- Description -->
              <div v-if="selectedItem.description">
                <h3 class="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Description</h3>
                <div class="bg-gray-50 rounded-lg p-4">
                  <p class="text-sm text-gray-700 leading-relaxed">{{ selectedItem.description }}</p>
                </div>
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                @click="closeViewDetailsModal"
                class="px-6 py-2 bg-[#005B8F] text-white rounded-lg hover:bg-[#004a73] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>


        <!-- Approve Confirmation Modal -->
    <Teleport to="body">
      <div
        v-if="showApproveModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        @click.self="closeApproveModal"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div class="p-6">
            <!-- Icon -->
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <!-- Content -->
            <h2 class="text-xl font-bold text-gray-900 text-center mb-2">Approve Request</h2>
            <p class="text-sm text-gray-600 text-center mb-6">
              Are you sure you want to approve this {{ getRequestType }} request for sample <span class="font-semibold">{{ selectedItem?.sampleId }}</span>?
            </p>

            <!-- Sample Details -->
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

            <!-- Buttons -->
            <div class="flex gap-3">
              <button
                @click="closeApproveModal"
                class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
              <button
                @click="confirmApprove"
                class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
              >
                Approve
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
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        @click.self="closeRejectModal"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div class="p-6">
            <!-- Icon -->
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            <!-- Content -->
            <h2 class="text-xl font-bold text-gray-900 text-center mb-2">Reject Request</h2>
            <p class="text-sm text-gray-600 text-center mb-6">
              Are you sure you want to reject this {{ getRequestType }} request for sample <span class="font-semibold">{{ selectedItem?.sampleId }}</span>?
            </p>

            <!-- Sample Details -->
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

            <!-- Reason Input -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Reason for Rejection</label>
              <textarea
                v-model="rejectionReason"
                rows="3"
                placeholder="Please provide a reason for rejecting this request..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-sm"
              ></textarea>
            </div>

            <!-- Buttons -->
            <div class="flex gap-3">
              <button
                @click="closeRejectModal"
                class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
              <button
                @click="confirmReject"
                class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
              >
                Reject
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
  description?: string
  completionStatus?: 'Confirmed' | 'Moved' | 'Approved'
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
  { key: 'completeMovement', label: 'Complete Movement', count: 4 },
  { key: 'completeDisposal', label: 'Complete Disposal', count: 2 }
])

// Check if current tab is a completed tab
const isCompletedTab = computed(() => {
  return activeTab.value === 'completeMovement' || activeTab.value === 'completeDisposal'
})

// Computed property to get request type based on active tab
const getRequestType = computed(() => {
  return activeTab.value === 'pendingMovement' || activeTab.value === 'completeMovement' 
    ? 'movement' 
    : 'disposal'
})

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
    sampleId: 'MH-12343024',
    sourceLocation: 'Freezer 9-156, Rack 1A',
    destinationLocation: 'Freezer A-201, Rack 2-B',
    requestedDate: 'Jan 15, 2024, 09:30 AM',
    approvedDate: 'Jan 15, 2024, 09:30 AM',
    requestedBy: 'John Ramirez',
    status: 'pendingMovement'
  },
  {
    id: '3',
    sampleId: 'MH-12343025',
    sourceLocation: 'Freezer 9-156, Rack 1A',
    destinationLocation: 'Freezer A-201, Rack 2-B',
    requestedDate: 'Jan 15, 2024, 09:30 AM',
    approvedDate: 'Jan 15, 2024, 09:30 AM',
    requestedBy: 'John Ramirez',
    status: 'pendingMovement'
  },
  {
    id: '8',
    sampleId: 'MH-12343026',
    sourceLocation: 'Freezer 9-156, Rack 1A',
    destinationLocation: 'Biohazard Disposal Unit',
    requestedDate: 'Jan 16, 2024, 10:15 AM',
    approvedDate: 'Jan 16, 2024, 10:15 AM',
    requestedBy: 'Sarah Johnson',
    status: 'pendingDisposal'
  },
  {
    id: '9',
    sampleId: 'MH-12343027',
    sourceLocation: 'Freezer 8-105, Rack 3C',
    destinationLocation: 'Biohazard Disposal Unit',
    requestedDate: 'Jan 16, 2024, 11:00 AM',
    approvedDate: 'Jan 16, 2024, 11:00 AM',
    requestedBy: 'Mike Davis',
    status: 'pendingDisposal'
  },
  {
    id: '10',
    sampleId: 'MH-12343028',
    sourceLocation: 'Cold Storage Unit 5',
    destinationLocation: 'Biohazard Disposal Unit',
    requestedDate: 'Jan 16, 2024, 02:30 PM',
    approvedDate: 'Jan 16, 2024, 02:30 PM',
    requestedBy: 'Emily Chen',
    status: 'pendingDisposal'
  },
  {
    id: '4',
    sampleId: 'MH-2024-0023',
    sourceLocation: 'Freezer B-105, Rack 1-A',
    destinationLocation: 'Freezer A-301, Rack 2-B',
    requestedDate: 'Jan 15, 2024, 09:30 AM',
    approvedDate: 'Jan 15, 2024, 09:30 AM',
    requestedBy: 'John Romans',
    status: 'completeMovement',
    description: 'Clinical trial transfer',
    completionStatus: 'Confirmed'
  },
  {
    id: '5',
    sampleId: 'MH-2024-0024',
    sourceLocation: 'Freezer B-105, Rack 1-A',
    destinationLocation: 'Freezer A-301, Rack 2-B',
    requestedDate: 'Jan 15, 2024, 09:30 AM',
    approvedDate: 'Jan 15, 2024, 09:30 AM',
    requestedBy: 'John Romans',
    status: 'completeMovement',
    description: 'Department relocation',
    completionStatus: 'Moved'
  },
  {
    id: '6',
    sampleId: 'MH-2024-0025',
    sourceLocation: 'Freezer B-105, Rack 1-A',
    destinationLocation: 'Freezer A-301, Rack 2-B',
    requestedDate: 'Jan 15, 2024, 09:30 AM',
    approvedDate: 'Jan 15, 2024, 09:30 AM',
    requestedBy: 'John Romans',
    status: 'completeMovement',
    description: 'Research project transfer',
    completionStatus: 'Approved'
  },
  {
    id: '7',
    sampleId: 'MH-2024-0026',
    sourceLocation: 'Freezer B-105, Rack 1-A',
    destinationLocation: 'Freezer A-301, Rack 2-B',
    requestedDate: 'Jan 15, 2024, 09:30 AM',
    approvedDate: 'Jan 16, 2024, 02:15 PM',
    requestedBy: 'John Romans',
    status: 'completeMovement',
    description: 'Emergency relocation due to equipment maintenance',
    completionStatus: 'Moved'
  },
  {
    id: '11',
    sampleId: 'MH-2024-0027',
    sourceLocation: 'Freezer B-105, Rack 1-A',
    destinationLocation: 'Biohazard Disposal Unit',
    requestedDate: 'Jan 10, 2024, 09:00 AM',
    approvedDate: 'Jan 10, 2024, 10:00 AM',
    requestedBy: 'Dr. Amanda White',
    status: 'completeDisposal',
    description: 'Sample expired - standard disposal protocol',
    completionStatus: 'Confirmed'
  },
  {
    id: '12',
    sampleId: 'MH-2024-0028',
    sourceLocation: 'Cold Storage Unit 5',
    destinationLocation: 'Biohazard Disposal Unit',
    requestedDate: 'Jan 12, 2024, 02:00 PM',
    approvedDate: 'Jan 12, 2024, 03:30 PM',
    requestedBy: 'Dr. Robert Lee',
    status: 'completeDisposal',
    description: 'Contaminated sample - immediate disposal required',
    completionStatus: 'Confirmed'
  }
])

// Filtered data based on active tab
const filteredData = computed(() => {
  return sampleData.value.filter(item => item.status === activeTab.value)
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

const openViewDetailsModal = (item: BioSpecimen) => {
  selectedItem.value = item
  showViewDetailsModal.value = true
}

const closeViewDetailsModal = () => {
  showViewDetailsModal.value = false
  selectedItem.value = null
}

const openApproveModal = (item: BioSpecimen) => {
  selectedItem.value = item
  showApproveModal.value = true
}

const closeApproveModal = () => {
  showApproveModal.value = false
  selectedItem.value = null
}

const openRejectModal = (item: BioSpecimen) => {
  selectedItem.value = item
  showRejectModal.value = true
}

const closeRejectModal = () => {
  showRejectModal.value = false
  selectedItem.value = null
  rejectionReason.value = ''
}

const confirmApprove = () => {
  console.log('Approved item:', selectedItem.value)
  // Add your approval logic here
  // You might want to update the item status, make an API call, etc.
  closeApproveModal()
}

const confirmReject = () => {
  console.log('Rejected item:', selectedItem.value)
  console.log('Rejection reason:', rejectionReason.value)
  // Add your rejection logic here
  // You might want to update the item status, make an API call, etc.
  closeRejectModal()
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
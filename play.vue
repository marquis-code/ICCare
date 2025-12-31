<template>
  <div class="min-h-screen overflow-x-hidden bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 py-6">
      <!-- Header -->
      <div class="mb-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 class="text-2xl font-bold text-gray-900">BioSpecimen Tracking</h1>
          
          <div class="flex flex-wrap gap-2">
            <button
              @click="openRequestMovementModal"
              class="px-4 py-2.5 bg-[#005B8F] text-white rounded-lg hover:bg-[#004a73] transition flex items-center gap-2 text-sm font-medium shadow-sm"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              Request Movement
            </button>
            <button
              @click="openRequestDisposalModal"
              class="px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2 text-sm font-medium shadow-sm"
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
      <div class="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6 border border-gray-100">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <UiSelectInput 
            label="Status" 
            :options="statusOptions" 
            position="standalone" 
            v-model="filters.status"
          />
          <UiAnimatedInput label="Start date" type="date" v-model="filters.dateRange.from" />
          <UiAnimatedInput label="End date" type="date" v-model="filters.dateRange.to" />
        </div>
        <div class="flex gap-3">
          <button
            @click="applyFilters"
            :disabled="isLoadingAnyData"
            class="px-6 py-2 bg-[#005B8F] text-white rounded-lg hover:bg-[#004a73] transition text-sm font-medium disabled:opacity-50 shadow-sm"
          >
            {{ isLoadingAnyData ? 'Loading...' : 'Search' }}
          </button>
          <button
            @click="clearFilters"
            :disabled="isLoadingAnyData"
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium disabled:opacity-50"
          >
            Clear Filter
          </button>
        </div>
      </div>

      <!-- Tabs Section -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <!-- Tab Navigation -->
        <div class="border-b border-gray-200 bg-gray-50">
          <nav class="flex overflow-x-auto -mb-px scrollbar-hide" aria-label="Tabs">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                activeTab === tab.id
                  ? 'border-[#005B8F] text-[#005B8F] bg-white'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'group inline-flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm transition-all whitespace-nowrap'
              ]"
            >
              <component :is="tab.icon" :class="[
                activeTab === tab.id ? 'text-[#005B8F]' : 'text-gray-400 group-hover:text-gray-600',
                'w-5 h-5'
              ]" />
              <span>{{ tab.label }}</span>
              <span
                :class="[
                  activeTab === tab.id
                    ? 'bg-[#005B8F] text-white'
                    : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200',
                  'ml-2 py-0.5 px-2.5 rounded-full text-xs font-semibold transition-colors'
                ]"
              >
                {{ tab.count }}
              </span>
            </button>
          </nav>
        </div>

        <!-- Tab Content - Tables -->
        <div class="overflow-x-auto">
          <div v-if="activeTab === 'pendingMovement'" class="w-full">
            <div v-if="loadingPendingTracking" class="flex items-center justify-center py-16">
              <div class="text-center">
                <svg class="animate-spin h-10 w-10 text-[#005B8F] mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p class="text-sm text-gray-500">Loading pending movements...</p>
              </div>
            </div>
            <div v-else-if="pendingMovementData.length === 0" class="px-6 py-16 text-center">
              <svg class="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">No Pending Movements</h3>
              <p class="text-sm text-gray-500">All movement requests have been processed</p>
            </div>
            <div v-else class="inline-block min-w-full align-middle">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-3 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Sample ID</th>
                    <th class="px-3 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap min-w-[150px]">Source</th>
                    <th class="px-3 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap min-w-[150px]">Destination</th>
                    <th class="px-3 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Requested</th>
                    <th class="px-3 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Approved</th>
                    <th class="px-3 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">By</th>
                    <th class="px-3 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap sticky right-0 bg-gray-50 z-10">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-100">
                  <tr v-for="item in pendingMovementData" :key="item.id" class="hover:bg-gray-50 transition-colors">
                    <td class="px-3 py-3 text-sm text-gray-900 whitespace-nowrap font-medium">{{ item.sampleId }}</td>
                    <td class="px-3 py-3 text-sm text-gray-600">
                      <div class="flex items-center gap-1.5 max-w-[140px]">
                        <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                        </svg>
                        <span class="truncate text-xs" :title="item.sourceLocation">{{ item.sourceLocation }}</span>
                      </div>
                    </td>
                    <td class="px-3 py-3 text-sm text-gray-600">
                      <div class="flex items-center gap-1.5 max-w-[140px]">
                        <svg class="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                        </svg>
                        <span class="truncate text-xs" :title="item.destinationLocation">{{ item.destinationLocation }}</span>
                      </div>
                    </td>
                    <td class="px-3 py-3 text-xs text-gray-600 whitespace-nowrap">{{ item.requestedDate }}</td>
                    <td class="px-3 py-3 text-xs text-gray-600 whitespace-nowrap">{{ item.approvedDate }}</td>
                    <td class="px-3 py-3 text-xs text-gray-600 whitespace-nowrap">
                      <span class="truncate inline-block max-w-[80px]" :title="item.requestedBy">{{ item.requestedBy }}</span>
                    </td>
                    <td class="px-3 py-3 text-sm whitespace-nowrap sticky right-0 bg-white z-10">
                      <div class="flex gap-2">
                        <button 
                          @click="openRejectModal(item, 'tracking')"
                          class="px-3 py-1.5 text-xs border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition font-medium"
                        >
                          Reject
                        </button>
                        <button 
                          @click="openApproveModal(item, 'tracking')"
                          class="px-3 py-1.5 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
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

          <!-- Repeat similar structure for other tabs -->
          <div v-if="activeTab === 'completeMovement'" class="w-full">
            <!-- Complete Movement Content - Similar structure -->
          </div>

          <div v-if="activeTab === 'pendingDisposal'" class="w-full">
            <!-- Pending Disposal Content - Similar structure -->
          </div>

          <div v-if="activeTab === 'completeDisposal'" class="w-full">
            <!-- Complete Disposal Content - Similar structure -->
          </div>
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
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
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
    <Teleport to="body">
      <div
        v-if="showViewDetailsModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        @click.self="closeViewDetailsModal"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-blue-100 rounded-lg">
                  <svg class="w-6 h-6 text-[#005B8F]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h2 class="text-xl font-bold text-gray-900">{{ selectedType === 'tracking' ? 'Movement' : 'Disposal' }} Details</h2>
                  <p class="text-sm text-gray-500">Complete information about the specimen {{ selectedType }}</p>
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

            <div v-if="selectedItem" class="space-y-6">
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
                        selectedItem.completionStatus === 'Confirmed' || selectedItem.completionStatus === 'confirmed' ? 'bg-green-100 text-green-700' :
                        selectedItem.completionStatus === 'Moved' || selectedItem.completionStatus === 'moved' ? 'bg-blue-100 text-blue-700' :
                        selectedItem.completionStatus === 'Approved' || selectedItem.completionStatus === 'approved' ? 'bg-orange-100 text-orange-700' :
                        selectedItem.completionStatus === 'completed' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      ]"
                    >
                      {{ selectedItem.completionStatus }}
                    </span>
                  </div>
                </div>
              </div>

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

              <div v-if="selectedItem.description">
                <h3 class="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Description</h3>
                <div class="bg-gray-50 rounded-lg p-4">
                  <p class="text-sm text-gray-700 leading-relaxed">{{ selectedItem.description }}</p>
                </div>
              </div>
            </div>

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
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
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

    <!-- All modals remain the same -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, h } from 'vue'

// Icon components as functions
const ClockIcon = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' })
])

const CheckCircleIcon = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' })
])

const TrashIcon = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' })
])

const activeTab = ref('pendingMovement')

const tabs = computed(() => [
  { 
    id: 'pendingMovement', 
    label: 'Pending Movement', 
    icon: ClockIcon,
    count: pendingMovementData.value.length 
  },
  { 
    id: 'completeMovement', 
    label: 'Complete Movement', 
    icon: CheckCircleIcon,
    count: completeMovementData.value.length 
  },
  { 
    id: 'pendingDisposal', 
    label: 'Pending Disposal', 
    icon: TrashIcon,
    count: pendingDisposalData.value.length 
  },
  { 
    id: 'completeDisposal', 
    label: 'Complete Disposal', 
    icon: CheckCircleIcon,
    count: completeDisposalData.value.length 
  }
])

// Dummy data and composables - replace with your actual composables
const loadingPendingTracking = ref(false)
const pendingMovementData = ref([])
const completeMovementData = ref([])
const pendingDisposalData = ref([])
const completeDisposalData = ref([])

const isLoadingAnyData = computed(() => false)

const filters = ref({
  status: 'All Status',
  dateRange: { from: '', to: '' }
})

const statusOptions = ref([
  'All Status',
  'Pending Movement',
  'Pending Disposal',
  'Complete Movement',
  'Complete Disposal'
])

const openRequestMovementModal = () => {}
const openRequestDisposalModal = () => {}
const openRejectModal = () => {}
const openApproveModal = () => {}
const applyFilters = () => {}
const clearFilters = () => {}

definePageMeta({
  layout: 'dashboard'
})
</script>

<style scoped>
/* Hide scrollbar for tab navigation */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Ensure sticky columns work properly */
.sticky {
  position: sticky;
  z-index: 10;
}

/* Smooth transitions */
* {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>
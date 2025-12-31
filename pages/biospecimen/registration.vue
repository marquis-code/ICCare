<template>
  <div class="min-h-screen">
    <div class="flex container mx-auto min-h-screen">
      <!-- Main Content -->
      <main class="flex-1 p-4 md:p-6">
        <div class="mb-6 space-y-6">
          <!-- Page Header -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h1 class="text-2xl font-bold text-gray-900">BioSpecimen Registration</h1>
            <div class="flex gap-2">
              <!-- Download Dropdown -->
              <div class="relative" ref="downloadDropdownRef">
                <button @click.stop="showDownloadMenu = !showDownloadMenu" :disabled="!samples || samples.length === 0"
                  class="bg-white border-[0.5px] border-gray-100 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 justify-center shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                    <path
                      d="M248,128a87.34,87.34,0,0,1-17.6,52.81,8,8,0,1,1-12.8-9.62A71.34,71.34,0,0,0,232,128a72,72,0,0,0-144,0,8,8,0,0,1-16,0,88,88,0,0,1,3.29-23.88C74.2,104,73.1,104,72,104a48,48,0,0,0,0,96H96a8,8,0,0,1,0,16H72A64,64,0,1,1,81.29,88.68,88,88,0,0,1,248,128Zm-69.66,42.34L160,188.69V128a8,8,0,0,0-16,0v60.69l-18.34-18.35a8,8,0,0,0-11.32,11.32l32,32a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Z">
                    </path>
                  </svg>
                  <span class="font-medium">Download</span>
                </button>

                <!-- Dropdown Menu -->
                <Transition name="fade">
                  <div v-if="showDownloadMenu" v-click-outside="closeDownloadMenu" @click.stop
                    class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                    <button @click="downloadData('csv')"
                      class="w-full text-left px-4 py-2 hover:bg-gray-25 flex items-center gap-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000"
                        viewBox="0 0 256 256">
                        <path
                          d="M48,180c0,11,7.18,20,16,20a14.24,14.24,0,0,0,10.22-4.66A8,8,0,0,1,85.78,206.4,30.06,30.06,0,0,1,64,216c-17.65,0-32-16.15-32-36s14.35-36,32-36a30.06,30.06,0,0,1,21.78,9.6,8,8,0,0,1-11.56,11.06A14.24,14.24,0,0,0,64,160C55.18,160,48,169,48,180Zm79.6-8.69c-4-1.16-8.14-2.35-10.45-3.84-1.25-.81-1.23-1-1.12-1.9a4.57,4.57,0,0,1,2-3.67c4.6-3.12,15.34-1.73,19.82-.56A8,8,0,0,0,142,145.86c-2.12-.55-21-5.22-32.84,2.76a20.58,20.58,0,0,0-9,14.95c-2,15.88,13.65,20.41,23,23.11,12.06,3.49,13.12,4.92,12.78,7.59-.31,2.41-1.26,3.34-2.14,3.93-4.6,3.06-15.17,1.56-19.55.36A8,8,0,0,0,109.94,214a61.34,61.34,0,0,0,15.19,2c5.82,0,12.3-1,17.49-4.46a20.82,20.82,0,0,0,9.19-15.23C154,179,137.49,174.17,127.6,171.31Zm83.09-26.84a8,8,0,0,0-10.23,4.84L188,184.21l-12.47-34.9a8,8,0,0,0-15.07,5.38l20,56a8,8,0,0,0,15.07,0l20-56A8,8,0,0,0,210.69,144.47ZM216,88v24a8,8,0,0,1-16,0V96H152a8,8,0,0,1-8-8V40H56v72a8,8,0,0,1-16,0V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88Zm-27.31-8L160,51.31V80Z">
                        </path>
                      </svg>
                      Download as CSV
                    </button>
                    <button @click="downloadData('excel')"
                      class="w-full text-left px-4 py-2 hover:bg-gray-25 flex items-center gap-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000"
                        viewBox="0 0 256 256">
                        <path
                          d="M156,208a8,8,0,0,1-8,8H120a8,8,0,0,1-8-8V152a8,8,0,0,1,16,0v48h20A8,8,0,0,1,156,208ZM92.65,145.49a8,8,0,0,0-11.16,1.86L68,166.24,54.51,147.35a8,8,0,1,0-13,9.3L58.17,180,41.49,203.35a8,8,0,0,0,13,9.3L68,193.76l13.49,18.89a8,8,0,0,0,13-9.3L77.83,180l16.68-23.35A8,8,0,0,0,92.65,145.49Zm98.94,25.82c-4-1.16-8.14-2.35-10.45-3.84-1.25-.82-1.23-1-1.12-1.9a4.54,4.54,0,0,1,2-3.67c4.6-3.12,15.34-1.72,19.82-.56a8,8,0,0,0,4.07-15.48c-2.11-.55-21-5.22-32.83,2.76a20.58,20.58,0,0,0-8.95,14.95c-2,15.88,13.65,20.41,23,23.11,12.06,3.49,13.12,4.92,12.78,7.59-.31,2.41-1.26,3.33-2.15,3.93-4.6,3.06-15.16,1.55-19.54.35A8,8,0,0,0,173.93,214a60.63,60.63,0,0,0,15.19,2c5.82,0,12.3-1,17.49-4.46a20.81,20.81,0,0,0,9.18-15.23C218,179,201.48,174.17,191.59,171.31ZM40,112V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88v24a8,8,0,1,1-16,0V96H152a8,8,0,0,1-8-8V40H56v72a8,8,0,0,1-16,0ZM160,80h28.68L160,51.31Z">
                        </path>
                      </svg>
                      Download as Excel
                    </button>
                    <button @click="downloadData('json')"
                      class="w-full text-left px-4 py-2 hover:bg-gray-25 flex items-center gap-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000"
                        viewBox="0 0 256 256">
                        <path
                          d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40v72a8,8,0,0,0,16,0V40h88V88a8,8,0,0,0,8,8h48V216H176a8,8,0,0,0,0,16h24a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160Zm-12.19,145a20.82,20.82,0,0,1-9.19,15.23C133.43,215,127,216,121.13,216a61.34,61.34,0,0,1-15.19-2,8,8,0,0,1,4.31-15.41c4.38,1.2,15,2.7,19.55-.36.88-.59,1.83-1.52,2.14-3.93.34-2.67-.71-4.1-12.78-7.59-9.35-2.7-25-7.23-23-23.11a20.56,20.56,0,0,1,9-14.95c11.84-8,30.71-3.31,32.83-2.76a8,8,0,0,1-4.07,15.48c-4.49-1.17-15.23-2.56-19.83.56a4.54,4.54,0,0,0-2,3.67c-.12.9-.14,1.09,1.11,1.9,2.31,1.49,6.45,2.68,10.45,3.84C133.49,174.17,150.05,179,147.81,196.31ZM80,152v38a26,26,0,0,1-52,0,8,8,0,0,1,16,0,10,10,0,0,0,20,0V152a8,8,0,0,1,16,0Z">
                        </path>
                      </svg>
                      Download as JSON
                    </button>
                  </div>
                </Transition>
              </div>

              <button @click="openNewSpecimenModal"
                class="bg-[#005B8F] text-white px-4 py-2.5 rounded-lg hover:bg-[#004a73] transition-colors flex items-center gap-2 justify-center shadow-sm">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span class="font-medium">Register Biospecimen</span>
              </button>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005B8F]"></div>
          </div>

          <template v-else>
            <!-- Filters Section -->
            <section class="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
              <!-- Type Filter -->
              <div class="md:col-span-2">
                <UiSelectInput label="All Types" :options="typeOptions" position="standalone" v-model="filters.type" />
              </div>

              <!-- Location Filter -->
              <div class="md:col-span-2">
                <UiSelectInput label="All Sites" :options="siteOptions" position="standalone" v-model="filters.site" />
              </div>

              <!-- Status Filter -->
              <div class="md:col-span-2">
                <UiSelectInput label="All Status" :options="statusOptions" position="standalone"
                  v-model="filters.status" />
              </div>

              <!-- Search Input -->
              <div class="md:col-span-3">
                <!-- <label class="block text-sm font-medium text-gray-700 mb-1">Filter Table</label> -->
                <UiAnimatedInput v-model="filterText" type="text" label="Filter Table" />
              </div>

              <!-- Action Buttons -->
              <div class="md:col-span-3 flex gap-2">
                <button @click="applyFilters"
                  class="flex-1 bg-[#005B8F] text-white px-6 py-2.5 rounded-lg hover:bg-[#004a73] transition-colors text-sm font-medium shadow-sm">
                  Search
                </button>
                <button @click="clearFilters"
                  class="flex-1 border border-[#005B8F] text-[#005B8F] px-6 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                  Clear Filter
                </button>
              </div>
            </section>

            <!-- Empty State - No Specimens Available -->
            <div v-if="!samples || samples.length === 0"
              class="bg-white rounded-lg shadow-sm border border-gray-100 p-12">
              <div class="text-center">
                <svg class="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">No BioSpecimens Available</h3>
                <p class="text-gray-500 mb-6">Get started by registering your first biospecimen</p>
                <button @click="openNewSpecimenModal"
                  class="bg-[#005B8F] text-white px-6 py-3 rounded-lg hover:bg-[#004a73] transition-colors inline-flex items-center gap-2 shadow-sm">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <span class="font-medium">Register First Biospecimen</span>
                </button>
              </div>
            </div>

            <!-- Main Tracking Table -->
             <!-- Main Tracking Table -->
            <div v-else class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
              <div class="overflow-x-auto w-full">
                <div class="inline-block min-w-full align-middle">
                  <div class="overflow-hidden">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-25 border-b border-gray-200">
                        <tr>
                          <th class="px-3 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                            SN
                          </th>
                          <th class="px-3 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap min-w-[140px]">
                            Sample Serial No
                          </th>
                          <th class="px-3 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap min-w-[150px]">
                            Sample Label
                          </th>
                          <th class="px-3 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap min-w-[200px]">
                            Storage Location
                          </th>
                          <th class="px-3 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                            Type
                          </th>
                          <th class="px-3 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap min-w-[120px]">
                            Collection Date
                          </th>
                          <th class="px-3 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap min-w-[120px]">
                            Field Collector
                          </th>
                          <th class="px-3 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap min-w-[120px]">
                            Researcher
                          </th>
                          <th class="px-3 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                            Status
                          </th>
                          <th class="px-3 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap sticky right-0 bg-gray-25">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-100 bg-white">
                        <tr v-for="(specimen, index) in paginatedSpecimens" :key="specimen.uuid"
                          class="hover:bg-gray-25 transition">
                          <td class="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                            {{ (currentPage - 1) * pageSize + index + 1 }}
                          </td>
                          <td class="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                            <div class="flex items-center gap-2">
                              <span class="font-medium truncate max-w-[120px]" :title="specimen.sample_serial_no">
                                {{ specimen.sample_serial_no || 'N/A' }}
                              </span>
                              <button v-if="specimen.sample_serial_no" @click="copyToClipboard(specimen.sample_serial_no)"
                                class="text-gray-400 hover:text-gray-600 transition flex-shrink-0" title="Copy to clipboard">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              </button>
                            </div>
                          </td>
                          <td class="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                            <span class="font-medium truncate max-w-[130px] inline-block" :title="specimen.sample_label">
                              {{ specimen.sample_label || 'N/A' }}
                            </span>
                          </td>
                          <td class="px-3 py-4 text-sm text-gray-700">
                            <div class="flex items-center gap-2 max-w-[200px]">
                              <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                  clip-rule="evenodd" />
                              </svg>
                              <span class="text-xs truncate" :title="formatStorageLocation(specimen.storage_location)">
                                {{ formatStorageLocation(specimen.storage_location) }}
                              </span>
                            </div>
                          </td>
                          <td class="px-3 py-4 text-sm whitespace-nowrap">
                            <span :class="getTypeClass(specimen.sample_category_id)"
                              class="inline-flex px-2 py-1 rounded-full text-xs font-medium">
                              {{ specimen.sample_category_id || 'N/A' }}
                            </span>
                          </td>
                          <td class="px-3 py-4 text-sm text-gray-700 whitespace-nowrap">
                            <div class="flex flex-col">
                              <span>{{ formatDate(specimen.collection_date) }}</span>
                              <span v-if="specimen.collection_time" class="text-xs text-gray-500">
                                {{ specimen.collection_time }}
                              </span>
                            </div>
                          </td>
                          <td class="px-3 py-4 text-sm text-gray-700 whitespace-nowrap">
                            <span class="truncate max-w-[100px] inline-block" :title="specimen.field_collector_info">
                              {{ specimen.field_collector_info || 'N/A' }}
                            </span>
                          </td>
                          <td class="px-3 py-4 text-sm text-gray-700 whitespace-nowrap">
                            <span class="truncate max-w-[100px] inline-block" :title="specimen.researcher_info">
                              {{ specimen.researcher_info || 'N/A' }}
                            </span>
                          </td>
                          <td class="px-3 py-4 text-sm whitespace-nowrap">
                            <span :class="getStatusClass(specimen.status)"
                              class="inline-flex px-2 py-1 rounded-full text-xs font-medium">
                              {{ specimen.status || 'N/A' }}
                            </span>
                          </td>
                          <td class="px-3 py-4 text-sm whitespace-nowrap sticky right-0 bg-white">
                            <div class="flex items-center gap-2">
                              <button @click="openDetailsModal(specimen)"
                                class="p-2 hover:bg-gray-100 rounded-lg transition" title="View details">
                                <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                  <path fill-rule="evenodd"
                                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                    clip-rule="evenodd" />
                                </svg>
                              </button>
                              <button @click="openEditModal(specimen)" class="p-2 hover:bg-blue-50 rounded-lg transition"
                                title="Edit specimen">
                                <svg class="w-5 h-5 text-[#005B8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr v-if="filteredSpecimens.length === 0">
                          <td colspan="10" class="px-4 py-12 text-center">
                            <svg class="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <p class="text-gray-500 text-sm font-medium mb-2">No specimens match your filters</p>
                            <p class="text-gray-400 text-xs mb-4">Try adjusting your search criteria</p>
                            <button @click="clearFilters" class="text-[#005B8F] hover:text-[#004a73] font-medium text-sm">
                              Clear all filters
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </main>
    </div>

    <!-- Modals -->
    <BiospecimenNewSpecimenModal v-model="showNewSpecimenModal" :editData="editingSpecimen"
      @saved="handleSpecimenSaved" />
    <BiospecimenDetailsModal v-model="showDetailsModal" :specimen="selectedSpecimen" />

    <!-- Toast Notification -->
    <Transition name="fade">
      <div v-if="showToast"
        class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd" />
        </svg>
        <span>{{ toastMessage }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useGetAllSamples } from "@/composables/modules/biosample/useGetAllSamples";
import { useGetCategories } from "@/composables/modules/category/useGetCategories"
import { useGetSites } from "@/composables/modules/sites/useGetSites"
interface StorageLocation {
  site: string;
  freezer: string;
  rack: string;
  box: string;
  position: number;
}

interface BioSpecimen {
  site_id: string;
  sample_category_id: string;
  sample_serial_no: string;
  sample_label: string;
  free_fields: Record<string, any>;
  uuid: string;
  storage_location: StorageLocation;
  collection_date: string;
  collection_time: string | null;
  researcher_info: string;
  field_collector_info: string;
  barcode_qr_code: string | null;
  system_date_time: string;
  status: string;
}

// Composables
const { samples, loading } = useGetAllSamples();
const { loading: loadingSites, sites, getSites } = useGetSites()
const { loading: fetchingCategories, categories, getCategories } = useGetCategories()
// Add this to your refs section
const downloadDropdownRef = ref<HTMLElement | null>(null);

// State
const filterText = ref('');
const filters = ref({
  type: 'All Types',
  site: 'All Sites',
  status: 'All Status'
});

const showNewSpecimenModal = ref(false);
const showDetailsModal = ref(false);
const showDownloadMenu = ref(false);
const selectedSpecimen = ref<BioSpecimen | null>(null);
const editingSpecimen = ref<BioSpecimen | null>(null);
const showToast = ref(false);
const toastMessage = ref('');

// Pagination State
const currentPage = ref(1);
const pageSize = ref(10);

// // Click outside directive
// const vClickOutside = {
//   mounted(el: any, binding: any) {
//     el.clickOutsideEvent = (event: Event) => {
//       if (!(el === event.target || el.contains(event.target))) {
//         binding.value();
//       }
//     };
//     document.addEventListener('click', el.clickOutsideEvent);
//   },
//   unmounted(el: any) {
//     document.removeEventListener('click', el.clickOutsideEvent);
//   }
// };

// Add this after your composable declarations
onMounted(async () => {
  await getSites();
  await getCategories();
});

// Update the v-click-outside directive implementation
const vClickOutside = {
  mounted(el: any, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      // Check if the click is outside the element
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    // Use setTimeout to ensure the directive is set up after the current event loop
    setTimeout(() => {
      document.addEventListener('click', el.clickOutsideEvent);
    }, 0);
  },
  unmounted(el: any) {
    document.removeEventListener('click', el.clickOutsideEvent);
  }
};

const closeDownloadMenu = () => {
  showDownloadMenu.value = false;
};

// // Filter Options - Dynamically generated from data
// const typeOptions = computed(() => {
//   const types = new Set(['All Types']);
//   if (samples.value) {
//     samples.value.forEach((sample: BioSpecimen) => {
//       if (sample.sample_category_id) {
//         types.add(sample.sample_category_id);
//       }
//     });
//   }
//   return Array.from(types);
// });

// const siteOptions = computed(() => {
//   const sites = new Set(['All Sites']);
//   if (samples.value) {
//     samples.value.forEach((sample: BioSpecimen) => {
//       if (sample.site_id) {
//         sites.add(sample.site_id);
//       }
//     });
//   }
//   return Array.from(sites);
// });

// Filter Options - From composables
const typeOptions = computed(() => {
  if (!categories.value || categories.value.length === 0) return ['All Types'];
  return ['All Types', ...categories.value.map((cat: any) => cat.cat_name)];
});

const siteOptions = computed(() => {
  if (!sites.value || sites.value.length === 0) return ['All Sites'];
  return ['All Sites', ...sites.value.map((site: any) => site.site_name)];
});



const statusOptions = computed(() => {
  const statuses = new Set(['All Status']);
  if (samples.value) {
    samples.value.forEach((sample: BioSpecimen) => {
      if (sample.status) {
        statuses.add(sample.status);
      }
    });
  }
  return Array.from(statuses);
});

// Computed filtered specimens
const filteredSpecimens = computed(() => {
  if (!samples.value) return [];

  let filtered = [...samples.value];

  // Filter by search text
  if (filterText.value) {
    const search = filterText.value.toLowerCase();
    filtered = filtered.filter((s: BioSpecimen) =>
      s.sample_serial_no?.toLowerCase().includes(search) ||
      s.sample_label?.toLowerCase().includes(search) ||
      s.field_collector_info?.toLowerCase().includes(search) ||
      s.researcher_info?.toLowerCase().includes(search) ||
      s.sample_category_id?.toLowerCase().includes(search) ||
      s.site_id?.toLowerCase().includes(search)
    );
  }

  // Filter by type
  if (filters.value.type && filters.value.type !== 'All Types') {
    filtered = filtered.filter((s: BioSpecimen) => s.sample_category_id === filters.value.type);
  }

  // Filter by site
  if (filters.value.site && filters.value.site !== 'All Sites') {
    filtered = filtered.filter((s: BioSpecimen) => s.site_id === filters.value.site);
  }

  // Filter by status
  if (filters.value.status && filters.value.status !== 'All Status') {
    filtered = filtered.filter((s: BioSpecimen) => s.status === filters.value.status);
  }

  return filtered;
});

// Pagination Computed Properties
const totalPages = computed(() => {
  return Math.ceil(filteredSpecimens.value.length / pageSize.value);
});

const startIndex = computed(() => {
  return (currentPage.value - 1) * pageSize.value;
});

const endIndex = computed(() => {
  return startIndex.value + pageSize.value;
});

const paginatedSpecimens = computed(() => {
  return filteredSpecimens.value.slice(startIndex.value, endIndex.value);
});

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

// Methods
const formatStorageLocation = (location: StorageLocation | null): string => {
  if (!location) return 'N/A';

  const parts = [];
  if (location.site) parts.push(`Site: ${location.site}`);
  if (location.freezer) parts.push(`Freezer: ${location.freezer}`);
  if (location.rack) parts.push(`Rack: ${location.rack}`);
  if (location.box) parts.push(`Box: ${location.box}`);
  if (location.position) parts.push(`Pos: ${location.position}`);

  return parts.length > 0 ? parts.join(' | ') : 'N/A';
};

const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'N/A';

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
};

const getTypeClass = (type: string): string => {
  const classes: Record<string, string> = {
    'BLOOD': 'bg-red-100 text-red-700',
    'SERUM': 'bg-green-100 text-green-700',
    'PLASMA': 'bg-blue-100 text-blue-700',
    'TISSUE': 'bg-orange-100 text-orange-700',
    'DNA': 'bg-pink-100 text-pink-700',
    'RNA': 'bg-purple-100 text-purple-700',
    'URINE': 'bg-yellow-100 text-yellow-700',
    'SALIVA': 'bg-cyan-100 text-cyan-700'
  };
  return classes[type?.toUpperCase()] || 'bg-gray-100 text-gray-700';
};

const getStatusClass = (status: string): string => {
  const classes: Record<string, string> = {
    'Active': 'bg-green-100 text-green-700',
    'Stored': 'bg-blue-100 text-blue-700',
    'In Transit': 'bg-yellow-100 text-yellow-700',
    'Disposed': 'bg-red-100 text-red-700',
    'Reserved': 'bg-purple-100 text-purple-700',
    'Quarantine': 'bg-orange-100 text-orange-700'
  };
  return classes[status] || 'bg-gray-100 text-gray-700';
};

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toastMessage.value = 'Copied to clipboard!';
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 3000);
  } catch (err) {
    console.error('Failed to copy:', err);
    toastMessage.value = 'Failed to copy';
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 3000);
  }
};

const applyFilters = () => {
  console.log('Applying filters:', filters.value);
  currentPage.value = 1;
};

const clearFilters = () => {
  filterText.value = '';
  filters.value = {
    type: 'All Types',
    site: 'All Sites',
    status: 'All Status'
  };
  currentPage.value = 1;
};

const openNewSpecimenModal = () => {
  editingSpecimen.value = null;
  showNewSpecimenModal.value = true;
};

const openEditModal = (specimen: BioSpecimen) => {
  editingSpecimen.value = specimen;
  showNewSpecimenModal.value = true;
};

const openDetailsModal = (specimen: BioSpecimen) => {
  selectedSpecimen.value = specimen;
  showDetailsModal.value = true;
};

const handleSpecimenSaved = async (data: any) => {
  console.log('Specimen saved:', data);
  toastMessage.value = editingSpecimen.value ? 'Specimen updated successfully!' : 'Specimen saved successfully!';
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
  editingSpecimen.value = null;
};

// Download functionality
const downloadData = (format: 'csv' | 'excel' | 'json') => {
  showDownloadMenu.value = false;

  if (!filteredSpecimens.value || filteredSpecimens.value.length === 0) {
    toastMessage.value = 'No data to download';
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 3000);
    return;
  }

  if (format === 'csv') {
    downloadAsCSV();
  } else if (format === 'excel') {
    downloadAsExcel();
  } else if (format === 'json') {
    downloadAsJSON();
  }
};

const downloadAsCSV = () => {
  const headers = [
    'Sample Serial No',
    'Sample Label',
    'Site',
    'Type',
    'Collection Date',
    'Collection Time',
    'Field Collector',
    'Researcher',
    'Status',
    'Storage Site',
    'Freezer',
    'Rack',
    'Box',
    'Position'
  ];

  const rows = filteredSpecimens.value.map((specimen: BioSpecimen) => [
    specimen.sample_serial_no || '',
    specimen.sample_label || '',
    specimen.site_id || '',
    specimen.sample_category_id || '',
    specimen.collection_date || '',
    specimen.collection_time || '',
    specimen.field_collector_info || '',
    specimen.researcher_info || '',
    specimen.status || '',
    specimen.storage_location?.site || '',
    specimen.storage_location?.freezer || '',
    specimen.storage_location?.rack || '',
    specimen.storage_location?.box || '',
    specimen.storage_location?.position || ''
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `biospecimens_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();

  toastMessage.value = 'Downloaded as CSV';
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

const downloadAsExcel = () => {
  // Create a simple HTML table that Excel can read
  const headers = [
    'Sample Serial No',
    'Sample Label',
    'Site',
    'Type',
    'Collection Date',
    'Collection Time',
    'Field Collector',
    'Researcher',
    'Status',
    'Storage Site',
    'Freezer',
    'Rack',
    'Box',
    'Position'
  ];

  let excelContent = '<table><thead><tr>';
  headers.forEach(header => {
    excelContent += `<th>${header}</th>`;
  });
  excelContent += '</tr></thead><tbody>';

  filteredSpecimens.value.forEach((specimen: BioSpecimen) => {
    excelContent += '<tr>';
    excelContent += `<td>${specimen.sample_serial_no || ''}</td>`;
    excelContent += `<td>${specimen.sample_label || ''}</td>`;
    excelContent += `<td>${specimen.site_id || ''}</td>`;
    excelContent += `<td>${specimen.sample_category_id || ''}</td>`;
    excelContent += `<td>${specimen.collection_date || ''}</td>`;
    excelContent += `<td>${specimen.collection_time || ''}</td>`;
    excelContent += `<td>${specimen.field_collector_info || ''}</td>`;
    excelContent += `<td>${specimen.researcher_info || ''}</td>`;
    excelContent += `<td>${specimen.status || ''}</td>`;
    excelContent += `<td>${specimen.storage_location?.site || ''}</td>`;
    excelContent += `<td>${specimen.storage_location?.freezer || ''}</td>`;
    excelContent += `<td>${specimen.storage_location?.rack || ''}</td>`;
    excelContent += `<td>${specimen.storage_location?.box || ''}</td>`;
    excelContent += `<td>${specimen.storage_location?.position || ''}</td>`;
    excelContent += '</tr>';
  });

  excelContent += '</tbody></table>';

  const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `biospecimens_${new Date().toISOString().split('T')[0]}.xls`;
  link.click();

  toastMessage.value = 'Downloaded as Excel';
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

const downloadAsJSON = () => {
  const jsonContent = JSON.stringify(filteredSpecimens.value, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `biospecimens_${new Date().toISOString().split('T')[0]}.json`;
  link.click();

  toastMessage.value = 'Downloaded as JSON';
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

// Pagination Methods
const handlePageSizeChange = () => {
  currentPage.value = 1;
};

const goToFirstPage = () => {
  currentPage.value = 1;
};

const goToLastPage = () => {
  currentPage.value = totalPages.value;
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToPage = (page: number) => {
  currentPage.value = page;
};

definePageMeta({
  layout: 'dashboard'
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Ensure table doesn't cause horizontal scroll */
table {
  table-layout: auto;
}

/* Make sure the sticky column works properly */
.sticky {
  position: sticky;
  z-index: 10;
}

/* Prevent body overflow */
body {
  overflow-x: hidden;
}
</style>
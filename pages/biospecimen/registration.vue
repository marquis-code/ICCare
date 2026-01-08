<template>
  <div class="min-h-screen ">
    <div class="">
      <!-- Page Header -->
      <div class="flex flex-col px-6 md:flex-row md:items-center py-6 rounded-xl bg-[#DCF1FF] text-[#005B8F] justify-between gap-4 mb-6">
        <h1 class="text-xl font-semibold bg-[#DCF1FF] text-[#005B8F]">BioSpecimen Registration</h1>
        <div class="flex gap-2">
          <!-- Download Dropdown -->
          <div class="relative" ref="downloadDropdownRef">
            <button @click.stop="showDownloadMenu = !showDownloadMenu" :disabled="!samples || samples.length === 0"
              class="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 256 256">
                <path d="M248,128a87.34,87.34,0,0,1-17.6,52.81,8,8,0,1,1-12.8-9.62A71.34,71.34,0,0,0,232,128a72,72,0,0,0-144,0,8,8,0,0,1-16,0,88,88,0,0,1,3.29-23.88C74.2,104,73.1,104,72,104a48,48,0,0,0,0,96H96a8,8,0,0,1,0,16H72A64,64,0,1,1,81.29,88.68,88,88,0,0,1,248,128Zm-69.66,42.34L160,188.69V128a8,8,0,0,0-16,0v60.69l-18.34-18.35a8,8,0,0,0-11.32,11.32l32,32a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Z" />
              </svg>
              <span class="font-medium">Download</span>
            </button>

            <Transition name="fade">
              <div v-if="showDownloadMenu" v-click-outside="closeDownloadMenu"
                class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button @click="downloadData('csv')"
                  class="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 text-sm transition-colors">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M48,180c0,11,7.18,20,16,20a14.24,14.24,0,0,0,10.22-4.66A8,8,0,0,1,85.78,206.4,30.06,30.06,0,0,1,64,216c-17.65,0-32-16.15-32-36s14.35-36,32-36a30.06,30.06,0,0,1,21.78,9.6,8,8,0,0,1-11.56,11.06A14.24,14.24,0,0,0,64,160C55.18,160,48,169,48,180Z" />
                  </svg>
                  <span>Download as CSV</span>
                </button>
                <button @click="downloadData('excel')"
                  class="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 text-sm transition-colors">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M156,208a8,8,0,0,1-8,8H120a8,8,0,0,1-8-8V152a8,8,0,0,1,16,0v48h20A8,8,0,0,1,156,208Z" />
                  </svg>
                  <span>Download as Excel</span>
                </button>
                <button @click="downloadData('json')"
                  class="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 text-sm transition-colors">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40v72a8,8,0,0,0,16,0V40h88V88a8,8,0,0,0,8,8h48V216H176a8,8,0,0,0,0,16h24a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34Z" />
                  </svg>
                  <span>Download as JSON</span>
                </button>
              </div>
            </Transition>
          </div>

          <button @click="openNewSpecimenModal"
            class=" px-4 py-2.5 rounded-lg text-[#DCF1FF] bg-[#005B8F] transition-colors flex items-center gap-2 shadow-sm">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 18 16">
              <path d="M3.01562 0C1.9125 0 1.01562 0.896875 1.01562 2V14C1.01562 15.1031 1.9125 16 3.01562 16H11.0156C12.1187 16 13.0156 15.1031 13.0156 14V11H15.4563L14.4875 11.9688C14.1938 12.2625 14.1938 12.7375 14.4875 13.0281C14.7812 13.3187 15.2563 13.3219 15.5469 13.0281L17.7969 10.7781C18.0906 10.4844 18.0906 10.0094 17.7969 9.71875L15.5469 7.46875C15.2531 7.175 14.7781 7.175 14.4875 7.46875C14.1969 7.7625 14.1938 8.2375 14.4875 8.52812L15.4563 9.49687H13.0156V5.325C13.0156 4.79375 12.8062 4.28438 12.4312 3.90937L9.1 0.584375C8.725 0.209375 8.21875 0 7.6875 0H3.01562Z" />
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
        <section class="grid grid-cols-1 md:grid-cols-12 gap-3 items-end mb-6">
          <div class="md:col-span-2">
            <UiSelectInput label="All Types" :options="typeOptions" position="standalone" v-model="filters.type" />
          </div>
          <div class="md:col-span-2">
            <UiSelectInput label="All Sites" :options="siteOptions" position="standalone" v-model="filters.site" />
          </div>
          <div class="md:col-span-2">
            <UiSelectInput label="All Status" :options="statusOptions" position="standalone" v-model="filters.status" />
          </div>
          <div class="md:col-span-3">
            <UiAnimatedInput v-model="filterText" type="text" label="Filter Table" />
          </div>
          <div class="md:col-span-3 flex gap-2">
            <button @click="applyFilters"
              class="flex-1 bg-[#005B8F] text-white px-6 py-2.5 rounded-lg hover:bg-[#004a73] transition-colors text-sm font-medium">
              Search
            </button>
            <button @click="clearFilters"
              class="flex-1 border border-[#005B8F] text-[#005B8F] px-6 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
              Clear Filter
            </button>
          </div>
        </section>

        <!-- Empty State -->
        <div v-if="!samples || samples.length === 0" class="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
          <div class="text-center">
            <svg class="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">No BioSpecimens Available</h3>
            <p class="text-gray-500 mb-6">Get started by registering your first biospecimen</p>
            <button @click="openNewSpecimenModal"
              class="bg-[#005B8F] text-white px-6 py-3 rounded-lg hover:bg-[#004a73] transition-colors inline-flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <span class="font-medium">Register First Biospecimen</span>
            </button>
          </div>
        </div>

        <!-- Table -->
        <div v-else class="bg-white rounded-lg shadow-sm border-[0.5px] border-gray-100 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y-[0.5px] divide-gray-100">
              <thead class="bg-gray-25">
                <tr>
                  <th scope="col" class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">SN</th>
                  <th scope="col" class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Sample Serial No</th>
                  <th scope="col" class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Sample Label</th>
                  <th scope="col" class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Storage Location</th>
                  <th scope="col" class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Type</th>
                  <th scope="col" class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Collection Date</th>
                  <th scope="col" class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Field Collector</th>
                  <th scope="col" class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Researcher</th>
                  <th scope="col" class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                  <th scope="col" class="px-6 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap sticky right-0 bg-gray-50">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y-[0.5px] divide-gray-100">
                <tr v-for="(specimen, index) in paginatedItems" :key="specimen.uuid" class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-900">
                    {{ (currentPage - 1) * pageSize + index + 1 }}
                  </td>
                  <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-900">
                    <div class="flex items-center gap-2">
                      <span class="font-medium max-w-[150px] truncate" :title="specimen.sample_serial_no">
                        {{ specimen.sample_serial_no || 'N/A' }}
                      </span>
                      <button v-if="specimen.sample_serial_no" @click="copyToClipboard(specimen.sample_serial_no)"
                        class="text-gray-400 hover:text-gray-600 transition flex-shrink-0" title="Copy">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-900">
                    <span class="font-medium max-w-[150px] truncate inline-block" :title="specimen.sample_label">
                      {{ specimen.sample_label || 'N/A' }}
                    </span>
                  </td>
                  <td class="px-6 py-6 text-sm text-gray-600">
                    <div class="flex items-center gap-2 max-w-[250px]">
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
                  <td class="px-6 py-6 whitespace-nowrap text-sm">
                    <span :class="getTypeClass(specimen.sample_category_id)"
                      class="inline-flex px-2.5 py-1 rounded-full text-xs font-medium">
                      {{ specimen.sample_category_id || 'N/A' }}
                    </span>
                  </td>
                  <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-700">
                    <div class="flex flex-col">
                      <span class="font-medium">{{ formatDate(specimen.collection_date) }}</span>
                      <span v-if="specimen.collection_time" class="text-xs text-gray-500">
                        {{ specimen.collection_time }}
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-700">
                    <span class="max-w-[120px] truncate inline-block" :title="specimen.field_collector_info">
                      {{ specimen.field_collector_info || 'N/A' }}
                    </span>
                  </td>
                  <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-700">
                    <span class="max-w-[120px] truncate inline-block" :title="specimen.researcher_info">
                      {{ specimen.researcher_info || 'N/A' }}
                    </span>
                  </td>
                  <td class="px-6 py-6 whitespace-nowrap text-sm">
                    <span :class="getStatusClass(specimen.status)"
                      class="inline-flex px-2.5 py-1 rounded-full text-xs font-medium">
                      {{ specimen.status || 'N/A' }}
                    </span>
                  </td>
                  <td class="px-6 py-6 whitespace-nowrap text-sm sticky right-0 bg-white">
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
                        title="Edit">
                        <svg class="w-5 h-5 text-[#005B8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="paginatedItems.length === 0">
                  <td colspan="10" class="px-6 py-12 text-center">
                    <svg class="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p class="text-gray-500 text-sm font-medium mb-2">No specimens match your filters</p>
                    <button @click="clearFilters" class="text-[#005B8F] hover:text-[#004a73] font-medium text-sm">
                      Clear all filters
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <Pagination v-if="filteredSpecimens.length > 0" v-model:currentPage="currentPage" v-model:pageSize="pageSize"
            :totalItems="totalItems" :pageSizeOptions="[10, 25, 50, 100]" />
        </div>
      </template>
    </div>

    <!-- Modals -->
    <BiospecimenNewSpecimenModal v-model="showNewSpecimenModal" :editData="editingSpecimen" @saved="handleSpecimenSaved" />
    <BiospecimenDetailsModal v-model="showDetailsModal" :specimen="selectedSpecimen" />

    <!-- Toast -->
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
import { usePagination } from '@/composables/core/usePagination';
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
// const currentPage = ref(1);
// const pageSize = ref(10);

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

const {
  currentPage,
  pageSize,
  totalItems,
  totalPages,
  paginatedItems,
  hasNextPage,
  hasPreviousPage,
  goToPage,
  nextPage,
  previousPage,
  firstPage,
  lastPage,
  setPageSize,
  resetPagination
} = usePagination(filteredSpecimens, {
  initialPage: 1,
  initialPageSize: 10,
  pageSizeOptions: [10, 25, 50, 100]
});


// Pagination Computed Properties
// const totalPages = computed(() => {
//   return Math.ceil(filteredSpecimens.value.length / pageSize.value);
// });

const startIndex = computed(() => {
  return (currentPage.value - 1) * pageSize.value;
});

const endIndex = computed(() => {
  return startIndex.value + pageSize.value;
});

const paginatedSpecimens = computed(() => {
  return filteredSpecimens.value
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

// Update your methods:
const applyFilters = () => {
  console.log('Applying filters:', filters.value);
  resetPagination(); // Reset to page 1 when filters change
};

const clearFilters = () => {
  filterText.value = '';
  filters.value = {
    type: 'All Types',
    site: 'All Sites',
    status: 'All Status'
  };
  resetPagination(); // Reset to page 1 when clearing filters
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

// const goToPage = (page: number) => {
//   currentPage.value = page;
// };

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

/* Force proper table styling */
table {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
}

thead th {
  position: sticky;
  top: 0;
  z-index: 10;
}

/* Sticky column shadow */
.sticky {
  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.05);
}

/* Ensure proper text truncation */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

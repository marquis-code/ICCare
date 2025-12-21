<template>
    <div class="min-h-screen ">


      <div class="flex">


        <!-- Main Content -->
        <main class="flex-1 p-4 md:p-6">
          <div class="mb-6 space-y-6">
            <!-- Page Header -->
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h1 class="text-xl font-semibold text-gray-900">BioSpecimen Tracking</h1>
              <button @click="showTransferModal = true"
                class="bg-[#005B8F] text-white px-4 py-2.5 rounded-lg  transition-colors flex items-center gap-2 justify-center shadow-sm">
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_2108_3013)">
                    <path
                      d="M3.01562 0C1.9125 0 1.01562 0.896875 1.01562 2V14C1.01562 15.1031 1.9125 16 3.01562 16H11.0156C12.1187 16 13.0156 15.1031 13.0156 14V11H15.4563L14.4875 11.9688C14.1938 12.2625 14.1938 12.7375 14.4875 13.0281C14.7812 13.3187 15.2563 13.3219 15.5469 13.0281L17.7969 10.7781C18.0906 10.4844 18.0906 10.0094 17.7969 9.71875L15.5469 7.46875C15.2531 7.175 14.7781 7.175 14.4875 7.46875C14.1969 7.7625 14.1938 8.2375 14.4875 8.52812L15.4563 9.49687H13.0156V5.325C13.0156 4.79375 12.8062 4.28438 12.4312 3.90937L9.1 0.584375C8.725 0.209375 8.21875 0 7.6875 0H3.01562ZM11.1875 5.5H8.26562C7.85 5.5 7.51562 5.16563 7.51562 4.75V1.82812L11.1875 5.5ZM7.01562 10.25C7.01562 9.83438 7.35 9.5 7.76562 9.5H11.0156V11H7.76562C7.35 11 7.01562 10.6656 7.01562 10.25Z"
                      fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_2108_3013">
                      <rect width="18" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span>View Transfer Details</span>
              </button>
            </div>

            <!-- Filters -->
            <section class="grid grid-cols-3 gap-6">
              <div>
                <UiSelectInput label="Status" :options="sites" position="standalone" v-model="filters.status" />
              </div>

              <!-- Date Range Picker -->
              <div>
                <DateRangePicker v-model="dateRange" placeholder="Date Range" label="Filter by date" />
              </div>

              <div>
                <input v-model="filterText" type="text" placeholder="Filter Table" class="custom-input" />
              </div>
            </section>

            <section class="grid grid-cols-3 gap-6">

              <div class="flex gap-2">
                <button @click="applyFilters"
                  class="flex-1 bg-[#005B8F] text-white px-6 py-2.5 rounded-lg hover:bg-[#004a73] transition-colors text-sm font-medium shadow-sm">
                  Search
                </button>
                <button @click="clearFilters"
                  class="flex-1 border border-blue-600 text-blue-600 px-6 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                  Clear
                </button>
              </div>
                            <button @click="showNewSpecimenModal = true"
                class="bg-[#005B8F] text-white px-4 py-2.5 rounded-lg  transition-colors flex items-center gap-2 shadow-sm">
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_2108_3013)">
                    <path
                      d="M3.01562 0C1.9125 0 1.01562 0.896875 1.01562 2V14C1.01562 15.1031 1.9125 16 3.01562 16H11.0156C12.1187 16 13.0156 15.1031 13.0156 14V11H15.4563L14.4875 11.9688C14.1938 12.2625 14.1938 12.7375 14.4875 13.0281C14.7812 13.3187 15.2563 13.3219 15.5469 13.0281L17.7969 10.7781C18.0906 10.4844 18.0906 10.0094 17.7969 9.71875L15.5469 7.46875C15.2531 7.175 14.7781 7.175 14.4875 7.46875C14.1969 7.7625 14.1938 8.2375 14.4875 8.52812L15.4563 9.49687H13.0156V5.325C13.0156 4.79375 12.8062 4.28438 12.4312 3.90937L9.1 0.584375C8.725 0.209375 8.21875 0 7.6875 0H3.01562ZM11.1875 5.5H8.26562C7.85 5.5 7.51562 5.16563 7.51562 4.75V1.82812L11.1875 5.5ZM7.01562 10.25C7.01562 9.83438 7.35 9.5 7.76562 9.5H11.0156V11H7.76562C7.35 11 7.01562 10.6656 7.01562 10.25Z"
                      fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_2108_3013">
                      <rect width="18" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <span class="text-sm font-medium">New Biospecimen</span>
              </button>


              <!-- <button @click="showBatchImportModal = true"
                class="bg-[#005B8F] text-white px-4 py-2.5 rounded-lg  transition-colors flex items-center gap-2 shadow-sm">
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_2108_3013)">
                    <path
                      d="M3.01562 0C1.9125 0 1.01562 0.896875 1.01562 2V14C1.01562 15.1031 1.9125 16 3.01562 16H11.0156C12.1187 16 13.0156 15.1031 13.0156 14V11H15.4563L14.4875 11.9688C14.1938 12.2625 14.1938 12.7375 14.4875 13.0281C14.7812 13.3187 15.2563 13.3219 15.5469 13.0281L17.7969 10.7781C18.0906 10.4844 18.0906 10.0094 17.7969 9.71875L15.5469 7.46875C15.2531 7.175 14.7781 7.175 14.4875 7.46875C14.1969 7.7625 14.1938 8.2375 14.4875 8.52812L15.4563 9.49687H13.0156V5.325C13.0156 4.79375 12.8062 4.28438 12.4312 3.90937L9.1 0.584375C8.725 0.209375 8.21875 0 7.6875 0H3.01562ZM11.1875 5.5H8.26562C7.85 5.5 7.51562 5.16563 7.51562 4.75V1.82812L11.1875 5.5ZM7.01562 10.25C7.01562 9.83438 7.35 9.5 7.76562 9.5H11.0156V11H7.76562C7.35 11 7.01562 10.6656 7.01562 10.25Z"
                      fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_2108_3013">
                      <rect width="18" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span class="text-sm font-medium">Batch import</span>
              </button> -->
            </section>


            <!-- Approval Table -->
            <div v-if="pendingApprovals.length > 0"
              class="bg-white rounded-lg shadow-sm max-w-lg overflow-hidden mb-6 border-[0.5px] border-gray-100">
              <div class="px-4 py-6 bg-gray-50 border-b-[0.5px] border-gray-50">
                <h3 class="text-sm font-semibold text-gray-700">Pending Approvals</h3>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead class="bg-gray-25 border-b-[0.5px] border-gray-50">
                    <tr>
                      <th class="px-4 py-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SN
                      </th>
                      <th class="px-4 py-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Sample ID</th>
                      <th class="px-4 py-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y-[0.5px] divide-gray-50 bg-white">
                    <tr v-for="(specimen, idx) in pendingApprovals" :key="specimen.id"
                      class="hover:bg-gray-50 transition">
                      <td class="px-4 py-6 text-sm text-gray-900">{{ idx + 1 }}</td>
                      <td class="px-4 py-6 text-sm text-gray-900">
                        <div class="flex items-center gap-2">
                          <span class="font-medium">{{ specimen.sampleId }}</span>
                          <button @click="copyToClipboard(specimen.sampleId)"
                            class="text-gray-400 hover:text-gray-600 transition">
                            <Icon name="heroicons:clipboard-document" class="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td class="px-4 py-6 text-sm">
                        <div class="flex gap-2">
                          <button @click="openConfirmModal('approve', specimen.id)"
                            class="bg-green-100 text-green-700 px-4 py-1.5 rounded-full hover:bg-green-200 transition text-sm font-medium">
                            Approve
                          </button>
                          <button @click="openConfirmModal('reject', specimen.id)"
                            class="bg-red-100 text-red-700 px-4 py-1.5 rounded-full hover:bg-red-200 transition text-sm font-medium">
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Main Tracking Table -->
            <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-50">
              <div class="px-4 py-6 bg-gray-50 border-b border-gray-200">
                <h3 class="font-semibold text-gray-700">All Biospecimens</h3>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead class="bg-gray-25 border-b-[0.5px] border-gray-50">
                    <tr>
                      <th class="px-4 py-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SN
                      </th>
                      <th class="px-4 py-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Sample ID</th>
                      <th class="px-4 py-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Current Location</th>
                      <th class="px-4 py-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Previous Location</th>
                      <th class="px-4 py-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Move
                        On</th>
                      <th class="px-4 py-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Collector Info</th>
                      <th class="px-4 py-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Description</th>
                      <th class="px-4 py-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y-[0.5px] divide-gray-50 bg-white">
                    <tr v-for="specimen in filteredSpecimens" :key="specimen.id" @click="openDetailsModal(specimen)"
                      class="hover:bg-gray-25 cursor-pointer transition">
                      <td class="px-4 py-6 text-sm text-gray-900">{{ specimen.id }}</td>
                      <td class="px-4 py-6 text-sm text-gray-900">
                        <div class="flex items-center gap-2">
                          <span class="font-medium">{{ specimen.sampleId }}</span>
                          <button @click.stop="copyToClipboard(specimen.sampleId)"
                            class="text-gray-400 hover:text-gray-600 transition">
                            <Icon name="heroicons:clipboard-document" class="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td class="px-4 py-6 text-sm text-gray-700">
                        <div class="flex items-center gap-2">
                          <Icon name="heroicons:map-pin" class="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span>{{ specimen.currentLocation }}</span>
                        </div>
                      </td>
                      <td class="px-4 py-6 text-sm text-gray-700">
                        <div class="flex items-center gap-2">
                          <Icon name="heroicons:map-pin" class="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span>{{ specimen.previousLocation }}</span>
                        </div>
                      </td>
                      <td class="px-4 py-6 text-sm text-gray-700">{{ specimen.moveOn }}</td>
                      <td class="px-4 py-6 text-sm text-gray-700">{{ specimen.collectorInfo }}</td>
                      <td class="px-4 py-6 text-sm text-gray-700">{{ specimen.description }}</td>
                      <td class="px-4 py-6 text-sm">
                        <span :class="getStatusClass(specimen.status)"
                          class="inline-flex px-3 py-1 rounded-full text-xs font-medium">
                          {{ specimen.status }}
                        </span>
                      </td>
                    </tr>
                    <tr v-if="filteredSpecimens.length === 0">
                      <td colspan="8" class="px-4 py-12 text-center">
                        <Icon name="heroicons:document-magnifying-glass" class="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p class="text-gray-500 text-sm">No specimens found</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      <!-- Modals -->
      <BiospecimenNewSpecimenModal v-model="showNewSpecimenModal" @saved="handleSpecimenSaved" />

      <BiospecimenBatchImportModal v-model="showBatchImportModal" @imported="handleBatchImported" />

      <BiospecimenDetailsModal v-model="showDetailsModal" :specimen="selectedSpecimen" />

      <BiospecimenTransferModal v-model="showTransferModal" />

      <BiospecimenConfirmActionModal v-model="showConfirmModal" :action="confirmAction"
        @confirmed="handleActionConfirmed" />
    </div>
</template>

<script setup lang="ts">
import type { BioSpecimen } from '~/types/biospecimen';
import DateRangePicker, { type DateRange } from '~/components/DateRangePicker.vue';

// State
const filterText = ref('');
const filters = ref({
  status: '',
  dateStart: '',
  dateEnd: ''
});

const dateRange = ref<DateRange>({ from: '', to: '' });

const showNewSpecimenModal = ref(false);
const showBatchImportModal = ref(false);
const showDetailsModal = ref(false);
const showTransferModal = ref(false);
const showConfirmModal = ref(false);

const selectedSpecimen = ref<BioSpecimen | null>(null);
const confirmAction = ref<{ type: 'approve' | 'reject', id: number } | null>(null);

const sites = ref([
  'All Status',
  'Confirmed',
  'Moved',
  'Approved',
  'Requested',
  'Rejected'
]);

// Sample data - Replace with API call
const specimens = ref<BioSpecimen[]>([
  {
    id: 1,
    sampleId: 'MH-2024-0023',
    currentLocation: 'Freezer B-105, Rack 1-A',
    previousLocation: 'Freezer A-301, Rack 2-B',
    moveOn: '2024-01-15',
    collectorInfo: 'John Romans',
    description: 'Clinical trial transfer',
    status: 'Confirmed'
  },
  {
    id: 2,
    sampleId: 'MH-2024-0024',
    currentLocation: 'Freezer B-105, Rack 1-A',
    previousLocation: 'Freezer A-301, Rack 2-B',
    moveOn: '2024-01-20',
    collectorInfo: 'John Romans',
    description: 'Department relocation',
    status: 'Moved'
  },
  {
    id: 3,
    sampleId: 'MH-2024-0025',
    currentLocation: 'Freezer B-105, Rack 1-A',
    previousLocation: 'Freezer A-301, Rack 2-B',
    moveOn: '2024-02-01',
    collectorInfo: 'John Romans',
    description: 'Research project transfer',
    status: 'Approved'
  },
  {
    id: 4,
    sampleId: 'MH-2024-0026',
    currentLocation: 'Freezer B-105, Rack 1-A',
    previousLocation: 'Freezer A-301, Rack 2-B',
    moveOn: '2024-02-10',
    collectorInfo: 'John Romans',
    description: 'Pending approval',
    status: 'Requested'
  },
  {
    id: 5,
    sampleId: 'MH-2024-0027',
    currentLocation: 'Freezer B-105, Rack 1-A',
    previousLocation: 'Freezer A-301, Rack 2-B',
    moveOn: '2024-02-15',
    collectorInfo: 'John Romans',
    description: 'Transfer rejected',
    status: 'Rejected'
  },
  {
    id: 6,
    sampleId: 'MH-2024-0028',
    currentLocation: 'Ikeja medical centre',
    previousLocation: 'Ikeja medical centre',
    moveOn: '2024-03-01',
    collectorInfo: 'John Romans',
    description: 'Storage confirmed',
    status: 'Confirmed'
  },
  {
    id: 7,
    sampleId: 'MH-2024-0029',
    currentLocation: 'Ikeja medical centre',
    previousLocation: 'Ikeja medical centre',
    moveOn: '2024-03-15',
    collectorInfo: 'John Romans',
    description: 'Transfer approved',
    status: 'Approved'
  }
]);

// Computed
const pendingApprovals = computed(() => {
  return specimens.value.filter(s => s.status === 'Requested').slice(0, 3);
});

const filteredSpecimens = computed(() => {
  let filtered = specimens.value;

  // Filter by search text
  if (filterText.value) {
    const search = filterText.value.toLowerCase();
    filtered = filtered.filter(s =>
      s.sampleId.toLowerCase().includes(search) ||
      s.description.toLowerCase().includes(search) ||
      s.collectorInfo.toLowerCase().includes(search) ||
      s.currentLocation.toLowerCase().includes(search)
    );
  }

  // Filter by status
  if (filters.value.status && filters.value.status !== 'All Status') {
    filtered = filtered.filter(s => s.status === filters.value.status);
  }

  // Filter by date range (start)
  if (filters.value.dateStart) {
    const startDate = new Date(filters.value.dateStart);
    startDate.setHours(0, 0, 0, 0);
    filtered = filtered.filter(s => {
      const specimenDate = new Date(s.moveOn);
      specimenDate.setHours(0, 0, 0, 0);
      return specimenDate >= startDate;
    });
  }

  // Filter by date range (end)
  if (filters.value.dateEnd) {
    const endDate = new Date(filters.value.dateEnd);
    endDate.setHours(23, 59, 59, 999);
    filtered = filtered.filter(s => {
      const specimenDate = new Date(s.moveOn);
      return specimenDate <= endDate;
    });
  }

  return filtered;
});

// Methods
const getStatusClass = (status: string): string => {
  const classes: Record<string, string> = {
    'Confirmed': 'bg-green-100 text-green-700',
    'Moved': 'bg-blue-100 text-blue-700',
    'Approved': 'bg-orange-100 text-orange-700',
    'Requested': 'bg-pink-100 text-pink-700',
    'Rejected': 'bg-red-100 text-red-700'
  };
  return classes[status] || 'bg-gray-100 text-gray-700';
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Copied to clipboard:', text);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

const applyFilters = () => {
  console.log('Applying filters:', filters.value);
  // Filter logic is handled by computed property
};

const clearFilters = () => {
  filterText.value = '';
  filters.value = {
    status: '',
    dateStart: '',
    dateEnd: ''
  };
  dateRange.value = { from: '', to: '' };
};

const openConfirmModal = (type: 'approve' | 'reject', id: number) => {
  confirmAction.value = { type, id };
  showConfirmModal.value = true;
};

const openDetailsModal = (specimen: BioSpecimen) => {
  selectedSpecimen.value = specimen;
  showDetailsModal.value = true;
};

const handleActionConfirmed = () => {
  if (confirmAction.value) {
    const { type, id } = confirmAction.value;
    const specimen = specimens.value.find(s => s.id === id);
    if (specimen) {
      specimen.status = type === 'approve' ? 'Approved' : 'Rejected';
    }
  }
  showConfirmModal.value = false;
  confirmAction.value = null;
};

const handleSpecimenSaved = (data: any) => {
  console.log('New specimen saved:', data);
  // Refresh specimens list from API
  // await fetchSpecimens();
};

const handleBatchImported = (data: any) => {
  console.log('Batch import completed:', data);
  // Refresh specimens list from API
  // await fetchSpecimens();
};

// Watch dateRange changes and sync with filters
watch(dateRange, (newRange) => {
  filters.value.dateStart = newRange.from;
  filters.value.dateEnd = newRange.to;
}, { deep: true });

definePageMeta({
    layout: 'dashboard'
})
</script>
<template>
  <NuxtLayout name="dashboard">
  <div class="min-h-screen ">


    <div class="flex">


      <!-- Main Content -->
      <main class="flex-1 p-4 md:p-6">
        <div class="mb-6">
          <!-- Page Header -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900">BioSpecimen Tracking</h1>
            <button 
              @click="showTransferModal = true"
              class="bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center shadow-sm"
            >
              <Icon name="heroicons:arrow-down-tray" class="w-5 h-5" />
              <span>View Transfer Details</span>
            </button>
          </div>

          <!-- Filters -->
          <div class="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
            <select 
              v-model="filters.status" 
              class="px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">All Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Moved">Moved</option>
              <option value="Approved">Approved</option>
              <option value="Requested">Requested</option>
              <option value="Rejected">Rejected</option>
            </select>
            
            <input 
              v-model="filters.dateStart"
              type="date" 
              class="px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="Start Date"
            />
            
            <input 
              v-model="filters.dateEnd"
              type="date" 
              class="px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="End Date"
            />
            
            <input
              v-model="filterText"
              type="text"
              placeholder="Filter Table"
              class="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            
            <div class="flex gap-2">
              <button 
                @click="applyFilters"
                class="flex-1 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
              >
                Search
              </button>
              <button 
                @click="clearFilters"
                class="flex-1 border border-blue-600 text-blue-600 px-6 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
              >
                Clear
              </button>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-3 mb-6">
            <button 
              @click="showNewSpecimenModal = true"
              class="bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Icon name="heroicons:plus" class="w-5 h-5" />
              <span class="text-sm font-medium">New Biospecimen</span>
            </button>
            
            <button class="bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">
              <Icon name="heroicons:map-pin" class="w-5 h-5" />
              <span class="text-sm font-medium">Storage Location</span>
            </button>
            
            <button class="bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">
              <Icon name="heroicons:document-plus" class="w-5 h-5" />
              <span class="text-sm font-medium">Add Dataset</span>
            </button>
            
            <button 
              @click="showBatchImportModal = true"
              class="bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Icon name="heroicons:arrow-up-tray" class="w-5 h-5" />
              <span class="text-sm font-medium">Batch import</span>
            </button>
          </div>

          <!-- Approval Table -->
          <div v-if="pendingApprovals.length > 0" class="bg-white rounded-lg shadow-sm overflow-hidden mb-6 border border-gray-200">
            <div class="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h3 class="text-sm font-semibold text-gray-700">Pending Approvals</h3>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SN</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sample ID</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="(specimen, idx) in pendingApprovals" :key="specimen.id" class="hover:bg-gray-50 transition">
                    <td class="px-4 py-3 text-sm text-gray-900">{{ idx + 1 }}</td>
                    <td class="px-4 py-3 text-sm text-gray-900">
                      <div class="flex items-center gap-2">
                        <span class="font-medium">{{ specimen.sampleId }}</span>
                        <button 
                          @click="copyToClipboard(specimen.sampleId)" 
                          class="text-gray-400 hover:text-gray-600 transition"
                        >
                          <Icon name="heroicons:clipboard-document" class="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-sm">
                      <div class="flex gap-2">
                        <button 
                          @click="openConfirmModal('approve', specimen.id)"
                          class="bg-green-100 text-green-700 px-4 py-1.5 rounded-md hover:bg-green-200 transition text-sm font-medium"
                        >
                          Approve
                        </button>
                        <button 
                          @click="openConfirmModal('reject', specimen.id)"
                          class="bg-red-100 text-red-700 px-4 py-1.5 rounded-md hover:bg-red-200 transition text-sm font-medium"
                        >
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
          <div class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div class="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h3 class="text-sm font-semibold text-gray-700">All Biospecimens</h3>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SN</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sample ID</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Current Location</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Previous Location</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Move On</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Collector Info</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr 
                    v-for="specimen in filteredSpecimens" 
                    :key="specimen.id" 
                    @click="openDetailsModal(specimen)"
                    class="hover:bg-gray-50 cursor-pointer transition"
                  >
                    <td class="px-4 py-3 text-sm text-gray-900">{{ specimen.id }}</td>
                    <td class="px-4 py-3 text-sm text-gray-900">
                      <div class="flex items-center gap-2">
                        <span class="font-medium">{{ specimen.sampleId }}</span>
                        <button 
                          @click.stop="copyToClipboard(specimen.sampleId)" 
                          class="text-gray-400 hover:text-gray-600 transition"
                        >
                          <Icon name="heroicons:clipboard-document" class="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700">
                      <div class="flex items-center gap-2">
                        <Icon name="heroicons:map-pin" class="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span>{{ specimen.currentLocation }}</span>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700">
                      <div class="flex items-center gap-2">
                        <Icon name="heroicons:map-pin" class="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span>{{ specimen.previousLocation }}</span>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700">{{ specimen.moveOn }}</td>
                    <td class="px-4 py-3 text-sm text-gray-700">{{ specimen.collectorInfo }}</td>
                    <td class="px-4 py-3 text-sm text-gray-700">{{ specimen.description }}</td>
                    <td class="px-4 py-3 text-sm">
                      <span :class="getStatusClass(specimen.status)" class="inline-flex px-3 py-1 rounded-full text-xs font-medium">
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
    <BiospecimenNewSpecimenModal 
      v-model="showNewSpecimenModal"
      @saved="handleSpecimenSaved"
    />
    
    <BiospecimenBatchImportModal 
      v-model="showBatchImportModal"
      @imported="handleBatchImported"
    />
    
    <BiospecimenDetailsModal 
      v-model="showDetailsModal"
      :specimen="selectedSpecimen"
    />
    
    <BiospecimenTransferModal 
      v-model="showTransferModal"
    />
    
    <BiospecimenConfirmActionModal 
      v-model="showConfirmModal"
      :action="confirmAction"
      @confirmed="handleActionConfirmed"
    />
  </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { BioSpecimen } from '~/types/biospecimen';


// State
const filterText = ref('');
const filters = ref({
  status: '',
  dateStart: '',
  dateEnd: ''
});

const showNewSpecimenModal = ref(false);
const showBatchImportModal = ref(false);
const showDetailsModal = ref(false);
const showTransferModal = ref(false);
const showConfirmModal = ref(false);

const selectedSpecimen = ref<BioSpecimen | null>(null);
const confirmAction = ref<{ type: 'approve' | 'reject', id: number } | null>(null);

// Sample data - Replace with API call
const specimens = ref<BioSpecimen[]>([
  {
    id: 1,
    sampleId: 'MH-2024-0023',
    currentLocation: 'Freezer B-105, Rack 1-A',
    previousLocation: 'Freezer A-301, Rack 2-B',
    moveOn: 'Jan 15, 2024, 09:30 AM',
    collectorInfo: 'John Romans',
    description: 'Clinical trial transfer',
    status: 'Confirmed'
  },
  {
    id: 2,
    sampleId: 'MH-2024-0024',
    currentLocation: 'Freezer B-105, Rack 1-A',
    previousLocation: 'Freezer A-301, Rack 2-B',
    moveOn: 'Jan 15, 2024, 09:30 AM',
    collectorInfo: 'John Romans',
    description: 'Department relocation',
    status: 'Moved'
  },
  {
    id: 3,
    sampleId: 'MH-2024-0025',
    currentLocation: 'Freezer B-105, Rack 1-A',
    previousLocation: 'Freezer A-301, Rack 2-B',
    moveOn: 'Jan 15, 2024, 09:30 AM',
    collectorInfo: 'John Romans',
    description: 'Research project transfer',
    status: 'Approved'
  },
  {
    id: 4,
    sampleId: 'MH-2024-0026',
    currentLocation: 'Freezer B-105, Rack 1-A',
    previousLocation: 'Freezer A-301, Rack 2-B',
    moveOn: 'Jan 15, 2024, 09:30 AM',
    collectorInfo: 'John Romans',
    description: 'Pending approval',
    status: 'Requested'
  },
  {
    id: 5,
    sampleId: 'MH-2024-0027',
    currentLocation: 'Freezer B-105, Rack 1-A',
    previousLocation: 'Freezer A-301, Rack 2-B',
    moveOn: 'Jan 15, 2024, 09:30 AM',
    collectorInfo: 'John Romans',
    description: 'Transfer rejected',
    status: 'Rejected'
  },
  {
    id: 6,
    sampleId: 'MH-2024-0028',
    currentLocation: 'Ikeja medical centre',
    previousLocation: 'Ikeja medical centre',
    moveOn: 'Jan 15, 2024, 09:30 AM',
    collectorInfo: 'John Romans',
    description: 'Storage confirmed',
    status: 'Confirmed'
  },
  {
    id: 7,
    sampleId: 'MH-2024-0029',
    currentLocation: 'Ikeja medical centre',
    previousLocation: 'Ikeja medical centre',
    moveOn: 'Jan 15, 2024, 09:30 AM',
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
  
  if (filterText.value) {
    const search = filterText.value.toLowerCase();
    filtered = filtered.filter(s => 
      s.sampleId.toLowerCase().includes(search) ||
      s.description.toLowerCase().includes(search) ||
      s.collectorInfo.toLowerCase().includes(search) ||
      s.currentLocation.toLowerCase().includes(search)
    );
  }
  
  if (filters.value.status) {
    filtered = filtered.filter(s => s.status === filters.value.status);
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

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    // Add toast notification if you have one
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
</script>
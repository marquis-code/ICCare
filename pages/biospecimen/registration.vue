<template>
  <div class="min-h-screen">
    <div class="flex">
      <!-- Main Content -->
      <main class="flex-1 p-4 md:p-6">
        <div class="mb-6 space-y-6">
          <!-- Page Header -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h1 class="text-2xl font-bold text-gray-900">BioSpecimen Registration</h1>
            <button 
              @click="showNewSpecimenModal = true"
              class="bg-[#005B8F] text-white px-4 py-2.5 rounded-lg hover:bg-[#004a73] transition-colors flex items-center gap-2 justify-center shadow-sm"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span class="font-medium">Register Biospecimen</span>
            </button>
          </div>

          <!-- Filters Section -->
          <section class="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
            <!-- Type Filter -->
            <div class="md:col-span-2">
              <UiSelectInput 
                label="All Types" 
                :options="typeOptions" 
                position="standalone" 
                v-model="filters.type"
              />
            </div>

            <!-- Location Filter -->
            <div class="md:col-span-2">
              <UiSelectInput 
                label="All Locations" 
                :options="locationOptions" 
                position="standalone" 
                v-model="filters.location"
              />
            </div>

            <!-- Date Range Filter -->
            <div class="md:col-span-2">
              <DateRangePicker 
                v-model="filters.dateRange" 
                label="Date Range" 
                placeholder="Select date range" 
              />
            </div>

            <!-- Search Input -->
            <div class="md:col-span-3">
              <label class="block text-sm font-medium text-gray-700 mb-1">Filter Table</label>
              <input 
                v-model="filterText" 
                type="text" 
                placeholder="Filter Table" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005B8F] focus:border-transparent"
              />
            </div>

            <!-- Action Buttons -->
            <div class="md:col-span-3 flex gap-2">
              <button
                @click="applyFilters"
                class="flex-1 bg-[#005B8F] text-white px-6 py-2.5 rounded-lg hover:bg-[#004a73] transition-colors text-sm font-medium shadow-sm"
              >
                Search
              </button>
              <button
                @click="clearFilters"
                class="flex-1 border border-[#005B8F] text-[#005B8F] px-6 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
              >
                Clear Filter
              </button>
            </div>
          </section>

          <!-- Main Tracking Table -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            <div class="overflow-x-auto">
              <table class="w-full min-w-max">
                <thead class="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th class="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      SN
                    </th>
                    <th class="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Sample ID
                    </th>
                    <th class="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Location
                    </th>
                    <th class="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Type
                    </th>
                    <th class="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Collection Date/Time
                    </th>
                    <th class="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Collector Info
                    </th>
                    <th class="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Clinical Info
                    </th>
                    <th class="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Demo_Info_ID
                    </th>
                    <th class="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Epi_Info_ID
                    </th>
                    <th class="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 bg-white">
                  <tr 
                    v-for="(specimen, index) in filteredSpecimens" 
                    :key="specimen.id"
                    class="hover:bg-gray-50 transition"
                  >
                    <td class="px-4 py-4 text-sm text-gray-900">
                      {{ index + 1 }}
                    </td>
                    <td class="px-4 py-4 text-sm text-gray-900">
                      <div class="flex items-center gap-2">
                        <span class="font-medium">{{ specimen.sampleId }}</span>
                        <button 
                          @click="copyToClipboard(specimen.sampleId)"
                          class="text-gray-400 hover:text-gray-600 transition"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td class="px-4 py-4 text-sm text-gray-700">
                      <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                        </svg>
                        <span>{{ specimen.location }}</span>
                      </div>
                    </td>
                    <td class="px-4 py-4 text-sm">
                      <span 
                        :class="getTypeClass(specimen.type)"
                        class="inline-flex px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {{ specimen.type }}
                      </span>
                    </td>
                    <td class="px-4 py-4 text-sm text-gray-700">
                      {{ specimen.collectionDateTime }}
                    </td>
                    <td class="px-4 py-4 text-sm text-gray-700">
                      {{ specimen.collectorInfo }}
                    </td>
                    <td class="px-4 py-4 text-sm">
                      <button 
                        @click="viewClinicalInfo(specimen.clinicalInfo)"
                        class="text-[#005B8F] hover:text-[#004a73] font-medium hover:underline"
                      >
                        {{ specimen.clinicalInfo }}
                      </button>
                    </td>
                    <td class="px-4 py-4 text-sm">
                      <button 
                        @click="viewDemoInfo(specimen.demoInfoId)"
                        class="text-[#005B8F] hover:text-[#004a73] font-medium hover:underline"
                      >
                        {{ specimen.demoInfoId }}
                      </button>
                    </td>
                    <td class="px-4 py-4 text-sm">
                      <button 
                        @click="viewEpiInfo(specimen.epiInfoId)"
                        class="text-[#005B8F] hover:text-[#004a73] font-medium hover:underline"
                      >
                        {{ specimen.epiInfoId }}
                      </button>
                    </td>
                    <td class="px-4 py-4 text-sm">
                      <button 
                        @click="openDetailsModal(specimen)"
                        class="p-2 hover:bg-gray-100 rounded-lg transition"
                      >
                        <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                  <tr v-if="filteredSpecimens.length === 0">
                    <td colspan="10" class="px-4 py-12 text-center">
                      <svg class="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
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
    <BiospecimenDetailsModal v-model="showDetailsModal" :specimen="selectedSpecimen" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { DateRange } from '~/components/DateRangePicker.vue';
import { useGetAllSamples } from "@/composables/modules/biosample/useGetAllSamples"
interface BioSpecimen {
  id: number;
  sampleId: string;
  location: string;
  type: string;
  collectionDateTime: string;
  collectorInfo: string;
  clinicalInfo: string;
  demoInfoId: string;
  epiInfoId: string;
}

const { samples, loading } = useGetAllSamples()

// State
const filterText = ref('');
const filters = ref({
  type: 'All Types',
  location: 'All Locations',
  dateRange: { from: '', to: '' } as DateRange
});

const showNewSpecimenModal = ref(false);
const showDetailsModal = ref(false);
const selectedSpecimen = ref<BioSpecimen | null>(null);

// Filter Options
const typeOptions = ref([
  'All Types',
  'Serum',
  'Plasma',
  'Tissue',
  'DNA',
  'RNA',
  'Pending'
]);

const locationOptions = ref([
  'All Locations',
  'Ikeja medical centre',
  'Freezer B-105, Rack 1-A',
  'Freezer A-301, Rack 2-B',
  'Cold Storage Unit 5'
]);

// Sample data
const specimens = ref<BioSpecimen[]>([
  {
    id: 1,
    sampleId: 'MH-2024-0023',
    location: 'Ikeja medical centre',
    type: 'Serum',
    collectionDateTime: 'Jan 15, 2024, 09:30 AM',
    collectorInfo: 'John Romans',
    clinicalInfo: 'CLI-00234',
    demoInfoId: 'DEM-00234',
    epiInfoId: 'EPI-00234'
  },
  {
    id: 2,
    sampleId: 'MH-2024-0023',
    location: 'Ikeja medical centre',
    type: 'Plasma',
    collectionDateTime: 'Jan 15, 2024, 09:30 AM',
    collectorInfo: 'John Romans',
    clinicalInfo: 'CLI-00234',
    demoInfoId: 'DEM-00234',
    epiInfoId: 'EPI-00234'
  },
  {
    id: 3,
    sampleId: 'MH-2024-0023',
    location: 'Ikeja medical centre',
    type: 'Tissue',
    collectionDateTime: 'Jan 15, 2024, 09:30 AM',
    collectorInfo: 'John Romans',
    clinicalInfo: 'CLI-00234',
    demoInfoId: 'DEM-00234',
    epiInfoId: 'EPI-00234'
  },
  {
    id: 4,
    sampleId: 'MH-2024-0023',
    location: 'Ikeja medical centre',
    type: 'DNA',
    collectionDateTime: 'Jan 15, 2024, 09:30 AM',
    collectorInfo: 'John Romans',
    clinicalInfo: 'CLI-00234',
    demoInfoId: 'DEM-00234',
    epiInfoId: 'EPI-00234'
  },
  {
    id: 5,
    sampleId: 'MH-2024-0023',
    location: 'Ikeja medical centre',
    type: 'Tissue',
    collectionDateTime: 'Jan 15, 2024, 09:30 AM',
    collectorInfo: 'John Romans',
    clinicalInfo: 'CLI-00234',
    demoInfoId: 'DEM-00234',
    epiInfoId: 'EPI-00234'
  },
  {
    id: 6,
    sampleId: 'MH-2024-0023',
    location: 'Ikeja medical centre',
    type: 'Serum',
    collectionDateTime: 'Jan 15, 2024, 09:30 AM',
    collectorInfo: 'John Romans',
    clinicalInfo: 'CLI-00234',
    demoInfoId: 'DEM-00234',
    epiInfoId: 'EPI-00234'
  },
  {
    id: 7,
    sampleId: 'MH-2024-0023',
    location: 'Ikeja medical centre',
    type: 'Plasma',
    collectionDateTime: 'Jan 15, 2024, 09:30 AM',
    collectorInfo: 'John Romans',
    clinicalInfo: 'CLI-00234',
    demoInfoId: 'DEM-00234',
    epiInfoId: 'EPI-00234'
  },
  {
    id: 8,
    sampleId: 'MH-2024-0023',
    location: 'Ikeja medical centre',
    type: 'Tissue',
    collectionDateTime: 'Jan 15, 2024, 09:30 AM',
    collectorInfo: 'John Romans',
    clinicalInfo: 'CLI-00234',
    demoInfoId: 'DEM-00234',
    epiInfoId: 'EPI-00234'
  },
  {
    id: 9,
    sampleId: 'MH-2024-0023',
    location: 'Ikeja medical centre',
    type: 'DNA',
    collectionDateTime: 'Jan 15, 2024, 09:30 AM',
    collectorInfo: 'John Romans',
    clinicalInfo: 'CLI-00234',
    demoInfoId: 'DEM-00234',
    epiInfoId: 'EPI-00234'
  },
  {
    id: 10,
    sampleId: 'MH-2024-0023',
    location: 'Ikeja medical centre',
    type: 'Pending',
    collectionDateTime: 'Jan 15, 2024, 09:30 AM',
    collectorInfo: 'John Romans',
    clinicalInfo: 'CLI-00234',
    demoInfoId: 'DEM-00234',
    epiInfoId: 'EPI-00234'
  }
]);

// Computed
const filteredSpecimens = computed(() => {
  let filtered = specimens.value;

  // Filter by search text
  if (filterText.value) {
    const search = filterText.value.toLowerCase();
    filtered = filtered.filter(s =>
      s.sampleId.toLowerCase().includes(search) ||
      s.location.toLowerCase().includes(search) ||
      s.type.toLowerCase().includes(search) ||
      s.collectorInfo.toLowerCase().includes(search) ||
      s.clinicalInfo.toLowerCase().includes(search) ||
      s.demoInfoId.toLowerCase().includes(search) ||
      s.epiInfoId.toLowerCase().includes(search)
    );
  }

  // Filter by type
  if (filters.value.type && filters.value.type !== 'All Types') {
    filtered = filtered.filter(s => s.type === filters.value.type);
  }

  // Filter by location
  if (filters.value.location && filters.value.location !== 'All Locations') {
    filtered = filtered.filter(s => s.location === filters.value.location);
  }

  // Filter by date range
  if (filters.value.dateRange.from) {
    const startDate = new Date(filters.value.dateRange.from);
    startDate.setHours(0, 0, 0, 0);
    filtered = filtered.filter(s => {
      const specimenDate = new Date(s.collectionDateTime);
      specimenDate.setHours(0, 0, 0, 0);
      return specimenDate >= startDate;
    });
  }

  if (filters.value.dateRange.to) {
    const endDate = new Date(filters.value.dateRange.to);
    endDate.setHours(23, 59, 59, 999);
    filtered = filtered.filter(s => {
      const specimenDate = new Date(s.collectionDateTime);
      return specimenDate <= endDate;
    });
  }

  return filtered;
});

// Methods
const getTypeClass = (type: string): string => {
  const classes: Record<string, string> = {
    'Serum': 'bg-green-100 text-green-700',
    'Plasma': 'bg-blue-100 text-blue-700',
    'Tissue': 'bg-orange-100 text-orange-700',
    'DNA': 'bg-pink-100 text-pink-700',
    'RNA': 'bg-purple-100 text-purple-700',
    'Pending': 'bg-yellow-100 text-yellow-700'
  };
  return classes[type] || 'bg-gray-100 text-gray-700';
};

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Copied to clipboard:', text);
    // You can add a toast notification here
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
    type: 'All Types',
    location: 'All Locations',
    dateRange: { from: '', to: '' }
  };
};

const openDetailsModal = (specimen: BioSpecimen) => {
  selectedSpecimen.value = specimen;
  showDetailsModal.value = true;
};

const viewClinicalInfo = (clinicalInfo: string) => {
  console.log('View clinical info:', clinicalInfo);
  // Implement navigation or modal for clinical info
};

const viewDemoInfo = (demoInfoId: string) => {
  console.log('View demo info:', demoInfoId);
  // Implement navigation or modal for demo info
};

const viewEpiInfo = (epiInfoId: string) => {
  console.log('View epi info:', epiInfoId);
  // Implement navigation or modal for epi info
};

const handleSpecimenSaved = (data: any) => {
  console.log('New specimen saved:', data);
  // Refresh specimens list from API
  // await fetchSpecimens();
};

definePageMeta({
  layout: 'dashboard'
});
</script>
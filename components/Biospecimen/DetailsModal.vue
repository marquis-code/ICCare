<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="modelValue && specimen" 
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4"
        @click.self="close"
      >
        <div class="bg-white rounded-xl max-w-3xl w-full max-h-[95vh] sm:max-h-[90vh] shadow-2xl transform transition-all flex flex-col">
          <!-- Fixed Header -->
          <div class="p-4 sm:p-6 md:p-8 flex-shrink-0 border-b border-gray-100">
            <!-- Header -->
            <div class="flex items-center justify-between mb-4 sm:mb-6">
              <div class="flex items-center gap-2 sm:gap-4">
                <button 
                  @click="close"
                  class="p-2 hover:bg-gray-100 rounded-lg transition flex-shrink-0"
                >
                  <Icon name="heroicons:arrow-left" class="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                </button>
                <h2 class="text-lg sm:text-2xl font-bold text-gray-900">Biospecimen Details</h2>
              </div>
              <button 
                @click="downloadSpecimen"
                class="px-3 py-2 sm:px-4 sm:py-2.5 bg-[#005B8F] text-white rounded-lg transition flex items-center gap-2 shadow-md hover:bg-[#004a73] flex-shrink-0"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5">
                  <path d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97933 19.8043 4.588 19.413C4.19667 19.0217 4.00067 18.5507 4 18V15H6V18H18V15H20V18C20 18.55 19.8043 19.021 19.413 19.413C19.0217 19.805 18.5507 20.0007 18 20H6Z" fill="white"/>
                </svg>
                <span class="hidden sm:inline text-sm font-medium">Download</span>
              </button>
            </div>

            <!-- Specimen Info Card -->
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 border border-blue-100">
              <div class="flex flex-col items-center text-center">
                <div class="rounded-full flex items-center justify-center mb-3">
                  <svg width="48" height="48" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 sm:w-16 sm:h-16">
                    <g clip-path="url(#clip0_2030_1458)">
                      <path d="M32.998 65.9946C51.2237 65.9946 65.998 51.2203 65.998 32.9946C65.998 14.769 51.2237 -0.00537109 32.998 -0.00537109C14.7724 -0.00537109 -0.00195312 14.769 -0.00195312 32.9946C-0.00195312 51.2203 14.7724 65.9946 32.998 65.9946Z" fill="#DEEEFF"/>
                      <path d="M49.2949 47.5312L36.0509 27.9595L39.5984 20.9951H26.3984L29.9459 27.9595L16.7019 47.5312C16.4012 47.983 16.2287 48.5079 16.2027 49.0499C16.1767 49.592 16.2982 50.131 16.5543 50.6094C16.8104 51.0879 17.1915 51.4879 17.6569 51.7669C18.1224 52.046 18.6548 52.1935 19.1975 52.1939H46.7979C47.3408 52.1937 47.8735 52.0462 48.3391 51.7671C48.8048 51.488 49.186 51.0878 49.4422 50.6091C49.6983 50.1304 49.8198 49.5912 49.7936 49.0489C49.7674 48.5067 49.5946 47.9816 49.2935 47.5299" fill="#2E3ECD"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M43.0593 42.7422L45.6085 46.5647C45.8421 46.9148 45.9762 47.3217 45.9966 47.742C46.0169 48.1623 45.9228 48.5803 45.7242 48.9513C45.5255 49.3223 45.2299 49.6324 44.8688 49.8485C44.5077 50.0645 44.0947 50.1785 43.6739 50.1782H22.3009C21.8802 50.1786 21.4673 50.0647 21.1064 49.8486C20.7454 49.6326 20.4499 49.3226 20.2514 48.9517C20.0529 48.5808 19.9588 48.163 19.9793 47.7428C19.9998 47.3226 20.134 46.9159 20.3676 46.5661L22.9169 42.7436H26.0381C26.0774 42.5445 26.1684 42.3593 26.302 42.2066C26.4356 42.0539 26.6071 41.939 26.7992 41.8737C26.9912 41.8083 27.1972 41.7947 27.3962 41.8342C27.5952 41.8737 27.7803 41.9649 27.9329 42.0987C28.0229 41.7513 28.2256 41.4435 28.5092 41.2235C28.7929 41.0036 29.1415 40.8839 29.5004 40.8832C30.4491 40.8832 31.2508 41.7082 31.1036 42.7422H34.4022C34.3672 42.4501 34.3946 42.1539 34.4827 41.8731C34.5707 41.5924 34.7175 41.3336 34.9132 41.1139C35.1088 40.8942 35.349 40.7185 35.6176 40.5987C35.8863 40.4788 36.1774 40.4173 36.4716 40.4185C37.2774 40.4185 37.969 40.8805 38.3183 41.5487C38.5292 41.422 38.77 41.3537 39.016 41.3506C39.2621 41.3476 39.5045 41.4099 39.7185 41.5314C39.9325 41.6528 40.1105 41.8289 40.2341 42.0416C40.3577 42.2544 40.4225 42.4962 40.422 42.7422H43.0593Z" fill="#6BAFFF"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_2030_1458">
                        <rect width="66" height="66" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                
                <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{{ specimen.sample_serial_no }}</h3>
                
                <span class="inline-flex px-3 sm:px-4 py-1 sm:py-1.5 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium">
                  {{ specimen.sample_category_id }}
                </span>
              </div>
            </div>
          </div>

          <!-- Scrollable Content -->
          <div class="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
            <!-- Specimen Details Grid -->
            <div class="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div class="flex justify-between items-center py-2 sm:py-3 border-b border-gray-200">
                  <span class="text-xs sm:text-sm font-medium text-gray-600">Sample Label</span>
                  <span class="text-xs sm:text-sm font-semibold text-gray-900">{{ specimen.sample_label || 'N/A' }}</span>
                </div>
                
                <div class="flex justify-between items-center py-2 sm:py-3 border-b border-gray-200">
                  <span class="text-xs sm:text-sm font-medium text-gray-600">Collection Date</span>
                  <span class="text-xs sm:text-sm font-semibold text-gray-900">{{ formatDate(specimen.collection_date) }}</span>
                </div>
                
                <div class="flex justify-between items-center py-2 sm:py-3 border-b border-gray-200">
                  <span class="text-xs sm:text-sm font-medium text-gray-600">Collection Time</span>
                  <span class="text-xs sm:text-sm font-semibold text-gray-900">{{ specimen.collection_time || 'N/A' }}</span>
                </div>
                
                <div class="flex justify-between items-center py-2 sm:py-3 border-b border-gray-200">
                  <span class="text-xs sm:text-sm font-medium text-gray-600">Field Collector</span>
                  <span class="text-xs sm:text-sm font-semibold text-gray-900">{{ specimen.field_collector_info || 'N/A' }}</span>
                </div>
                
                <div class="flex justify-between items-center py-2 sm:py-3 border-b border-gray-200">
                  <span class="text-xs sm:text-sm font-medium text-gray-600">Researcher</span>
                  <span class="text-xs sm:text-sm font-semibold text-gray-900">{{ specimen.researcher_info || 'N/A' }}</span>
                </div>

                <div class="flex justify-between items-center py-2 sm:py-3 border-b border-gray-200">
                  <span class="text-xs sm:text-sm font-medium text-gray-600">Site</span>
                  <span class="text-xs sm:text-sm font-semibold text-gray-900">{{ specimen.site_id || 'N/A' }}</span>
                </div>
                
                <div class="md:col-span-2 flex justify-between items-center py-2 sm:py-3 border-b border-gray-200">
                  <span class="text-xs sm:text-sm font-medium text-gray-600">Storage Location</span>
                  <span class="text-xs sm:text-sm font-semibold text-gray-900 text-right">{{ formatStorageLocation(specimen.storage_location) }}</span>
                </div>
              </div>
            </div>

            <!-- Tabs -->
            <div class="border-b border-gray-200 mb-4 sm:mb-6">
              <div class="flex gap-4 sm:gap-8 overflow-x-auto">
                <button 
                  @click="activeTab = 'clinical'"
                  :class="[
                    'pb-3 sm:pb-4 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap',
                    activeTab === 'clinical' 
                      ? 'text-blue-600 border-blue-600' 
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  ]"
                >
                  Clinical
                </button>
                <button 
                  @click="activeTab = 'demographic'"
                  :class="[
                    'pb-3 sm:pb-4 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap',
                    activeTab === 'demographic' 
                      ? 'text-blue-600 border-blue-600' 
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  ]"
                >
                  Demographic
                </button>
                <button 
                  @click="activeTab = 'epi'"
                  :class="[
                    'pb-3 sm:pb-4 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap',
                    activeTab === 'epi' 
                      ? 'text-blue-600 border-blue-600' 
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  ]"
                >
                  Epidemiological
                </button>
              </div>
            </div>

            <!-- Tab Content -->
            <Transition name="fade" mode="out-in">
              <!-- Clinical Information Tab -->
              <div v-if="activeTab === 'clinical'" class="space-y-4 sm:space-y-6">
                <h3 class="text-base font-bold text-gray-900 mb-3 sm:mb-4">Patient Clinical Data</h3>
                
                <div class="space-y-3 sm:space-y-4">
                  <div class="flex justify-between items-start py-2 sm:py-3 border-b border-gray-100">
                    <span class="text-xs sm:text-sm font-medium text-gray-600 w-1/3">Diagnosis</span>
                    <span class="text-xs sm:text-sm text-gray-900 w-2/3 text-right">{{ specimen.free_fields?.diagnosis || 'N/A' }}</span>
                  </div>
                  
                  <div class="flex justify-between items-start py-2 sm:py-3 border-b border-gray-100">
                    <span class="text-xs sm:text-sm font-medium text-gray-600 w-1/3">Treatment Status</span>
                    <span class="text-xs sm:text-sm text-gray-900 w-2/3 text-right">{{ specimen.free_fields?.treatmentStatus || 'N/A' }}</span>
                  </div>
                  
                  <div class="flex justify-between items-start py-2 sm:py-3 border-b border-gray-100">
                    <span class="text-xs sm:text-sm font-medium text-gray-600 w-1/3">Outcomes</span>
                    <span class="text-xs sm:text-sm text-gray-900 w-2/3 text-right">{{ specimen.free_fields?.outcomes || 'N/A' }}</span>
                  </div>
                </div>
              </div>

              <!-- Demographic Information Tab -->
              <div v-else-if="activeTab === 'demographic'" class="space-y-4 sm:space-y-6">
                <h3 class="text-base font-bold text-gray-900 mb-3 sm:mb-4">Patient Demographic Data</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div class="space-y-3 sm:space-y-4">
                    <div>
                      <label class="text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</label>
                      <p class="text-xs sm:text-sm font-semibold text-gray-900 mt-1">{{ formatDate(specimen.free_fields?.dateOfBirth) || 'N/A' }}</p>
                    </div>
                    
                    <div>
                      <label class="text-xs font-medium text-gray-500 uppercase tracking-wider">Age</label>
                      <p class="text-xs sm:text-sm font-semibold text-gray-900 mt-1">{{ specimen.free_fields?.age ? `${specimen.free_fields.age} years` : 'N/A' }}</p>
                    </div>
                    
                    <div>
                      <label class="text-xs font-medium text-gray-500 uppercase tracking-wider">Sex</label>
                      <p class="text-xs sm:text-sm font-semibold text-gray-900 mt-1">{{ specimen.free_fields?.sex || 'N/A' }}</p>
                    </div>
                  </div>
                  
                  <div class="space-y-3 sm:space-y-4">
                    <div>
                      <label class="text-xs font-medium text-gray-500 uppercase tracking-wider">Ethnicity</label>
                      <p class="text-xs sm:text-sm font-semibold text-gray-900 mt-1">{{ specimen.free_fields?.ethnicity || 'N/A' }}</p>
                    </div>
                    
                    <div>
                      <label class="text-xs font-medium text-gray-500 uppercase tracking-wider">Nationality</label>
                      <p class="text-xs sm:text-sm font-semibold text-gray-900 mt-1">{{ specimen.free_fields?.nationality || 'N/A' }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Epidemiological Information Tab -->
              <div v-else-if="activeTab === 'epi'" class="space-y-4 sm:space-y-6">
                <h3 class="text-base font-bold text-gray-900 mb-3 sm:mb-4">Epidemiological Information</h3>
                
                <div v-if="hasEpiData" class="space-y-3 sm:space-y-4">
                  <div v-if="specimen.free_fields?.history">
                    <label class="text-xs font-medium text-gray-500 uppercase tracking-wider">History</label>
                    <p class="text-xs sm:text-sm text-gray-900 mt-1">{{ specimen.free_fields.history }}</p>
                  </div>

                  <div v-if="specimen.free_fields?.riskFactors">
                    <label class="text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Factors</label>
                    <p class="text-xs sm:text-sm text-gray-900 mt-1">{{ specimen.free_fields.riskFactors }}</p>
                  </div>

                  <div v-if="hasGeolocation">
                    <label class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">Geolocation</label>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div v-if="specimen.free_fields?.geolocation?.country">
                        <span class="text-xs text-gray-500">Country:</span>
                        <p class="text-xs sm:text-sm font-semibold text-gray-900">{{ specimen.free_fields.geolocation.country }}</p>
                      </div>
                      <div v-if="specimen.free_fields?.geolocation?.state">
                        <span class="text-xs text-gray-500">State:</span>
                        <p class="text-xs sm:text-sm font-semibold text-gray-900">{{ specimen.free_fields.geolocation.state }}</p>
                      </div>
                      <div v-if="specimen.free_fields?.geolocation?.lga">
                        <span class="text-xs text-gray-500">LGA:</span>
                        <p class="text-xs sm:text-sm font-semibold text-gray-900">{{ specimen.free_fields.geolocation.lga }}</p>
                      </div>
                      <div v-if="specimen.free_fields?.geolocation?.city">
                        <span class="text-xs text-gray-500">City:</span>
                        <p class="text-xs sm:text-sm font-semibold text-gray-900">{{ specimen.free_fields.geolocation.city }}</p>
                      </div>
                      <div v-if="specimen.free_fields?.geolocation?.address" class="md:col-span-2">
                        <span class="text-xs text-gray-500">Address:</span>
                        <p class="text-xs sm:text-sm font-semibold text-gray-900">{{ specimen.free_fields.geolocation.address }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-else class="bg-gray-50 rounded-lg p-8 sm:p-12 text-center">
                  <Icon name="heroicons:document-text" class="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3" />
                  <p class="text-sm sm:text-base text-gray-500">No epidemiological data available</p>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Fixed Footer -->
          <div class="flex-shrink-0 p-4 sm:p-6 md:p-8 border-t border-gray-100">
            <div class="flex justify-end gap-2 sm:gap-3">
              <button 
                @click="close"
                class="px-4 py-2 sm:px-6 sm:py-3 border border-gray-300 text-gray-700 rounded-lg transition hover:bg-gray-50 text-xs sm:text-sm font-medium"
              >
                Close
              </button>
              <button 
                @click="editSpecimen"
                class="px-4 py-2 sm:px-6 sm:py-3 bg-[#005B8F] text-white rounded-lg transition flex items-center gap-2 shadow-md hover:bg-[#004a73] text-xs sm:text-sm"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5">
                  <path d="M18.988 2.01221L21.988 5.01221L19.701 7.30021L16.701 4.30021L18.988 2.01221ZM8 16.0002H11L18.287 8.71321L15.287 5.71321L8 13.0002V16.0002Z" fill="white"/>
                  <path d="M19 19H8.158C8.132 19 8.105 19.01 8.079 19.01C8.046 19.01 8.013 19.001 7.979 19H5V5H11.847L13.847 3H5C3.897 3 3 3.896 3 5V19C3 20.104 3.897 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V10.332L19 12.332V19Z" fill="white"/>
                </svg>
                <span class="font-medium">Edit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
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

const props = defineProps<{
  modelValue: boolean;
  specimen: BioSpecimen | null;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'edit': [specimen: BioSpecimen];
}>();

const activeTab = ref<'clinical' | 'demographic' | 'epi'>('clinical');

const hasEpiData = computed(() => {
  if (!props.specimen?.free_fields) return false;
  return !!(
    props.specimen.free_fields.history ||
    props.specimen.free_fields.riskFactors ||
    hasGeolocation.value
  );
});

const hasGeolocation = computed(() => {
  if (!props.specimen?.free_fields?.geolocation) return false;
  const geo = props.specimen.free_fields.geolocation;
  return !!(geo.country || geo.state || geo.lga || geo.city || geo.address);
});

const formatStorageLocation = (location: StorageLocation | null): string => {
  if (!location) return 'N/A';
  
  const parts = [];
  if (location.freezer) parts.push(`Freezer: ${location.freezer}`);
  if (location.rack) parts.push(`Rack: ${location.rack}`);
  if (location.box) parts.push(`Box: ${location.box}`);
  if (location.position) {
    const row = String.fromCharCode(65 + Math.floor((location.position - 1) / 10));
    const col = ((location.position - 1) % 10) + 1;
    parts.push(`Position: ${row}${col}`);
  }
  
  return parts.length > 0 ? parts.join(', ') : 'N/A';
};

const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
};

const downloadSpecimen = () => {
  if (!props.specimen) return;

  const data = {
    basic_information: {
      sample_serial_no: props.specimen.sample_serial_no,
      sample_label: props.specimen.sample_label,
      sample_type: props.specimen.sample_category_id,
      site: props.specimen.site_id,
      collection_date: props.specimen.collection_date,
      collection_time: props.specimen.collection_time,
      researcher: props.specimen.researcher_info,
      field_collector: props.specimen.field_collector_info,
      status: props.specimen.status
    },
    storage_location: props.specimen.storage_location,
    clinical_data: {
      diagnosis: props.specimen.free_fields?.diagnosis,
      treatment_status: props.specimen.free_fields?.treatmentStatus,
      outcomes: props.specimen.free_fields?.outcomes
    },
    demographic_data: {
      date_of_birth: props.specimen.free_fields?.dateOfBirth,
      age: props.specimen.free_fields?.age,
      sex: props.specimen.free_fields?.sex,
      ethnicity: props.specimen.free_fields?.ethnicity,
      nationality: props.specimen.free_fields?.nationality
    },
    epidemiological_data: {
      history: props.specimen.free_fields?.history,
      risk_factors: props.specimen.free_fields?.riskFactors,
      geolocation: props.specimen.free_fields?.geolocation
    }
  };

  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `biospecimen_${props.specimen.sample_serial_no}_${new Date().toISOString().split('T')[0]}.json`;
  link.click();
};

const editSpecimen = () => {
  if (props.specimen) {
    emit('edit', props.specimen);
    close();
  }
};

const close = () => {
  activeTab.value = 'clinical';
  emit('update:modelValue', false);
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Custom scrollbar styling */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>
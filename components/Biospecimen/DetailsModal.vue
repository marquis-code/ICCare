<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="modelValue && specimen" 
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @click.self="close"
      >
        <div class="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] shadow-2xl transform transition-all flex flex-col">
          <!-- Fixed Header -->
          <div class="p-6 md:p-8 flex-shrink-0 border-b border-gray-100">
            <!-- Header -->
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-4">
                <button 
                  @click="close"
                  class="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <Icon name="heroicons:arrow-left" class="w-6 h-6 text-gray-600" />
                </button>
                <h2 class="text-2xl font-bold text-gray-900">Biospecimen Details</h2>
              </div>
              <button class="px-4 py-2.5 bg-[#005B8F] text-white rounded-lg transition flex items-center gap-2 shadow-md">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97933 19.8043 4.588 19.413C4.19667 19.0217 4.00067 18.5507 4 18V15H6V18H18V15H20V18C20 18.55 19.8043 19.021 19.413 19.413C19.0217 19.805 18.5507 20.0007 18 20H6Z" fill="white"/>
                </svg>
                <span class="text-sm font-medium">Download Biosample</span>
              </button>
            </div>

            <!-- Specimen Info Card -->
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div class="flex flex-col items-center text-center">
                <div class="rounded-full flex items-center justify-center mb-3">
                 <svg width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_2030_1458)">
                  <path d="M32.998 65.9946C51.2237 65.9946 65.998 51.2203 65.998 32.9946C65.998 14.769 51.2237 -0.00537109 32.998 -0.00537109C14.7724 -0.00537109 -0.00195312 14.769 -0.00195312 32.9946C-0.00195312 51.2203 14.7724 65.9946 32.998 65.9946Z" fill="#DEEEFF"/>
                  <path d="M49.2949 47.5312L36.0509 27.9595L39.5984 20.9951H26.3984L29.9459 27.9595L16.7019 47.5312C16.4012 47.983 16.2287 48.5079 16.2027 49.0499C16.1767 49.592 16.2982 50.131 16.5543 50.6094C16.8104 51.0879 17.1915 51.4879 17.6569 51.7669C18.1224 52.046 18.6548 52.1935 19.1975 52.1939H46.7979C47.3408 52.1937 47.8735 52.0462 48.3391 51.7671C48.8048 51.488 49.186 51.0878 49.4422 50.6091C49.6983 50.1304 49.8198 49.5912 49.7936 49.0489C49.7674 48.5067 49.5946 47.9816 49.2935 47.5299" fill="#2E3ECD"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M43.0593 42.7422L45.6085 46.5647C45.8421 46.9148 45.9762 47.3217 45.9966 47.742C46.0169 48.1623 45.9228 48.5803 45.7242 48.9513C45.5255 49.3223 45.2299 49.6324 44.8688 49.8485C44.5077 50.0645 44.0947 50.1785 43.6739 50.1782H22.3009C21.8802 50.1786 21.4673 50.0647 21.1064 49.8486C20.7454 49.6326 20.4499 49.3226 20.2514 48.9517C20.0529 48.5808 19.9588 48.163 19.9793 47.7428C19.9998 47.3226 20.134 46.9159 20.3676 46.5661L22.9169 42.7436H26.0381C26.0774 42.5445 26.1684 42.3593 26.302 42.2066C26.4356 42.0539 26.6071 41.939 26.7992 41.8737C26.9912 41.8083 27.1972 41.7947 27.3962 41.8342C27.5952 41.8737 27.7803 41.9649 27.9329 42.0987C28.0229 41.7513 28.2256 41.4435 28.5092 41.2235C28.7929 41.0036 29.1415 40.8839 29.5004 40.8832C30.4491 40.8832 31.2508 41.7082 31.1036 42.7422H34.4022C34.3672 42.4501 34.3946 42.1539 34.4827 41.8731C34.5707 41.5924 34.7175 41.3336 34.9132 41.1139C35.1088 40.8942 35.349 40.7185 35.6176 40.5987C35.8863 40.4788 36.1774 40.4173 36.4716 40.4185C37.2774 40.4185 37.969 40.8805 38.3183 41.5487C38.5292 41.422 38.77 41.3537 39.016 41.3506C39.2621 41.3476 39.5045 41.4099 39.7185 41.5314C39.9325 41.6528 40.1105 41.8289 40.2341 42.0416C40.3577 42.2544 40.4225 42.4962 40.422 42.7422H43.0593Z" fill="#6BAFFF"/>
                  <path d="M29.5981 18.5927C29.9163 18.5927 30.2214 18.4663 30.4464 18.2414C30.6714 18.0164 30.7978 17.7112 30.7978 17.393C30.7978 17.0749 30.6714 16.7697 30.4464 16.5447C30.2214 16.3198 29.9163 16.1934 29.5981 16.1934C29.2799 16.1934 28.9748 16.3198 28.7498 16.5447C28.5248 16.7697 28.3984 17.0749 28.3984 17.393C28.3984 17.7112 28.5248 18.0164 28.7498 18.2414C28.9748 18.4663 29.2799 18.5927 29.5981 18.5927ZM43.9971 23.3929C44.3151 23.3929 44.6201 23.2665 44.8449 23.0417C45.0698 22.8168 45.1961 22.5119 45.1961 22.1939C45.1961 21.8759 45.0698 21.5709 44.8449 21.346C44.6201 21.1212 44.3151 20.9949 43.9971 20.9949C43.6791 20.9949 43.3742 21.1212 43.1493 21.346C42.9244 21.5709 42.7981 21.8759 42.7981 22.1939C42.7981 22.5119 42.9244 22.8168 43.1493 23.0417C43.3742 23.2665 43.6791 23.3929 43.9971 23.3929Z" fill="#2E3ECD"/>
                  <path d="M36.5981 38.9936C36.9163 38.9936 37.2214 38.8672 37.4464 38.6422C37.6714 38.4172 37.7978 38.1121 37.7978 37.7939C37.7978 37.4757 37.6714 37.1706 37.4464 36.9456C37.2214 36.7206 36.9163 36.5942 36.5981 36.5942C36.2799 36.5942 35.9748 36.7206 35.7498 36.9456C35.5248 37.1706 35.3984 37.4757 35.3984 37.7939C35.3984 38.1121 35.5248 38.4172 35.7498 38.6422C35.9748 38.8672 36.2799 38.9936 36.5981 38.9936Z" fill="#6BAFFF"/>
                  <path d="M40.3974 18.5942C41.0338 18.5942 41.6441 18.3414 42.094 17.8914C42.544 17.4414 42.7968 16.8311 42.7968 16.1948C42.7968 15.5584 42.544 14.9481 42.094 14.4982C41.6441 14.0482 41.0338 13.7954 40.3974 13.7954C39.7611 13.7954 39.1508 14.0482 38.7008 14.4982C38.2508 14.9481 37.998 15.5584 37.998 16.1948C37.998 16.8311 38.2508 17.4414 38.7008 17.8914C39.1508 18.3414 39.7611 18.5942 40.3974 18.5942Z" fill="#2E3ECD"/>
                  <path d="M29.398 38.9953C30.0347 38.9953 30.6453 38.7424 31.0956 38.2922C31.5458 37.842 31.7987 37.2313 31.7987 36.5946C31.7987 35.9579 31.5458 35.3472 31.0956 34.897C30.6453 34.4468 30.0347 34.1938 29.398 34.1938C28.7714 34.2088 28.1755 34.4683 27.7377 34.9168C27.2998 35.3652 27.0547 35.9671 27.0547 36.5939C27.0547 37.2207 27.2998 37.8226 27.7377 38.2711C28.1755 38.7195 28.7714 38.979 29.398 38.994" fill="#6BAFFF"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_2030_1458">
                  <rect width="66" height="66" fill="white"/>
                  </clipPath>
                  </defs>
                </svg>
                </div>
                
                <h3 class="text-2xl font-bold text-gray-900 mb-2">MH-2024-00234</h3>
                
                <span class="inline-flex px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Serum
                </span>
              </div>
            </div>
          </div>

          <!-- Scrollable Content -->
          <div class="flex-1 overflow-y-auto p-6 md:p-8">
            <!-- Specimen Details Grid -->
            <div class="space-y-6 mb-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex justify-between items-center py-3 border-b border-gray-200">
                  <span class="text-sm font-medium text-gray-600">Volume</span>
                  <span class="text-sm font-semibold text-gray-900">50mL</span>
                </div>
                
                <div class="flex justify-between items-center py-3 border-b border-gray-200">
                  <span class="text-sm font-medium text-gray-600">Collection Date</span>
                  <span class="text-sm font-semibold text-gray-900">Jan 15, 2024</span>
                </div>
                
                <div class="flex justify-between items-center py-3 border-b border-gray-200">
                  <span class="text-sm font-medium text-gray-600">Collection Time</span>
                  <span class="text-sm font-semibold text-gray-900">09:00 AM</span>
                </div>
                
                <div class="flex justify-between items-center py-3 border-b border-gray-200">
                  <span class="text-sm font-medium text-gray-600">Collector</span>
                  <span class="text-sm font-semibold text-gray-900">Dr, John Mackins</span>
                </div>
                
                <div class="md:col-span-2 flex justify-between items-center py-3 border-b border-gray-200">
                  <span class="text-sm font-medium text-gray-600">Storage Location</span>
                  <span class="text-sm font-semibold text-gray-900">Freezer A-001, Rack2-B, Box 047,</span>
                </div>
              </div>
            </div>

            <!-- Tabs -->
            <div class="border-b border-gray-200 mb-6">
              <div class="flex gap-8">
                <button 
                  @click="activeTab = 'clinical'"
                  :class="[
                    'pb-4 text-sm font-semibold transition-all border-b-2',
                    activeTab === 'clinical' 
                      ? 'text-blue-600 border-blue-600' 
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  ]"
                >
                  Clinical Information
                </button>
                <button 
                  @click="activeTab = 'demographic'"
                  :class="[
                    'pb-4 text-sm font-semibold transition-all border-b-2',
                    activeTab === 'demographic' 
                      ? 'text-blue-600 border-blue-600' 
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  ]"
                >
                  Demographic Information
                </button>
                <button 
                  @click="activeTab = 'epi'"
                  :class="[
                    'pb-4 text-sm font-semibold transition-all border-b-2',
                    activeTab === 'epi' 
                      ? 'text-blue-600 border-blue-600' 
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  ]"
                >
                  EpiInformation
                </button>
              </div>
            </div>

            <!-- Tab Content -->
            <Transition name="fade" mode="out-in">
              <!-- Clinical Information Tab -->
              <div v-if="activeTab === 'clinical'" class="space-y-6">
                <h3 class="text-lg font-bold text-gray-900 mb-4">Patient Clinical Data</h3>
                
                <div class="space-y-4">
                  <div class="flex justify-between items-start py-3 border-b border-gray-100">
                    <span class="text-sm font-medium text-gray-600 w-1/3">Diagnosis</span>
                    <span class="text-sm text-gray-900 w-2/3 text-right">Type 2 Diabetes Vellite</span>
                  </div>
                  
                  <div class="flex justify-between items-start py-3 border-b border-gray-100">
                    <span class="text-sm font-medium text-gray-600 w-1/3">Treatment Status</span>
                    <span class="text-sm text-gray-900 w-2/3 text-right">Ongoing</span>
                  </div>
                  
                  <div class="flex justify-between items-start py-3 border-b border-gray-100">
                    <span class="text-sm font-medium text-gray-600 w-1/3">Comorbidities</span>
                    <span class="text-sm text-gray-900 w-2/3 text-right">Hypertension, Obesity</span>
                  </div>
                  
                  <div class="flex justify-between items-start py-3 border-b border-gray-100">
                    <span class="text-sm font-medium text-gray-600 w-1/3">Medication</span>
                    <span class="text-sm text-gray-900 w-2/3 text-right">Metformin 500mg</span>
                  </div>
                  
                  <div class="flex justify-between items-start py-3 border-b border-gray-100">
                    <span class="text-sm font-medium text-gray-600 w-1/3">Clinical Notes</span>
                    <span class="text-sm text-gray-900 w-2/3 text-right">Patient presents with well-controlled glucose levels with current medication regimen. Continue monitoring HbA1c quarterly.</span>
                  </div>
                  
                  <div class="flex justify-between items-start py-3">
                    <span class="text-sm font-medium text-gray-600 w-1/3">Attending Physician</span>
                    <span class="text-sm text-gray-900 w-2/3 text-right">Dr. James Wilson</span>
                  </div>
                </div>
              </div>

              <!-- Demographic Information Tab -->
              <div v-else-if="activeTab === 'demographic'" class="space-y-6">
                <h3 class="text-lg font-bold text-gray-900 mb-4">Patient Demographic Data</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-4">
                    <div>
                      <label class="text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</label>
                      <p class="text-sm font-semibold text-gray-900 mt-1">March 15, 1978</p>
                    </div>
                    
                    <div>
                      <label class="text-xs font-medium text-gray-500 uppercase tracking-wider">Age</label>
                      <p class="text-sm font-semibold text-gray-900 mt-1">46 years</p>
                    </div>
                    
                    <div>
                      <label class="text-xs font-medium text-gray-500 uppercase tracking-wider">Sex</label>
                      <p class="text-sm font-semibold text-gray-900 mt-1">Male</p>
                    </div>
                  </div>
                  
                  <div class="space-y-4">
                    <div>
                      <label class="text-xs font-medium text-gray-500 uppercase tracking-wider">Ethnicity</label>
                      <p class="text-sm font-semibold text-gray-900 mt-1">Caucasian</p>
                    </div>
                    
                    <div>
                      <label class="text-xs font-medium text-gray-500 uppercase tracking-wider">Nationality</label>
                      <p class="text-sm font-semibold text-gray-900 mt-1">American</p>
                    </div>
                    
                    <div>
                      <label class="text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Type</label>
                      <p class="text-sm font-semibold text-gray-900 mt-1">O+</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Epi Information Tab -->
              <div v-else-if="activeTab === 'epi'" class="space-y-6">
                <h3 class="text-lg font-bold text-gray-900 mb-4">Epidemiological Information</h3>
                
                <div class="bg-gray-50 rounded-lg p-6 text-center">
                  <Icon name="heroicons:document-text" class="w-16 h-16 text-gray-300 mx-auto mb-3" />
                  <p class="text-gray-500">No epidemiological data available</p>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Fixed Footer -->
          <div class="flex-shrink-0 p-6 md:p-8 border-t border-gray-100">
            <div class="flex justify-end">
              <button class="px-6 py-3 bg-[#005B8F] text-white rounded-lg transition flex items-center gap-2 shadow-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
import type { BioSpecimen } from '~/types/biospecimen';

const props = defineProps<{
  modelValue: boolean;
  specimen: BioSpecimen | null;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const activeTab = ref<'clinical' | 'demographic' | 'epi'>('clinical');

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
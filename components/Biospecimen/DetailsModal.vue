<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="modelValue && specimen" 
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
        @click.self="close"
      >
        <div class="bg-white rounded-xl max-w-3xl w-full my-8 shadow-2xl transform transition-all">
          <div class="p-6 md:p-8">
            <!-- Header -->
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center gap-4">
                <button 
                  @click="close"
                  class="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <Icon name="heroicons:arrow-left" class="w-6 h-6 text-gray-600" />
                </button>
                <h2 class="text-2xl font-bold text-gray-900">Biospecimen Details</h2>
              </div>
              <button class="px-4 py-2.5 bg-[#005B8F] text-white rounded-lg  transition flex items-center gap-2 shadow-md">
                <Icon name="heroicons:arrow-down-tray" class="w-5 h-5" />
                <span class="text-sm font-medium">Download Biosample</span>
              </button>
            </div>

            <!-- Specimen Info Card -->
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 mb-8 border border-blue-100">
              <div class="flex flex-col items-center text-center">
                <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Icon name="heroicons:beaker" class="w-10 h-10 text-blue-600" />
                </div>
                
                <h3 class="text-2xl font-bold text-gray-900 mb-2">MH-2024-00234</h3>
                
                <span class="inline-flex px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Serum
                </span>
              </div>
            </div>

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

            <!-- Edit Button -->
            <div class="mt-8 pt-6 border-t border-gray-200 flex justify-end">
              <button class="px-6 py-3 bg-[#005B8F] text-white rounded-lg  transition flex items-center gap-2 shadow-md">
                <Icon name="heroicons:pencil-square" class="w-5 h-5" />
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
</style>
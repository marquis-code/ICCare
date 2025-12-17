<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="modelValue" 
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
        @click.self="close"
      >
        <div class="bg-white rounded-xl max-w-4xl w-full my-8 shadow-2xl transform transition-all">
          <div class="p-6 md:p-8">
            <!-- Header -->
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Icon name="heroicons:beaker" class="w-7 h-7 text-blue-600" />
                </div>
                <h2 class="text-2xl md:text-3xl font-bold text-gray-900">Register New Biospecimen</h2>
              </div>
              <button 
                @click="close" 
                class="text-gray-400 hover:text-gray-600 transition p-2 hover:bg-gray-100 rounded-lg"
              >
                <Icon name="heroicons:x-mark" class="w-6 h-6" />
              </button>
            </div>

            <!-- Progress Steps -->
            <div class="mb-10">
              <div class="flex items-center justify-between relative">
                <!-- Step 1 -->
                <div class="flex flex-col items-center flex-1 relative z-10">
                  <div 
                    :class="[
                      'w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300',
                      currentStep >= 1 ? 'bg-green-600 text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-600'
                    ]"
                  >
                    <Icon v-if="currentStep > 1" name="heroicons:check" class="w-7 h-7" />
                    <span v-else>1</span>
                  </div>
                  <span class="mt-2 text-xs md:text-sm font-medium text-gray-700">Basic Info</span>
                </div>
                
                <!-- Connector 1 -->
                <div class="flex-1 h-1 mx-4 relative" style="top: -20px;">
                  <div 
                    :class="[
                      'h-full rounded-full transition-all duration-500',
                      currentStep >= 2 ? 'bg-green-600' : 'bg-gray-200'
                    ]"
                  ></div>
                </div>
                
                <!-- Step 2 -->
                <div class="flex flex-col items-center flex-1 relative z-10">
                  <div 
                    :class="[
                      'w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300',
                      currentStep >= 2 ? 'bg-green-600 text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-600'
                    ]"
                  >
                    <Icon v-if="currentStep > 2" name="heroicons:check" class="w-7 h-7" />
                    <span v-else>2</span>
                  </div>
                  <span class="mt-2 text-xs md:text-sm font-medium text-gray-700">Storage</span>
                </div>
                
                <!-- Connector 2 -->
                <div class="flex-1 h-1 mx-4 relative" style="top: -20px;">
                  <div 
                    :class="[
                      'h-full rounded-full transition-all duration-500',
                      currentStep >= 3 ? 'bg-green-600' : 'bg-gray-200'
                    ]"
                  ></div>
                </div>
                
                <!-- Step 3 -->
                <div class="flex flex-col items-center flex-1 relative z-10">
                  <div 
                    :class="[
                      'w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300',
                      currentStep >= 3 ? 'bg-green-600 text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-600'
                    ]"
                  >
                    3
                  </div>
                  <span class="mt-2 text-xs md:text-sm font-medium text-gray-700">Dataset</span>
                </div>
              </div>
            </div>

            <!-- Step 1: Basic Info -->
            <Transition name="fade" mode="out-in">
              <div v-if="currentStep === 1" key="step1" class="space-y-6">
                <h3 class="text-xl font-semibold text-gray-900 border-b pb-3">Basic Information</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Sample ID <span class="text-red-500">*</span>
                    </label>
                    <input 
                      v-model="formData.sampleId"
                      type="text" 
                      placeholder="e.g. MH-2024-0001"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Sample Type <span class="text-red-500">*</span>
                    </label>
                    <select 
                      v-model="formData.sampleType"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    >
                      <option value="">Select type...</option>
                      <option value="serum">Serum</option>
                      <option value="plasma">Plasma</option>
                      <option value="tissue">Tissue</option>
                      <option value="blood">Blood</option>
                      <option value="urine">Urine</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Collection Date <span class="text-red-500">*</span>
                    </label>
                    <input 
                      v-model="formData.collectionDate"
                      type="date" 
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Collector Information <span class="text-red-500">*</span>
                    </label>
                    <input 
                      v-model="formData.collectorInfo"
                      type="text" 
                      placeholder="e.g. Dr. John Smith"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>
                </div>
              </div>
            </Transition>

            <!-- Step 2: Storage Location -->
            <Transition name="fade" mode="out-in">
              <div v-if="currentStep === 2" key="step2" class="space-y-6">
                <h3 class="text-xl font-semibold text-gray-900 border-b pb-3">Storage Location</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Site <span class="text-red-500">*</span>
                    </label>
                    <select 
                      v-model="formData.site"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    >
                      <option value="">Select site...</option>
                      <option value="memorial">Memorial Hospital</option>
                      <option value="central">Central Lab</option>
                      <option value="research">Research Facility</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Freezer <span class="text-red-500">*</span>
                    </label>
                    <select 
                      v-model="formData.freezer"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    >
                      <option value="">Select freezer...</option>
                      <option value="freezer-a-301">Freezer A-301</option>
                      <option value="freezer-b-105">Freezer B-105</option>
                      <option value="freezer-c-202">Freezer C-202</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Rack <span class="text-red-500">*</span>
                    </label>
                    <select 
                      v-model="formData.rack"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    >
                      <option value="">Select rack...</option>
                      <option value="rack-1-a">Rack 1-A</option>
                      <option value="rack-2-b">Rack 2-B</option>
                      <option value="rack-3-c">Rack 3-C</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Box <span class="text-red-500">*</span>
                    </label>
                    <select 
                      v-model="formData.box"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    >
                      <option value="">Select box...</option>
                      <option value="box-01">Box 01</option>
                      <option value="box-02">Box 02</option>
                      <option value="box-03">Box 03</option>
                    </select>
                  </div>
                </div>

                <!-- Storage Grid -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-3">
                    Select Position <span class="text-red-500">*</span>
                  </label>
                  
                  <div class="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                    <div class="text-xs text-gray-600 flex items-center gap-1 flex-wrap">
                      <span>Memorial Hospital</span>
                      <Icon name="heroicons:chevron-right" class="w-3 h-3" />
                      <span>Freezer A-301</span>
                      <Icon name="heroicons:chevron-right" class="w-3 h-3" />
                      <span>Rack 2-B</span>
                      <Icon name="heroicons:chevron-right" class="w-3 h-3" />
                      <span>Box G47</span>
                      <Icon name="heroicons:chevron-right" class="w-3 h-3" />
                      <span class="font-semibold text-blue-600">{{ formData.selectedPosition || 'Select Position' }}</span>
                    </div>
                  </div>
                  
                  <div class="overflow-x-auto pb-4">
                    <div class="inline-block min-w-full">
                      <div class="grid gap-2 mb-6">
                        <div v-for="row in ['A', 'B', 'C', 'D', 'E']" :key="row" class="flex gap-2">
                          <button
                            v-for="col in 10"
                            :key="`${row}${col}`"
                            type="button"
                            @click="selectPosition(`${row}${col}`)"
                            :class="[
                              'w-10 h-10 md:w-12 md:h-12 text-xs font-bold rounded-lg border-2 transition-all duration-200 transform hover:scale-105',
                              formData.selectedPosition === `${row}${col}`
                                ? 'bg-blue-600 text-white border-blue-700 shadow-lg scale-110'
                                : isPositionOccupied(row, col)
                                ? 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed opacity-60'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:shadow-md'
                            ]"
                            :disabled="isPositionOccupied(row, col)"
                          >
                            {{ row }}{{ col }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Legend -->
                  <div class="flex flex-wrap gap-6 text-sm bg-white p-4 rounded-lg border border-gray-200">
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 bg-white border-2 border-gray-300 rounded-lg"></div>
                      <span class="text-gray-700">Available</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 bg-gray-300 border-2 border-gray-400 rounded-lg"></div>
                      <span class="text-gray-700">Occupied</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 bg-blue-600 border-2 border-blue-700 rounded-lg"></div>
                      <span class="text-gray-700">Selected</span>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>

            <!-- Step 3: Add Dataset -->
            <Transition name="fade" mode="out-in">
              <div v-if="currentStep === 3" key="step3" class="space-y-8">
                <!-- Clinical Data -->
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 border-b pb-3 mb-5">Patient Clinical Data</h3>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">Diagnosis</label>
                      <input 
                        v-model="formData.diagnosis"
                        type="text" 
                        placeholder="e.g. Type 2 Diabetes"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      />
                    </div>
                    
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">Treatment Status</label>
                      <input 
                        v-model="formData.treatmentStatus"
                        type="text" 
                        placeholder="e.g. Ongoing"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      />
                    </div>
                    
                    <div class="md:col-span-2">
                      <label class="block text-sm font-semibold text-gray-700 mb-2">Outcomes</label>
                      <textarea 
                        v-model="formData.outcomes"
                        placeholder="Enter clinical outcomes and observations..."
                        rows="4"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <!-- Demographic Data -->
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 border-b pb-3 mb-5">Patient Demographic Data</h3>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                      <input 
                        v-model="formData.dateOfBirth"
                        type="date" 
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      />
                    </div>
                    
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                      <input 
                        v-model="formData.age"
                        type="number" 
                        placeholder="e.g. 45"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      />
                    </div>
                    
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">Sex</label>
                      <select 
                        v-model="formData.sex"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      >
                        <option value="">Select...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">Ethnicity</label>
                      <input 
                        v-model="formData.ethnicity"
                        type="text" 
                        placeholder="e.g. Caucasian"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      />
                    </div>
                    
                    <div class="md:col-span-2">
                      <label class="block text-sm font-semibold text-gray-700 mb-2">Nationality</label>
                      <input 
                        v-model="formData.nationality"
                        type="text" 
                        placeholder="e.g. Nigerian"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Transition>

            <!-- Navigation Buttons -->
            <div class="flex justify-between mt-10 pt-6 border-t border-gray-200">
              <button 
                v-if="currentStep > 1"
                type="button"
                @click="previousStep"
                class="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium flex items-center gap-2"
              >
                <Icon name="heroicons:arrow-left" class="w-5 h-5" />
                <span>Back</span>
              </button>
              <button 
                v-else
                type="button"
                @click="close"
                class="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium"
              >
                Cancel
              </button>
              
              <button 
                v-if="currentStep < 3"
                type="button"
                @click="nextStep"
                class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <span>Next Step</span>
                <Icon name="heroicons:arrow-right" class="w-5 h-5" />
              </button>
              <button 
                v-else
                type="button"
                @click="save"
                class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Icon name="heroicons:check" class="w-5 h-5" />
                <span>Save Biospecimen</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { NewSpecimenData } from '~/types/biospecimen';

// Props
const props = defineProps<{
  modelValue: boolean;
}>();

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'saved': [data: NewSpecimenData];
}>();

// State
const currentStep = ref(1);

const formData = ref<NewSpecimenData>({
  sampleId: '',
  sampleType: '',
  collectionDate: '',
  collectorInfo: '',
  site: '',
  freezer: '',
  rack: '',
  box: '',
  selectedPosition: '',
  diagnosis: '',
  treatmentStatus: '',
  outcomes: '',
  dateOfBirth: '',
  age: '',
  sex: '',
  ethnicity: '',
  nationality: ''
});

// Simulated occupied positions (replace with actual data from API)
const occupiedPositions = ref(new Set(['A3', 'B5', 'C7', 'D2', 'E9', 'A8', 'C2', 'D7', 'E3']));

// Methods
const isPositionOccupied = (row: string, col: number): boolean => {
  return occupiedPositions.value.has(`${row}${col}`);
};

const selectPosition = (position: string) => {
  formData.value.selectedPosition = position;
};

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++;
    // Scroll to top of modal
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
    // Scroll to top of modal
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const close = () => {
  currentStep.value = 1;
  // Reset form data
  formData.value = {
    sampleId: '',
    sampleType: '',
    collectionDate: '',
    collectorInfo: '',
    site: '',
    freezer: '',
    rack: '',
    box: '',
    selectedPosition: '',
    diagnosis: '',
    treatmentStatus: '',
    outcomes: '',
    dateOfBirth: '',
    age: '',
    sex: '',
    ethnicity: '',
    nationality: ''
  };
  emit('update:modelValue', false);
};

const save = () => {
  // Validate form data here if needed
  console.log('Saving biospecimen:', formData.value);
  
  // Emit the saved event with form data
  emit('saved', formData.value);
  
  // Close modal
  close();
};
</script>

<style scoped>
/* Modal animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Step transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Ensure modal content is scrollable */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
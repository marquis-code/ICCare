
<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="modelValue" 
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
        @click.self="close"
      >
        <div class="bg-white rounded-xl max-w-2xl w-full my-8 shadow-2xl transform transition-all">
          <div class="p-6 md:p-8">
            <!-- Header -->
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full flex items-center justify-center">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.75 20.25V15.75H15.75L12 11.25L8.25 15.75H11.25V20.25H7.5V20.2125C7.374 20.22 7.254 20.25 7.125 20.25C5.63316 20.25 4.20242 19.6574 3.14752 18.6025C2.09263 17.5476 1.5 16.1168 1.5 14.625C1.5 11.739 3.6825 9.387 6.483 9.0645C6.72854 7.78094 7.41368 6.62306 8.42057 5.79001C9.42746 4.95696 10.6932 4.5008 12 4.5C13.307 4.50072 14.5729 4.95682 15.5801 5.78985C16.5872 6.62289 17.2727 7.78081 17.5185 9.0645C20.319 9.387 22.4985 11.739 22.4985 14.625C22.4985 16.1168 21.9059 17.5476 20.851 18.6025C19.7961 19.6574 18.3653 20.25 16.8735 20.25C16.7475 20.25 16.626 20.22 16.4985 20.2125V20.25H12.75Z" fill="#005B8F"/>
                </svg>
                </div>
                <h2 class="text-xl font-medium text-[#033958]">Register New Biospecimen</h2>
              </div>
              <button 
                @click="close" 
                class="text-gray-400 hover:text-gray-600 transition p-2 hover:bg-gray-100 rounded-lg"
                :disabled="loading"
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
                      currentStep >= 1 ? 'bg-[#005B8F] text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-600'
                    ]"
                  >
                    <Icon v-if="currentStep > 1" name="heroicons:check" class="w-7 h-7" />
                    <span v-else>1</span>
                  </div>
                  <span class="mt-2 text-xs md:text-sm font-medium text-gray-700">Basic Info</span>
                </div>
                
                <!-- Connector 1 -->
                <div class="flex-1 h-[0.5px] mx-4 relative" style="top: -20px;">
                  <div 
                    :class="[
                      'h-full rounded-full transition-all duration-500',
                      currentStep >= 2 ? 'bg-[#005B8F]' : 'bg-gray-200'
                    ]"
                  ></div>
                </div>
                
                <!-- Step 2 -->
                <div class="flex flex-col items-center flex-1 relative z-10">
                  <div 
                    :class="[
                      'w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300',
                      currentStep >= 2 ? 'bg-[#005B8F] text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-600'
                    ]"
                  >
                    <Icon v-if="currentStep > 2" name="heroicons:check" class="w-7 h-7" />
                    <span v-else>2</span>
                  </div>
                  <span class="mt-2 text-xs md:text-sm font-medium text-gray-700">Storage</span>
                </div>
                
                <!-- Connector 2 -->
                <div class="flex-1 h-[0.5px] mx-4 relative" style="top: -20px;">
                  <div 
                    :class="[
                      'h-full rounded-full transition-all duration-500',
                      currentStep >= 3 ? 'bg-[#005B8F]' : 'bg-gray-200'
                    ]"
                  ></div>
                </div>
                
                <!-- Step 3 -->
                <div class="flex flex-col items-center flex-1 relative z-10">
                  <div 
                    :class="[
                      'w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300',
                      currentStep >= 3 ? 'bg-[#005B8F] text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-600'
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
                <h3 class="text-lg font-medium text-[#033958] border-b pb-3">Basic Information</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Sample ID <span class="text-red-500">*</span>
                    </label>
                    <input 
                      v-model="formData.sample_serial_no"
                      type="text" 
                      placeholder="e.g. MH-2024-0001"
                      class="custom-input"
                      :disabled="loading"
                    />
                  </div>
                  
                  <div>
                    <UiSelectInput 
                      label="Sample Type" 
                      :options="sampleTypes" 
                      position="standalone" 
                      v-model="formData.sample_category_id"
                      :disabled="loading"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Sample Label <span class="text-red-500">*</span>
                    </label>
                    <input 
                      v-model="formData.sample_label"
                      type="text" 
                      placeholder="e.g. Patient Sample A"
                      class="custom-input"
                      :disabled="loading"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Collection Date <span class="text-red-500">*</span>
                    </label>
                    <input 
                      v-model="formData.collection_date"
                      type="date" 
                      class="custom-input"
                      :disabled="loading"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Collection Time <span class="text-red-500">*</span>
                    </label>
                    <input 
                      v-model="formData.collection_time"
                      type="time" 
                      class="custom-input"
                      :disabled="loading"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Researcher Information <span class="text-red-500">*</span>
                    </label>
                    <input 
                      v-model="formData.researcher_info"
                      type="text" 
                      placeholder="e.g. Dr. John Smith"
                      class="custom-input"
                      :disabled="loading"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Field Collector Information <span class="text-red-500">*</span>
                    </label>
                    <input 
                      v-model="formData.field_collector_info"
                      type="text" 
                      placeholder="e.g. Lab Technician Jane Doe"
                      class="custom-input"
                      :disabled="loading"
                    />
                  </div>
                </div>
              </div>
            </Transition>

            <!-- Step 2: Storage Location -->
            <Transition name="fade" mode="out-in">
              <div v-if="currentStep === 2" key="step2" class="space-y-6">
                <h3 class="text-lg font-medium text-[#033958] border-b pb-3">Storage Location</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                  <div>
                    <UiSelectInput 
                      label="Site" 
                      :options="siteList" 
                      position="standalone" 
                      v-model="formData.site_id"
                      :disabled="loading"
                    />
                  </div>
                  
                  <div>
                    <UiSelectInput 
                      label="Freezer" 
                      :options="freezerList" 
                      position="standalone" 
                      v-model="formData.storage_location.freezer"
                      :disabled="loading"
                    />
                  </div>
                  
                  <div>
                    <UiSelectInput 
                      label="Rack" 
                      :options="rackList" 
                      position="standalone" 
                      v-model="formData.storage_location.rack"
                      :disabled="loading"
                    />
                  </div>
                  
                  <div>
                    <UiSelectInput 
                      label="Box" 
                      :options="boxList" 
                      position="standalone" 
                      v-model="formData.storage_location.box"
                      :disabled="loading"
                    />
                  </div>
                </div>

                <!-- Storage Grid -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-3">
                    Select Position <span class="text-red-500">*</span>
                  </label>
                  
                  <div class="bg-gray-25 p-4 rounded-lg border border-gray-50 mb-4">
                    <div class="text-xs text-gray-600 flex items-center gap-1 flex-wrap">
                      <span>{{ formData?.site_id || 'Select Site' }}</span>
                      <Icon name="heroicons:chevron-right" class="w-3 h-3" />
                      <span>{{ formData?.storage_location?.freezer || 'Select Freezer' }}</span>
                      <Icon name="heroicons:chevron-right" class="w-3 h-3" />
                      <span>{{ formData?.storage_location?.rack || 'Select Rack' }}</span>
                      <Icon name="heroicons:chevron-right" class="w-3 h-3" />
                      <span>{{ formData?.storage_location?.box || 'Select Box' }}</span>
                      <Icon name="heroicons:chevron-right" class="w-3 h-3" />
                      <span class="font-semibold text-blue-600">{{ getPositionLabel(formData.storage_location.position) }}</span>
                    </div>
                  </div>
                  
                  <div class="overflow-x-auto rounded-lg pb-4 bg-gray-25 p-3">
                    <div class="inline-block min-w-full">
                      <div class="grid gap-2 mb-6">
                        <div v-for="row in ['A', 'B', 'C', 'D', 'E']" :key="row" class="flex gap-2">
                          <button
                            v-for="col in 10"
                            :key="`${row}${col}`"
                            type="button"
                            @click="selectPosition(row, col)"
                            :class="[
                              'w-10 h-10 md:w-12 md:h-12 text-xs font-semibold rounded-lg border-[0.5px] transition-all duration-200 transform hover:scale-105',
                              formData.storage_location.position === getPositionNumber(row, col)
                                ? 'bg-[#005B8F] text-white border-blue-700 shadow-lg scale-110'
                                : isPositionOccupied(row, col)
                                ? 'bg-gray-300 text-gray-500 border-gray-100 cursor-not-allowed opacity-60'
                                : 'bg-white text-gray-700 border-gray-100 hover:border-blue-400 hover:shadow-md'
                            ]"
                            :disabled="isPositionOccupied(row, col) || loading"
                          >
                            {{ row }}{{ col }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Legend -->
                  <div class="flex flex-wrap gap-6 text-sm bg-white p-4 rounded-lg border-[0.5px] border-gray-50">
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 bg-white border-[0.5px] border-gray-300 rounded-lg"></div>
                      <span class="text-gray-700">Available Box</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 bg-gray-300 border-[0.5px] border-gray-400 rounded-lg"></div>
                      <span class="text-gray-700">Occupied Box</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 bg-[#005B8F] border-[0.5px] border-blue-700 rounded-lg"></div>
                      <span class="text-gray-700">Selected Box</span>
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
                  <h3 class="text-sm font-medium text-[#033958] border-b pb-3 mb-5">Patient Clinical Data</h3>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">Diagnosis</label>
                      <input 
                        v-model="formData.free_fields.diagnosis"
                        type="text" 
                        placeholder="e.g. Type 2 Diabetes"
                        class="custom-input"
                        :disabled="loading"
                      />
                    </div>
                    
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">Treatment Status</label>
                      <input 
                        v-model="formData.free_fields.treatmentStatus"
                        type="text" 
                        placeholder="e.g. Ongoing"
                        class="custom-input"
                        :disabled="loading"
                      />
                    </div>
                    
                    <div class="md:col-span-2">
                      <label class="block text-sm font-semibold text-gray-700 mb-2">Outcomes</label>
                      <textarea 
                        v-model="formData.free_fields.outcomes"
                        placeholder="Enter clinical outcomes and observations..."
                        rows="4"
                        class="custom-input resize-none"
                        :disabled="loading"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <!-- Demographic Data -->
                <div>
                  <h3 class="text-sm font-medium text-[#033958] border-b pb-3 mb-5">Patient Demographic Data</h3>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                      <input 
                        v-model="formData.free_fields.dateOfBirth"
                        type="date" 
                        class="custom-input"
                        :disabled="loading"
                      />
                    </div>
                    
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                      <input 
                        v-model="formData.free_fields.age"
                        type="number" 
                        placeholder="e.g. 45"
                        class="custom-input"
                        :disabled="loading"
                      />
                    </div>
                    
                    <div>
                      <UiSelectInput 
                        label="Gender" 
                        :options="genderList" 
                        position="standalone" 
                        v-model="formData.free_fields.sex"
                        :disabled="loading"
                      />
                    </div>
                    
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">Ethnicity</label>
                      <input 
                        v-model="formData.free_fields.ethnicity"
                        type="text" 
                        placeholder="e.g. Caucasian"
                        class="custom-input"
                        :disabled="loading"
                      />
                    </div>
                    
                    <div class="md:col-span-2">
                      <label class="block text-sm font-semibold text-gray-700 mb-2">Nationality</label>
                      <input 
                        v-model="formData.free_fields.nationality"
                        type="text" 
                        placeholder="e.g. Nigerian"
                        class="custom-input"
                        :disabled="loading"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Transition>

            <!-- Navigation Buttons -->
            <div class="flex justify-end space-x-4 mt-10 pt-6 border-t border-gray-200">
              <button 
                v-if="currentStep > 1"
                type="button"
                @click="previousStep"
                class="px-6 py-3 border-[0.5px] border-gray-50 bg-gray-100 rounded-lg hover:bg-gray-50 transition-all font-medium flex items-center gap-2"
                :disabled="loading"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.9796 6L15.3896 7.41L10.8096 12L15.3896 16.59L13.9796 18L7.97965 12L13.9796 6Z" fill="#005B8F"/>
                </svg>
                <span>Back</span>
              </button>
              <button 
                v-else
                type="button"
                @click="close"
                class="px-6 py-3 border-[0.5px] border-gray-50 rounded-lg hover:bg-gray-50 transition-all font-medium"
                :disabled="loading"
              >
                Cancel
              </button>
              
              <button 
                v-if="currentStep < 3"
                type="button"
                @click="nextStep"
                class="px-6 py-3 bg-[#005B8F] text-white rounded-lg transition-all font-medium flex items-center gap-2 shadow-lg hover:shadow-xl"
                :disabled="loading"
              >
                <span>Next Step</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.0204 6L8.61035 7.41L13.1904 12L8.61035 16.59L10.0204 18L16.0204 12L10.0204 6Z" fill="white"/>
                </svg>
              </button>
              <button 
                v-else
                type="button"
                @click="save"
                class="px-6 py-3 bg-[#005B8F] text-white rounded-lg transition-all font-medium flex items-center gap-2 shadow-lg hover:shadow-xl"
                :disabled="loading"
              >
                <Icon v-if="!loading" name="heroicons:check" class="w-5 h-5" />
                <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ loading ? 'Saving...' : 'Save Biospecimen' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useRegisterSample } from "@/composables/modules/biosample/useRegisterSample"

// Props
const props = defineProps<{
  modelValue: boolean;
}>();

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'saved': [data: any];
}>();

// Composables
const { loading, sample, registerSample } = useRegisterSample()

// State
const currentStep = ref(1);

const formData = ref({
  site_id: '',
  sample_category_id: '',
  sample_serial_no: '',
  sample_label: '',
  collection_date: '',
  collection_time: '',
  researcher_info: '',
  field_collector_info: '',
  storage_location: {
    site: '',
    freezer: '',
    rack: '',
    box: '',
    position: 0
  },
  free_fields: {
    diagnosis: '',
    treatmentStatus: '',
    outcomes: '',
    dateOfBirth: '',
    age: '',
    sex: '',
    ethnicity: '',
    nationality: ''
  }
});

// Simulated occupied positions (replace with actual data from API)
const occupiedPositions = ref(new Set(['A3', 'B5', 'C7', 'D2', 'E9', 'A8', 'C2', 'D7', 'E3']));

// Options
const sampleTypes = ref(['Serum', 'Plasma', 'Tissue', 'Blood', 'Urine'])
const genderList = ref(['Male', 'Female', 'Other'])
const siteList = ref(['Memorial Hospital', 'Central Lab', 'Research Facility'])
const freezerList = ref(['Freezer A-301', 'Freezer B-105', 'Freezer C-202'])
const rackList = ref(['Rack 1-A', 'Rack 2-B', 'Rack 3-C'])
const boxList = ref(['Box 01', 'Box 02', 'Box 03'])

// Methods
const getPositionNumber = (row: string, col: number): number => {
  const rowIndex = row.charCodeAt(0) - 65 // A=0, B=1, etc.
  return rowIndex * 10 + col
}

const getPositionLabel = (position: number): string => {
  if (!position) return 'Select Position'
  const row = String.fromCharCode(65 + Math.floor((position - 1) / 10))
  const col = ((position - 1) % 10) + 1
  return `${row}${col}`
}

const isPositionOccupied = (row: string, col: number): boolean => {
  return occupiedPositions.value.has(`${row}${col}`)
}

const selectPosition = (row: string, col: number) => {
  formData.value.storage_location.position = getPositionNumber(row, col)
}

const validateStep = (step: number): boolean => {
  if (step === 1) {
    if (!formData.value.sample_serial_no || 
        !formData.value.sample_category_id || 
        !formData.value.sample_label ||
        !formData.value.collection_date || 
        !formData.value.collection_time ||
        !formData.value.researcher_info ||
        !formData.value.field_collector_info) {
      alert('Please fill in all required fields')
      return false
    }
  } else if (step === 2) {
    if (!formData.value.site_id || 
        !formData.value.storage_location.freezer || 
        !formData.value.storage_location.rack ||
        !formData.value.storage_location.box ||
        !formData.value.storage_location.position) {
      alert('Please complete all storage location fields and select a position')
      return false
    }
  }
  return true
}

const nextStep = () => {
  if (validateStep(currentStep.value) && currentStep.value < 3) {
    currentStep.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const resetForm = () => {
  formData.value = {
    site_id: '',
    sample_category_id: '',
    sample_serial_no: '',
    sample_label: '',
    collection_date: '',
    collection_time: '',
    researcher_info: '',
    field_collector_info: '',
    storage_location: {
      site: '',
      freezer: '',
      rack: '',
      box: '',
      position: 0
    },
    free_fields: {
      diagnosis: '',
      treatmentStatus: '',
      outcomes: '',
      dateOfBirth: '',
      age: '',
      sex: '',
      ethnicity: '',
      nationality: ''
    }
  }
}

const close = () => {
  if (!loading.value) {
    currentStep.value = 1
    resetForm()
    emit('update:modelValue', false)
  }
}

const save = async () => {
  if (!validateStep(currentStep.value)) {
    return
  }

  // Set the site in storage_location to match site_id
  formData.value.storage_location.site = formData.value.site_id

  // Prepare payload matching the composable structure
  const payload = {
    site_id: formData.value.site_id,
    sample_category_id: formData.value.sample_category_id,
    sample_serial_no: formData.value.sample_serial_no,
    sample_label: formData.value.sample_label,
    collection_date: formData.value.collection_date,
    collection_time: formData.value.collection_time,
    researcher_info: formData.value.researcher_info,
    field_collector_info: formData.value.field_collector_info,
    storage_location: {
      site: formData.value.storage_location.site,
      freezer: formData.value.storage_location.freezer,
      rack: formData.value.storage_location.rack,
      box: formData.value.storage_location.box,
      position: formData.value.storage_location.position
    },
    free_fields: formData.value.free_fields
  }

  // Call the composable
  const result = await registerSample(payload)
  
  if (result) {
    // Emit success event with the result
    emit('saved', result)
    
    // Close modal and reset
    currentStep.value = 1
    resetForm()
    emit('update:modelValue', false)
  }
}
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
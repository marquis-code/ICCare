<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="modelValue" 
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] bg-black/50 backdrop-blur-lg p-4 overflow-y-auto"
        @click.self="close"
      >
        <div class="bg-white rounded-xl max-w-4xl w-full my-8 shadow-2xl transform transition-all">
          <div class="p-6 md:p-8">
            <!-- Header -->
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Icon name="heroicons:arrow-up-tray" class="w-7 h-7 text-blue-600" />
                </div>
                <h2 class="text-2xl md:text-3xl font-bold text-gray-900">Batch Import Biospecimen</h2>
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
                  <span class="mt-2 text-xs md:text-sm font-medium text-gray-700">Upload File</span>
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
                  <span class="mt-2 text-xs md:text-sm font-medium text-gray-700">Validate</span>
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
                  <span class="mt-2 text-xs md:text-sm font-medium text-gray-700">Confirm</span>
                </div>
              </div>
            </div>

            <!-- Step 1: Upload File -->
            <Transition name="fade" mode="out-in">
              <div v-if="currentStep === 1" class="space-y-6">
                <div 
                  @dragover.prevent
                  @drop.prevent="handleDrop"
                  @click="triggerFileInput"
                  class="border-2 border-dashed border-gray-300 rounded-xl p-16 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group"
                >
                  <input 
                    ref="fileInput"
                    type="file" 
                    accept=".csv,.xlsx,.xls"
                    @change="handleFileSelect"
                    class="hidden"
                  />
                  
                  <div class="flex flex-col items-center">
                    <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Icon name="heroicons:cloud-arrow-up" class="w-10 h-10 text-blue-600" />
                    </div>
                    
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">
                      {{ uploadedFile ? 'File Selected' : 'Drop and drag files' }}
                    </h3>
                    
                    <p class="text-sm text-gray-600 mb-4">
                      {{ uploadedFile ? uploadedFile.name : 'Drop and drag your CSV file here' }}
                    </p>
                    
                    <button 
                      type="button"
                      class="px-6 py-2.5 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-sm"
                    >
                      Browse Files
                    </button>
                    
                    <p class="text-xs text-gray-500 mt-4">
                      Supported formats: CSV, XLSX, XLS (Max 50MB)
                    </p>
                  </div>
                </div>
              </div>
            </Transition>

            <!-- Step 2: Validate Data -->
            <Transition name="fade" mode="out-in">
              <div v-if="currentStep === 2" class="space-y-6">
                <div class="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div class="flex items-center gap-3 mb-6">
                    <div class="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <Icon name="heroicons:check" class="w-6 h-6 text-white" />
                    </div>
                    <h3 class="text-lg font-semibold text-green-900">Data Validation</h3>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="text-center">
                      <div class="text-4xl font-bold text-green-700 mb-2">{{ validationResult.processed }}</div>
                      <div class="text-sm text-green-800 font-medium">Rows Processed</div>
                    </div>
                    
                    <div class="text-center">
                      <div class="text-4xl font-bold text-green-700 mb-2">{{ validationResult.valid }}</div>
                      <div class="text-sm text-green-800 font-medium">Valid Records</div>
                    </div>
                    
                    <div class="text-center">
                      <div class="text-4xl font-bold text-red-700 mb-2">{{ validationResult.errors }}</div>
                      <div class="text-sm text-red-800 font-medium">Errors Found</div>
                    </div>
                  </div>
                </div>
                
                <!-- Error Details -->
                <div v-if="validationResult.errors > 0" class="space-y-3">
                  <h4 class="text-sm font-semibold text-gray-900">Error Details:</h4>
                  
                  <div class="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                    <Icon name="heroicons:exclamation-triangle" class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div class="flex-1">
                      <p class="text-sm font-medium text-red-900">Row 34</p>
                      <p class="text-sm text-red-700 mt-1">Sample ID 'MH-2024-XXXX' already exists in database</p>
                      <div class="mt-2 flex gap-2">
                        <button class="text-xs text-blue-600 hover:text-blue-700 font-medium">Edit</button>
                        <button class="text-xs text-red-600 hover:text-red-700 font-medium">Skip Rows</button>
                      </div>
                    </div>
                  </div>
                  
                  <div class="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                    <Icon name="heroicons:exclamation-triangle" class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div class="flex-1">
                      <p class="text-sm font-medium text-red-900">Row 34</p>
                      <p class="text-sm text-red-700 mt-1">Sample ID 'MH-2024-XXXX' already exists in database</p>
                      <div class="mt-2 flex gap-2">
                        <button class="text-xs text-blue-600 hover:text-blue-700 font-medium">Edit</button>
                        <button class="text-xs text-red-600 hover:text-red-700 font-medium">Skip Rows</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>

            <!-- Step 3: Confirm Import -->
            <Transition name="fade" mode="out-in">
              <div v-if="currentStep === 3" class="space-y-6">
                <div v-if="importSuccess" class="text-center py-12">
                  <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <Icon name="heroicons:check-circle" class="w-12 h-12 text-green-600" />
                  </div>
                  
                  <h3 class="text-2xl font-bold text-gray-900 mb-3">Import Successful!</h3>
                  <p class="text-gray-600 mb-6">
                    This action will create <strong class="text-green-600">1245 new Biospecimen record</strong>
                  </p>
                  
                  <button 
                    @click="close"
                    class="px-8 py-3 bg-[#005B8F] text-white rounded-lg  transition font-medium shadow-lg"
                  >
                    Import New Files
                  </button>
                </div>
                
                <div v-else class="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <div class="flex items-start gap-3 mb-6">
                    <Icon name="heroicons:exclamation-triangle" class="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 class="text-lg font-semibold text-yellow-900 mb-2">Important Notice</h3>
                      <p class="text-sm text-yellow-800">
                        This action will create <strong>1245 new Biospecimen record</strong>. Please review the summary below before confirming.
                      </p>
                    </div>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div class="bg-white rounded-lg p-4 border border-yellow-200">
                      <div class="text-3xl font-bold text-gray-900 mb-1">{{ validationResult.processed }}</div>
                      <div class="text-xs text-gray-600">Rows Processed</div>
                    </div>
                    
                    <div class="bg-white rounded-lg p-4 border border-yellow-200">
                      <div class="text-3xl font-bold text-green-700 mb-1">0</div>
                      <div class="text-xs text-gray-600">Duplicates</div>
                    </div>
                    
                    <div class="bg-white rounded-lg p-4 border border-yellow-200">
                      <div class="text-3xl font-bold text-red-700 mb-1">{{ validationResult.errors }}</div>
                      <div class="text-xs text-gray-600">Skipped rows</div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>

            <!-- Navigation Buttons -->
            <div class="flex justify-between mt-10 pt-6 border-t border-gray-200">
              <button 
                v-if="currentStep > 1 && !importSuccess"
                @click="previousStep"
                class="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium flex items-center gap-2"
              >
                <Icon name="heroicons:arrow-left" class="w-5 h-5" />
                <span>Back</span>
              </button>
              <button 
                v-else-if="!importSuccess"
                @click="close"
                class="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium"
              >
                Cancel
              </button>
              <div v-else></div>
              
              <button 
                v-if="currentStep < 3"
                @click="nextStep"
                :disabled="currentStep === 1 && !uploadedFile"
                class="px-6 py-3 bg-[#005B8F] text-white rounded-lg  transition-all font-medium flex items-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next Step</span>
                <Icon name="heroicons:arrow-right" class="w-5 h-5" />
              </button>
              <button 
                v-else-if="!importSuccess"
                @click="confirmImport"
                class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Icon name="heroicons:check" class="w-5 h-5" />
                <span>Confirm Import</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { BatchValidationResult } from '~/types/biospecimen';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'imported': [data: any];
}>();

const currentStep = ref(1);
const uploadedFile = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const importSuccess = ref(false);

const validationResult = ref<BatchValidationResult>({
  processed: 1247,
  valid: 1245,
  errors: 2,
  duplicates: 0,
  skipped: 2
});

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    uploadedFile.value = target.files[0];
  }
};

const handleDrop = (event: DragEvent) => {
  const files = event.dataTransfer?.files;
  if (files && files[0]) {
    uploadedFile.value = files[0];
  }
};

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const confirmImport = () => {
  importSuccess.value = true;
  emit('imported', { success: true, records: validationResult.value.valid });
};

const close = () => {
  currentStep.value = 1;
  uploadedFile.value = null;
  importSuccess.value = false;
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
  transform: translateX(30px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
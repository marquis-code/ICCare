<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="modelValue" 
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] backdrop-blur-lg p-4 overflow-y-auto"
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
                <h2 class="text-2xl md:text-3xl font-bold text-gray-900">Transfer Details</h2>
              </div>
            </div>

            <!-- Movement Information -->
            <div class="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-100">
              <h3 class="text-lg font-bold text-blue-900 mb-6">Movement Information</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="text-xs font-semibold text-blue-700 uppercase tracking-wider">Sample ID</label>
                  <p class="text-sm font-bold text-blue-900 mt-2">SMP-2024-0234</p>
                </div>
                
                <div>
                  <label class="text-xs font-semibold text-blue-700 uppercase tracking-wider">Moved On</label>
                  <p class="text-sm font-bold text-blue-900 mt-2">Jan 15, 2024, 10:30 AM</p>
                </div>
                
                <div>
                  <label class="text-xs font-semibold text-blue-700 uppercase tracking-wider">Previous Location</label>
                  <p class="text-sm font-bold text-blue-900 mt-2">Freezer A-301, Rack 2-B</p>
                </div>
                
                <div>
                  <label class="text-xs font-semibold text-blue-700 uppercase tracking-wider">Current Location</label>
                  <p class="text-sm font-bold text-blue-900 mt-2">Freezer B-105, Rack 1-A</p>
                </div>
                
                <div>
                  <label class="text-xs font-semibold text-blue-700 uppercase tracking-wider">Collector</label>
                  <p class="text-sm font-bold text-blue-900 mt-2">Dr, John Mackins</p>
                </div>
                
                <div>
                  <label class="text-xs font-semibold text-blue-700 uppercase tracking-wider">Request Reason</label>
                  <p class="text-sm font-bold text-blue-900 mt-2">Transfer for clinical trial analysis</p>
                </div>
              </div>
            </div>

            <!-- Transfer Timeline -->
            <div class="mb-8">
              <h3 class="text-lg font-bold text-gray-900 mb-6">Transfer History</h3>
              
              <div class="relative">
                <!-- Timeline Line -->
                <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-green-500"></div>
                
                <!-- Timeline Items -->
                <div class="space-y-6">
                  <!-- Movement Requested -->
                  <div class="relative flex gap-4">
                    <div class="relative z-10 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="heroicons:clock" class="w-6 h-6 text-gray-600" />
                    </div>
                    <div class="flex-1 bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <h4 class="font-semibold text-gray-900 mb-1">Movement Requested</h4>
                      <p class="text-sm text-gray-600">Jan 10, 2024 at 9:15 AM by Dr. Sarah Chen</p>
                    </div>
                  </div>
                  
                  <!-- Request Approved -->
                  <div class="relative flex gap-4">
                    <div class="relative z-10 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Icon name="heroicons:check-circle" class="w-7 h-7 text-blue-600" />
                    </div>
                    <div class="flex-1 bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <h4 class="font-semibold text-blue-900 mb-1">Request Approved</h4>
                      <p class="text-sm text-blue-700">Jan 12, 2024 at 2:30 PM by Lab Manager</p>
                    </div>
                  </div>
                  
                  <!-- Sample Moved -->
                  <div class="relative flex gap-4">
                    <div class="relative z-10 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Icon name="heroicons:arrow-right-circle" class="w-7 h-7 text-green-600" />
                    </div>
                    <div class="flex-1 bg-green-50 rounded-lg p-4 border border-green-200">
                      <h4 class="font-semibold text-green-900 mb-1">Sample Moved</h4>
                      <p class="text-sm text-green-700">Jan 15, 2024 at 10:30 AM by Dr. Sarah Chen</p>
                    </div>
                  </div>
                  
                  <!-- Transfer Confirmed -->
                  <div class="relative flex gap-4">
                    <div class="relative z-10 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Icon name="heroicons:shield-check" class="w-7 h-7 text-purple-600" />
                    </div>
                    <div class="flex-1 bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <h4 class="font-semibold text-purple-900 mb-1">Transfer Confirmed</h4>
                      <p class="text-sm text-purple-700">Jan 15, 2024 at 11:00 AM by Receiving Lab</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-4 justify-end pt-6 border-t border-gray-200">
              <button 
                class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium shadow-md"
              >
                Reject
              </button>
              <button 
                class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium shadow-md"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const close = () => {
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
</style>
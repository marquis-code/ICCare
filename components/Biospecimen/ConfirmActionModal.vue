<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="modelValue && action" 
        class="fixed inset-0 flex items-center justify-center z-[9999] bg-black/50 backdrop-blur-lg p-4"
        @click.self="close"
      >
        <div class="bg-white rounded-xl max-w-md w-full shadow-2xl transform transition-all">
          <div class="p-6">
            <!-- Icon -->
            <div class="flex justify-center mb-4">
              <div 
                :class="[
                  'w-16 h-16 rounded-full flex items-center justify-center',
                  action.type === 'approve' ? 'bg-green-100' : 'bg-red-100'
                ]"
              >
                <Icon 
                  :name="action.type === 'approve' ? 'heroicons:check-circle' : 'heroicons:x-circle'" 
                  :class="[
                    'w-10 h-10',
                    action.type === 'approve' ? 'text-green-600' : 'text-red-600'
                  ]" 
                />
              </div>
            </div>

            <!-- Content -->
            <h3 class="text-xl font-bold text-gray-900 text-center mb-2">
              {{ action.type === 'approve' ? 'Approve Transfer?' : 'Reject Transfer?' }}
            </h3>
            <p class="text-sm text-gray-600 text-center mb-6">
              Are you sure you want to {{ action.type }} this biospecimen transfer? This action cannot be undone.
            </p>

            <!-- Buttons -->
            <div class="flex gap-3">
              <button 
                @click="close"
                class="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700"
              >
                Cancel
              </button>
              <button 
                @click="confirm"
                :class="[
                  'flex-1 px-4 py-3 rounded-lg transition font-medium text-white shadow-lg',
                  action.type === 'approve' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                ]"
              >
                {{ action.type === 'approve' ? 'Yes, Approve' : 'Yes, Reject' }}
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
  action: { type: 'approve' | 'reject', id: number } | null;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'confirmed': [];
}>();

const close = () => {
  emit('update:modelValue', false);
};

const confirm = () => {
  emit('confirmed');
  close();
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
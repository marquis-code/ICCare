<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 transform translate-y-2"
      enter-to-class="opacity-100 transform translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 transform translate-y-0"
      leave-to-class="opacity-0 transform translate-y-2"
    >
      <div
        v-if="show"
        :class="[
          'fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm',
          {
            'bg-green-100 border border-green-200': type === 'success',
            'bg-red-100 border border-red-200': type === 'error'
          }
        ]"
      >
        <div class="flex items-center">
          <CheckCircleIcon
            v-if="type === 'success'"
            class="w-5 h-5 text-primary mr-2"
          />
          <ExclamationCircleIcon
            v-else
            class="w-5 h-5 text-red-600 mr-2"
          />
          <span
            :class="[
              'text-sm font-medium',
              {
                'text-green-800': type === 'success',
                'text-red-800': type === 'error'
              }
            ]"
          >
            {{ message }}
          </span>
          <button
            @click="$emit('update:show', false)"
            class="ml-4 text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon class="w-4 h-4" />
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { CheckCircleIcon, ExclamationCircleIcon, XMarkIcon } from '@heroicons/vue/24/solid'

interface Props {
  show: boolean
  message: string
  type: 'success' | 'error'
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:show': [value: boolean]
}>()

// Auto-hide toast after 5 seconds
watch(() => props.show, (isShown) => {
  if (isShown) {
    setTimeout(() => {
      emit('update:show', false)
    }, 5000)
  }
})
</script>
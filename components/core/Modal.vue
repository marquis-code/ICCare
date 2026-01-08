
<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-lg flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div
          @click="$emit('update:open', false)"
          class="absolute inset-0 bg-black bg-opacity-50"
        ></div>
        
        <!-- Modal Content -->
        <Transition
          enter-active-class="transition ease-out duration-300"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="open"
            class="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
          >
            <!-- Header -->
            <div class="mb-6">
              <div class="flex w-full justify-center items-center">
                <h3 class="text-lg text-center font-semibold text-gray-900">{{ title }}</h3>
              </div>
          <div class=" flex justify-end items-end">
                <button
                v-if="showClose"
                @click="$emit('update:open', false)"
                class="p-1 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon class="w-6 h-6" />
              </button>
          </div>
            </div>

            <!-- Content -->
            <div class="mb-8">
              <slot />
            </div>

            <!-- Actions -->
            <div class="flex justify-center space-x-4">
              <slot name="actions" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline'

interface Props {
  open: boolean
  title: string
  showClose: boolean
}

defineProps<Props>()
defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

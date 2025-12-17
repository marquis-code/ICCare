<template>
  <div class="relative" ref="multiselectRef">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
    </label>
    <div
      @click="toggleDropdown"
      class="w-full px-3 py-3 border-[0.5px] border-gray-100 outline-none rounded-xl focus:outline-nonecursor-pointer bg-white min-h-[42px] flex items-center justify-between"
      :class="{ 'ring-2 ring-blue-500': isOpen }"
    >
      <div class="flex flex-wrap gap-1 flex-1">
        <span v-if="selectedItems.length === 0" class="text-gray-400">
          {{ placeholder }}
        </span>
        <span
          v-for="item in selectedItems"
          :key="item.value"
          class="inline-flex items-center gap-1 px-2 py-2 bg-blue-100 text-blue-800 rounded-full text-sm"
        >
          {{ item.label }}
          <button
            @click.stop="removeItem(item.value)"
            class="hover:text-blue-600 focus:outline-none"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </span>
      </div>
      <svg
        class="w-5 h-5 text-gray-400 transition-transform"
        :class="{ 'transform rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <!-- Dropdown Menu -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
      >
        <!-- Search Input -->
        <div v-if="searchable" class="p-2 border-b border-gray-200">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="custom-input"
            @click.stop
          />
        </div>

        <!-- Select All Option -->
        <div
          v-if="selectAll"
          class="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-200 flex items-center gap-2"
          @click="toggleSelectAll"
        >
          <input
            type="checkbox"
            :checked="isAllSelected"
            :indeterminate.prop="isIndeterminate"
            class="custom-checkbox"
            @click.stop
          />
          <span class="text-sm font-medium text-gray-700">Select All</span>
        </div>

        <!-- Options List -->
        <div v-if="filteredOptions.length > 0">
          <div
            v-for="option in filteredOptions"
            :key="option.value"
            class="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2"
            @click="toggleOption(option)"
          >
            <input
              type="checkbox"
              :checked="isSelected(option.value)"
              class="custom-checkbox"
              @click.stop
            />
            <span class="text-sm text-gray-700">{{ option.label }}</span>
          </div>
        </div>
        <div v-else class="px-3 py-4 text-sm text-gray-500 text-center">
          No options found
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

export interface MultiSelectOption {
  value: string
  label: string
}

interface Props {
  modelValue: string[]
  options: MultiSelectOption[]
  label?: string
  placeholder?: string
  searchable?: boolean
  selectAll?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string[]): void
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: 'Select items...',
  searchable: true,
  selectAll: true
})

const emit = defineEmits<Emits>()

const multiselectRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const searchQuery = ref('')

const selectedItems = computed(() => {
  return props.options.filter(option => props.modelValue.includes(option.value))
})

const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.options
  
  const query = searchQuery.value.toLowerCase()
  return props.options.filter(option =>
    option.label.toLowerCase().includes(query)
  )
})

const isAllSelected = computed(() => {
  return props.options.length > 0 && props.modelValue.length === props.options.length
})

const isIndeterminate = computed(() => {
  return props.modelValue.length > 0 && props.modelValue.length < props.options.length
})

const isSelected = (value: string): boolean => {
  return props.modelValue.includes(value)
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
  if (!isOpen.value) {
    searchQuery.value = ''
  }
}

const toggleOption = (option: MultiSelectOption) => {
  const newValue = [...props.modelValue]
  const index = newValue.indexOf(option.value)
  
  if (index > -1) {
    newValue.splice(index, 1)
  } else {
    newValue.push(option.value)
  }
  
  emit('update:modelValue', newValue)
}

const removeItem = (value: string) => {
  const newValue = props.modelValue.filter(v => v !== value)
  emit('update:modelValue', newValue)
}

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    emit('update:modelValue', [])
  } else {
    emit('update:modelValue', props.options.map(option => option.value))
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (multiselectRef.value && !multiselectRef.value.contains(event.target as Node)) {
    isOpen.value = false
    searchQuery.value = ''
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
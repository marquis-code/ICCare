<template>
  <div class="box-position-selector">
    <!-- Position Selection Label -->
    <label v-if="showLabel" class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
      Select Position <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Current Selection Breadcrumb -->
    <div v-if="showBreadcrumb" class="bg-gray-25 p-2 sm:p-3 md:p-4 rounded-lg border border-gray-50 mb-3 sm:mb-4">
      <div class="text-[10px] sm:text-xs text-gray-600 flex items-center gap-1 flex-wrap">
        <span>{{ siteName || 'Select Site' }}</span>
        <Icon name="heroicons:chevron-right" class="w-2 h-2 sm:w-3 sm:h-3" />
        <span>{{ freezerName || 'Select Freezer' }}</span>
        <Icon name="heroicons:chevron-right" class="w-2 h-2 sm:w-3 sm:h-3" />
        <span>{{ rackName || 'Select Rack' }}</span>
        <Icon name="heroicons:chevron-right" class="w-2 h-2 sm:w-3 sm:h-3" />
        <span>{{ boxName || 'Select Box' }}</span>
        <Icon name="heroicons:chevron-right" class="w-2 h-2 sm:w-3 sm:h-3" />
        <span class="font-semibold text-blue-600">{{ getPositionLabel(selectedPosition) }}</span>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <svg class="animate-spin h-8 w-8 text-[#005B8F] mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="mt-2 text-sm text-gray-600">{{ loadingMessage }}</p>
    </div>

    <!-- Box Grid -->
    <div v-else-if="boxTemplate" class="overflow-x-auto rounded-lg pb-2 sm:pb-4 bg-gray-25 p-2 sm:p-3">
      <div class="w-full">
        <div class="grid gap-1 sm:gap-2 mb-4 sm:mb-6" :style="gridStyle">
          <template v-for="row in boxTemplate.rows" :key="row">
            <button 
              v-for="col in boxTemplate.columns" 
              :key="`${row}-${col}`" 
              type="button"
              @click="selectPosition(row, col)" 
              :class="getButtonClasses(row, col)"
              :disabled="isPositionOccupied(row, col) || disabled">
              {{ getRowLabel(row) }}{{ col }}
            </button>
          </template>
        </div>
      </div>
    </div>

    <!-- Box Statistics -->
    <div v-if="showStatistics && occupancyData?.statistics" class="mt-4 bg-white p-4 rounded-lg border border-gray-200">
      <h4 class="text-sm font-semibold text-gray-700 mb-3">Box Statistics</h4>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div class="text-center">
          <p class="text-xs text-gray-600">Total</p>
          <p class="text-lg font-bold text-gray-900">{{ occupancyData.statistics.total_positions }}</p>
        </div>
        <div class="text-center">
          <p class="text-xs text-gray-600">Occupied</p>
          <p class="text-lg font-bold text-red-600">{{ occupancyData.statistics.occupied }}</p>
        </div>
        <div class="text-center">
          <p class="text-xs text-gray-600">Available</p>
          <p class="text-lg font-bold text-green-600">{{ occupancyData.statistics.available }}</p>
        </div>
        <div class="text-center">
          <p class="text-xs text-gray-600">Utilization</p>
          <p class="text-lg font-bold text-blue-600">{{ occupancyData.statistics.utilization_percentage }}%</p>
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div v-if="showLegend" class="flex flex-wrap gap-3 sm:gap-6 text-xs sm:text-sm bg-white p-3 sm:p-4 rounded-lg border-[0.5px] border-gray-50 mt-4">
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 sm:w-8 sm:h-8 bg-white border-[0.5px] border-gray-300 rounded-lg flex-shrink-0"></div>
        <span class="text-gray-700">Available</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 border-[0.5px] border-gray-400 rounded-lg flex-shrink-0"></div>
        <span class="text-gray-700">Occupied</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 sm:w-8 sm:h-8 bg-[#005B8F] border-[0.5px] border-blue-700 rounded-lg flex-shrink-0"></div>
        <span class="text-gray-700">Selected</span>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && !boxTemplate" class="text-center py-8 bg-gray-50 rounded-lg">
      <Icon name="heroicons:archive-box" class="w-12 h-12 text-gray-300 mx-auto mb-2" />
      <p class="text-sm text-gray-600">{{ emptyMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Types
interface BoxTemplate {
  rows: number
  columns: number
  total_positions?: number
}

interface BoxStatistics {
  total_positions: number
  occupied: number
  available: number
  utilization_percentage: number
}

interface BoxOccupancyData {
  template?: BoxTemplate
  statistics?: BoxStatistics
  occupancy: number[]
  occupied_positions?: Record<string, string>
}

interface Props {
  modelValue: number | null
  occupancyData: BoxOccupancyData | null
  loading?: boolean
  disabled?: boolean
  required?: boolean
  showLabel?: boolean
  showBreadcrumb?: boolean
  showStatistics?: boolean
  showLegend?: boolean
  siteName?: string
  freezerName?: string
  rackName?: string
  boxName?: string
  loadingMessage?: string
  emptyMessage?: string
  // For edit mode - position that should not be marked as occupied
  originalPosition?: number | null
}

// Props with defaults
const props = withDefaults(defineProps<Props>(), {
  loading: false,
  disabled: false,
  required: false,
  showLabel: true,
  showBreadcrumb: true,
  showStatistics: true,
  showLegend: true,
  siteName: '',
  freezerName: '',
  rackName: '',
  boxName: '',
  loadingMessage: 'Loading box occupancy...',
  emptyMessage: 'Select a box to view available positions',
  originalPosition: null
})

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: number | null]
}>()

// Computed Properties
const selectedPosition = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const boxTemplate = computed(() => props.occupancyData?.template)

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${boxTemplate.value?.columns || 10}, minmax(0, 1fr))`
}))

// Helper Methods
const getRowLabel = (rowIndex: number): string => {
  return String.fromCharCode(64 + rowIndex) // 1=A, 2=B, etc.
}

const getPositionNumber = (row: number, col: number): number => {
  // Returns zero-based position index (0, 1, 2...)
  return (row - 1) * (boxTemplate.value?.columns || 10) + col - 1
}

const getPositionLabel = (position: number | null): string => {
  if (position === null || position === undefined || !boxTemplate.value) return 'Select Position'
  
  const cols = boxTemplate.value.columns
  // Position is already zero-based, so use it directly
  const row = Math.floor(position / cols) + 1
  const col = (position % cols) + 1
  
  return `${getRowLabel(row)}${col}`
}

const isPositionOccupied = (row: number, col: number): boolean => {
  if (!props.occupancyData) return false
  
  const position = getPositionNumber(row, col)
  
  // If we're editing and this is the original position, it should not be marked as occupied
  if (props.originalPosition !== null && props.originalPosition === position) {
    return false
  }
  
  // Check if position is in the occupancy array with value 1 (occupied)
  // Position is already zero-based, so use it directly as the array index
  return props.occupancyData.occupancy[position] === 1
}

const getButtonClasses = (row: number, col: number): string[] => {
  const baseClasses = [
    'w-full',
    'aspect-square',
    'text-[10px]',
    'sm:text-xs',
    'font-semibold',
    'rounded-lg',
    'border-[0.5px]',
    'transition-all',
    'duration-200',
    'transform',
    'hover:scale-105'
  ]

  const position = getPositionNumber(row, col)
  
  if (selectedPosition.value === position) {
    return [
      ...baseClasses,
      'bg-[#005B8F]',
      'text-white',
      'border-blue-700',
      'shadow-lg',
      'scale-110'
    ]
  }
  
  if (isPositionOccupied(row, col)) {
    return [
      ...baseClasses,
      'bg-gray-300',
      'text-gray-500',
      'border-gray-100',
      'cursor-not-allowed',
      'opacity-60'
    ]
  }
  
  return [
    ...baseClasses,
    'bg-white',
    'text-gray-700',
    'border-gray-100',
    'hover:border-blue-400',
    'hover:shadow-md'
  ]
}

const selectPosition = (row: number, col: number): void => {
  if (isPositionOccupied(row, col) || props.disabled) return
  selectedPosition.value = getPositionNumber(row, col)
}
</script>

<style scoped>
/* Nuxt 3 specific styles if needed */
.box-position-selector {
  /* Component container styles */
}
</style>
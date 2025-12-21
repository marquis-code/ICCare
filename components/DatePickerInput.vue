<template>
  <div class="relative">
    <!-- Label -->
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>

    <!-- Input Field -->
    <div class="relative" ref="inputRef">
      <input
        :value="displayValue"
        @click="togglePicker"
        readonly
        type="text"
        :placeholder="placeholder"
        class="w-full px-3 py-2 pr-10 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer bg-white"
      />
      <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    </div>

    <!-- Picker Dropdown -->
    <Teleport to="body">
      <!-- Transparent backdrop -->
      <div
        v-if="showPicker"
        class="fixed inset-0 z-[9998]"
        @click="closePicker"
        style="background: transparent;"
      ></div>
      <!-- Picker popup -->
      <div
        v-if="showPicker"
        :style="pickerStyle"
        @click.stop
        class="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 w-80"
      >
          <!-- Calendar Header -->
          <div class="flex items-center justify-between mb-4">
            <button
              @click="previousMonth"
              type="button"
              class="p-1 hover:bg-gray-100 rounded transition"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div class="flex gap-2">
              <select
                v-model="selectedMonth"
                class="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option v-for="(month, index) in months" :key="index" :value="index">
                  {{ month }}
                </option>
              </select>
              
              <select
                v-model="selectedYear"
                class="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option v-for="year in years" :key="year" :value="year">
                  {{ year }}
                </option>
              </select>
            </div>
            
            <button
              @click="nextMonth"
              type="button"
              class="p-1 hover:bg-gray-100 rounded transition"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <!-- Weekday Headers -->
          <div class="grid grid-cols-7 gap-1 mb-2">
            <div
              v-for="day in weekDays"
              :key="day"
              class="text-center text-xs font-medium text-gray-600 py-1"
            >
              {{ day }}
            </div>
          </div>

          <!-- Calendar Grid -->
          <div class="grid grid-cols-7 gap-1 mb-4">
            <button
              v-for="day in calendarDays"
              :key="day.date"
              @click="selectDate(day)"
              type="button"
              :disabled="!day.isCurrentMonth"
              :class="[
                'h-8 text-sm rounded transition',
                day.isCurrentMonth ? 'hover:bg-blue-50' : 'text-gray-300 cursor-not-allowed',
                day.isToday ? 'bg-blue-100 font-semibold' : '',
                day.isSelected ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-gray-700'
              ]"
            >
              {{ day.day }}
            </button>
          </div>

          <!-- Time Selection -->
          <div class="border-t border-gray-200 pt-4">
            <div class="text-sm font-medium text-gray-700 mb-2">Time</div>
            <div class="flex gap-2 items-center">
              <input
                v-model="selectedHour"
                type="number"
                min="1"
                max="12"
                placeholder="HH"
                class="w-16 px-2 py-1 border border-gray-300 rounded text-sm text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <span class="text-gray-600">:</span>
              <input
                v-model="selectedMinute"
                type="number"
                min="0"
                max="59"
                placeholder="MM"
                class="w-16 px-2 py-1 border border-gray-300 rounded text-sm text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <select
                v-model="selectedPeriod"
                class="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-2 mt-4 pt-4 border-t border-gray-200">
            <button
              @click="clearDate"
              type="button"
              class="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition"
            >
              Clear
            </button>
            <button
              @click="setToday"
              type="button"
              class="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition"
            >
              Today
            </button>
            <button
              @click="applyDateTime"
              type="button"
              class="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Apply
            </button>
          </div>
        </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
}

interface CalendarDay {
  date: Date
  day: number
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  placeholder: 'Select date and time'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// State
const showPicker = ref(false)
const inputRef = ref<HTMLElement | null>(null)
const pickerStyle = ref({})

const selectedDate = ref<Date | null>(null)
const selectedMonth = ref(new Date().getMonth())
const selectedYear = ref(new Date().getFullYear())
const selectedHour = ref('09')
const selectedMinute = ref('30')
const selectedPeriod = ref<'AM' | 'PM'>('AM')

// Constants
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const years = computed(() => {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: 21 }, (_, i) => currentYear - 10 + i)
})

// Computed
const displayValue = computed(() => {
  if (!selectedDate.value) return ''
  
  const date = selectedDate.value
  const monthName = months[date.getMonth()].slice(0, 3)
  const day = date.getDate()
  const year = date.getFullYear()
  const hour = selectedHour.value.padStart(2, '0')
  const minute = selectedMinute.value.padStart(2, '0')
  const period = selectedPeriod.value
  
  return `${monthName} ${day}, ${year}, ${hour}:${minute} ${period}`
})

const calendarDays = computed(() => {
  const firstDay = new Date(selectedYear.value, selectedMonth.value, 1)
  const lastDay = new Date(selectedYear.value, selectedMonth.value + 1, 0)
  const prevLastDay = new Date(selectedYear.value, selectedMonth.value, 0)
  
  const firstDayOfWeek = firstDay.getDay()
  const lastDate = lastDay.getDate()
  const prevLastDate = prevLastDay.getDate()
  
  const days: CalendarDay[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // Previous month days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(selectedYear.value, selectedMonth.value - 1, prevLastDate - i)
    days.push({
      date,
      day: prevLastDate - i,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false
    })
  }
  
  // Current month days
  for (let i = 1; i <= lastDate; i++) {
    const date = new Date(selectedYear.value, selectedMonth.value, i)
    date.setHours(0, 0, 0, 0)
    const isToday = date.getTime() === today.getTime()
    const isSelected = selectedDate.value ? 
      date.getTime() === new Date(selectedDate.value).setHours(0, 0, 0, 0) : false
    
    days.push({
      date,
      day: i,
      isCurrentMonth: true,
      isToday,
      isSelected
    })
  }
  
  // Next month days to fill the grid
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(selectedYear.value, selectedMonth.value + 1, i)
    days.push({
      date,
      day: i,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false
    })
  }
  
  return days
})

// Methods
const togglePicker = () => {
  showPicker.value = !showPicker.value
  if (showPicker.value) {
    // Use nextTick to ensure DOM is updated
    setTimeout(() => {
      if (inputRef.value) {
        updatePickerPosition()
      }
    }, 10)
  }
}

const updatePickerPosition = () => {
  if (!inputRef.value) return
  
  const rect = inputRef.value.getBoundingClientRect()
  const scrollY = window.scrollY || window.pageYOffset
  const scrollX = window.scrollX || window.pageXOffset
  
  const spaceBelow = window.innerHeight - rect.bottom
  const pickerHeight = 450 // Approximate picker height
  
  // Always try to position below first, adjust if needed
  let top = rect.bottom + scrollY + 8
  let left = rect.left + scrollX
  
  // If not enough space below, position above
  if (spaceBelow < pickerHeight && rect.top > pickerHeight) {
    top = rect.top + scrollY - pickerHeight - 8
  }
  
  // Ensure picker doesn't go off-screen horizontally
  const pickerWidth = 320 // 80 * 4 (w-80 in Tailwind)
  if (left + pickerWidth > window.innerWidth + scrollX) {
    left = window.innerWidth + scrollX - pickerWidth - 16
  }
  
  // Ensure picker is not off left edge
  if (left < scrollX) {
    left = scrollX + 16
  }
  
  pickerStyle.value = {
    position: 'absolute',
    top: `${top}px`,
    left: `${left}px`,
    zIndex: '9999',
    maxHeight: '450px'
  }
}

const closePicker = () => {
  showPicker.value = false
}

const previousMonth = () => {
  if (selectedMonth.value === 0) {
    selectedMonth.value = 11
    selectedYear.value--
  } else {
    selectedMonth.value--
  }
}

const nextMonth = () => {
  if (selectedMonth.value === 11) {
    selectedMonth.value = 0
    selectedYear.value++
  } else {
    selectedMonth.value++
  }
}

const selectDate = (day: CalendarDay) => {
  if (!day.isCurrentMonth) return
  selectedDate.value = day.date
}

const setToday = () => {
  const now = new Date()
  selectedDate.value = now
  selectedMonth.value = now.getMonth()
  selectedYear.value = now.getFullYear()
  selectedHour.value = (now.getHours() % 12 || 12).toString().padStart(2, '0')
  selectedMinute.value = now.getMinutes().toString().padStart(2, '0')
  selectedPeriod.value = now.getHours() >= 12 ? 'PM' : 'AM'
}

const clearDate = () => {
  selectedDate.value = null
  emit('update:modelValue', '')
  closePicker()
}

const applyDateTime = () => {
  if (selectedDate.value) {
    emit('update:modelValue', displayValue.value)
  }
  closePicker()
}

// Parse initial value
const parseInitialValue = () => {
  if (!props.modelValue) return
  
  try {
    // Parse formats like "Jan 15, 2024, 09:30 AM"
    const parts = props.modelValue.split(',').map(s => s.trim())
    if (parts.length >= 2) {
      const datePart = parts[0] + ', ' + parts[1]
      const date = new Date(datePart)
      
      if (!isNaN(date.getTime())) {
        selectedDate.value = date
        selectedMonth.value = date.getMonth()
        selectedYear.value = date.getFullYear()
        
        if (parts[2]) {
          const timeParts = parts[2].split(' ')
          const [hour, minute] = timeParts[0].split(':')
          selectedHour.value = hour.padStart(2, '0')
          selectedMinute.value = minute.padStart(2, '0')
          selectedPeriod.value = timeParts[1] as 'AM' | 'PM'
        }
      }
    }
  } catch (error) {
    console.error('Error parsing date:', error)
  }
}

// Watch for external changes
watch(() => props.modelValue, () => {
  parseInitialValue()
})

// Watch for picker open/close
watch(showPicker, (isOpen) => {
  if (isOpen) {
    setTimeout(() => updatePickerPosition(), 10)
  }
})

// Handle scroll and resize
const handleScrollResize = () => {
  if (showPicker.value && inputRef.value) {
    updatePickerPosition()
  }
}

onMounted(() => {
  parseInitialValue()
  window.addEventListener('scroll', handleScrollResize, true)
  window.addEventListener('resize', handleScrollResize)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScrollResize, true)
  window.removeEventListener('resize', handleScrollResize)
})
</script>
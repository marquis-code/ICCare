<template>
  <div class="relative" ref="dateRangeRef">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
    </label>
    <div
      @click="togglePicker"
      class="w-full px-3 py-3.5 border-[0.5px] border-gray-100 rounded-md outline-none cursor-pointer bg-white flex items-center justify-between"
      :class="{ '': isOpen }"
    >
      <div class="flex items-center gap-2 text-sm">
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span v-if="displayValue" class="text-gray-900">{{ displayValue }}</span>
        <span v-else class="text-gray-400">{{ placeholder }}</span>
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

    <!-- Date Range Picker Dropdown -->
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
        class="absolute z-50 mt-1 bg-white border-[0.5px] border-gray-100 rounded-lg shadow-lg p-4"
        :class="pickerWidth"
      >
        <!-- Quick Select Options -->
        <div class="flex flex-wrap gap-2 mb-4 pb-4 border-b border-gray-100">
          <button
            v-for="preset in presets"
            :key="preset.label"
            @click="selectPreset(preset)"
            class="px-3 py-1 text-sm border-[0.5px] border-gray-100 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {{ preset.label }}
          </button>
        </div>

        <!-- Calendars Container -->
        <div class="flex flex-col sm:flex-row gap-4">
          <!-- From Calendar -->
          <div class="flex-1">
            <div class="text-sm font-medium text-gray-700 mb-3">From</div>
            <div class="mb-3">
              <div class="flex justify-between items-center mb-3">
                <button
                  @click="changeMonth('from', -1)"
                  class="p-1 hover:bg-gray-50 rounded focus:outline-none"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span class="font-semibold text-sm">{{ currentMonthYearFrom }}</span>
                <button
                  @click="changeMonth('from', 1)"
                  class="p-1 hover:bg-gray-50 rounded focus:outline-none"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div class="grid grid-cols-7 gap-1 mb-2">
                <div v-for="day in weekDays" :key="day" class="text-center text-xs font-semibold text-gray-600 py-1">
                  {{ day }}
                </div>
              </div>
              <div class="grid grid-cols-7 gap-1">
                <button
                  v-for="day in calendarDaysFrom"
                  :key="day.date"
                  @click="selectDate('from', day.date)"
                  :disabled="!day.isCurrentMonth"
                  :class="getDateClass(day, 'from')"
                >
                  {{ day.day }}
                </button>
              </div>
            </div>
          </div>

          <!-- To Calendar -->
          <div class="flex-1">
            <div class="text-sm font-medium text-gray-700 mb-3">To</div>
            <div class="mb-3">
              <div class="flex justify-between items-center mb-3">
                <button
                  @click="changeMonth('to', -1)"
                  class="p-1 hover:bg-gray-50 rounded focus:outline-none"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span class="font-semibold text-sm">{{ currentMonthYearTo }}</span>
                <button
                  @click="changeMonth('to', 1)"
                  class="p-1 hover:bg-gray-50 rounded focus:outline-none"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div class="grid grid-cols-7 gap-1 mb-2">
                <div v-for="day in weekDays" :key="day" class="text-center text-xs font-semibold text-gray-600 py-1">
                  {{ day }}
                </div>
              </div>
              <div class="grid grid-cols-7 gap-1">
                <button
                  v-for="day in calendarDaysTo"
                  :key="day.date"
                  @click="selectDate('to', day.date)"
                  :disabled="!day.isCurrentMonth || isDateDisabled(day.date)"
                  :class="getDateClass(day, 'to')"
                >
                  {{ day.day }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end gap-2 pt-4 border-t border-gray-100">
          <button
            @click="clearDates"
            class="px-4 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Clear
          </button>
          <button
            @click="closePicker"
            class="px-4 py-2 text-sm text-white bg-[#005B8F] hover:bg-[#004a73] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Apply
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface DateRange {
  from: string
  to: string
}

interface CalendarDay {
  day: number
  date: string
  isCurrentMonth: boolean
  isSelected: boolean
}

interface DatePreset {
  label: string
  getValue: () => DateRange
}

interface Props {
  modelValue: DateRange
  label?: string
  placeholder?: string
  format?: string
  pickerWidth?: string
}

interface Emits {
  (e: 'update:modelValue', value: DateRange): void
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: 'Select date range',
  format: 'MM/DD/YYYY',
  pickerWidth: 'w-full sm:w-[600px]'
})

const emit = defineEmits<Emits>()

const dateRangeRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const currentMonthFrom = ref(new Date())
const currentMonthTo = ref(new Date())
const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const presets: DatePreset[] = [
  {
    label: 'Today',
    getValue: () => {
      const today = formatDate(new Date())
      return { from: today, to: today }
    }
  },
  {
    label: 'Yesterday',
    getValue: () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const date = formatDate(yesterday)
      return { from: date, to: date }
    }
  },
  {
    label: 'Last 7 Days',
    getValue: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 6)
      return { from: formatDate(start), to: formatDate(end) }
    }
  },
  {
    label: 'Last 30 Days',
    getValue: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 29)
      return { from: formatDate(start), to: formatDate(end) }
    }
  },
  {
    label: 'This Month',
    getValue: () => {
      const now = new Date()
      const start = new Date(now.getFullYear(), now.getMonth(), 1)
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      return { from: formatDate(start), to: formatDate(end) }
    }
  },
  {
    label: 'Last Month',
    getValue: () => {
      const now = new Date()
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      const end = new Date(now.getFullYear(), now.getMonth(), 0)
      return { from: formatDate(start), to: formatDate(end) }
    }
  }
]

const displayValue = computed(() => {
  if (!props.modelValue.from && !props.modelValue.to) return ''
  
  const from = props.modelValue.from ? formatDisplayDate(props.modelValue.from) : ''
  const to = props.modelValue.to ? formatDisplayDate(props.modelValue.to) : ''
  
  if (from && to) {
    return `${from} - ${to}`
  } else if (from) {
    return `From ${from}`
  } else if (to) {
    return `To ${to}`
  }
  return ''
})

const currentMonthYearFrom = computed(() => {
  return currentMonthFrom.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const currentMonthYearTo = computed(() => {
  return currentMonthTo.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const calendarDaysFrom = computed((): CalendarDay[] => {
  return generateCalendarDays(currentMonthFrom.value, props.modelValue.from)
})

const calendarDaysTo = computed((): CalendarDay[] => {
  return generateCalendarDays(currentMonthTo.value, props.modelValue.to)
})

const generateCalendarDays = (monthDate: Date, selectedDate: string): CalendarDay[] => {
  const days: CalendarDay[] = []
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startingDayOfWeek = firstDay.getDay()
  const daysInMonth = lastDay.getDate()
  
  const prevMonthLastDay = new Date(year, month, 0).getDate()
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i
    const date = formatDate(new Date(year, month - 1, day))
    days.push({ day, date, isCurrentMonth: false, isSelected: false })
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = formatDate(new Date(year, month, day))
    days.push({
      day,
      date,
      isCurrentMonth: true,
      isSelected: date === selectedDate
    })
  }
  
  const remainingDays = 42 - days.length
  for (let day = 1; day <= remainingDays; day++) {
    const date = formatDate(new Date(year, month + 1, day))
    days.push({ day, date, isCurrentMonth: false, isSelected: false })
  }
  
  return days
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const formatDisplayDate = (dateStr: string): string => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

const isDateDisabled = (date: string): boolean => {
  if (!props.modelValue.from) return false
  return new Date(date) < new Date(props.modelValue.from)
}

const isInRange = (date: string): boolean => {
  if (!props.modelValue.from || !props.modelValue.to) return false
  const current = new Date(date)
  const from = new Date(props.modelValue.from)
  const to = new Date(props.modelValue.to)
  return current >= from && current <= to
}

const getDateClass = (day: CalendarDay, type: 'from' | 'to'): string => {
  const classes = ['p-2 text-sm rounded']
  
  if (!day.isCurrentMonth) {
    classes.push('text-gray-300 cursor-not-allowed')
  } else {
    classes.push('text-gray-900 hover:bg-blue-50 cursor-pointer')
    
    if (day.isSelected) {
      classes.push('bg-[#005B8F] text-white hover:bg-[#004a73]')
    } else if (isInRange(day.date)) {
      classes.push('bg-blue-100')
    }
    
    if (type === 'to' && isDateDisabled(day.date)) {
      classes.push('text-gray-300 cursor-not-allowed hover:bg-transparent')
    }
  }
  
  return classes.join(' ')
}

const togglePicker = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    // Set calendars to show current selection or current month
    if (props.modelValue.from) {
      currentMonthFrom.value = new Date(props.modelValue.from)
    }
    if (props.modelValue.to) {
      currentMonthTo.value = new Date(props.modelValue.to)
    } else if (props.modelValue.from) {
      // If only from is set, show next month for 'to' calendar
      const nextMonth = new Date(props.modelValue.from)
      nextMonth.setMonth(nextMonth.getMonth() + 1)
      currentMonthTo.value = nextMonth
    }
  }
}

const changeMonth = (type: 'from' | 'to', direction: number) => {
  if (type === 'from') {
    currentMonthFrom.value = new Date(
      currentMonthFrom.value.getFullYear(),
      currentMonthFrom.value.getMonth() + direction,
      1
    )
  } else {
    currentMonthTo.value = new Date(
      currentMonthTo.value.getFullYear(),
      currentMonthTo.value.getMonth() + direction,
      1
    )
  }
}

const selectDate = (type: 'from' | 'to', date: string) => {
  const newValue = { ...props.modelValue }
  
  if (type === 'from') {
    newValue.from = date
    // If from date is after to date, clear to date
    if (newValue.to && new Date(date) > new Date(newValue.to)) {
      newValue.to = ''
    }
  } else {
    newValue.to = date
  }
  
  emit('update:modelValue', newValue)
}

const selectPreset = (preset: DatePreset) => {
  const value = preset.getValue()
  emit('update:modelValue', value)
  currentMonthFrom.value = new Date(value.from)
  currentMonthTo.value = new Date(value.to)
}

const clearDates = () => {
  emit('update:modelValue', { from: '', to: '' })
  currentMonthFrom.value = new Date()
  currentMonthTo.value = new Date()
}

const closePicker = () => {
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (dateRangeRef.value && !dateRangeRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
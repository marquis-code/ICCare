
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  modelValue?: { start: Date | null; end: Date | null }
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({ start: null, end: null })
})

const emit = defineEmits<{
  'update:modelValue': [value: { start: Date | null; end: Date | null }]
}>()

const isOpen = ref(false)
const pickerRef = ref<HTMLElement | null>(null)
const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())
const selectingStart = ref(true)
const tempStart = ref<Date | null>(props.modelValue.start)
const tempEnd = ref<Date | null>(props.modelValue.end)

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const dayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

const quickRanges = [
  { label: 'Today', days: 0 },
  { label: 'Yesterday', days: -1 },
  { label: 'This week', days: -7 },
  { label: 'Last week', days: -14 },
  { label: 'This month', days: -30 },
  { label: 'Last month', days: -60 },
  { label: 'This year', days: -365 },
  { label: 'Last year', days: -730 },
  { label: 'All time', days: -3650 }
]

const formatDate = (date: Date | null) => {
  if (!date) return ''
  const month = monthNames[date.getMonth()].slice(0, 3)
  const day = date.getDate()
  const year = date.getFullYear()
  return `${month} ${day}, ${year}`
}

const displayText = computed(() => {
  if (tempStart.value && tempEnd.value) {
    return `${formatDate(tempStart.value)} – ${formatDate(tempEnd.value)}`
  }
  return 'Select date range'
})

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate()
}

const getFirstDayOfMonth = (month: number, year: number) => {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1
}

const generateCalendar = (monthOffset: number) => {
  const month = currentMonth.value + monthOffset
  const year = currentYear.value
  const adjustedDate = new Date(year, month, 1)
  const adjustedMonth = adjustedDate.getMonth()
  const adjustedYear = adjustedDate.getFullYear()
  
  const daysInMonth = getDaysInMonth(adjustedMonth, adjustedYear)
  const firstDay = getFirstDayOfMonth(adjustedMonth, adjustedYear)
  const daysInPrevMonth = getDaysInMonth(adjustedMonth - 1, adjustedYear)
  
  const days: Array<{ day: number; isCurrentMonth: boolean; date: Date; isToday: boolean; isSelected: boolean; isInRange: boolean; hasEvent: boolean }> = []
  
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i
    days.push({
      day,
      isCurrentMonth: false,
      date: new Date(adjustedYear, adjustedMonth - 1, day),
      isToday: false,
      isSelected: false,
      isInRange: false,
      hasEvent: false
    })
  }
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(adjustedYear, adjustedMonth, i)
    date.setHours(0, 0, 0, 0)
    const isToday = date.getTime() === today.getTime()
    const isSelected = (tempStart.value && date.getTime() === tempStart.value.getTime()) || 
                       (tempEnd.value && date.getTime() === tempEnd.value.getTime())
    const isInRange = tempStart.value && tempEnd.value && 
                      date.getTime() > tempStart.value.getTime() && 
                      date.getTime() < tempEnd.value.getTime()
    
    // Add event markers for specific dates
    const hasEvent = (adjustedMonth === 0 && i === 1) || 
                     (adjustedMonth === 0 && i === 30) || 
                     (adjustedMonth === 1 && i === 4) ||
                     (adjustedMonth === 1 && i === 14)
    
    days.push({
      day: i,
      isCurrentMonth: true,
      date,
      isToday,
      isSelected,
      isInRange,
      hasEvent
    })
  }
  
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      day: i,
      isCurrentMonth: false,
      date: new Date(adjustedYear, adjustedMonth + 1, i),
      isToday: false,
      isSelected: false,
      isInRange: false,
      hasEvent: false
    })
  }
  
  return { days, month: adjustedMonth, year: adjustedYear }
}

const calendar1 = computed(() => generateCalendar(0))
const calendar2 = computed(() => generateCalendar(1))

const selectDate = (date: Date) => {
  if (selectingStart.value) {
    tempStart.value = date
    tempEnd.value = null
    selectingStart.value = false
  } else {
    if (date < tempStart.value!) {
      tempEnd.value = tempStart.value
      tempStart.value = date
    } else {
      tempEnd.value = date
    }
    selectingStart.value = true
  }
}

const selectQuickRange = (days: number) => {
  const end = new Date()
  end.setHours(0, 0, 0, 0)
  const start = new Date()
  start.setDate(start.getDate() + days)
  start.setHours(0, 0, 0, 0)
  
  if (days === 0) {
    tempStart.value = end
    tempEnd.value = end
  } else {
    tempStart.value = start
    tempEnd.value = end
  }
  selectingStart.value = true
}

const prevMonth = () => {
  currentMonth.value--
  if (currentMonth.value < 0) {
    currentMonth.value = 11
    currentYear.value--
  }
}

const nextMonth = () => {
  currentMonth.value++
  if (currentMonth.value > 11) {
    currentMonth.value = 0
    currentYear.value++
  }
}

const apply = () => {
  emit('update:modelValue', { start: tempStart.value, end: tempEnd.value })
  isOpen.value = false
}

const cancel = () => {
  tempStart.value = props.modelValue.start
  tempEnd.value = props.modelValue.end
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (pickerRef.value && !pickerRef.value.contains(event.target as Node)) {
    cancel()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="pickerRef" class="relative w-full max-w-md">
    <button
      @click="isOpen = !isOpen"
      class="w-full px-3.5 py-4 text-left border-[0.5px] rounded-xl bg-gray-25 border-gray-100 focus:border-transparent transition-all duration-200 flex items-center justify-between"
    >
      <div class="flex items-center gap-2">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.75 3.25H16.75C16.9489 3.25 17.1397 3.32902 17.2803 3.46967C17.421 3.61032 17.5 3.80109 17.5 4V16C17.5 16.1989 17.421 16.3897 17.2803 16.5303C17.1397 16.671 16.9489 16.75 16.75 16.75H3.25C3.05109 16.75 2.86032 16.671 2.71967 16.5303C2.57902 16.3897 2.5 16.1989 2.5 16V4C2.5 3.80109 2.57902 3.61032 2.71967 3.46967C2.86032 3.32902 3.05109 3.25 3.25 3.25H6.25V1.75H7.75V3.25H12.25V1.75H13.75V3.25ZM16 7.75V4.75H13.75V6.25H12.25V4.75H7.75V6.25H6.25V4.75H4V7.75H16ZM16 9.25H4V15.25H16V9.25ZM5.5 10.75H9.25V13.75H5.5V10.75Z" fill="#525866"/>
</svg>

        <span class="text-gray-900 text-sm font-medium">{{ displayText }}</span>
      </div>
    </button>

    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute z-50 mt-2 bg-white border-[0.5px] border-gray-25 rounded-lg w-full sm:w-auto right-0"
      >
        <div class="flex flex-col lg:flex-row">
          <!-- Quick ranges sidebar -->
          <div class="border-b lg:border-b-0 lg:border-r-[0.5px] border-gray-50 p-4 lg:w-48">
            <button
              v-for="range in quickRanges"
              :key="range.label"
              @click="selectQuickRange(range.days)"
              class="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-gray-700 transition-colors duration-150 text-sm"
            >
              {{ range.label }}
            </button>
          </div>

          <!-- Calendar grid -->
          <div class="p-4">
            <div class="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <!-- First month -->
              <div class="flex-1 min-w-[280px]">
                <div class="flex items-center justify-between mb-4">
                  <button @click="prevMonth" class="p-2 hover:bg-gray-100 rounded transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span class="font-semibold text-gray-900">{{ monthNames[calendar1.month] }} {{ calendar1.year }}</span>
                  <button @click="nextMonth" class="p-2 hover:bg-gray-100 rounded transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <div class="grid grid-cols-7 gap-1 mb-2">
                  <div v-for="day in dayNames" :key="day" class="text-center text-sm font-medium text-gray-600 py-2">
                    {{ day }}
                  </div>
                </div>
                <div class="grid grid-cols-7 gap-1">
                  <button
                    v-for="(dayObj, idx) in calendar1.days"
                    :key="idx"
                    @click="selectDate(dayObj.date)"
                    class="relative aspect-square p-2 text-sm rounded-lg transition-all duration-150 hover:bg-gray-100"
                    :class="{
                      'text-gray-400': !dayObj.isCurrentMonth,
                      'text-gray-900': dayObj.isCurrentMonth,
                      'font-bold': dayObj.isToday,
                      'bg-blue-500 text-white hover:bg-blue-600': dayObj.isSelected,
                      'bg-blue-100': dayObj.isInRange
                    }"
                  >
                    {{ dayObj.day }}
                    <span v-if="dayObj.hasEvent" class="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></span>
                  </button>
                </div>
              </div>

              <!-- Second month -->
              <div class="flex-1 min-w-[280px]">
                <div class="flex items-center justify-between mb-4">
                  <button @click="prevMonth" class="p-2 hover:bg-gray-100 rounded transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span class="font-semibold text-gray-900">{{ monthNames[calendar2.month] }} {{ calendar2.year }}</span>
                  <button @click="nextMonth" class="p-2 hover:bg-gray-100 rounded transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <div class="grid grid-cols-7 gap-1 mb-2">
                  <div v-for="day in dayNames" :key="day" class="text-center text-sm font-medium text-gray-600 py-2">
                    {{ day }}
                  </div>
                </div>
                <div class="grid grid-cols-7 gap-1">
                  <button
                    v-for="(dayObj, idx) in calendar2.days"
                    :key="idx"
                    @click="selectDate(dayObj.date)"
                    class="relative aspect-square p-2 text-sm rounded-lg transition-all duration-150 hover:bg-gray-100"
                    :class="{
                      'text-gray-400': !dayObj.isCurrentMonth,
                      'text-gray-900': dayObj.isCurrentMonth,
                      'font-bold': dayObj.isToday,
                      'bg-blue-500 text-white hover:bg-blue-600': dayObj.isSelected,
                      'bg-blue-100': dayObj.isInRange
                    }"
                  >
                    {{ dayObj.day }}
                    <span v-if="dayObj.hasEvent" class="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Date inputs and action buttons -->
            <div class="mt-4 pt-4 border-t-[0.5px] border-gray-50 flex flex-col sm:flex-row items-center gap-3">
              <div class="flex items-center gap-3 flex-1 w-full">
                <input
                  type="text"
                  :value="formatDate(tempStart)"
                  readonly
                  class="flex-1 px-4 py-2 border-[0.5px] border-gray-50 rounded-lg text-sm text-gray-700 bg-gray-50"
                />
                <span class="text-gray-400">–</span>
                <input
                  type="text"
                  :value="formatDate(tempEnd)"
                  readonly
                  class="flex-1 px-4 py-2 border-[0.5px] border-gray-50 rounded-lg text-sm text-gray-700 bg-gray-50"
                />
              </div>
              <div class="flex gap-2 w-full sm:w-auto">
                <button
                  @click="cancel"
                  class="flex-1 sm:flex-none px-6 py-2 border-[0.5px] border-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  @click="apply"
                  class="flex-1 sm:flex-none px-6 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
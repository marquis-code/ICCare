<template>
  <div class="relative">
    <button
      type="button"
      @click="toggleCalendar"
      class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-left flex items-center justify-between"
    >
      <div class="flex items-center gap-2">
        <Icon name="heroicons:calendar" class="w-4 h-4 text-gray-400" />
        <span class="text-sm text-gray-700">
          {{ displayValue || placeholder }}
        </span>
      </div>
      <Icon 
        name="heroicons:chevron-down" 
        :class="['w-5 h-5 text-gray-400 transition-transform', showCalendar && 'rotate-180']" 
      />
    </button>

    <Transition name="dropdown">
      <div 
        v-if="showCalendar"
        v-click-outside="() => showCalendar = false"
        class="absolute z-20 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-72"
      >
        <!-- Month/Year Header -->
        <div class="flex items-center justify-between mb-4">
          <button 
            type="button"
            @click="previousMonth"
            class="p-1 hover:bg-gray-100 rounded transition"
          >
            <Icon name="heroicons:chevron-left" class="w-5 h-5 text-gray-600" />
          </button>
          
          <div class="text-sm font-semibold text-gray-900">
            {{ currentMonthYear }}
          </div>
          
          <button 
            type="button"
            @click="nextMonth"
            class="p-1 hover:bg-gray-100 rounded transition"
          >
            <Icon name="heroicons:chevron-right" class="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <!-- Weekday Headers -->
        <div class="grid grid-cols-7 gap-1 mb-2">
          <div 
            v-for="day in weekDays" 
            :key="day"
            class="text-center text-xs font-medium text-gray-500 py-1"
          >
            {{ day }}
          </div>
        </div>

        <!-- Calendar Days -->
        <div class="grid grid-cols-7 gap-1">
          <button
            v-for="day in calendarDays"
            :key="day.date"
            type="button"
            @click="selectDate(day)"
            :disabled="!day.isCurrentMonth"
            :class="[
              'p-2 text-sm rounded transition',
              day.isCurrentMonth 
                ? 'hover:bg-blue-50 text-gray-700' 
                : 'text-gray-300 cursor-not-allowed',
              day.isSelected 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : '',
              day.isToday && !day.isSelected
                ? 'border border-blue-600 text-blue-600 font-semibold'
                : ''
            ]"
          >
            {{ day.day }}
          </button>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-2 mt-4 pt-4 border-t">
          <button 
            type="button"
            @click="clearDate"
            class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Clear
          </button>
          <button 
            type="button"
            @click="confirmDate"
            class="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface CalendarDay {
  date: string;
  day: number;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
}

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
  label?: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const showCalendar = ref(false);
const currentDate = ref(new Date());
const selectedDate = ref<Date | null>(props.modelValue ? new Date(props.modelValue) : null);
const tempSelectedDate = ref<Date | null>(selectedDate.value);

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });
});

const displayValue = computed(() => {
  if (selectedDate.value) {
    return selectedDate.value.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  return '';
});

const calendarDays = computed((): CalendarDay[] => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  
  const firstDayOfWeek = firstDay.getDay();
  const lastDate = lastDay.getDate();
  const prevLastDate = prevLastDay.getDate();
  
  const days: CalendarDay[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Previous month days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const day = prevLastDate - i;
    const date = new Date(year, month - 1, day);
    days.push({
      date: date.toISOString(),
      day,
      isCurrentMonth: false,
      isSelected: false,
      isToday: false
    });
  }
  
  // Current month days
  for (let day = 1; day <= lastDate; day++) {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);
    
    const isSelected = tempSelectedDate.value 
      ? date.getTime() === new Date(tempSelectedDate.value).setHours(0, 0, 0, 0)
      : false;
    
    const isToday = date.getTime() === today.getTime();
    
    days.push({
      date: date.toISOString(),
      day,
      isCurrentMonth: true,
      isSelected,
      isToday
    });
  }
  
  // Next month days to fill the grid
  const remainingDays = 42 - days.length; // 6 rows * 7 days
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(year, month + 1, day);
    days.push({
      date: date.toISOString(),
      day,
      isCurrentMonth: false,
      isSelected: false,
      isToday: false
    });
  }
  
  return days;
});

const toggleCalendar = () => {
  showCalendar.value = !showCalendar.value;
  if (showCalendar.value) {
    tempSelectedDate.value = selectedDate.value;
    if (selectedDate.value) {
      currentDate.value = new Date(selectedDate.value);
    }
  }
};

const previousMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  );
};

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  );
};

const selectDate = (day: CalendarDay) => {
  if (!day.isCurrentMonth) return;
  tempSelectedDate.value = new Date(day.date);
};

const confirmDate = () => {
  if (tempSelectedDate.value) {
    selectedDate.value = tempSelectedDate.value;
    const formattedDate = selectedDate.value.toISOString().split('T')[0];
    emit('update:modelValue', formattedDate);
  }
  showCalendar.value = false;
};

const clearDate = () => {
  tempSelectedDate.value = null;
  selectedDate.value = null;
  emit('update:modelValue', '');
  showCalendar.value = false;
};

// Click outside directive
const vClickOutside = {
  mounted(el: HTMLElement, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value();
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el: HTMLElement & { clickOutsideEvent?: (event: Event) => void }) {
    if (el.clickOutsideEvent) {
      document.removeEventListener('click', el.clickOutsideEvent);
    }
  }
};
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
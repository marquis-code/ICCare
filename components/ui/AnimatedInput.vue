<template>
  <div class="mb-2 relative">
    <div class="relative input-container">
      <label 
        :for="inputId"
        :class="[
          'absolute transition-all duration-300 ease-in-out pointer-events-none z-10',
          isFocused || modelValue ? 
            'text-xs text-gray-500 left-3 top-2' : 
            `text-base text-gray-500 left-3 ${type === 'textarea' ? 'top-4' : 'top-1/2 transform -translate-y-1/2'}`
        ]"
      >
        {{ label }}
      </label>
      
      <!-- Textarea -->
      <textarea
        v-if="type === 'textarea'"
        :id="inputId"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :rows="rows"
        :class="[
          'w-full py-4 pt-6 px-3 bg-[#1A1A1B09] border-[0.5px] border-transparent focus:outline-none focus:ring-1 focus:ring-[#033958] focus:border-[#033958] transition-all duration-300 resize-none',
          roundedClasses,
          disabled ? 'opacity-50 cursor-not-allowed' : '',
          (hasError || (errorMessage && showError)) ? 'border-[0.5px] ring-red-500 border-red-500' : ''
        ]"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="$emit('keydown', $event)"
        @keyup="$emit('keyup', $event)"
      />
      
      <!-- Regular Input -->
      <input
        v-else
        :id="inputId"
        :type="computedType" 
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly || type === 'date' || type === 'time' || type === 'datetime-local'"
        :autocomplete="autocomplete"
        :class="[
          'w-full py-4 pt-6 px-3 bg-[#1A1A1B09] border-[0.5px] border-transparent focus:outline-none focus:ring-1 focus:ring-[#033958] focus:border-[#033958] transition-all duration-300',
          roundedClasses,
          disabled ? 'opacity-50 cursor-not-allowed' : '',
          (type === 'date' || type === 'time' || type === 'datetime-local') ? 'cursor-pointer' : '',
          (hasError || (errorMessage && showError)) ? 'border-[0.5px] ring-red-500 border-red-500' : ''
        ]"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @click="handleInputClick"
        @keydown="$emit('keydown', $event)"
        @keyup="$emit('keyup', $event)"
      />
      
      <!-- Password toggle button -->
      <button 
        v-if="type === 'password'"
        type="button" 
        @click="togglePasswordVisibility" 
        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-20"
        :tabindex="-1"
      >
        <svg v-if="showPassword" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.70467 5.97342C2.0876 5.71812 2.605 5.82161 2.8603 6.20455C2.88214 6.23575 2.94429 6.3243 2.99039 6.38677C3.08266 6.51177 3.22232 6.69407 3.40606 6.91456C3.77446 7.35664 4.31504 7.94619 5.00091 8.53404C6.3858 9.72112 8.28184 10.8335 10.5002 10.8335C12.7187 10.8335 14.6144 9.72112 15.9993 8.53404C16.6852 7.94619 17.2257 7.35664 17.5942 6.91456C17.7779 6.69407 17.9176 6.51177 18.0098 6.38677C18.0559 6.3243 18.1181 6.23575 18.1399 6.20455C18.3952 5.82161 18.9127 5.71812 19.2956 5.97342C19.6785 6.22872 19.782 6.74611 19.5267 7.12905L19.522 7.13572C19.4885 7.1836 19.403 7.30584 19.3508 7.37652C19.2412 7.52494 19.0814 7.73327 18.8746 7.98153C18.4617 8.47696 17.8564 9.13737 17.084 9.79954C15.5522 11.1125 13.2818 12.5001 10.5002 12.5001C7.71866 12.5001 5.44805 11.1125 3.91625 9.79954C3.1438 9.13737 2.53855 8.47696 2.1257 7.98153C1.9188 7.73327 1.75899 7.52494 1.64944 7.37652C1.59463 7.30227 1.50297 7.17109 1.47354 7.12905C1.21825 6.74611 1.32173 6.22872 1.70467 5.97342Z" fill="#7A7A7A"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.42276 8.57746C4.74819 8.90287 4.74819 9.43054 4.42276 9.75596L2.75609 11.4226C2.43065 11.748 1.90301 11.748 1.57757 11.4226C1.25214 11.0972 1.25214 10.5695 1.57757 10.2441L3.24424 8.57746C3.56968 8.25201 4.09731 8.25201 4.42276 8.57746ZM16.5776 8.57746C16.903 8.25201 17.4307 8.25201 17.7561 8.57746L19.4227 10.2441C19.7482 10.5695 19.7482 11.0972 19.4227 11.4226C19.0973 11.748 18.5697 11.748 18.2442 11.4226L16.5776 9.75596C16.2522 9.43054 16.2522 8.90287 16.5776 8.57746ZM8.42891 10.5355C8.82356 10.7723 8.9515 11.2841 8.71474 11.6788L7.46474 13.7621C7.22795 14.1568 6.71606 14.2847 6.32141 14.048C5.92676 13.8111 5.7988 13.2993 6.03559 12.9046L7.28559 10.8213C7.52238 10.4266 8.03426 10.2987 8.42891 10.5355ZM12.5714 10.5355C12.9661 10.2987 13.4779 10.4266 13.7147 10.8213L14.9647 12.9046C15.2015 13.2993 15.0736 13.8111 14.6789 14.048C14.2842 14.2847 13.7724 14.1568 13.5356 13.7621L12.2856 11.6788C12.0488 11.2841 12.1767 10.7723 12.5714 10.5355Z" fill="#7A7A7A"/>
        </svg>
        <svg 
          v-else 
          xmlns="http://www.w3.org/2000/svg" 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        >
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </button>
      
      <!-- Calendar icon for date input -->
   <!-- Calendar icon for date input -->
<button 
  v-if="type === 'date'"
  type="button" 
  @click.stop.prevent="toggleDatePicker" 
  @mousedown.stop.prevent
  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#033958] transition-colors z-20"
  :tabindex="-1"
>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    stroke-width="2" 
    stroke-linecap="round" 
    stroke-linejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
</button>

<!-- Clock icon for time input -->
<button 
  v-if="type === 'time'"
  type="button" 
  @click.stop.prevent="toggleTimePicker" 
  @mousedown.stop.prevent
  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#033958] transition-colors z-20"
  :tabindex="-1"
>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    stroke-width="2" 
    stroke-linecap="round" 
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
</button>

<!-- DateTime icon for datetime-local input -->
<button 
  v-if="type === 'datetime-local'"
  type="button" 
  @click.stop.prevent="toggleDateTimePicker" 
  @mousedown.stop.prevent
  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#033958] transition-colors z-20"
  :tabindex="-1"
>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    stroke-width="2" 
    stroke-linecap="round" 
    stroke-linejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
    <circle cx="12" cy="15" r="2"></circle>
  </svg>
</button>
      
      <!-- Clock icon for time input -->
      <button 
        v-if="type === 'time'"
        type="button" 
        @click="toggleTimePicker" 
        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#033958] transition-colors z-20"
        :tabindex="-1"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      </button>
      
      <!-- DateTime icon for datetime-local input -->
      <button 
        v-if="type === 'datetime-local'"
        type="button" 
        @click="toggleDateTimePicker" 
        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#033958] transition-colors z-20"
        :tabindex="-1"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
          <circle cx="12" cy="15" r="2"></circle>
        </svg>
      </button>
      
      <!-- Custom right slot for other icons/buttons -->
      <div 
        v-if="$slots.right && type !== 'password' && type !== 'date' && type !== 'time' && type !== 'datetime-local'" 
        class="absolute right-3 top-1/2 transform -translate-y-1/2 z-20"
      >
        <slot name="right" />
      </div>
    </div>
    
    <!-- Custom Date Picker -->
  <!-- Custom Date Picker - REVAMPED -->
<Transition name="slide-fade">
  <div 
    v-if="showDatePicker && type === 'date'"
    ref="datePickerRef"
    class="absolute z-50 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 w-[340px]"
    @mousedown.stop
    @click.stop
  >
    <!-- Date Picker Header -->
    <div class="flex items-center justify-between mb-6">
      <button 
        type="button"
        @click.stop.prevent="previousMonth" 
        class="p-2.5 hover:bg-gray-50 rounded-xl transition-all hover:scale-105"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      
      <div class="flex items-center gap-3">
        <div class="relative">
          <button
            type="button"
            @click.stop.prevent="toggleMonthDropdown"
            class="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#033958] transition-all flex items-center gap-2"
          >
            {{ months[currentMonth] }}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="{ 'rotate-180': showMonthDropdown }">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div v-if="showMonthDropdown" class="absolute top-full mt-2 left-0 bg-white border border-gray-100 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto w-40">
            <button
              v-for="(month, idx) in months"
              :key="idx"
              type="button"
              @click.stop.prevent="selectMonth(idx)"
              class="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors font-medium"
              :class="{ 'bg-[#033958] text-white hover:bg-[#033958]': idx === currentMonth }"
            >
              {{ month }}
            </button>
          </div>
        </div>
        
        <div class="relative">
          <button
            type="button"
            @click.stop.prevent="toggleYearDropdown"
            class="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#033958] transition-all flex items-center gap-2"
          >
            {{ currentYear }}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="{ 'rotate-180': showYearDropdown }">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div v-if="showYearDropdown" class="absolute top-full mt-2 right-0 bg-white border border-gray-100 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto w-28">
            <button
              v-for="year in yearRange"
              :key="year"
              type="button"
              @click.stop.prevent="selectYear(year)"
              class="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors font-medium"
              :class="{ 'bg-[#033958] text-white hover:bg-[#033958]': year === currentYear }"
            >
              {{ year }}
            </button>
          </div>
        </div>
      </div>
      
      <button 
        type="button"
        @click.stop.prevent="nextMonth" 
        class="p-2.5 hover:bg-gray-50 rounded-xl transition-all hover:scale-105"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
    
    <!-- Week Days -->
    <div class="grid grid-cols-7 gap-2 mb-3">
      <div 
        v-for="day in weekDays" 
        :key="day" 
        class="text-center text-xs font-bold text-gray-400 py-2"
      >
        {{ day }}
      </div>
    </div>
    
    <!-- Calendar Days -->
    <div class="grid grid-cols-7 gap-2 mb-4">
      <button
        v-for="(day, idx) in calendarDays"
        :key="idx"
        type="button"
        :disabled="!day.isCurrentMonth"
        :class="[
          'p-3 text-sm font-medium rounded-xl transition-all duration-200',
          day.isCurrentMonth ? 'hover:bg-gray-50 hover:scale-105' : 'text-gray-300 cursor-not-allowed opacity-30',
          day.isToday && !day.isSelected ? 'border-2 border-[#033958] text-[#033958] font-bold' : '',
          day.isSelected ? 'bg-[#033958] text-white hover:bg-[#022f42] shadow-lg scale-105' : '',
        ]"
        @click.stop.prevent="selectDate(day)"
      >
        {{ day.date }}
      </button>
    </div>
    
    <!-- Quick Actions -->
    <div class="pt-4 border-t-2 border-gray-100 flex justify-between items-center">
      <button 
        type="button"
        @click.stop.prevent="selectToday" 
        class="text-sm text-[#033958] hover:text-[#022f42] font-bold transition-colors px-4 py-2 hover:bg-gray-50 rounded-lg"
      >
        Today
      </button>
      <button 
        type="button"
        @click.stop.prevent="clearDate" 
        class="text-sm text-gray-500 hover:text-gray-700 font-semibold transition-colors px-4 py-2 hover:bg-gray-50 rounded-lg"
      >
        Clear
      </button>
    </div>
  </div>
</Transition>
    
    <!-- Custom Time Picker -->
<!-- Custom Time Picker -->
<!-- Custom Time Picker - REVAMPED -->
<Transition name="slide-fade">
  <div 
    v-if="showTimePicker && type === 'time'"
    ref="timePickerRef"
    class="absolute z-50 mt-2 bg-white rounded-2xl shadow-2xl border-[0.5px] border-gray-100 p-6 w-80"
    @mousedown.stop
    @click.stop
  >
    <div class="text-center mb-6">
      <h3 class="text-sm font-bold text-gray-800">Select Time</h3>
    </div>
    
    <!-- Time Display with Inline Controls -->
    <div class="flex items-center justify-center gap-4 mb-6 bg-gray-25 rounded-2xl">
      <!-- Hour Section -->
      <div class="flex flex-col items-center">
        <button
          type="button"
          @click.stop.prevent="incrementHour"
          @mousedown.stop.prevent
          class="p-2 hover:bg-white rounded-xl transition-all mb-2 hover:shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
        <input
          type="text"
          v-model="selectedHour"
          @blur="validateHour"
          @focus="$event.target.select()"
          @keydown.up.prevent="incrementHour"
          @keydown.down.prevent="decrementHour"
          @mousedown.stop
          @click.stop
          maxlength="2"
          class="w-16 text-center text-xl font-bold border-[0.5px] border-gray-50 rounded-2xl py-3  transition-all bg-white"
        />
        <button
          type="button"
          @click.stop.prevent="decrementHour"
          @mousedown.stop.prevent
          class="p-2 hover:bg-white rounded-xl transition-all mt-2 hover:shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
      
      <span class="text-4xl font-bold text-gray-400 mb-6">:</span>
      
      <!-- Minute Section -->
      <div class="flex flex-col items-center">
        <button
          type="button"
          @click.stop.prevent="incrementMinute"
          @mousedown.stop.prevent
          class="p-2 hover:bg-white rounded-xl transition-all mb-2 hover:shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
        <input
          type="text"
          v-model="selectedMinute"
          @blur="validateMinute"
          @focus="$event.target.select()"
          @keydown.up.prevent="incrementMinute"
          @keydown.down.prevent="decrementMinute"
          @mousedown.stop
          @click.stop
          maxlength="2"
          class="w-16 text-center text-xl font-bold border-[0.5px] border-gray-50 rounded-2xl py-3  transition-all bg-white"
        />
        <button
          type="button"
          @click.stop.prevent="decrementMinute"
          @mousedown.stop.prevent
          class="p-2 hover:bg-white rounded-xl transition-all mt-2 hover:shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
      
      <!-- AM/PM Section - FIXED -->
      <div class="flex flex-col gap-2 ml-2">
        <button
          type="button"
          @click.stop.prevent="setPeriod('AM')"
          @mousedown.stop.prevent
          :class="[
            'px-4 py-2.5 text-xs font-bold rounded-xl transition-all',
            selectedPeriod === 'AM' 
              ? 'bg-[#033958] text-white shadow-lg scale-105' 
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-50'
          ]"
        >
          AM
        </button>
        <button
          type="button"
          @click.stop.prevent="setPeriod('PM')"
          @mousedown.stop.prevent
          :class="[
            'px-4 py-2.5 text-xs font-bold rounded-xl transition-all',
            selectedPeriod === 'PM' 
              ? 'bg-[#033958] text-white shadow-lg scale-105' 
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-50'
          ]"
        >
          PM
        </button>
      </div>
    </div>
    
    <!-- Quick Time Selections -->
    <!-- <div class="grid grid-cols-3 gap-2 mb-5">
      <button
        v-for="quickTime in quickTimes"
        :key="quickTime.label"
        type="button"
        @click.stop.prevent="selectQuickTime(quickTime)"
        @mousedown.stop.prevent
        class="px-3 py-2.5 text-xs font-semibold text-gray-600 hover:text-[#033958] hover:bg-gray-50 border border-gray-50 rounded-xl transition-all hover:border-[#033958]"
      >
        {{ quickTime.label }}
      </button>
    </div> -->
    
    <!-- Action Buttons -->
    <div class="pt-5 border-t-[0.5px] border-gray-100 flex justify-between items-center">
      <button 
        type="button"
        @click.stop.prevent="setCurrentTime" 
        @mousedown.stop.prevent
        class="text-xs text-[#033958] hover:text-[#022f42] font-bold transition-colors px-4 py-2 hover:bg-gray-50 rounded-lg"
      >
        Now
      </button>
      <div class="flex gap-2">
        <button 
          type="button"
          @click.stop.prevent="clearTime" 
          @mousedown.stop.prevent
          class="px-4 py-2 text-xs text-gray-600 hover:text-gray-800 font-semibold border border-gray-50 rounded-xl transition-all hover:border-gray-300"
        >
          Clear
        </button>
        <button 
          type="button"
          @click.stop.prevent="confirmTime" 
          @mousedown.stop.prevent
          class="px-6 py-2 text-xs text-white bg-[#033958] hover:bg-[#022f42] rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</Transition>
    
    <!-- Custom DateTime Picker -->
<!-- Custom DateTime Picker - REVAMPED SIDE-BY-SIDE -->
<Transition name="slide-fade">
  <div 
    v-if="showDateTimePicker && type === 'datetime-local'"
    ref="dateTimePickerRef"
    class="absolute z-50 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 w-[680px]"
    @mousedown.stop
    @click.stop
  >
    <!-- Header -->
    <div class="text-center mb-6 pb-4 border-b-2 border-gray-100">
      <h3 class="text-lg font-bold text-gray-800">Select Date & Time</h3>
    </div>
    
    <!-- Side-by-Side Layout -->
    <div class="flex gap-6">
      <!-- DATE SECTION (LEFT) -->
      <div class="flex-1">
        <div class="text-center mb-4">
          <p class="text-sm font-bold text-gray-500 uppercase tracking-wide">Date</p>
        </div>
        
        <!-- Month/Year Navigation -->
        <div class="flex items-center justify-between mb-4">
          <button 
            type="button"
            @click.stop.prevent="previousMonth" 
            class="p-2 hover:bg-gray-50 rounded-xl transition-all hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <div class="flex items-center gap-2">
            <div class="relative">
              <button
                type="button"
                @click.stop.prevent="toggleMonthDropdown"
                class="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#033958] transition-all flex items-center gap-1"
              >
                {{ months[currentMonth].slice(0, 3) }}
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="{ 'rotate-180': showMonthDropdown }">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div v-if="showMonthDropdown" class="absolute top-full mt-1 left-0 bg-white border border-gray-100 rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto w-32">
                <button
                  v-for="(month, idx) in months"
                  :key="idx"
                  type="button"
                  @click.stop.prevent="selectMonth(idx)"
                  class="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors font-medium"
                  :class="{ 'bg-[#033958] text-white hover:bg-[#033958]': idx === currentMonth }"
                >
                  {{ month }}
                </button>
              </div>
            </div>
            
            <div class="relative">
              <button
                type="button"
                @click.stop.prevent="toggleYearDropdown"
                class="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#033958] transition-all flex items-center gap-1"
              >
                {{ currentYear }}
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="{ 'rotate-180': showYearDropdown }">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div v-if="showYearDropdown" class="absolute top-full mt-1 right-0 bg-white border border-gray-100 rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto w-24">
                <button
                  v-for="year in yearRange"
                  :key="year"
                  type="button"
                  @click.stop.prevent="selectYear(year)"
                  class="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors font-medium"
                  :class="{ 'bg-[#033958] text-white hover:bg-[#033958]': year === currentYear }"
                >
                  {{ year }}
                </button>
              </div>
            </div>
          </div>
          
          <button 
            type="button"
            @click.stop.prevent="nextMonth" 
            class="p-2 hover:bg-gray-50 rounded-xl transition-all hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
        
        <!-- Week Days -->
        <div class="grid grid-cols-7 gap-1 mb-2">
          <div 
            v-for="day in weekDays" 
            :key="day" 
            class="text-center text-xs font-bold text-gray-400 py-1"
          >
            {{ day }}
          </div>
        </div>
        
        <!-- Calendar Days -->
        <div class="grid grid-cols-7 gap-1">
          <button
            v-for="(day, idx) in calendarDays"
            :key="idx"
            type="button"
            :disabled="!day.isCurrentMonth"
            :class="[
              'p-2 text-xs font-medium rounded-lg transition-all duration-200',
              day.isCurrentMonth ? 'hover:bg-gray-50' : 'text-gray-300 cursor-not-allowed opacity-30',
              day.isToday && !day.isSelected ? 'border-2 border-[#033958] text-[#033958] font-bold' : '',
              day.isSelected ? 'bg-[#033958] text-white hover:bg-[#022f42] shadow-md' : '',
            ]"
            @click.stop.prevent="selectDateTimeDate(day)"
          >
            {{ day.date }}
          </button>
        </div>
      </div>
      
      <!-- VERTICAL DIVIDER -->
      <div class="w-px bg-gray-200"></div>
      
      <!-- TIME SECTION (RIGHT) -->
      <div class="w-64">
        <div class="text-center mb-4">
          <p class="text-sm font-bold text-gray-500 uppercase tracking-wide">Time</p>
        </div>
        
        <!-- Time Display -->
        <div class="flex items-center justify-center gap-3 mb-6 bg-gray-50 rounded-2xl p-4">
          <div class="flex flex-col items-center">
            <button
              type="button"
              @click.stop.prevent="incrementHour"
              @mousedown.stop.prevent
              class="p-1.5 hover:bg-white rounded-lg transition-all mb-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
            <input
              type="text"
              v-model="selectedHour"
              @blur="validateHour"
              @focus="$event.target.select()"
              @keydown.up.prevent="incrementHour"
              @keydown.down.prevent="decrementHour"
              @mousedown.stop
              @click.stop
              maxlength="2"
              class="w-14 text-center text-3xl font-bold border border-gray-50 rounded-xl py-2 focus:outline-none focus:ring-2 focus:ring-[#033958] focus:border-[#033958] transition-all bg-white"
            />
            <button
              type="button"
              @click.stop.prevent="decrementHour"
              @mousedown.stop.prevent
              class="p-1.5 hover:bg-white rounded-lg transition-all mt-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
          
          <span class="text-3xl font-bold text-gray-400 mb-4">:</span>
          
          <div class="flex flex-col items-center">
            <button
              type="button"
              @click.stop.prevent="incrementMinute"
              @mousedown.stop.prevent
              class="p-1.5 hover:bg-white rounded-lg transition-all mb-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
            <input
              type="text"
              v-model="selectedMinute"
              @blur="validateMinute"
              @focus="$event.target.select()"
              @keydown.up.prevent="incrementMinute"
              @keydown.down.prevent="decrementMinute"
              @mousedown.stop
              @click.stop
              maxlength="2"
              class="w-14 text-center text-3xl font-bold border border-gray-50 rounded-xl py-2 focus:outline-none focus:ring-2 focus:ring-[#033958] focus:border-[#033958] transition-all bg-white"
            />
            <button
              type="button"
              @click.stop.prevent="decrementMinute"
              @mousedown.stop.prevent
              class="p-1.5 hover:bg-white rounded-lg transition-all mt-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- AM/PM Toggle -->
        <div class="flex gap-2 mb-4">
          <button
            type="button"
            @click.stop.prevent="setPeriod('AM')"
            @mousedown.stop.prevent
            :class="[
              'flex-1 px-4 py-3 text-sm font-bold rounded-xl transition-all',
              selectedPeriod === 'AM' 
                ? 'bg-[#033958] text-white shadow-lg' 
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            ]"
          >
            AM
          </button>
          <button
            type="button"
            @click.stop.prevent="setPeriod('PM')"
            @mousedown.stop.prevent
            :class="[
              'flex-1 px-4 py-3 text-sm font-bold rounded-xl transition-all',
              selectedPeriod === 'PM' 
                ? 'bg-[#033958] text-white shadow-lg' 
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            ]"
          >
            PM
          </button>
        </div>
        
        <!-- Quick Times -->
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="quickTime in quickTimes.slice(0, 6)"
            :key="quickTime.label"
            type="button"
            @click.stop.prevent="selectQuickTime(quickTime)"
            @mousedown.stop.prevent
            class="px-2 py-2 text-xs font-semibold text-gray-600 hover:text-[#033958] hover:bg-gray-50 border border-gray-200 rounded-lg transition-all hover:border-[#033958]"
          >
            {{ quickTime.label }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Action Buttons -->
    <div class="pt-6 mt-6 border-t-2 border-gray-100 flex justify-between items-center">
      <button 
        type="button"
        @click.stop.prevent="selectNow" 
        @mousedown.stop.prevent
        class="text-sm text-[#033958] hover:text-[#022f42] font-bold transition-colors px-4 py-2 hover:bg-gray-50 rounded-lg"
      >
        Now
      </button>
      <div class="flex gap-3">
        <button 
          type="button"
          @click.stop.prevent="clearDateTime" 
          @mousedown.stop.prevent
          class="px-5 py-2.5 text-sm text-gray-600 hover:text-gray-800 font-semibold border border-gray-50 rounded-xl transition-all hover:border-gray-300"
        >
          Clear
        </button>
        <button 
          type="button"
          @click.stop.prevent="confirmDateTime" 
          @mousedown.stop.prevent
          class="px-8 py-2.5 text-sm text-white bg-[#033958] hover:bg-[#022f42] rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</Transition>
    
    <!-- Error Message -->
    <Transition name="slide-fade">
      <p v-if="errorMessage && showError" class="text-xs text-red-500 mt-1 ml-3">
        {{ errorMessage }}
      </p>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, useId, onMounted, onUnmounted } from 'vue'

interface Props {
  modelValue?: string | number
  label: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'number' | 'date' | 'time' | 'datetime-local' | 'textarea'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  autocomplete?: string
  errorMessage?: string
  showError?: boolean
  position?: 'top' | 'middle' | 'bottom' | 'standalone'
  hasError?: boolean
  rows?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  readonly: false,
  autocomplete: 'off',
  errorMessage: '',
  showError: true,
  position: 'standalone',
  hasError: false,
  rows: 4
})

interface Emits {
  'update:modelValue': [value: string]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
  'keydown': [event: KeyboardEvent]
  'keyup': [event: KeyboardEvent]
}

const emit = defineEmits<Emits>()

// State
const isFocused = ref(false)
const showPassword = ref(false)
const showDatePicker = ref(false)
const showTimePicker = ref(false)
const showDateTimePicker = ref(false)
const showMonthDropdown = ref(false)
const showYearDropdown = ref(false)
const inputId = useId()
const datePickerRef = ref<HTMLElement | null>(null)
const timePickerRef = ref<HTMLElement | null>(null)
const dateTimePickerRef = ref<HTMLElement | null>(null)
const selectedDate = ref<Date | null>(null)
const tempSelectedDate = ref<Date | null>(null) 

// Date picker state
const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())
const selectedDateForDateTime = ref<Date | null>(null)

// Time picker state
const selectedHour = ref('12')
const selectedMinute = ref('00')
const selectedPeriod = ref<'AM' | 'PM'>('PM')

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const quickTimes = [
  { label: '9:00 AM', hour: 9, minute: 0, period: 'AM' as const },
  { label: '12:00 PM', hour: 12, minute: 0, period: 'PM' as const },
  { label: '1:00 PM', hour: 1, minute: 0, period: 'PM' as const },
  { label: '3:00 PM', hour: 3, minute: 0, period: 'PM' as const },
  { label: '5:00 PM', hour: 5, minute: 0, period: 'PM' as const },
  { label: '6:00 PM', hour: 6, minute: 0, period: 'PM' as const }
]

// Computed
const computedType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  if (props.type === 'date' || props.type === 'time' || props.type === 'datetime-local') {
    return 'text'
  }
  return props.type
})

const displayValue = computed(() => {
  if (props.type === 'date' && props.modelValue) {
    return formatDateForDisplay(props.modelValue as string)
  }
  if (props.type === 'time' && props.modelValue) {
    return formatTimeForDisplay(props.modelValue as string)
  }
  if (props.type === 'datetime-local' && props.modelValue) {
    return formatDateTimeForDisplay(props.modelValue as string)
  }
  return props.modelValue
})

const roundedClasses = computed(() => {
  switch (props.position) {
    case 'top':
      return 'rounded-t-xl rounded-b-sm'
    case 'middle':
      return 'rounded-sm'
    case 'bottom':
      return 'rounded-b-xl rounded-t-sm'
    case 'standalone':
    default:
      return 'rounded-xl'
  }
})

const yearRange = computed(() => {
  const currentYearVal = new Date().getFullYear()
  const years = []
  for (let i = currentYearVal - 100; i <= currentYearVal + 10; i++) {
    years.push(i)
  }
  return years
})

interface CalendarDay {
  date: number
  fullDate: Date
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
}

const calendarDays = computed<CalendarDay[]>(() => {
  const year = currentYear.value
  const month = currentMonth.value
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const prevLastDay = new Date(year, month, 0)
  
  const firstDayOfWeek = firstDay.getDay()
  const lastDate = lastDay.getDate()
  const prevLastDate = prevLastDay.getDate()
  
  const days: CalendarDay[] = []
  
  // Determine selected date based on picker type
  let compareDate: Date | null = null
  
  if (props.type === 'datetime-local') {
    if (selectedDateForDateTime.value) {
      compareDate = selectedDateForDateTime.value
    } else if (props.modelValue) {
      const parsed = parseDateTimeString(props.modelValue as string)
      compareDate = parsed?.date || null
    }
  } else if (props.type === 'date') {
    if (selectedDate.value) {
      compareDate = selectedDate.value
    } else if (props.modelValue) {
      compareDate = new Date(props.modelValue as string)
    }
  }
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // Previous month days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = prevLastDate - i
    const fullDate = new Date(year, month - 1, date)
    fullDate.setHours(0, 0, 0, 0)
    
    days.push({
      date,
      fullDate,
      isCurrentMonth: false,
      isToday: fullDate.getTime() === today.getTime(),
      isSelected: compareDate ? fullDate.getTime() === compareDate.getTime() : false
    })
  }
  
  // Current month days
  for (let i = 1; i <= lastDate; i++) {
    const fullDate = new Date(year, month, i)
    fullDate.setHours(0, 0, 0, 0)
    
    days.push({
      date: i,
      fullDate,
      isCurrentMonth: true,
      isToday: fullDate.getTime() === today.getTime(),
      isSelected: compareDate ? fullDate.getTime() === compareDate.getTime() : false
    })
  }
  
  // Next month days
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    const fullDate = new Date(year, month + 1, i)
    fullDate.setHours(0, 0, 0, 0)
    
    days.push({
      date: i,
      fullDate,
      isCurrentMonth: false,
      isToday: fullDate.getTime() === today.getTime(),
      isSelected: compareDate ? fullDate.getTime() === compareDate.getTime() : false
    })
  }
  
  return days
})

// const calendarDays = computed<CalendarDay[]>(() => {
//   const year = currentYear.value
//   const month = currentMonth.value
  
//   const firstDay = new Date(year, month, 1)
//   const lastDay = new Date(year, month + 1, 0)
//   const prevLastDay = new Date(year, month, 0)
  
//   const firstDayOfWeek = firstDay.getDay()
//   const lastDate = lastDay.getDate()
//   const prevLastDate = prevLastDay.getDate()
  
//   const days: CalendarDay[] = []
  
//   // Previous month days
//   for (let i = firstDayOfWeek - 1; i >= 0; i--) {
//     const date = prevLastDate - i
//     days.push({
//       date,
//       fullDate: new Date(year, month - 1, date),
//       isCurrentMonth: false,
//       isToday: false,
//       isSelected: false
//     })
//   }
  
//   // Current month days
//   const today = new Date()
//   let selectedDate: Date | null = null
  
//   if (props.type === 'datetime-local' && props.modelValue) {
//     selectedDate = parseDateTimeString(props.modelValue as string)?.date || null
//   } else if (props.type === 'date' && props.modelValue) {
//     selectedDate = new Date(props.modelValue as string)
//   } else if (props.type === 'datetime-local' && selectedDateForDateTime.value) {
//     selectedDate = selectedDateForDateTime.value
//   }
  
//   for (let i = 1; i <= lastDate; i++) {
//     const fullDate = new Date(year, month, i)
//     const isToday = 
//       today.getDate() === i &&
//       today.getMonth() === month &&
//       today.getFullYear() === year
    
//     const isSelected = selectedDate
//       ? selectedDate.getDate() === i &&
//         selectedDate.getMonth() === month &&
//         selectedDate.getFullYear() === year
//       : false
    
//     days.push({
//       date: i,
//       fullDate,
//       isCurrentMonth: true,
//       isToday,
//       isSelected
//     })
//   }
  
//   // Next month days
//   const remainingDays = 42 - days.length
//   for (let i = 1; i <= remainingDays; i++) {
//     days.push({
//       date: i,
//       fullDate: new Date(year, month + 1, i),
//       isCurrentMonth: false,
//       isToday: false,
//       isSelected: false
//     })
//   }
  
//   return days
// })

// Methods
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  emit('update:modelValue', target.value)
}

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

const setPeriod = (period: 'AM' | 'PM') => {
  selectedPeriod.value = period
}

const handleInputClick = (e: MouseEvent) => {
  e.stopPropagation()
  if (props.type === 'date') {
    toggleDatePicker()
  } else if (props.type === 'time') {
    toggleTimePicker()
  } else if (props.type === 'datetime-local') {
    toggleDateTimePicker()
  }
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

// Custom Dropdown Methods
const toggleMonthDropdown = () => {
  showMonthDropdown.value = !showMonthDropdown.value
  showYearDropdown.value = false
}

const toggleYearDropdown = () => {
  showYearDropdown.value = !showYearDropdown.value
  showMonthDropdown.value = false
}

// const selectMonth = (monthIndex: number) => {
//   currentMonth.value = monthIndex
//   showMonthDropdown.value = false
// }

const selectMonth = (monthIndex: number) => {
  currentMonth.value = monthIndex
  showMonthDropdown.value = false
  
  // Update selected date to maintain the same day in new month
  if (props.type === 'datetime-local' && selectedDateForDateTime.value) {
    const day = selectedDateForDateTime.value.getDate()
    const newDate = new Date(currentYear.value, monthIndex, day)
    
    // If day doesn't exist in new month, use last day of month
    if (newDate.getMonth() !== monthIndex) {
      selectedDateForDateTime.value = new Date(currentYear.value, monthIndex + 1, 0)
    } else {
      selectedDateForDateTime.value = newDate
    }
  } else if (props.type === 'date' && selectedDate.value) {
    const day = selectedDate.value.getDate()
    const newDate = new Date(currentYear.value, monthIndex, day)
    
    if (newDate.getMonth() !== monthIndex) {
      selectedDate.value = new Date(currentYear.value, monthIndex + 1, 0)
    } else {
      selectedDate.value = newDate
    }
  }
}

// const selectYear = (year: number) => {
//   currentYear.value = year
//   showYearDropdown.value = false
// }

const selectYear = (year: number) => {
  currentYear.value = year
  showYearDropdown.value = false
  
  // Update selected date to maintain the same day/month in new year
  if (props.type === 'datetime-local' && selectedDateForDateTime.value) {
    const month = selectedDateForDateTime.value.getMonth()
    const day = selectedDateForDateTime.value.getDate()
    const newDate = new Date(year, month, day)
    
    // Handle leap year edge case
    if (newDate.getMonth() !== month) {
      selectedDateForDateTime.value = new Date(year, month + 1, 0)
    } else {
      selectedDateForDateTime.value = newDate
    }
  } else if (props.type === 'date' && selectedDate.value) {
    const month = selectedDate.value.getMonth()
    const day = selectedDate.value.getDate()
    const newDate = new Date(year, month, day)
    
    if (newDate.getMonth() !== month) {
      selectedDate.value = new Date(year, month + 1, 0)
    } else {
      selectedDate.value = newDate
    }
  }
}

// Date Picker Methods
// const toggleDatePicker = () => {
//   showDatePicker.value = !showDatePicker.value
  
//   if (showDatePicker.value && props.modelValue) {
//     const date = new Date(props.modelValue as string)
//     currentMonth.value = date.getMonth()
//     currentYear.value = date.getFullYear()
//   }
// }

const toggleDatePicker = () => {
  showDatePicker.value = !showDatePicker.value
  
  if (showDatePicker.value) {
    if (props.modelValue) {
      const date = new Date(props.modelValue as string)
      selectedDate.value = date
      currentMonth.value = date.getMonth()
      currentYear.value = date.getFullYear()
    } else {
      selectedDate.value = null
      const today = new Date()
      currentMonth.value = today.getMonth()
      currentYear.value = today.getFullYear()
    }
  }
}

const previousMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

// const selectDate = (day: CalendarDay) => {
//   if (!day.isCurrentMonth) return
  
//   const dateStr = formatDateForModel(day.fullDate)
//   emit('update:modelValue', dateStr)
//   showDatePicker.value = false
// }

const selectDate = (day: CalendarDay) => {
  if (!day.isCurrentMonth) {
    // Allow selecting dates from adjacent months
    currentMonth.value = day.fullDate.getMonth()
    currentYear.value = day.fullDate.getFullYear()
  }
  
  selectedDate.value = day.fullDate
  const dateStr = formatDateForModel(day.fullDate)
  emit('update:modelValue', dateStr)
  
  // Small delay before closing to prevent flicker
  setTimeout(() => {
    showDatePicker.value = false
  }, 100)
}

const selectToday = () => {
  const today = new Date()
  const dateStr = formatDateForModel(today)
  emit('update:modelValue', dateStr)
  currentMonth.value = today.getMonth()
  currentYear.value = today.getFullYear()
  showDatePicker.value = false
}

const clearDate = () => {
  emit('update:modelValue', '')
  showDatePicker.value = false
}

const formatDateForDisplay = (dateStr: string): string => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }
  return date.toLocaleDateString('en-US', options)
}

const formatDateForModel = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Time Picker Methods
const toggleTimePicker = () => {
  showTimePicker.value = !showTimePicker.value
  
  if (showTimePicker.value && props.modelValue) {
    const time = parseTimeString(props.modelValue as string)
    if (time) {
      selectedHour.value = time.hour
      selectedMinute.value = time.minute
      selectedPeriod.value = time.period
    }
  } else if (showTimePicker.value) {
    const now = new Date()
    let hour = now.getHours()
    const period = hour >= 12 ? 'PM' : 'AM'
    hour = hour % 12 || 12
    
    selectedHour.value = String(hour).padStart(2, '0')
    selectedMinute.value = String(now.getMinutes()).padStart(2, '0')
    selectedPeriod.value = period
  }
}

const parseTimeString = (timeStr: string) => {
  const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
  if (match) {
    return {
      hour: match[1].padStart(2, '0'),
      minute: match[2],
      period: match[3].toUpperCase() as 'AM' | 'PM'
    }
  }
  return null
}

const formatTimeForDisplay = (timeStr: string): string => {
  if (!timeStr) return ''
  return timeStr
}

const incrementHour = () => {
  let hour = parseInt(selectedHour.value)
  hour = hour === 12 ? 1 : hour + 1
  selectedHour.value = String(hour).padStart(2, '0')
}

const decrementHour = () => {
  let hour = parseInt(selectedHour.value)
  hour = hour === 1 ? 12 : hour - 1
  selectedHour.value = String(hour).padStart(2, '0')
}

const incrementMinute = () => {
  let minute = parseInt(selectedMinute.value)
  minute = (minute + 1) % 60
  selectedMinute.value = String(minute).padStart(2, '0')
}

const decrementMinute = () => {
  let minute = parseInt(selectedMinute.value)
  minute = minute === 0 ? 59 : minute - 1
  selectedMinute.value = String(minute).padStart(2, '0')
}

const togglePeriod = () => {
  selectedPeriod.value = selectedPeriod.value === 'AM' ? 'PM' : 'AM'
}

const validateHour = () => {
  let hour = parseInt(selectedHour.value)
  if (isNaN(hour) || hour < 1 || hour > 12) {
    hour = 12
  }
  selectedHour.value = String(hour).padStart(2, '0')
}

const validateMinute = () => {
  let minute = parseInt(selectedMinute.value)
  if (isNaN(minute) || minute < 0 || minute > 59) {
    minute = 0
  }
  selectedMinute.value = String(minute).padStart(2, '0')
}

const selectQuickTime = (quickTime: typeof quickTimes[0]) => {
  selectedHour.value = String(quickTime.hour).padStart(2, '0')
  selectedMinute.value = String(quickTime.minute).padStart(2, '0')
  selectedPeriod.value = quickTime.period
}

const setCurrentTime = () => {
  const now = new Date()
  let hour = now.getHours()
  const period = hour >= 12 ? 'PM' : 'AM'
  hour = hour % 12 || 12
  
  selectedHour.value = String(hour).padStart(2, '0')
  selectedMinute.value = String(now.getMinutes()).padStart(2, '0')
  selectedPeriod.value = period
}

const clearTime = () => {
  emit('update:modelValue', '')
  showTimePicker.value = false
}

const confirmTime = () => {
  const timeStr = `${selectedHour.value}:${selectedMinute.value} ${selectedPeriod.value}`
  emit('update:modelValue', timeStr)
  showTimePicker.value = false
}

// DateTime Picker Methods
const toggleDateTimePicker = () => {
  showDateTimePicker.value = !showDateTimePicker.value
  
  if (showDateTimePicker.value) {
    if (props.modelValue) {
      const parsed = parseDateTimeString(props.modelValue as string)
      if (parsed) {
        selectedDateForDateTime.value = parsed.date
        currentMonth.value = parsed.date.getMonth()
        currentYear.value = parsed.date.getFullYear()
        selectedHour.value = parsed.hour
        selectedMinute.value = parsed.minute
        selectedPeriod.value = parsed.period
      }
    } else {
      const now = new Date()
      selectedDateForDateTime.value = now
      currentMonth.value = now.getMonth()
      currentYear.value = now.getFullYear()
      
      let hour = now.getHours()
      const period = hour >= 12 ? 'PM' : 'AM'
      hour = hour % 12 || 12
      
      selectedHour.value = String(hour).padStart(2, '0')
      selectedMinute.value = String(now.getMinutes()).padStart(2, '0')
      selectedPeriod.value = period
    }
  }
}

const selectDateTimeDate = (day: CalendarDay) => {
  if (!day.isCurrentMonth) return
  selectedDateForDateTime.value = day.fullDate
}

const selectNow = () => {
  const now = new Date()
  selectedDateForDateTime.value = now
  currentMonth.value = now.getMonth()
  currentYear.value = now.getFullYear()
  
  let hour = now.getHours()
  const period = hour >= 12 ? 'PM' : 'AM'
  hour = hour % 12 || 12
  
  selectedHour.value = String(hour).padStart(2, '0')
  selectedMinute.value = String(now.getMinutes()).padStart(2, '0')
  selectedPeriod.value = period
}

const clearDateTime = () => {
  emit('update:modelValue', '')
  selectedDateForDateTime.value = null
  showDateTimePicker.value = false
}

const confirmDateTime = () => {
  if (!selectedDateForDateTime.value) {
    selectedDateForDateTime.value = new Date()
  }
  
  const dateTimeStr = formatDateTimeForModel(
    selectedDateForDateTime.value,
    selectedHour.value,
    selectedMinute.value,
    selectedPeriod.value
  )
  emit('update:modelValue', dateTimeStr)
  showDateTimePicker.value = false
}

const parseDateTimeString = (dateTimeStr: string) => {
  const parts = dateTimeStr.split(',').map(p => p.trim())
  
  if (parts.length >= 3) {
    const datePart = `${parts[0]}, ${parts[1]}, ${parts[2]}`
    const date = new Date(datePart)
    
    const timePart = parts[3] || '12:00 PM'
    const timeMatch = timePart.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
    
    if (timeMatch && !isNaN(date.getTime())) {
      return {
        date,
        hour: timeMatch[1].padStart(2, '0'),
        minute: timeMatch[2],
        period: timeMatch[3].toUpperCase() as 'AM' | 'PM'
      }
    }
  }
  
  return null
}

const formatDateTimeForDisplay = (dateTimeStr: string): string => {
  if (!dateTimeStr) return ''
  
  const parsed = parseDateTimeString(dateTimeStr)
  if (parsed) {
    const dateOptions: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    }
    const dateStr = parsed.date.toLocaleDateString('en-US', dateOptions)
    return `${dateStr}, ${parsed.hour}:${parsed.minute} ${parsed.period}`
  }
  
  return dateTimeStr
}

const formatDateTimeForModel = (
  date: Date,
  hour: string,
  minute: string,
  period: 'AM' | 'PM'
): string => {
  const dateOptions: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    weekday: 'short'
  }
  const dateStr = date.toLocaleDateString('en-US', dateOptions)
  return `${dateStr}, ${hour}:${minute} ${period}`
}

// Click outside handlers
const handleClickOutside = (event: MouseEvent) => {
  if (datePickerRef.value && !datePickerRef.value.contains(event.target as Node)) {
    const inputElement = document.getElementById(inputId) as HTMLInputElement
    if (inputElement && !inputElement.contains(event.target as Node)) {
      showDatePicker.value = false
      showMonthDropdown.value = false
      showYearDropdown.value = false
    }
  }
  
  if (timePickerRef.value && !timePickerRef.value.contains(event.target as Node)) {
    const inputElement = document.getElementById(inputId) as HTMLInputElement
    if (inputElement && !inputElement.contains(event.target as Node)) {
      showTimePicker.value = false
    }
  }
  
  if (dateTimePickerRef.value && !dateTimePickerRef.value.contains(event.target as Node)) {
    const inputElement = document.getElementById(inputId) as HTMLInputElement
    if (inputElement && !inputElement.contains(event.target as Node)) {
      showDateTimePicker.value = false
      showMonthDropdown.value = false
      showYearDropdown.value = false
    }
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Expose methods
defineExpose({
  focus: () => {
    const input = document.getElementById(inputId) as HTMLInputElement | HTMLTextAreaElement
    input?.focus()
  },
  blur: () => {
    const input = document.getElementById(inputId) as HTMLInputElement | HTMLTextAreaElement
    input?.blur()
  }
})
</script>
<style scoped>
input:focus,
textarea:focus {
  border-color: #033958;
}

.input-container {
  position: relative;
}

.input-container label {
  background: transparent;
  padding: 0 4px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.input-container input,
.input-container textarea {
  position: relative;
  z-index: 0;
}

/* Improved transitions */
.slide-fade-enter-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);
}

.slide-fade-enter-from {
  transform: translateY(-8px) scale(0.96);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-4px) scale(0.98);
  opacity: 0;
}

/* Smooth dropdown arrow rotation */
svg {
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
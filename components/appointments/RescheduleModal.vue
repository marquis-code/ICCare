<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click.self="$emit('close')">
    <div class="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
      <div class="flex justify-between items-center mb-5">
        <h2 class="text-lg font-black text-foreground">Reschedule Appointment</h2>
        <button 
          @click="$emit('close')"
          class="text-foreground/50 hover:text-foreground transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="mb-6 bg-muted rounded-lg">
        <p class="text-sm font-medium text-foreground/70 mb-2">Current Appointment:</p>
        <p class="font-medium text-sm text-foreground">
          {{ formatDate(appointment.date) }} at {{ appointment.timeSlot }}
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-foreground mb-2">
            New Date
          </label>
          <input
            v-model="newDate"
            type="date"
            :min="minDate"
            required
            class="custom-input"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-foreground mb-2">
            New Time Slot
          </label>
          <select
            v-model="newTimeSlot"
            required
            class="custom-input"
          >
            <option value="" disabled>Select a time slot</option>
            <option value="09:00 - 12:00">09:00 AM - 12:00 PM</option>
            <option value="12:00 - 15:00">12:00 PM - 03:00 PM</option>
            <option value="15:00 - 18:00">03:00 PM - 06:00 PM</option>
          </select>
        </div>

        <div class="flex gap-3 pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 px-4 py-3 outline-none border-[0.5px] text-sm border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="flex-1 px-4 py-3 outline-none border-[0.5px] text-sm bg-primary text-white bg-black rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Confirm Reschedule
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Appointment } from '@/types/index'

const props = defineProps<{
  appointment: Appointment
}>()

const emit = defineEmits<{
  close: []
  confirm: [data: { date: string; timeSlot: string }]
}>()

const newDate = ref('')
const newTimeSlot = ref('')

const minDate = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
})

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

const handleSubmit = () => {
  if (newDate.value && newTimeSlot.value) {
    emit('confirm', {
      date: newDate.value,
      timeSlot: newTimeSlot.value
    })
  }
}
</script>
<template>
  <div class="bg-white rounded-lg border-[0.5px] border-gray-100 p-6 hover:shadow-lg transition-shadow">
    <div class="flex justify-between items-start mb-4">
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xl">
            {{ appointmentTypeIcon }}
          </span>
          <h3 class="font-semibold text-base text-foreground">
            {{ appointmentTypeLabel }}
          </h3>
        </div>
        <p class="text-sm text-foreground/70">
          <span class="font-medium">📅 {{ formatDate(appointment.date) }}</span>
          <span class="mx-2">•</span>
          <span class="font-medium">🕐 {{ appointment.timeSlot }}</span>
        </p>
      </div>
      <span
        :class="[
          'inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide',
          statusClass,
        ]"
      >
        {{ appointment.status }}
      </span>
    </div>

    <div class="space-y-3 mb-5 pt-4 border-t-[0.5px] border-gray-100">
      <div v-if="appointment.consultationMode" class="flex items-start gap-2">
        <span class="text-foreground/50 text-sm">Mode:</span>
        <span class="text-sm font-medium text-foreground capitalize">
          {{ appointment.consultationMode }}
        </span>
      </div>
      
      <div v-if="appointment.location" class="flex items-start gap-2">
        <span class="text-foreground/50 text-sm">📍 Location:</span>
        <span class="text-sm text-foreground">{{ appointment.location }}</span>
      </div>
      
      <div v-if="appointment.googleMeetLink" class="flex items-start gap-2">
        <span class="text-foreground/50 text-sm">🔗 Meeting:</span>
        <a 
          :href="appointment.googleMeetLink" 
          target="_blank"
          rel="noopener noreferrer" 
          class="text-sm text-primary hover:underline font-medium"
        >
          Join Google Meet
        </a>
      </div>
      
      <div class="flex items-start gap-2">
        <span class="text-foreground/50 text-sm">💰 Price:</span>
        <span class="text-sm font-semibold text-foreground">
          ₦{{ appointment.price.toLocaleString() }}
        </span>
      </div>
      
      <div class="flex items-start gap-2">
        <span class="text-foreground/50 text-sm">💳 Payment:</span>
        <span :class="['text-sm font-medium', paymentStatusClass]">
          {{ paymentStatusLabel }}
        </span>
      </div>

      <div v-if="appointment.userId" class="flex items-start gap-2 pt-2 border-t-[0.5px] border-gray-100">
        <span class="text-foreground/50 text-sm">👤 Booked by:</span>
        <span class="text-sm text-foreground">
          {{ appointment.userId.name }}
        </span>
      </div>
    </div>

    <div class="flex gap-3 flex-wrap">
      <button
        v-if="canReschedule"
        @click="$emit('reschedule')"
        class="flex-1 min-w-[120px] text-sm border-[0.4px] outline-none text-sm px-4 py-2.5 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white hover:bg-black transition-colors"
      >
        Reschedule
      </button>
      <button
        v-if="canCancel"
        @click="$emit('cancel')"
        class="flex-1 min-w-[120px] text-sm border-[0.4px] outline-none text-sm px-4 py-2.5 border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
      >
        Cancel
      </button>
      <button
        v-if="appointment.paymentStatus === 'pending'"
        @click="$emit('pay')"
        :disabled="initiating"
        class="flex-1 min-w-[120px] disabled:cursor-not-allowed disabled:opacity-25 text-sm bg-black border-[0.4px] outline-none text-sm px-4 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
         {{  initiating ? 'initiating' : 'Complete Payment' }}
      </button>
       <a
        v-if="appointment.googleMeetLink && canJoinMeet"
        :href="appointment.googleMeetLink"
        target="_blank"
        rel="noopener noreferrer"
        class="flex-1 min-w-[120px] text-s border-[0.4px] outline-none text-center text-sm px-4 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
      >
        Join Meeting
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Appointment } from '@/types/index'

const props = defineProps<{
  appointment: Appointment
  initiating: Boolean
}>()

const emit = defineEmits<{
  reschedule: []
  cancel: []
  pay: []
}>()

const appointmentTypeIcon = computed(() => 
  props.appointment.consultationType === 'physical' ? '🏥' : '💻'
)

const appointmentTypeLabel = computed(() => 
  props.appointment.consultationType === 'physical' 
    ? 'Physical Consultation' 
    : 'Virtual Consultation'
)

const isUpcoming = computed(() => {
  const appointmentDate = new Date(props.appointment.date)
  const now = new Date()
  return appointmentDate > now
})

const canReschedule = computed(() => {
  return (props.appointment.status === 'pending' || props.appointment.status === 'confirmed') 
    && isUpcoming.value
})

const canCancel = computed(() => {
  return (props.appointment.status === 'pending' || props.appointment.status === 'confirmed') 
    && isUpcoming.value
})

const canJoinMeet = computed(() => {
  const appointmentDate = new Date(props.appointment.date)
  const now = new Date()
  const diffHours = (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60)
  
  // Allow joining 30 minutes before and during the appointment
  return isUpcoming.value && diffHours <= 0.5 && props.appointment.status === 'confirmed'
})

const statusClass = computed(() => {
  const status = props.appointment.status
  if (status === 'pending') return 'bg-yellow-100 text-yellow-800'
  if (status === 'confirmed') return 'bg-blue-100 text-blue-800'
  if (status === 'completed') return 'bg-green-100 text-green-800'
  if (status === 'cancelled') return 'bg-red-100 text-red-800'
  return 'bg-gray-100 text-gray-800'
})

const paymentStatusClass = computed(() => {
  const status = props.appointment.paymentStatus
  if (status === 'successful') return 'text-green-600'
  if (status === 'failed') return 'text-red-600'
  return 'text-yellow-600'
})

const paymentStatusLabel = computed(() => {
  const status = props.appointment.paymentStatus
  if (status === 'successful') return '✓ Paid'
  if (status === 'failed') return '✗ Failed'
  return '⏳ Pending'
})

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
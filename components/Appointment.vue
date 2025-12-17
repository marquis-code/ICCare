<template>
  <div class="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
    <!-- Header Section -->
    <div class="bg-gradient-to-r from-primary/5 to-primary/10 px-4 sm:px-6 py-4 border-b border-gray-100">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div class="flex items-start gap-3">
          <div class="text-2xl sm:text-3xl flex-shrink-0">
            {{ appointmentType === 'physical' ? '🏥' : '💻' }}
          </div>
          <div class="min-w-0 flex-1">
            <h3 class="font-semibold text-foreground text-base sm:text-lg truncate">
              {{ appointmentType === 'physical' ? 'Physical' : 'Virtual' }} Consultation
            </h3>
            <p class="text-xs sm:text-sm text-foreground/60 mt-0.5">
              {{ formatDate(appointment.date) }}
            </p>
          </div>
        </div>
        <span
          :class="[
            'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap self-start sm:self-auto',
            statusClass,
          ]"
        >
          <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="statusDotClass"></span>
          {{ appointment.status }}
        </span>
      </div>
    </div>

    <!-- Content Section -->
    <div class="px-4 sm:px-6 py-4 space-y-3">
      <!-- Time Slot -->
      <div class="flex items-center gap-2 text-sm">
        <span class="text-foreground/50">🕐</span>
        <span class="font-medium text-foreground">{{ appointment.timeSlot }}</span>
      </div>

      <!-- Location or Meeting Link -->
      <div v-if="appointment.location" class="flex items-start gap-2 text-sm">
        <span class="text-foreground/50 flex-shrink-0">📍</span>
        <span class="text-foreground/70 break-words">{{ appointment.location }}</span>
      </div>

      <div v-if="appointment.googleMeetLink" class="flex items-start gap-2 text-sm">
        <span class="text-foreground/50 flex-shrink-0">🔗</span>
        <a 
          :href="appointment.googleMeetLink" 
          target="_blank" 
          rel="noopener noreferrer"
          class="text-primary hover:text-primary/80 transition-colors font-medium break-all"
        >
          Join Google Meet →
        </a>
      </div>

      <!-- Price and Payment Status -->
      <div class="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 border-t border-gray-100">
        <div class="flex items-center gap-2 text-sm">
          <span class="text-foreground/50">💰</span>
          <span class="font-semibold text-foreground">${{ appointment.price.toLocaleString() }}</span>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <span class="text-foreground/50">💳</span>
          <span :class="['font-medium capitalize', paymentStatusClass]">
            {{ appointment.paymentStatus }}
          </span>
        </div>
      </div>
    </div>

    <!-- Actions Section -->
    <div 
      v-if="showActions" 
      class="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-2"
    >
      <button
        v-if="appointment.status === 'booked' && isUpcoming"
        @click="$emit('reschedule')"
        class="flex-1 sm:flex-none text-sm px-4 py-2.5 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-200 font-medium"
      >
        📅 Reschedule
      </button>
      <button
        v-if="appointment.status === 'booked' && isUpcoming"
        @click="$emit('cancel')"
        class="flex-1 sm:flex-none text-sm px-4 py-2.5 border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200 font-medium"
      >
        ❌ Cancel
      </button>
      <button
        v-if="appointment.paymentStatus === 'pending'"
        @click="$emit('pay')"
        class="flex-1 sm:flex-none text-sm px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium shadow-sm"
      >
        💳 Complete Payment
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Appointment {
  id: string;
  consultationType: 'physical' | 'virtual';
  date: string;
  timeSlot: string;
  location?: string;
  googleMeetLink?: string;
  price: number;
  paymentStatus: 'pending' | 'successful' | 'failed';
  status: 'booked' | 'completed' | 'canceled';
}

const props = defineProps<{
  appointment: Appointment;
}>();

const emit = defineEmits<{
  reschedule: [];
  cancel: [];
  pay: [];
}>();

const appointmentType = computed(() => props.appointment.consultationType);

const isUpcoming = computed(() => new Date(props.appointment.date) > new Date());

const showActions = computed(() => {
  return (
    (props.appointment.status === 'booked' && isUpcoming.value) ||
    props.appointment.paymentStatus === 'pending'
  );
});

const statusClass = computed(() => {
  const status = props.appointment.status;
  if (status === 'booked') return 'bg-blue-50 text-blue-700 border border-blue-200';
  if (status === 'completed') return 'bg-green-50 text-green-700 border border-green-200';
  if (status === 'canceled') return 'bg-red-50 text-red-700 border border-red-200';
  return 'bg-gray-50 text-gray-700 border border-gray-200';
});

const statusDotClass = computed(() => {
  const status = props.appointment.status;
  if (status === 'booked') return 'bg-blue-500';
  if (status === 'completed') return 'bg-green-500';
  if (status === 'canceled') return 'bg-red-500';
  return 'bg-gray-500';
});

const paymentStatusClass = computed(() => {
  const status = props.appointment.paymentStatus;
  if (status === 'successful') return 'text-green-600';
  if (status === 'failed') return 'text-red-600';
  return 'text-yellow-600';
});

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
</script>
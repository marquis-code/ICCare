<template>
  <div class="bg-white rounded-lg border border-border p-6 hover:shadow-md transition">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="font-semibold text-foreground">
          {{ appointmentType === 'physical' ? '🏥 Physical' : '💻 Virtual' }}
          Consultation
        </h3>
        <p class="text-sm text-foreground/60 mt-1">
          {{ formatDate(appointment.date) }} at {{ appointment.timeSlot }}
        </p>
      </div>
      <span
        :class="[
          'inline-block px-3 py-1 rounded-full text-xs font-medium',
          statusClass,
        ]"
      >
        {{ appointment.status }}
      </span>
    </div>

    <div class="space-y-2 mb-4">
      <p v-if="appointment.location" class="text-sm text-foreground/70">
        <strong>Location:</strong> {{ appointment.location }}
      </p>
      <p v-if="appointment.googleMeetLink" class="text-sm">
        <strong>Meeting Link:</strong>
        <a :href="appointment.googleMeetLink" target="_blank" class="text-primary hover:underline">
          Join Meet
        </a>
      </p>
      <p class="text-sm text-foreground/70">
        <strong>Price:</strong> ${{ appointment.price.toFixed(2) }}
      </p>
      <p class="text-sm text-foreground/70">
        <strong>Payment:</strong>
        <span :class="paymentStatusClass">{{ appointment.paymentStatus }}</span>
      </p>
    </div>

    <div class="flex gap-2 flex-wrap">
      <button
        v-if="appointment.status === 'booked' && isUpcoming"
        @click="$emit('reschedule')"
        class="text-sm px-3 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition"
      >
        Reschedule
      </button>
      <button
        v-if="appointment.status === 'booked' && isUpcoming"
        @click="$emit('cancel')"
        class="text-sm px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
      >
        Cancel
      </button>
      <button
        v-if="appointment.paymentStatus === 'pending'"
        @click="$emit('pay')"
        class="text-sm px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
      >
        Complete Payment
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

const statusClass = computed(() => {
  const status = props.appointment.status;
  if (status === 'booked') return 'bg-blue-100 text-blue-800';
  if (status === 'completed') return 'bg-green-100 text-green-800';
  if (status === 'canceled') return 'bg-red-100 text-red-800';
  return 'bg-gray-100 text-gray-800';
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
  });
};
</script>

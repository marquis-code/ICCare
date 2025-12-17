<template>
  <div>
    <label class="block text-sm font-medium text-foreground mb-3">Select Time Slot</label>
    <div class="grid grid-cols-3 sm:grid-cols-4 gap-2">
      <button
        v-for="slot in timeSlots"
        :key="slot"
        @click="$emit('select', slot)"
        :class="[
          'py-2 px-3 rounded-lg border text-sm font-medium transition',
          selectedSlot === slot
            ? 'bg-primary text-white border-primary'
            : 'border-border text-foreground hover:border-primary',
        ]"
      >
        {{ slot }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  timeSlots: string[];
  selectedSlot: string | null;
}>();

defineEmits<{
  select: [slot: string];
}>();
</script>

<template>
  <div
    @click="$emit('select')"
    :class="[
      'p-6 border-2 rounded-lg cursor-pointer transition',
      isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50',
    ]"
  >
    <div class="text-3xl mb-3">{{ icon }}</div>
    <h3 class="font-semibold text-foreground mb-2">{{ title }}</h3>
    <p class="text-sm text-foreground/60 mb-4">{{ description }}</p>
    <p class="font-bold text-primary">${{ price }}/session</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string;
  title: string;
  description: string;
  price: number;
  isSelected: boolean;
}>();

defineEmits<{
  select: [];
}>();
</script>

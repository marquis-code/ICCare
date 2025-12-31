<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-50 overflow-hidden">
    <div class="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </div>

      <h3 class="text-lg font-semibold text-gray-900 mb-2">
        No notification selected
      </h3>

      <p class="text-sm text-gray-600 max-w-sm">
        Select a notification from the list to view its details
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// This is a presentational component with no logic
</script>

<style scoped>
/* Optional: Add any specific styling if needed */
</style>
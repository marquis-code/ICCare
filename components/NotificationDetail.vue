<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <!-- Header -->
    <div class="flex items-start justify-between gap-4 mb-6 pb-6 border-b border-gray-200">
      <h2 class="text-xl font-bold text-gray-900">
        {{ notification.title }} - Serum Sample
      </h2>
      
      <div class="flex gap-2 flex-shrink-0">
        <button 
          @click="$emit('markUnread', notification.id)"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          Mark as Unread
        </button>
        <button 
          @click="handleDelete"
          class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
        >
          Delete Message
        </button>
      </div>
    </div>

    <!-- Message Content -->
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <p class="text-sm text-gray-700 leading-relaxed">
        {{ notification.message }}
      </p>
    </div>

    <!-- Related Sample Information -->
    <div v-if="notification.relatedSample" class="mb-6">
      <h3 class="text-base font-semibold text-gray-900 mb-4">Related Sample Information</h3>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Sample ID
              </th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Current Location
              </th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Type
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td class="px-4 py-3 text-sm">
                <NuxtLink 
                  :to="`/samples/${notification.relatedSample.sampleId}`"
                  class="text-blue-600 hover:text-blue-700 font-medium"
                >
                  {{ notification.relatedSample.sampleId }}
                </NuxtLink>
              </td>
              <td class="px-4 py-3 text-sm text-gray-700">
                {{ notification.relatedSample.currentLocation }}
              </td>
              <td class="px-4 py-3 text-sm">
                <span class="inline-flex px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  {{ notification.relatedSample.type }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Related Transfer Record -->
    <div v-if="notification.relatedTransfer" class="mb-6">
      <h3 class="text-base font-semibold text-gray-900 mb-4">Related Transfer Record</h3>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Transfer ID
              </th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Expected Delivery
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td class="px-4 py-3 text-sm">
                <NuxtLink 
                  :to="`/transfers/${notification.relatedTransfer.transferId}`"
                  class="text-blue-600 hover:text-blue-700 font-medium"
                >
                  {{ notification.relatedTransfer.transferId }}
                </NuxtLink>
              </td>
              <td class="px-4 py-3 text-sm">
                <span class="inline-flex px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  {{ notification.relatedTransfer.status }}
                </span>
              </td>
              <td class="px-4 py-3 text-sm text-gray-700">
                {{ notification.relatedTransfer.expectedDelivery }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Notification } from '~/types/notifications';

const props = defineProps<{
  notification: Notification;
}>();

const emit = defineEmits<{
  'markRead': [id: string];
  'markUnread': [id: string];
  'delete': [];
}>();

const handleDelete = () => {
  if (confirm('Are you sure you want to delete this notification?')) {
    emit('delete');
  }
};
</script>
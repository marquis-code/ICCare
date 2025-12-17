<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <!-- Header -->
    <div class="px-4 py-3 border-b border-gray-200 bg-gray-50">
      <h2 class="text-sm font-semibold text-gray-900">Notifications</h2>
    </div>

    <!-- Notification Items -->
    <div class="overflow-y-auto max-h-[calc(100vh-250px)] divide-y divide-gray-200">
      <button
        v-for="notification in notifications"
        :key="notification.id"
        @click="$emit('select', notification)"
        :class="[
          'w-full px-4 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left',
          selectedId === notification.id ? 'bg-blue-50 hover:bg-blue-50' : '',
          !notification.isRead ? 'bg-red-50 hover:bg-red-100' : 'bg-green-50 hover:bg-green-100'
        ]"
      >
        <!-- Avatar -->
        <div 
          :class="[
            'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold',
            !notification.isRead ? 'bg-red-200 text-red-700' : 'bg-green-200 text-green-700'
          ]"
        >
          LI
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-2 mb-1">
            <h3 class="text-sm font-semibold text-gray-900 truncate">
              {{ notification.title }}
            </h3>
            <span 
              v-if="notification.isNew" 
              class="px-2 py-0.5 bg-blue-600 text-white text-xs font-medium rounded-full flex-shrink-0"
            >
              New
            </span>
          </div>
          <p class="text-xs text-gray-500">{{ notification.timestamp }}</p>
        </div>
      </button>

      <div v-if="notifications.length === 0" class="px-4 py-12 text-center">
        <Icon name="heroicons:bell-slash" class="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p class="text-sm text-gray-500">No notifications</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Notification } from '~/types/notifications';

defineProps<{
  notifications: Notification[];
  selectedId?: string;
}>();

defineEmits<{
  'select': [notification: Notification];
  'markRead': [id: string];
  'delete': [id: string];
}>();
</script>
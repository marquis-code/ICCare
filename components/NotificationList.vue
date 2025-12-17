<template>
  <div class="bg-white rounded-lg shadow-sm border-[0.5px] border-gray-100 overflow-hidden">
    <!-- Header -->
    <div class="px-4 py-6 border-b-[0.5px] border-gray-100 bg-gray-25">
      <h2 class="text-sm font-semibold text-gray-900">Notifications</h2>
    </div>

    <!-- Notification Items -->
    <div class="overflow-y-auto max-h-[calc(100vh-250px)] divide-y-[0.5px] divide-gray-100">
      <button
        v-for="notification in notifications"
        :key="notification.id"
        @click="$emit('select', notification)"
        :class="[
          'w-full px-4 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left',
          selectedId === notification.id ? 'bg-blue-25 hover:bg-blue-25' : '',
          !notification.isRead ? 'bg-red-25 hover:bg-red-100' : 'bg-green-25 hover:bg-green-25'
        ]"
      >
        <!-- Avatar -->
        <div 
          :class="[
            'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold',
            !notification.isRead ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
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
              class="px-2 py-0.5 bg-[#005B8F] text-white text-xs font-medium rounded-full flex-shrink-0"
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
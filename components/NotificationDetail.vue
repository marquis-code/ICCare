<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-50 overflow-hidden">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <!-- Priority Badge -->
        <span
            :class="[
            'px-3 py-1 rounded-full text-xs font-semibold',
            getPriorityClass(notification.priority)
          ]"
        >
          {{ notification.priority.toUpperCase() }}
        </span>

        <!-- Read Status -->
        <span
            :class="[
            'px-3 py-1 rounded-full text-xs font-medium',
            notification.read
              ? 'bg-gray-100 text-gray-700'
              : 'bg-blue-100 text-blue-700'
          ]"
        >
          {{ notification.read ? 'Read' : 'Unread' }}
        </span>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-2">
        <button
            v-if="!notification.read"
            @click="$emit('mark-read', notification.notification_id)"
            class="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          Mark as read
        </button>
        <button
            v-else
            @click="$emit('mark-unread', notification.notification_id)"
            class="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
        >
          Mark as unread
        </button>

        <button
            @click="$emit('close')"
            class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="px-6 py-6 max-h-[calc(100vh-300px)] overflow-y-auto">
      <!-- Title -->
      <h2 class="text-2xl font-bold text-gray-900 mb-2">
        {{ notification.title }}
      </h2>

      <!-- Timestamp -->
      <div class="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ formatDateTime(notification.timestamp) }}</span>
      </div>

      <!-- Message -->
      <div class="prose prose-sm max-w-none mb-6">
        <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {{ notification.message }}
        </p>
      </div>

      <!-- Notification Type Badge -->
      <div class="mb-6">
        <span class="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          {{ formatNotificationType(notification.notification_type) }}
        </span>
      </div>

      <!-- Action URL -->
<!--      <div v-if="notification.action_url" class="border-t border-gray-100 pt-6">-->
<!--        <NuxtLink-->
<!--            :to="notification.action_url"-->
<!--            class="inline-flex items-center gap-2 px-4 py-2.5 bg-[#005B8F] text-white rounded-lg hover:bg-[#004a73] transition-colors font-medium"-->
<!--        >-->
<!--          <span>View Details</span>-->
<!--          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
<!--            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />-->
<!--          </svg>-->
<!--        </NuxtLink>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { Notification } from "@/api_factory/modules/notification"

interface Props {
  notification: Notification
}

defineProps<Props>()

defineEmits<{
  'mark-read': [notificationId: string]
  'mark-unread': [notificationId: string]
  close: []
}>()

const getPriorityClass = (priority: string): string => {
  const classes: Record<string, string> = {
    'urgent': 'bg-red-100 text-red-700',
    'high': 'bg-orange-100 text-orange-700',
    'normal': 'bg-gray-100 text-gray-700',
  }
  return classes[priority] || 'bg-gray-100 text-gray-700'
}

const formatNotificationType = (type: string): string => {
  return type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
}

const formatDateTime = (timestamp: string): string => {
  const date = new Date(timestamp)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
/* Scrollbar styling */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  @apply bg-gray-100;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  @apply bg-gray-300 rounded-full;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400;
}

/* Prose styling */
.prose p {
  margin-bottom: 1rem;
}

.prose p:last-child {
  margin-bottom: 0;
}
</style>
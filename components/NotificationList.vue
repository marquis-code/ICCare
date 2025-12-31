<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-50 overflow-hidden">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-100">
      <h2 class="text-lg font-semibold text-gray-900">Notifications</h2>
    </div>

    <!-- Loading State -->
    <div v-if="loading && !notifications.length" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#005B8F]"></div>
    </div>

    <!-- Notification List -->
    <div v-else class="divide-y divide-gray-100 max-h-[calc(100vh-300px)] overflow-y-auto">
      <div
          v-for="notification in notifications"
          :key="notification.notification_id"
          @click="$emit('select', notification)"
          :class="[
          'px-6 py-4 cursor-pointer transition-colors hover:bg-gray-50',
          selectedId === notification.notification_id && 'bg-blue-50',
          !notification.read && 'bg-blue-25'
        ]"
      >
        <div class="flex items-start gap-3">
          <!-- Priority Indicator -->
          <div class="flex-shrink-0 mt-1">
            <div
                :class="[
                'w-2 h-2 rounded-full',
                getPriorityColor(notification.priority)
              ]"
            ></div>
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2 mb-1">
              <h3
                  :class="[
                  'text-sm font-medium',
                  !notification.read ? 'text-gray-900' : 'text-gray-600'
                ]"
              >
                {{ notification.title }}
              </h3>

              <!-- Unread Badge -->
              <div v-if="!notification.read" class="flex-shrink-0">
                <div class="w-2 h-2 bg-[#005B8F] rounded-full"></div>
              </div>
            </div>

            <p class="text-sm text-gray-600 line-clamp-2 mb-2">
              {{ notification.message }}
            </p>

            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-500">
                {{ getRelativeTime(notification.timestamp) }}
              </span>

              <!-- Action Buttons -->
              <div class="flex items-center gap-2">
                <button
                    v-if="!notification.read"
                    @click.stop="$emit('mark-read', notification.notification_id)"
                    class="text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  Mark as read
                </button>
                <button
                    v-else
                    @click.stop="$emit('mark-unread', notification.notification_id)"
                    class="text-xs text-gray-600 hover:text-gray-800 font-medium"
                >
                  Mark as unread
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="notifications.length === 0" class="px-6 py-12 text-center">
        <svg class="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <p class="text-sm text-gray-500">No notifications</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { Notification } from "@/api_factory/modules/notification"

interface Props {
  notifications: Notification[]
  selectedId?: string
  loading?: boolean
}

defineProps<Props>()

defineEmits<{
  select: [notification: Notification]
  'mark-read': [notificationId: string]
  'mark-unread': [notificationId: string]
  refresh: []
}>()

const getPriorityColor = (priority: string): string => {
  const colors: Record<string, string> = {
    'urgent': 'bg-red-500',
    'high': 'bg-orange-500',
    'normal': 'bg-gray-400',
  }
  return colors[priority] || 'bg-gray-400'
}

const getRelativeTime = (timestamp: string): string => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bg-blue-25 {
  background-color: #f0f7ff;
}

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

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
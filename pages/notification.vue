<template>
  <NuxtLayout name="dashboard">
    <div class="min-h-screen">
      <div class="flex">
        <!-- Main Content -->
        <main class="flex-1 p-4 md:p-6 lg:p-8">
          <div class="">
            <!-- Page Title -->
            <div class="mb-6 flex justify-between items-center">
              <div>
                <h1 class="text-xl font-bold text-gray-900">Notifications</h1>
                <p class="text-sm text-gray-600 mt-1">Stay informed about your iCCaREPO activities and critical alerts.</p>
              </div>
              <div class="flex items-center gap-3">
                <!-- Unread Count Badge -->
                <div v-if="unreadCount > 0" class="px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                  {{ unreadCount }} Unread
                </div>

                <!-- Filter Buttons -->
                <button
                    @click="toggleUnreadFilter"
                    :class="[
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    showUnreadOnly
                      ? 'bg-[#005B8F] text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  ]"
                >
                  {{ showUnreadOnly ? 'All' : 'Unread Only' }}
                </button>

                <!-- Refresh Button -->
                <button
                    @click="refreshNotifications"
                    :disabled="loading"
                    class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm font-medium flex items-center gap-2"
                >
                  <svg
                      :class="['w-4 h-4', loading && 'animate-spin']"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </button>
              </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading && !notifications.length" class="flex items-center justify-center py-12">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005B8F]"></div>
            </div>

            <!-- Notifications Layout -->
            <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <!-- Notification List -->
              <div class="lg:col-span-5 xl:col-span-4">
                <NotificationList
                    :notifications="displayedNotifications"
                    :selected-id="selectedNotification?.notification_id"
                    :loading="loading"
                    @select="handleSelectNotification"
                    @mark-read="handleMarkRead"
                    @mark-unread="handleMarkUnread"
                    @refresh="refreshNotifications"
                />
              </div>

              <!-- Notification Detail -->
              <div class="lg:col-span-7 xl:col-span-8">
                <NotificationDetail
                    v-if="selectedNotification"
                    :notification="selectedNotification"
                    @mark-read="handleMarkRead"
                    @mark-unread="handleMarkUnread"
                    @close="selectedNotification = null"
                />
                <EmptyState v-else />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useNotifications } from "@/composables/modules/notifications/useNotifications"
import type { Notification } from "@/api_factory/modules/notification"

const {
  loading,
  notifications: notificationsList,
  unreadCount,
  getNotificationFeed,
  markNotificationRead,
  getUnreadCount
} = useNotifications()

// State
const selectedNotification = ref<Notification | null>(null)
const showUnreadOnly = ref(false)
const pollingInterval = ref<NodeJS.Timeout | null>(null)

// Computed
const displayedNotifications = computed(() => {
  if (showUnreadOnly.value) {
    return notificationsList.value.filter(n => !n.read)
  }
  return notificationsList.value
})

// Lifecycle
onMounted(async () => {
  await loadNotifications()
  await getUnreadCount()
  startPolling()
})

onUnmounted(() => {
  stopPolling()
})

// Methods
const loadNotifications = async () => {
  await getNotificationFeed({
    limit: 50,
    offset: 0,
    unread_only: showUnreadOnly.value
  })
}

const refreshNotifications = async () => {
  await loadNotifications()
  await getUnreadCount()
}

const toggleUnreadFilter = async () => {
  showUnreadOnly.value = !showUnreadOnly.value
  await loadNotifications()
}

const handleSelectNotification = async (notification: Notification) => {
  selectedNotification.value = notification

  // Auto-mark as read when clicked
  if (!notification.read) {
    await handleMarkRead(notification.notification_id)
  }
}

const handleMarkRead = async (notificationId: string) => {
  const success = await markNotificationRead(notificationId)

  if (success) {
    // Update local state
    const notification = notificationsList.value.find(n => n.notification_id === notificationId)
    if (notification) {
      notification.read = true
    }

    // Update selected notification if it's the current one
    if (selectedNotification.value?.notification_id === notificationId) {
      selectedNotification.value.read = true
    }

    // Refresh unread count
    await getUnreadCount()
  }
}

const handleMarkUnread = async (notificationId: string) => {
  // Since there's no mark-unread endpoint, we'll just update local state
  // In a real implementation, you might want to add this endpoint to the backend
  const notification = notificationsList.value.find(n => n.notification_id === notificationId)
  if (notification) {
    notification.read = false

    // Update selected notification if it's the current one
    if (selectedNotification.value?.notification_id === notificationId) {
      selectedNotification.value.read = false
    }

    // Manually increment unread count
    unreadCount.value++
  }
}

// Polling for real-time updates
const startPolling = () => {
  // Poll every 30 seconds
  pollingInterval.value = setInterval(async () => {
    await getUnreadCount()

    // Only refresh notifications if count changed
    const currentCount = notificationsList.value.filter(n => !n.read).length
    if (currentCount !== unreadCount.value) {
      await loadNotifications()
    }
  }, 30000)
}

const stopPolling = () => {
  if (pollingInterval.value) {
    clearInterval(pollingInterval.value)
    pollingInterval.value = null
  }
}

// Helper to format relative time
const getRelativeTime = (timestamp: string): string => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
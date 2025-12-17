<template>
  <NuxtLayout name="dashboard">
  <div class="min-h-screen">

    <div class="flex">

      <!-- Main Content -->
      <main class="flex-1 p-4 md:p-6 lg:p-8">
        <div class="max-w-7xl mx-auto">
          <!-- Page Title -->
          <div class="mb-6">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Notifications</h1>
            <p class="text-sm text-gray-600 mt-1">Stay informed about your iCCaREPO activities and critical alerts.</p>
          </div>

          <!-- Notifications Layout -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <!-- Notification List -->
            <div class="lg:col-span-5 xl:col-span-4">
              <NotificationList 
                :notifications="notifications"
                :selected-id="selectedNotification?.id"
                @select="handleSelectNotification"
                @mark-read="handleMarkRead"
                @delete="handleDelete"
              />
            </div>

            <!-- Notification Detail -->
            <div class="lg:col-span-7 xl:col-span-8">
              <NotificationDetail 
                v-if="selectedNotification"
                :notification="selectedNotification"
                @mark-read="handleMarkRead"
                @mark-unread="handleMarkUnread"
                @delete="handleDeleteCurrent"
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
import type { Notification } from '~/types/notifications';


// State
const notifications = ref<Notification[]>([
  {
    id: '1',
    title: 'Low Inventory Alert',
    message: 'The inventory level for Serum sample type at Freezer A-301 is critical (5 samples remaining). Please initiate procurement or transfer to avoid stock depletion for ongoing and future studies.',
    timestamp: '1 hour ago',
    isRead: false,
    isNew: true,
    type: 'inventory',
    relatedSample: {
      sampleId: 'SMP-2024-00123',
      currentLocation: 'Freezer A-301, Rack 2-B, Box 047',
      type: 'Blood'
    },
    relatedTransfer: {
      transferId: 'TR-2024-00054',
      status: 'Pending Confirmation',
      expectedDelivery: 'Tomorrow, 10:00 AM'
    }
  },
  {
    id: '2',
    title: 'Low Inventory Alert',
    message: 'The inventory level for Plasma sample type at Freezer B-105 is critical.',
    timestamp: '1 hour ago',
    isRead: true,
    isNew: false,
    type: 'inventory'
  },
  {
    id: '3',
    title: 'Low Inventory Alert',
    message: 'The inventory level for Tissue sample type at Freezer C-202 is critical.',
    timestamp: '1 hour ago',
    isRead: false,
    isNew: true,
    type: 'inventory'
  },
  {
    id: '4',
    title: 'Low Inventory Alert',
    message: 'The inventory level for Blood sample type at Freezer D-303 is critical.',
    timestamp: '1 hour ago',
    isRead: true,
    isNew: false,
    type: 'inventory'
  },
  {
    id: '5',
    title: 'Low Inventory Alert',
    message: 'The inventory level for Urine sample type at Freezer E-404 is critical.',
    timestamp: '1 hour ago',
    isRead: true,
    isNew: false,
    type: 'inventory'
  },
  {
    id: '6',
    title: 'Low Inventory Alert',
    message: 'The inventory level for Saliva sample type at Freezer F-505 is critical.',
    timestamp: '1 hour ago',
    isRead: true,
    isNew: false,
    type: 'inventory'
  },
  {
    id: '7',
    title: 'Low Inventory Alert',
    message: 'The inventory level for DNA sample type at Freezer G-606 is critical.',
    timestamp: '1 hour ago',
    isRead: true,
    isNew: false,
    type: 'inventory'
  }
]);

const selectedNotification = ref<Notification | null>(null);

// Computed
const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.isRead).length;
});

// Methods
const handleSelectNotification = (notification: Notification) => {
  selectedNotification.value = notification;
  
  // Auto-mark as read when clicked
  if (!notification.isRead) {
    handleMarkRead(notification.id);
  }
};

const handleMarkRead = (id: string) => {
  const notification = notifications.value.find(n => n.id === id);
  if (notification) {
    notification.isRead = true;
    notification.isNew = false;
  }
};

const handleMarkUnread = (id: string) => {
  const notification = notifications.value.find(n => n.id === id);
  if (notification) {
    notification.isRead = false;
  }
};

const handleDelete = (id: string) => {
  const index = notifications.value.findIndex(n => n.id === id);
  if (index !== -1) {
    notifications.value.splice(index, 1);
  }
};

const handleDeleteCurrent = () => {
  if (selectedNotification.value) {
    handleDelete(selectedNotification.value.id);
    selectedNotification.value = null;
  }
};
</script>
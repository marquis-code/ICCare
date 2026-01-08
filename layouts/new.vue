<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, navigateTo } from '#app'
import { useUser } from "@/composables/modules/auth/user"
import { useNotifications } from "@/composables/modules/notifications/useNotifications"
import activity from '@/assets/icons/activity.svg'
import attributes from '@/assets/icons/attribute.svg'
import biospecimen from '@/assets/icons/bio-mgt.svg'
import bulk from '@/assets/icons/bulk.svg'
import dashboard from '@/assets/icons/dashboard.svg'
import managerole from '@/assets/icons/manage-role.svg'
import manageuser from '@/assets/icons/manage-user.svg'
import notification from '@/assets/icons/notification.svg'
import profile from '@/assets/icons/profile.svg'
import registration from '@/assets/icons/registration.svg'
import reports from '@/assets/icons/reporting.svg'
import tracking from '@/assets/icons/tracking.svg'
import users from '@/assets/icons/user-mgt.svg'


const route = useRoute()
const { user } = useUser()

const {
  loading: notificationsLoading,
  notifications: notificationsList,
  unreadCount,
  getNotificationFeed,
  markNotificationRead,
  getUnreadCount
} = useNotifications()

// State
const showLogoutModal = ref(false)
const showSearchModal = ref(false)
const showNotifications = ref(false)
const showUserMenu = ref(false)
const mobileMenuOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const pollingInterval = ref<NodeJS.Timeout | null>(null)

// Define sidebar navigation structure
interface NavItem {
  path: string
  title: string
  icon: string
  category?: string
  children?: NavItem[]
}

const sidebarNavigation = ref<NavItem[]>([
  { path: '/dashboard', title: 'Dashboard', icon: dashboard },
  {
    path: '/biospecimen',
    title: 'Biospecimen Management',
    icon: biospecimen,
    children: [
      { path: '/biospecimen/attributes', title: 'Attributes', icon: attributes },
      { path: '/biospecimen/registration', title: 'Registration', icon: registration },
      { path: '/biospecimen/tracking', title: 'Tracking', icon: tracking },
      { path: '/biospecimen/bulk-upload', title: 'Bulk Upload', icon: bulk }
    ]
  },
  {
    path: '/user-management',
    title: 'User Management',
    icon: users,
    children: [
      { path: '/user-management/manage-user', title: 'Manage User', icon: manageuser },
      { path: '/user-management/manage-role', title: 'Manage Role', icon: managerole }
    ]
  },
  { path: '/reports', title: 'Reporting', icon: reports },
  { path: '/activity-log', title: 'Activity Log', icon: activity },
  { path: '/notification', title: 'Notifications', icon: notification },
  { path: '/profile', title: 'Profile', icon: profile }
])

const openDropdowns = ref<Record<string, boolean>>({})

const userRole = computed(() => user.value?.role?.name || 'User')

const searchResults = computed(() => {
  const results: any[] = []
  sidebarNavigation.value.forEach(item => {
    if (item.children) {
      item.children.forEach(child => {
        results.push({ path: child.path, category: item.title, title: child.title, icon: child.icon })
      })
    } else {
      results.push({ path: item.path, category: 'Core Operations', title: item.title, icon: item.icon })
    }
  })
  return results
})

const userInitials = computed(() => {
  if (!user.value?.first_name) return 'U'
  const first = user.value.first_name.trim()
  const last = user.value.last_name?.trim() || ''
  return last ? `${first[0]}${last[0]}`.toUpperCase() : first.substring(0, 2).toUpperCase()
})

const userFullName = computed(() => {
  if (!user.value) return 'User'
  const first = user.value.first_name?.trim() || ''
  const last = user.value.last_name?.trim() || ''
  return `${first} ${last}`.trim() || user.value.email || 'User'
})

const filteredSearchResults = computed(() => {
  if (!searchQuery.value) return searchResults.value
  const q = searchQuery.value.toLowerCase()
  return searchResults.value.filter(i => 
    i.title.toLowerCase().includes(q) || 
    i.category.toLowerCase().includes(q) || 
    i.path.toLowerCase().includes(q)
  )
})

const groupedResults = computed(() => {
  const grouped: Record<string, typeof searchResults.value> = {}
  filteredSearchResults.value.forEach(item => {
    if (!grouped[item.category]) grouped[item.category] = []
    grouped[item.category].push(item)
  })
  return grouped
})

const displayedNotifications = computed(() => notificationsList.value.slice(0, 5))

const navigateToPage = async (path: string) => {
  await navigateTo(path)
  showSearchModal.value = false
  searchQuery.value = ''
  mobileMenuOpen.value = false
}

const isActiveRoute = (path: string) => route.path.startsWith(path)

const toggleDropdown = (path: string) => {
  openDropdowns.value[path] = !openDropdowns.value[path]
}

const toggleNotifications = async () => {
  showNotifications.value = !showNotifications.value
  showUserMenu.value = false
  if (showNotifications.value && notificationsList.value.length === 0) {
    await loadNotifications()
  }
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  showNotifications.value = false
}

const closeAllDropdowns = () => {
  showNotifications.value = false
  showUserMenu.value = false
}

const handleLogoutClick = () => {
  showUserMenu.value = false
  showLogoutModal.value = true
}

const confirmLogout = async () => {
  showLogoutModal.value = false
  await navigateTo('/auth/login')
}

const loadNotifications = async () => {
  await getNotificationFeed({ limit: 10, offset: 0, unread_only: false })
}

const handleMarkAsRead = async (id: string) => {
  const success = await markNotificationRead(id)
  if (success) {
    const n = notificationsList.value.find(x => x.notification_id === id)
    if (n) n.read = true
    await getUnreadCount()
  }
}

const handleMarkAsUnread = async (id: string) => {
  const n = notificationsList.value.find(x => x.notification_id === id)
  if (n) {
    n.read = false
    unreadCount.value++
  }
}

const viewAllNotifications = async () => {
  showNotifications.value = false
  await navigateTo('/notification')
}

const getRelativeTime = (ts: string): string => {
  const d = Math.floor((Date.now() - new Date(ts).getTime()) / 1000)
  if (d < 60) return 'Just now'
  if (d < 3600) return `${Math.floor(d / 60)}m ago`
  if (d < 86400) return `${Math.floor(d / 3600)}h ago`
  if (d < 604800) return `${Math.floor(d / 86400)}d ago`
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const getNotificationIcon = (type: string) => {
  const icons: Record<string, string> = {
    sample_transfer: 'M8 7h12M8 12h12M8 17h12M4 7h.01M4 12h.01M4 17h.01',
    specimen_update: 'M8 7h12M8 12h12M8 17h12M4 7h.01M4 12h.01M4 17h.01',
    storage_alert: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    system_alert: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
  }
  return icons[type] || 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
}

const startPolling = () => {
  pollingInterval.value = setInterval(async () => {
    await getUnreadCount()
  }, 30000)
}

const stopPolling = () => {
  if (pollingInterval.value) {
    clearInterval(pollingInterval.value)
    pollingInterval.value = null
  }
}

watch(() => route.path, (path) => {
  sidebarNavigation.value.forEach(item => {
    if (item.children && path.startsWith(item.path)) {
      openDropdowns.value[item.path] = true
    }
  })
  mobileMenuOpen.value = false
}, { immediate: true })

watch(showSearchModal, async (val) => {
  if (val) {
    await nextTick()
    searchInput.value?.focus()
  } else {
    searchQuery.value = ''
  }
})

onMounted(async () => {
  await getUnreadCount()
  await loadNotifications()
  startPolling()
  
  const handleKeydown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault()
      showSearchModal.value = true
    }
  }
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => stopPolling())
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Mobile Overlay -->
    <transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0" 
      enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200" 
      leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="mobileMenuOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" 
        @click="mobileMenuOpen = false"></div>
    </transition>

    <!-- Sidebar -->
    <aside class="w-64 bg-[#005B8F] fixed h-full overflow-y-auto flex flex-col z-50 transition-transform duration-300 ease-in-out"
      :class="mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'">
      <!-- Logo -->
      <div class="p-6 border-b border-[#004a73] bg-white flex-shrink-0">
        <NuxtLink to="/dashboard" class="flex items-center gap-2">
          <img src="@/assets/img/logo.png" class="h-10 w-auto" alt="iCCaRE Logo" />
        </NuxtLink>
      </div>

      <!-- Navigation -->
      <nav class="p-4 flex-1 overflow-y-auto">
        <div class="space-y-1">
          <template v-for="item in sidebarNavigation" :key="item.path">
            <!-- Parent with children -->
            <div v-if="item.children">
              <button @click="toggleDropdown(item.path)" 
                class="flex items-center justify-between w-full gap-3 px-3 py-2.5 rounded-lg transition-colors"
                :class="{ 'bg-[#DCF1FF] text-[#005B8F]': isActiveRoute(item.path), 'text-white hover:bg-[#004a73]': !isActiveRoute(item.path) }">
                <!-- <div class="flex items-center gap-3 min-w-0">
                  <span class="text-sm font-medium truncate">{{ item.title }}</span>
                </div> -->
                <svg class="w-4 h-4 flex-shrink-0 transition-transform" :class="{ 'rotate-180': openDropdowns[item.path] }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <!-- Submenu -->
              <transition enter-active-class="transition-all duration-200 ease-out" enter-from-class="max-h-0 opacity-0"
                enter-to-class="max-h-96 opacity-100" leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="max-h-96 opacity-100" leave-to-class="max-h-0 opacity-0">
                <div v-if="openDropdowns[item.path]" class="mt-1 ml-3 space-y-1 overflow-hidden">
                  <NuxtLink v-for="child in item.children" :key="child.path" :to="child.path"
                    class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors"
                    :class="{ 'bg-[#DCF1FF] text-[#005B8F]': isActiveRoute(child.path), 'text-white hover:bg-[#004a73]': !isActiveRoute(child.path) }">
                    <span class="text-sm font-medium truncate">{{ child.title }}</span>
                  </NuxtLink>
                </div>
              </transition>
            </div>

            <!-- Single item -->
            <NuxtLink v-else :to="item.path" class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors"
              :class="{ 'bg-[#DCF1FF] text-[#005B8F]': isActiveRoute(item.path), 'text-white hover:bg-[#004a73]': !isActiveRoute(item.path) }">
              <span class="text-sm font-medium truncate">{{ item.title }}</span>
            </NuxtLink>
          </template>
        </div>
      </nav>

      <!-- Logout -->
      <div class="p-4 border-t border-[#004a73] flex-shrink-0">
        <button @click="showLogoutModal = true" 
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white hover:bg-[#004a73] transition-colors w-full">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span class="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 lg:ml-64 w-full min-w-0">
      <!-- Header -->
      <header class="bg-white shadow-sm sticky top-0 z-30">
        <div class="px-4 lg:px-6 py-4 flex items-center justify-between gap-4">
          <!-- Mobile Menu Button -->
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Search -->
          <div class="flex-1 max-w-xl min-w-0">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input type="text" placeholder="Search" @focus="showSearchModal = true"
                class="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#005B8F] focus:border-transparent cursor-pointer text-sm"
                readonly />
            </div>
          </div>

          <!-- User Info -->
          <div class="flex items-center gap-2 lg:gap-3">
            <!-- Notifications -->
            <div class="relative">
              <button @click="toggleNotifications" class="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span v-if="unreadCount > 0" 
                  class="absolute top-1 right-1 w-4 h-4 lg:w-5 lg:h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] lg:text-xs font-medium">
                  {{ unreadCount > 99 ? '99+' : unreadCount }}
                </span>
              </button>

              <!-- Notification Dropdown -->
              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <div v-if="showNotifications" 
                  class="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                  <div class="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                    <div>
                      <h3 class="font-semibold text-gray-900 text-sm">Notifications</h3>
                      <p v-if="unreadCount > 0" class="text-xs text-gray-500 mt-0.5">
                        {{ unreadCount }} unread
                      </p>
                    </div>
                  </div>

                  <div class="max-h-[400px] overflow-y-auto">
                    <div v-if="notificationsLoading && displayedNotifications.length === 0" class="p-8 text-center">
                      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#005B8F] mx-auto"></div>
                      <p class="text-sm text-gray-500 mt-2">Loading...</p>
                    </div>

                    <div v-else-if="displayedNotifications.length === 0" class="p-8 text-center">
                      <p class="text-sm font-medium text-gray-900">No notifications</p>
                      <p class="text-xs text-gray-500 mt-1">You're all caught up!</p>
                    </div>

                    <div v-else>
                      <div v-for="n in displayedNotifications" :key="n.notification_id"
                        class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        :class="{ 'bg-blue-50/50': !n.read }">
                        <div class="p-4">
                          <div class="flex items-start gap-3">
                            <div class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                              :class="n.read ? 'bg-gray-100' : 'bg-[#005B8F]/10'">
                              <svg class="w-5 h-5" :class="n.read ? 'text-gray-500' : 'text-[#005B8F]'"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  :d="getNotificationIcon(n.notification_type)" />
                              </svg>
                            </div>

                            <div class="flex-1 min-w-0">
                              <div class="flex items-start justify-between gap-2">
                                <p class="text-sm font-semibold text-gray-900 truncate" :class="{ 'font-bold': !n.read }">
                                  {{ n.title }}
                                </p>
                                <span v-if="!n.read" class="flex-shrink-0 w-2 h-2 bg-[#005B8F] rounded-full mt-1"></span>
                              </div>
                              <p class="text-xs text-gray-600 mt-1 line-clamp-2">{{ n.message }}</p>
                              <div class="flex items-center justify-between mt-2">
                                <span class="text-xs text-gray-400">{{ getRelativeTime(n.created_at) }}</span>
                                <button v-if="!n.read" @click.stop="handleMarkAsRead(n.notification_id)"
                                  class="text-xs text-[#005B8F] hover:text-[#004a73] font-medium">Mark read</button>
                                <button v-else @click.stop="handleMarkAsUnread(n.notification_id)"
                                  class="text-xs text-gray-500 hover:text-gray-700 font-medium">Mark unread</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="displayedNotifications.length > 0" class="p-3 bg-gray-50 text-center border-t border-gray-200">
                    <button @click="viewAllNotifications" class="text-sm text-[#005B8F] hover:text-[#004a73] font-semibold">
                      View all notifications
                    </button>
                  </div>
                </div>
              </transition>
            </div>

            <!-- User Profile -->
            <div class="relative">
              <button @click="toggleUserMenu" class="flex items-center gap-2 hover:bg-gray-50 rounded-lg p-1 lg:p-2 transition-colors">
                <div class="w-8 h-8 lg:w-10 lg:h-10 bg-[#005B8F] rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                  {{ userInitials }}
                </div>
                <div class="hidden md:block text-left min-w-0">
                  <p class="font-medium text-gray-900 text-sm truncate">{{ userFullName }}</p>
                  <p class="text-gray-500 text-xs truncate">{{ userRole }}</p>
                </div>
                <svg class="w-4 h-4 text-gray-400 transition-transform hidden md:block flex-shrink-0"
                  :class="{ 'rotate-180': showUserMenu }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
                  <div class="md:hidden p-4 border-b border-gray-200 bg-gray-50">
                    <p class="font-medium text-gray-900 text-sm">{{ userFullName }}</p>
                    <p class="text-gray-500 text-xs">{{ userRole }}</p>
                  </div>
                  <NuxtLink to="/profile" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    @click="showUserMenu = false">
                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span class="text-sm font-medium text-gray-700">Profile</span>
                  </NuxtLink>
                  <button @click="handleLogoutClick" class="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors w-full text-left">
                    <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span class="text-sm font-medium text-red-600">Logout</span>
                  </button>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-4 lg:p-6 bg-white">
        <slot />
      </main>
    </div>

    <!-- Search Modal -->
    <Teleport to="body">
      <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="showSearchModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4"
          @click.self="showSearchModal = false">
          <div class="w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden">
            <div class="p-4 border-b border-gray-200">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input ref="searchInput" v-model="searchQuery" type="text" placeholder="Search pages..."
                  class="block w-full pl-12 pr-20 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005B8F] focus:border-[#005B8F] focus:outline-none"
                  @keyup.esc="showSearchModal = false" />
                <div class="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded border border-gray-300">ESC</span>
                </div>
              </div>
            </div>

            <div class="max-h-96 overflow-y-auto">
              <div v-if="filteredSearchResults.length === 0" class="p-8 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="mt-2 text-sm text-gray-600">No results found</p>
              </div>

              <div v-else class="p-2">
                <div v-for="(items, category) in groupedResults" :key="category" class="mb-4">
                  <h3 class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {{ category }}
                  </h3>
                  <div class="space-y-1">
                    <button v-for="item in items" :key="item.path" @click="navigateToPage(item.path)"
                      class="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#005B8F]/5 transition-colors group text-left">
                      <div class="w-10 h-10 bg-[#005B8F]/10 rounded-lg flex items-center justify-center group-hover:bg-[#005B8F]/20 transition-colors">
                        <svg class="w-5 h-5 text-[#005B8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate">{{ item.title }}</p>
                        <p class="text-xs text-gray-500 truncate">{{ item.path }}</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-3 border-t border-gray-200 bg-gray-50">
              <div class="flex items-center justify-between text-xs text-gray-500">
                <span>Press ESC to close</span>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- Logout Modal -->
    <Teleport to="body">
      <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="showLogoutModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          @click.self="showLogoutModal = false">
          <div class="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden">
            <div class="p-6">
              <div class="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900 text-center mb-2">Confirm Logout</h3>
              <p class="text-sm text-gray-600 text-center mb-6">Are you sure you want to log out?</p>
              <div class="flex gap-3">
                <button @click="showLogoutModal = false"
                  class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button @click="confirmLogout"
                  class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- Click Outside Handler -->
    <div v-if="showNotifications || showUserMenu" class="fixed inset-0 z-40" @click="closeAllDropdowns"></div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Demo Header -->
    <header class="bg-white shadow-sm p-4">
      <div class="max-w-xl mx-auto">
        <div class="relative">
          <input
            type="text"
            placeholder="Search pages..."
            @focus="showSearchModal = true"
            class="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005B8F] cursor-pointer"
            readonly
          />
          <svg class="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </header>

    <!-- Global Search Modal -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="showSearchModal"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4"
        @click.self="showSearchModal = false"
      >
        <div class="w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden">
          <!-- Search Input -->
          <div class="p-4 border-b border-gray-200">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                ref="searchInput"
                v-model="searchQuery"
                type="text"
                placeholder="Search pages, features..."
                class="block w-full pl-12 pr-20 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#005B8F] focus:border-[#005B8F] focus:outline-none"
                @keyup.esc="showSearchModal = false"
              />
              <div class="absolute inset-y-0 right-0 pr-4 flex items-center">
                <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded border border-gray-300">ESC</span>
              </div>
            </div>
          </div>

          <!-- Search Results -->
          <div class="max-h-96 overflow-y-auto">
            <div v-if="filteredSearchResults.length === 0" class="p-8 text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="mt-2 text-sm text-gray-600">No results found for "{{ searchQuery }}"</p>
            </div>

            <div v-else class="p-2">
              <!-- Group by category -->
              <div v-for="(items, category) in groupedResults" :key="category" class="mb-4">
                <h3 class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {{ category }}
                </h3>
                <div class="space-y-1">
                  <button
                    v-for="item in items"
                    :key="item.path"
                    @click="navigateToPage(item.path)"
                    class="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#005B8F]/5 transition-colors group text-left"
                  >
                    <div class="w-10 h-10 bg-[#005B8F]/10 rounded-lg flex items-center justify-center group-hover:bg-[#005B8F]/20 transition-colors">
                      <component :is="getIcon(item.icon)" class="w-5 h-5 text-[#005B8F]" />
                    </div>
                    <div class="flex-1">
                      <p class="text-sm font-medium text-gray-900">{{ item.title }}</p>
                      <p class="text-xs text-gray-500">{{ item.path }}</p>
                    </div>
                    <svg class="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="p-3 border-t border-gray-200 bg-gray-50">
            <div class="flex items-center justify-between text-xs text-gray-500">
              <span>Press ESC to close</span>
              <div class="flex items-center gap-2">
                <kbd class="px-2 py-1 bg-white border border-gray-300 rounded text-gray-700">↑↓</kbd>
                <span>to navigate</span>
                <kbd class="px-2 py-1 bg-white border border-gray-300 rounded text-gray-700">↵</kbd>
                <span>to select</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

const showSearchModal = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)

// Complete list of all navigable pages
const searchResults = [
  {
    path: '/dashboard',
    category: 'Core Operations',
    title: 'Dashboard',
    icon: 'dashboard'
  },
  {
    path: '/biospecimen/attributes',
    category: 'Biospecimen Management',
    title: 'Attributes',
    icon: 'biospecimen'
  },
  {
    path: '/biospecimen/registration',
    category: 'Biospecimen Management',
    title: 'Registration',
    icon: 'biospecimen'
  },
  {
    path: '/biospecimen/tracking',
    category: 'Biospecimen Management',
    title: 'Tracking',
    icon: 'biospecimen'
  },
  {
    path: '/biospecimen/bulk-upload',
    category: 'Biospecimen Management',
    title: 'Bulk Upload',
    icon: 'biospecimen'
  },
  {
    path: '/user-management/manage-user',
    category: 'User Management',
    title: 'Manage User',
    icon: 'users'
  },
  {
    path: '/user-management/manage-role',
    category: 'User Management',
    title: 'Manage Role',
    icon: 'users'
  },
  {
    path: '/reports',
    category: 'Core Operations',
    title: 'Reporting',
    icon: 'reports'
  },
  {
    path: '/activity-log',
    category: 'Core Operations',
    title: 'Activity Log',
    icon: 'activity'
  },
  {
    path: '/notification',
    category: 'Core Operations',
    title: 'Notifications',
    icon: 'notification'
  },
  {
    path: '/profile',
    category: 'User',
    title: 'Profile',
    icon: 'profile'
  }
]

// Filter results based on search query
const filteredSearchResults = computed(() => {
  if (!searchQuery.value) return searchResults
  
  const query = searchQuery.value.toLowerCase()
  return searchResults.filter(item => 
    item.title.toLowerCase().includes(query) || 
    item.category.toLowerCase().includes(query) ||
    item.path.toLowerCase().includes(query)
  )
})

// Group results by category
const groupedResults = computed(() => {
  const grouped = {}
  filteredSearchResults.value.forEach(item => {
    if (!grouped[item.category]) {
      grouped[item.category] = []
    }
    grouped[item.category].push(item)
  })
  return grouped
})

// Icon components
const icons = {
  dashboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  biospecimen: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  reports: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  activity: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  notification: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  profile: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )
}

const getIcon = (iconName) => {
  return icons[iconName] || icons.dashboard
}

const navigateToPage = (path) => {
  console.log('Navigating to:', path)
  // In your actual Nuxt app, this would be:
  // await navigateTo(path)
  alert(`Would navigate to: ${path}`)
  showSearchModal.value = false
  searchQuery.value = ''
}

// Focus search input when modal opens
watch(showSearchModal, async (newVal) => {
  if (newVal) {
    await nextTick()
    searchInput.value?.focus()
  } else {
    searchQuery.value = ''
  }
})
</script>
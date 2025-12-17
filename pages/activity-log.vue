<template>
  <NuxtLayout name="dashboard">
  <div class="min-h-screen">


    <div class="flex">


      <!-- Main Content -->
      <main class="flex-1 p-4 md:p-6 lg:p-8">
        <div class="max-w-7xl mx-auto">
          <!-- Page Title -->
          <div class="mb-6">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Activity Log</h1>
            <p class="text-sm text-gray-600 mt-1">Stay informed about your iCCaREPO activities and critical alerts.</p>
          </div>

          <!-- Filters Section -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <!-- Status Dropdown -->
              <div class="relative">
                <button
                  type="button"
                  @click="toggleStatusDropdown"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-left flex items-center justify-between"
                >
                  <span class="text-sm text-gray-700">{{ filters.status || 'All Status' }}</span>
                  <Icon 
                    name="heroicons:chevron-down" 
                    :class="['w-5 h-5 text-gray-400 transition-transform', showStatusDropdown && 'rotate-180']" 
                  />
                </button>

                <Transition name="dropdown">
                  <div 
                    v-if="showStatusDropdown"
                    v-click-outside="() => showStatusDropdown = false"
                    class="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
                  >
                    <button
                      v-for="status in statusOptions"
                      :key="status"
                      type="button"
                      @click="selectStatus(status)"
                      :class="[
                        'w-full px-4 py-2.5 text-left hover:bg-blue-50 transition text-sm',
                        filters.status === status ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                      ]"
                    >
                      {{ status }}
                    </button>
                  </div>
                </Transition>
              </div>

              <!-- Date Range Picker (From) -->
              <UiDateRangePicker
                v-model="filters.dateRangeStart"
                placeholder="Date Range"
                label="From"
              />

              <!-- Date Range Picker (To) -->
              <UiDateRangePicker
                v-model="filters.dateRangeEnd"
                placeholder="Date Range"
                label="To"
              />

              <!-- Search Input -->
              <input
                v-model="filters.searchQuery"
                type="text"
                placeholder="Search activity"
                class="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                @keyup.enter="applyFilters"
              />

              <!-- Action Buttons -->
              <div class="flex gap-2">
                <button 
                  @click="applyFilters"
                  class="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium shadow-sm"
                >
                  Search
                </button>
                <button 
                  @click="clearFilters"
                  class="flex-1 px-4 py-2.5 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition text-sm font-medium"
                >
                  Clear Filter
                </button>
              </div>
            </div>
          </div>

          <!-- Activity Log Table -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      SN
                    </th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Event
                    </th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Type
                    </th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Content
                    </th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Source
                    </th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date (To)
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr 
                    v-for="log in filteredLogs" 
                    :key="log.id"
                    class="hover:bg-gray-50 transition"
                  >
                    <td class="px-6 py-4 text-sm text-gray-900">
                      {{ log.id }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-700">
                      {{ log.event }}
                    </td>
                    <td class="px-6 py-4 text-sm">
                      <span :class="getTypeClass(log.type)" class="inline-flex px-3 py-1 rounded-full text-xs font-medium">
                        {{ log.type }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-700">
                      {{ log.content }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-500">
                      <div class="flex items-center gap-2">
                        <Icon name="heroicons:map-pin" class="w-4 h-4 text-gray-400" />
                        <span>{{ log.source }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-700">
                      {{ log.dateTo }}
                    </td>
                  </tr>

                  <tr v-if="filteredLogs.length === 0">
                    <td colspan="6" class="px-6 py-12 text-center">
                      <Icon name="heroicons:document-magnifying-glass" class="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p class="text-sm text-gray-500">No activity logs found</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { ActivityLog, ActivityFilters } from '~/types/activity-log';

// State
const showStatusDropdown = ref(false);

const filters = ref<ActivityFilters>({
  status: '',
  dateRangeStart: '',
  dateRangeEnd: '',
  searchQuery: ''
});

const statusOptions = [
  'All Status',
  'Updated',
  'Created',
  'Deleted',
  'Transferred',
  'Approved',
  'Rejected'
];

// Sample data - Replace with API call
const activityLogs = ref<ActivityLog[]>([
  {
    id: 1,
    event: '*Updated Biospecimen #ICC:002194',
    type: 'Blood',
    content: '2024-01-01',
    source: 'Memorial Hospital',
    dateTo: '2024-01-01'
  },
  {
    id: 2,
    event: '*Updated Biospecimen #ICC:002194',
    type: 'Plasma',
    content: '2024-01-01',
    source: 'Memorial Hospital',
    dateTo: '2024-01-01'
  },
  {
    id: 3,
    event: '*Updated Biospecimen #ICC:002194',
    type: 'Serum',
    content: '2024-01-01',
    source: 'Memorial Hospital',
    dateTo: '2024-01-01'
  },
  {
    id: 4,
    event: '*Updated Biospecimen #ICC:002194',
    type: 'Tissue',
    content: '2024-01-01',
    source: 'Memorial Hospital',
    dateTo: '2024-01-01'
  },
  {
    id: 5,
    event: '*Created Biospecimen #ICC:002195',
    type: 'Blood',
    content: '2024-01-02',
    source: 'Central Lab',
    dateTo: '2024-01-02'
  },
  {
    id: 6,
    event: '*Deleted Biospecimen #ICC:002196',
    type: 'Plasma',
    content: '2024-01-03',
    source: 'Research Facility',
    dateTo: '2024-01-03'
  },
  {
    id: 7,
    event: '*Transferred Biospecimen #ICC:002197',
    type: 'Serum',
    content: '2024-01-04',
    source: 'Memorial Hospital',
    dateTo: '2024-01-04'
  }
]);

const filteredLogs = ref<ActivityLog[]>([...activityLogs.value]);

// Methods
const toggleStatusDropdown = () => {
  showStatusDropdown.value = !showStatusDropdown.value;
};

const selectStatus = (status: string) => {
  filters.value.status = status === 'All Status' ? '' : status;
  showStatusDropdown.value = false;
};

const getTypeClass = (type: string): string => {
  const classes: Record<string, string> = {
    'Blood': 'bg-green-100 text-green-700',
    'Plasma': 'bg-blue-100 text-blue-700',
    'Serum': 'bg-orange-100 text-orange-700',
    'Tissue': 'bg-pink-100 text-pink-700',
    'Other': 'bg-gray-100 text-gray-700'
  };
  return classes[type] || 'bg-gray-100 text-gray-700';
};

const applyFilters = () => {
  let filtered = [...activityLogs.value];

  // Filter by status (check if event contains status keyword)
  if (filters.value.status && filters.value.status !== 'All Status') {
    filtered = filtered.filter(log => 
      log.event.toLowerCase().includes(filters.value.status.toLowerCase())
    );
  }

  // Filter by date range (start)
  if (filters.value.dateRangeStart) {
    filtered = filtered.filter(log => 
      new Date(log.dateTo) >= new Date(filters.value.dateRangeStart)
    );
  }

  // Filter by date range (end)
  if (filters.value.dateRangeEnd) {
    filtered = filtered.filter(log => 
      new Date(log.dateTo) <= new Date(filters.value.dateRangeEnd)
    );
  }

  // Filter by search query
  if (filters.value.searchQuery) {
    const search = filters.value.searchQuery.toLowerCase();
    filtered = filtered.filter(log => 
      log.event.toLowerCase().includes(search) ||
      log.type.toLowerCase().includes(search) ||
      log.source.toLowerCase().includes(search)
    );
  }

  filteredLogs.value = filtered;
};

const clearFilters = () => {
  filters.value = {
    status: '',
    dateRangeStart: '',
    dateRangeEnd: '',
    searchQuery: ''
  };
  filteredLogs.value = [...activityLogs.value];
};

// Click outside directive
const vClickOutside = {
  mounted(el: HTMLElement, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value();
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el: HTMLElement & { clickOutsideEvent?: (event: Event) => void }) {
    if (el.clickOutsideEvent) {
      document.removeEventListener('click', el.clickOutsideEvent);
    }
  }
};

// Watch for real-time filtering
watch(() => filters.value.searchQuery, () => {
  // Optional: Apply filters on every keystroke for search
  // applyFilters();
});
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
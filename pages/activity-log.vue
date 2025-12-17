<template>
  <NuxtLayout name="dashboard">
    <div class="min-h-screen">
      <div class="flex">
        <!-- Main Content -->
        <main class="flex-1 p-4 md:p-6 lg:p-8">
          <div class="max-w-7xl mx-auto">
            <!-- Page Title -->
            <div class="mb-6">
              <h1 class="text-xl font-bold text-gray-900">Activity Log</h1>
              <p class="text-sm text-gray-600 mt-1">Stay informed about your iCCaREPO activities and critical alerts.</p>
            </div>

            <!-- Filters Section -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
              <div class="space-y-4">
                <!-- Status Dropdown -->
                <div>
                  <UiSelectInput 
                    label="Status" 
                    :options="statusOptions" 
                    position="standalone" 
                    v-model="filters.status" 
                  />
                </div>

                <!-- Date Range Picker -->
                <DateRangePicker
                  v-model="dateRange"
                  placeholder="Date Range"
                  label="Filter by date"
                />

                <!-- Search Input -->
                <div>
                  <input
                    v-model="filters.searchQuery"
                    type="text"
                    placeholder="Search activity"
                    class="custom-input w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    @keyup.enter="applyFilters"
                  />
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-2">
                  <button 
                    @click="applyFilters"
                    class="flex-1 px-4 py-2.5 bg-[#005B8F] text-white rounded-lg hover:bg-[#004a73] transition text-sm font-medium shadow-sm"
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
            <div class="bg-white rounded-xl shadow-sm border border-gray-50 overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead class="bg-gray-25 border-b border-gray-50">
                    <tr>
                      <th class="px-6 py-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        SN
                      </th>
                      <th class="px-6 py-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Event
                      </th>
                      <th class="px-6 py-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Type
                      </th>
                      <th class="px-6 py-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Content
                      </th>
                      <th class="px-6 py-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Source
                      </th>
                      <th class="px-6 py-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y-[0.5px] divide-gray-50 bg-white">
                    <tr 
                      v-for="log in filteredLogs" 
                      :key="log.id"
                      class="hover:bg-gray-50 transition"
                    >
                      <td class="px-6 py-6 text-sm text-gray-900">
                        {{ log.id }}
                      </td>
                      <td class="px-6 py-6 text-sm text-gray-700">
                        {{ log.event }}
                      </td>
                      <td class="px-6 py-6 text-sm">
                        <span :class="getTypeClass(log.type)" class="inline-flex px-3 py-1 rounded-full text-xs font-medium">
                          {{ log.type }}
                        </span>
                      </td>
                      <td class="px-6 py-6 text-sm text-gray-700">
                        {{ log.content }}
                      </td>
                      <td class="px-6 py-6 text-sm text-gray-500">
                        <div class="flex items-center gap-2">
                          <Icon name="heroicons:map-pin" class="w-4 h-4 text-gray-400" />
                          <span>{{ log.source }}</span>
                        </div>
                      </td>
                      <td class="px-6 py-6 text-sm text-gray-700">
                        {{ formatDate(log.dateTo) }}
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
import DateRangePicker, { type DateRange } from '~/components/DateRangePicker.vue';

// State
const filters = ref<ActivityFilters>({
  status: '',
  dateRangeStart: '',
  dateRangeEnd: '',
  searchQuery: ''
});

const dateRange = ref<DateRange>({ from: '', to: '' });

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
    dateTo: '2024-01-15'
  },
  {
    id: 3,
    event: '*Updated Biospecimen #ICC:002194',
    type: 'Serum',
    content: '2024-01-01',
    source: 'Memorial Hospital',
    dateTo: '2024-02-01'
  },
  {
    id: 4,
    event: '*Updated Biospecimen #ICC:002194',
    type: 'Tissue',
    content: '2024-01-01',
    source: 'Memorial Hospital',
    dateTo: '2024-02-15'
  },
  {
    id: 5,
    event: '*Created Biospecimen #ICC:002195',
    type: 'Blood',
    content: '2024-01-02',
    source: 'Central Lab',
    dateTo: '2024-03-01'
  },
  {
    id: 6,
    event: '*Deleted Biospecimen #ICC:002196',
    type: 'Plasma',
    content: '2024-01-03',
    source: 'Research Facility',
    dateTo: '2024-03-15'
  },
  {
    id: 7,
    event: '*Transferred Biospecimen #ICC:002197',
    type: 'Serum',
    content: '2024-01-04',
    source: 'Memorial Hospital',
    dateTo: '2024-04-01'
  }
]);

const filteredLogs = ref<ActivityLog[]>([...activityLogs.value]);

// Methods
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

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
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
    const startDate = new Date(filters.value.dateRangeStart);
    startDate.setHours(0, 0, 0, 0);
    filtered = filtered.filter(log => {
      const logDate = new Date(log.dateTo);
      logDate.setHours(0, 0, 0, 0);
      return logDate >= startDate;
    });
  }

  // Filter by date range (end)
  if (filters.value.dateRangeEnd) {
    const endDate = new Date(filters.value.dateRangeEnd);
    endDate.setHours(23, 59, 59, 999);
    filtered = filtered.filter(log => {
      const logDate = new Date(log.dateTo);
      return logDate <= endDate;
    });
  }

  // Filter by search query
  if (filters.value.searchQuery) {
    const search = filters.value.searchQuery.toLowerCase();
    filtered = filtered.filter(log => 
      log.event.toLowerCase().includes(search) ||
      log.type.toLowerCase().includes(search) ||
      log.source.toLowerCase().includes(search) ||
      log.content.toLowerCase().includes(search)
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
  dateRange.value = { from: '', to: '' };
  filteredLogs.value = [...activityLogs.value];
};

// Watch dateRange changes and sync with filters
watch(dateRange, (newRange) => {
  filters.value.dateRangeStart = newRange.from;
  filters.value.dateRangeEnd = newRange.to;
  // Optionally auto-apply filters when date changes
  // applyFilters();
}, { deep: true });

// Watch filters for real-time search (optional)
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
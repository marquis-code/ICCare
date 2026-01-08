<template>
  <div class="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 bg-white border-t border-gray-200">
    <!-- Left side - Page size selector and info -->
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <label for="pageSize" class="text-sm text-gray-700 whitespace-nowrap">
          Rows per page:
        </label>
        <select
          id="pageSize"
          v-model="selectedPageSize"
          @change="handlePageSizeChange"
          class="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#005B8F] focus:border-transparent"
        >
          <option v-for="size in pageSizeOptions" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
      </div>
      
      <div class="text-sm text-gray-700">
        Showing {{ startItem }} to {{ endItem }} of {{ totalItems }} entries
      </div>
    </div>

    <!-- Right side - Pagination controls -->
    <div class="flex items-center gap-1">
      <!-- First page -->
      <button
        @click="goToPage(1)"
        :disabled="currentPage === 1"
        class="px-3 py-1.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        :class="currentPage === 1 ? 'text-gray-400' : 'text-gray-700'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
      </button>

      <!-- Previous page -->
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-3 py-1.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        :class="currentPage === 1 ? 'text-gray-400' : 'text-gray-700'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Page numbers -->
      <template v-for="page in visiblePages" :key="page">
        <button
          v-if="page === '...'"
          disabled
          class="px-3 py-1.5 text-sm font-medium text-gray-400 cursor-default"
        >
          ...
        </button>
        <button
          v-else
          @click="goToPage(page)"
          class="px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
          :class="currentPage === page
            ? 'bg-[#005B8F] text-white'
            : 'text-gray-700 hover:bg-gray-100'"
        >
          {{ page }}
        </button>
      </template>

      <!-- Next page -->
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-3 py-1.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        :class="currentPage === totalPages ? 'text-gray-400' : 'text-gray-700'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Last page -->
      <button
        @click="goToPage(totalPages)"
        :disabled="currentPage === totalPages"
        class="px-3 py-1.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        :class="currentPage === totalPages ? 'text-gray-400' : 'text-gray-700'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

interface Props {
  currentPage: number;
  totalItems: number;
  pageSize?: number;
  pageSizeOptions?: number[];
}

interface Emits {
  (e: 'update:currentPage', value: number): void;
  (e: 'update:pageSize', value: number): void;
}

const props = withDefaults(defineProps<Props>(), {
  pageSize: 10,
  pageSizeOptions: () => [10, 25, 50, 100]
});

const emit = defineEmits<Emits>();

const selectedPageSize = ref(props.pageSize);

// Computed properties
const totalPages = computed(() => {
  return Math.ceil(props.totalItems / selectedPageSize.value);
});

const startItem = computed(() => {
  if (props.totalItems === 0) return 0;
  return (props.currentPage - 1) * selectedPageSize.value + 1;
});

const endItem = computed(() => {
  const end = props.currentPage * selectedPageSize.value;
  return Math.min(end, props.totalItems);
});

const visiblePages = computed(() => {
  const pages: (number | string)[] = [];
  const maxVisible = 5;
  const total = totalPages.value;
  
  if (total <= maxVisible + 2) {
    // Show all pages if total is small
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);
    
    let start = Math.max(2, props.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(total - 1, start + maxVisible - 1);
    
    // Adjust start if we're near the end
    if (end === total - 1) {
      start = Math.max(2, end - maxVisible + 1);
    }
    
    // Add ellipsis after first page if needed
    if (start > 2) {
      pages.push('...');
    }
    
    // Add middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (end < total - 1) {
      pages.push('...');
    }
    
    // Always show last page
    pages.push(total);
  }
  
  return pages;
});

// Methods
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value && page !== props.currentPage) {
    emit('update:currentPage', page);
  }
};

const handlePageSizeChange = () => {
  emit('update:pageSize', selectedPageSize.value);
  // Reset to page 1 when page size changes
  emit('update:currentPage', 1);
};

// Watch for external pageSize changes
watch(() => props.pageSize, (newSize) => {
  selectedPageSize.value = newSize;
});
</script>
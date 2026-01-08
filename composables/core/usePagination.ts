import { ref, computed, watch } from 'vue';

export interface PaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
  pageSizeOptions?: number[];
}

export function usePagination<T>(
  items: Ref<T[]> | ComputedRef<T[]>,
  options: PaginationOptions = {}
) {
  const {
    initialPage = 1,
    initialPageSize = 10,
    pageSizeOptions = [10, 25, 50, 100]
  } = options;

  // State
  const currentPage = ref(initialPage);
  const pageSize = ref(initialPageSize);

  // Computed
  const totalItems = computed(() => items.value?.length || 0);

  const totalPages = computed(() => {
    return Math.ceil(totalItems.value / pageSize.value);
  });

  const startIndex = computed(() => {
    return (currentPage.value - 1) * pageSize.value;
  });

  const endIndex = computed(() => {
    return Math.min(startIndex.value + pageSize.value, totalItems.value);
  });

  const paginatedItems = computed(() => {
    if (!items.value || items.value.length === 0) return [];
    return items.value.slice(startIndex.value, endIndex.value);
  });

  const hasNextPage = computed(() => {
    return currentPage.value < totalPages.value;
  });

  const hasPreviousPage = computed(() => {
    return currentPage.value > 1;
  });

  // Methods
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };

  const nextPage = () => {
    if (hasNextPage.value) {
      currentPage.value++;
    }
  };

  const previousPage = () => {
    if (hasPreviousPage.value) {
      currentPage.value--;
    }
  };

  const firstPage = () => {
    currentPage.value = 1;
  };

  const lastPage = () => {
    currentPage.value = totalPages.value;
  };

  const setPageSize = (size: number) => {
    pageSize.value = size;
    // Reset to first page when page size changes
    currentPage.value = 1;
  };

  const resetPagination = () => {
    currentPage.value = 1;
  };

  // Watch for items length changes and reset if current page is out of bounds
  watch(totalItems, (newTotal) => {
    const maxPage = Math.ceil(newTotal / pageSize.value) || 1;
    if (currentPage.value > maxPage) {
      currentPage.value = maxPage;
    }
  });

  // Watch for items changes and reset to page 1 if the array reference changes
  watch(
    () => items.value,
    (newItems, oldItems) => {
      // Only reset if it's a completely different array (not just filtered)
      // This prevents unwanted resets when filtering
      if (newItems !== oldItems && currentPage.value !== 1) {
        // Check if current page is still valid
        const maxPage = Math.ceil(newItems.length / pageSize.value) || 1;
        if (currentPage.value > maxPage) {
          currentPage.value = 1;
        }
      }
    }
  );

  return {
    // State
    currentPage,
    pageSize,
    pageSizeOptions,

    // Computed
    totalItems,
    totalPages,
    startIndex,
    endIndex,
    paginatedItems,
    hasNextPage,
    hasPreviousPage,

    // Methods
    goToPage,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
    setPageSize,
    resetPagination
  };
}
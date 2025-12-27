import { ref } from "vue"
import { categories_api } from "@/api_factory/modules/categories"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useGetCategories = () => {
  const loading = ref(false)
  const categories = ref<any[]>([])
  const { showToast } = useCustomToast()

  const getCategories = async (active_only: boolean = false) => {
    loading.value = true
    try {
      const res = (await categories_api.$_get_categories(active_only)) as any
      if (res.type !== "ERROR") {
        categories.value = res.data.categories
        return res.data.categories
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch categories"
        showToast({
          title: "Error",
          message: errorMsg,
          toastType: "error",
          duration: 3000,
        })
        return null
      }
    } catch (error: any) {
      showToast({
        title: "Error",
        message: error?.message || "Something went wrong",
        toastType: "error",
        duration: 3000,
      })
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    categories,
    getCategories
  }
}
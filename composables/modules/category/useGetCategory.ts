import { ref } from "vue"
import { categories_api } from "@/api_factory/modules/categories"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useGetCategory = () => {
  const loading = ref(false)
  const category = ref<any>(null)
  const { showToast } = useCustomToast()

  const getCategory = async (cat_id: string) => {
    loading.value = true
    try {
      const res = (await categories_api.$_get_category(cat_id)) as any
      if (res.type !== "ERROR") {
        category.value = res.data
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch category"
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
    category,
    getCategory
  }
}
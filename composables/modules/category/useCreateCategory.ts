import { ref } from "vue"
import { categories_api } from "@/api_factory/modules/categories"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useCreateCategory = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const createCategory = async (payload: {
    cat_id: string
    cat_name: string
    abbreviation: string
    description: string
  }) => {
    loading.value = true
    try {
      const res = (await categories_api.$_create_category(payload)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Category created successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to create category"
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
    createCategory
  }
}
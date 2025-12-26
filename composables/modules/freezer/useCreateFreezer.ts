import { ref } from "vue"
import { freezers_api } from "@/api_factory/modules/freezers"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useCreateFreezer = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const createFreezer = async (payload: {
    freezer_id: string
    freezer_name: string
    site_id: string
    temperature: string
    capacity: number
    description: string
  }) => {
    loading.value = true
    try {
      const res = (await freezers_api.$_create_freezer(payload)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Freezer created successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to create freezer"
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
    createFreezer
  }
}
import { ref } from "vue"
import { racks_api } from "@/api_factory/modules/racks"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useCreateRack = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const createRack = async (payload: {
    rack_id: string
    rack_name: string
    freezer_id: string
    site_id: string
    capacity: number
    description: string
  }) => {
    loading.value = true
    try {
      const res = (await racks_api.$_create_rack(payload)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Rack created successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to create rack"
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
    createRack
  }
}
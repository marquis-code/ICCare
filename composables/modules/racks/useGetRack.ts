import { ref } from "vue"
import { racks_api } from "@/api_factory/modules/racks"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useGetRack = () => {
  const loading = ref(false)
  const rack = ref<any>(null)
  const { showToast } = useCustomToast()

  const getRack = async (rack_id: string) => {
    loading.value = true
    try {
      const res = (await racks_api.$_get_rack(rack_id)) as any
      if (res.type !== "ERROR") {
        rack.value = res.data
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch rack"
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
    rack,
    getRack
  }
}
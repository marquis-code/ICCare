import { ref } from "vue"
import { freezers_api } from "@/api_factory/modules/freezers"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useGetFreezers = () => {
  const loading = ref(false)
  const freezers = ref<any[]>([])
  const { showToast } = useCustomToast()

  const getFreezers = async (site_id?: string, active_only: boolean = true) => {
    loading.value = true
    try {
      const res = (await freezers_api.$_get_freezers(site_id, active_only)) as any
      if (res.type !== "ERROR") {
        freezers.value = res.data
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch freezers"
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
    freezers,
    getFreezers
  }
}
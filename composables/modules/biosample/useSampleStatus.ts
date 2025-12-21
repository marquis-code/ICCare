import { ref } from "vue"
import { biosample_api } from "@/api_factory/modules/biosample"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useSampleStatus = () => {
  const loading = ref(false)
  const status = ref(null)
  const { showToast } = useCustomToast()

  const getSampleStatus = async (uuid: string) => {
    loading.value = true
    try {
      const res = (await biosample_api.$_get_sample_status(uuid)) as any
      if (res.type !== "ERROR") {
        status.value = res.data
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch sample status"
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
    status,
    getSampleStatus
  }
}
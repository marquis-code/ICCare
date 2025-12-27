// useGetTrackingHistory.ts
import { ref } from "vue"
import { track_api } from "@/api_factory/modules/track"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useGetTrackingHistory = () => {
  const loading = ref(false)
  const trackingHistory = ref([])
  const { showToast } = useCustomToast()

  const getTrackingHistory = async (params?: {
    sample_uuid?: string
    sample_serial_no?: string
    tracked_by?: string
    date_from?: string
    date_to?: string
    execution_type?: 'direct' | 'workflow' | 'all'
    limit?: number
    offset?: number
  }) => {
    loading.value = true
    try {
      const res = (await track_api.$_get_tracking_history(params)) as any
      if (res.type !== "ERROR") {
        trackingHistory.value = res.data
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch tracking history"
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
    trackingHistory,
    getTrackingHistory
  }
}
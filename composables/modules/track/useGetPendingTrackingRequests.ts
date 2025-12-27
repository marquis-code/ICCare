// useGetPendingTrackingRequests.ts
import { ref } from "vue"
import { track_api } from "@/api_factory/modules/track"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useGetPendingTrackingRequests = () => {
  const loading = ref(false)
  const pendingRequests = ref([])
  const { showToast } = useCustomToast()

  const getPendingTrackingRequests = async (params?: {
    requested_by?: string
    sample_uuid?: string
    limit?: number
    offset?: number
  }) => {
    loading.value = true
    try {
      const res = (await track_api.$_get_pending_tracking_requests(params)) as any
      if (res.type !== "ERROR") {
        pendingRequests.value = res.data
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch pending requests"
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
    pendingRequests,
    getPendingTrackingRequests
  }
}
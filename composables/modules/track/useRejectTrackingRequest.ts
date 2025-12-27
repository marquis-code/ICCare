// useRejectTrackingRequest.ts
import { ref } from "vue"
import { track_api } from "@/api_factory/modules/track"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useRejectTrackingRequest = () => {
  const loading = ref(false)
  const rejectionData = ref(null)
  const { showToast } = useCustomToast()

  const rejectTrackingRequest = async (request_id: string, rejection_reason: string) => {
    loading.value = true
    try {
      const res = (await track_api.$_reject_tracking_request(request_id, rejection_reason)) as any
      if (res.type !== "ERROR") {
        rejectionData.value = res.data
        showToast({
          title: "Success",
          message: "Tracking request rejected",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to reject tracking request"
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
    rejectionData,
    rejectTrackingRequest
  }
}
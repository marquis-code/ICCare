// useSubmitTrackingRequest.ts
import { ref } from "vue"
import { track_api } from "@/api_factory/modules/track"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useSubmitTrackingRequest = () => {
  const loading = ref(false)
  const requestData = ref(null)
  const { showToast } = useCustomToast()

  const submitTrackingRequest = async (payload: {
    sample_uuid: string
    source_attributes: {
      site: string
      freezer: string
      rack: string
      box: string
      position: number
    }
    destination_attributes: {
      site: string
      freezer: string
      rack: string
      box: string
      position: number
    }
    request_type: string
    notes?: string
  }) => {
    loading.value = true
    try {
      const res = (await track_api.$_submit_tracking_request(payload)) as any
      if (res.type !== "ERROR") {
        requestData.value = res.data
        showToast({
          title: "Success",
          message: "Tracking request submitted successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to submit tracking request"
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
    requestData,
    submitTrackingRequest
  }
}
// useTrackSample.ts
import { ref } from "vue"
import { track_api } from "@/api_factory/modules/track"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useTrackSample = () => {
  const loading = ref(false)
  const trackingData = ref(null)
  const { showToast } = useCustomToast()

  const trackSample = async (payload: {
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
    movement_type: string
    reservation_time: string
    start_date_time: string
    end_date_time: string
    request_by: string
    approved_by: string[]
  }) => {
    loading.value = true
    try {
      const res = (await track_api.$_track_sample(payload)) as any
      if (res.type !== "ERROR") {
        trackingData.value = res.data
        showToast({
          title: "Success",
          message: "Sample tracked successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to track sample"
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
    trackingData,
    trackSample
  }
}

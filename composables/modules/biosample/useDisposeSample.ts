import { ref } from "vue"
import { biosample_api } from "@/api_factory/modules/biosample"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useDisposeSample = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const disposeSample = async (payload: {
    sample_uuids: string
    request_by: string
    approved_by: string
    reason_for_disposal: string
    mark_as_disposed: boolean
  }) => {
    loading.value = true
    try {
      const res = (await biosample_api.$_dispose_sample(payload)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: payload.mark_as_disposed ? "Sample disposed successfully" : "Sample use recorded successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to process sample"
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
    disposeSample
  }
}
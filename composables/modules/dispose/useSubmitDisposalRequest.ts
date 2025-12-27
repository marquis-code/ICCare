// useSubmitDisposalRequest.ts
import { ref } from "vue"
import { disposal_api } from "@/api_factory/modules/disposal"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useSubmitDisposalRequest = () => {
  const loading = ref(false)
  const requestData = ref(null)
  const { showToast } = useCustomToast()

  const submitDisposalRequest = async (payload: {
    sample_uuid: string
    reason_for_disposal: string
    disposal_method: string
    mark_as_disposed: boolean
    notes?: string
  }) => {
    loading.value = true
    try {
      const res = (await disposal_api.$_submit_disposal_request(payload)) as any
      if (res.type !== "ERROR") {
        requestData.value = res.data
        showToast({
          title: "Success",
          message: "Disposal request submitted successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to submit disposal request"
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
    submitDisposalRequest
  }
}

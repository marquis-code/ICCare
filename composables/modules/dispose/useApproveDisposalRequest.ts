// useApproveDisposalRequest.ts
import { ref } from "vue"
import { disposal_api } from "@/api_factory/modules/disposal"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useApproveDisposalRequest = () => {
  const loading = ref(false)
  const approvalData = ref(null)
  const { showToast } = useCustomToast()

  const approveDisposalRequest = async (request_id: string, notes?: string) => {
    loading.value = true
    try {
      const res = (await disposal_api.$_approve_disposal_request(request_id, notes)) as any
      if (res.type !== "ERROR") {
        approvalData.value = res.data
        showToast({
          title: "Success",
          message: "Disposal request approved successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to approve disposal request"
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
    approvalData,
    approveDisposalRequest
  }
}
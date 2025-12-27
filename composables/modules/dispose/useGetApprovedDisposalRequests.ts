// useGetApprovedDisposalRequests.ts
import { ref } from "vue"
import { disposal_api } from "@/api_factory/modules/disposal"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useGetApprovedDisposalRequests = () => {
  const loading = ref(false)
  const approvedRequests = ref([])
  const { showToast } = useCustomToast()

  const getApprovedDisposalRequests = async (params?: {
    requested_by?: string
    approved_by?: string
    sample_uuid?: string
    date_from?: string
    date_to?: string
    limit?: number
    offset?: number
  }) => {
    loading.value = true
    try {
      const res = (await disposal_api.$_get_approved_disposal_requests(params)) as any
      if (res.type !== "ERROR") {
        approvedRequests.value = res.data
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch approved disposal requests"
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
    approvedRequests,
    getApprovedDisposalRequests
  }
}

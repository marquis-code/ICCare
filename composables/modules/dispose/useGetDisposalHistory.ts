// useGetDisposalHistory.ts
import { ref } from "vue"
import { disposal_api } from "@/api_factory/modules/disposal"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useGetDisposalHistory = () => {
  const loading = ref(false)
  const disposalHistory = ref([])
  const { showToast } = useCustomToast()

  const getDisposalHistory = async (params?: {
    sample_uuid?: string
    sample_serial_no?: string
    disposed_by?: string
    date_from?: string
    date_to?: string
    execution_type?: 'direct' | 'workflow' | 'all'
    limit?: number
    offset?: number
  }) => {
    loading.value = true
    try {
      const res = (await disposal_api.$_get_disposal_history(params)) as any
      if (res.type !== "ERROR") {
        disposalHistory.value = res.data
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch disposal history"
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
    disposalHistory,
    getDisposalHistory
  }
}
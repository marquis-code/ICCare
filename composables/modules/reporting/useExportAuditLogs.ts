import { ref } from "vue"
import { reporting_api } from "@/api_factory/modules/reporting"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useExportAuditLogs = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const exportAuditLogs = async (payload: {
    format: string
    start_date: string
    end_date: string
    filters?: {
      action?: string
      status?: string
    }
  }) => {
    loading.value = true
    try {
      const res = (await reporting_api.$_export_audit_logs(payload)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Audit logs exported successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to export audit logs"
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
    exportAuditLogs
  }
}
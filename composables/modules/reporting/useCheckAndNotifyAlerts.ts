import { ref } from "vue"
import { reporting_api } from "@/api_factory/modules/reporting"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useCheckAndNotifyAlerts = () => {
  const loading = ref(false)
  const alertResponse = ref<any>(null)
  const { showToast } = useCustomToast()

  const checkAndNotifyAlerts = async (payload: {
    threshold_data: {
      item: string
      units: string
      number: number  // Changed from threshold to number
      admin_notes?: string
    }
    current_value: number
  }) => {
    loading.value = true
    alertResponse.value = null
    
    try {
      const res = (await reporting_api.$_check_and_notify_alerts(payload)) as any
      if (res.type !== "ERROR") {
        alertResponse.value = res.data  // Store the response data
        
        // Show different messages based on whether alert was triggered
        if (res.data?.alert_triggered) {
          showToast({
            title: "Alert Triggered",
            message: res.data.message || "Alert has been triggered and notifications sent",
            toastType: "warning",
            duration: 5000,
          })
        } else {
          showToast({
            title: "All Clear",
            message: res.data.message || "Inventory levels are normal",
            toastType: "success",
            duration: 3000,
          })
        }
        
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to check alerts"
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
    alertResponse,  // Export the response data
    checkAndNotifyAlerts
  }
}
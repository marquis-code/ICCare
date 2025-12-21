import { ref } from "vue"
import { reporting_api } from "@/api_factory/modules/reporting"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useGetDashboardData = () => {
  const loading = ref(false)
  const dashboardData = ref(null)
  const { showToast } = useCustomToast()

  const getDashboardData = async (site_id?: string) => {
    loading.value = true
    try {
      const res = (await reporting_api.$_get_dashboard_data(site_id)) as any
      if (res.type !== "ERROR") {
        dashboardData.value = res.data
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch dashboard data"
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
    dashboardData,
    getDashboardData
  }
}
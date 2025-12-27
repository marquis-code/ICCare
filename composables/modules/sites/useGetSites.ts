import { ref } from "vue"
import { sites_api } from "@/api_factory/modules/sites"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useGetSites = () => {
  const loading = ref(false)
  const sites = ref<any[]>([])
  const { showToast } = useCustomToast()

  const getSites = async (active_only: boolean = false) => {
    loading.value = true
    try {
      const res = (await sites_api.$_get_sites(active_only)) as any
      if (res.type !== "ERROR") {
        sites.value = res?.data?.sites
        return res?.data?.sites
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch sites"
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
    sites,
    getSites
  }
}
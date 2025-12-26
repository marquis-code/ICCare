import { ref } from "vue"
import { sites_api } from "@/api_factory/modules/sites"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useGetSite = () => {
  const loading = ref(false)
  const site = ref<any>(null)
  const { showToast } = useCustomToast()

  const getSite = async (site_id: string) => {
    loading.value = true
    try {
      const res = (await sites_api.$_get_site(site_id)) as any
      if (res.type !== "ERROR") {
        site.value = res.data
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch site"
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
    site,
    getSite
  }
}
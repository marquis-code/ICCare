import { ref } from "vue"
import { sites_api } from "@/api_factory/modules/sites"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useCreateSite = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const createSite = async (payload: {
    site_id: string
    site_name: string
    location: string
    description: string
  }) => {
    loading.value = true
    try {
      const res = (await sites_api.$_create_site(payload)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Site created successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to create site"
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
    createSite
  }
}
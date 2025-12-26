import { ref } from "vue"
import { freezers_api } from "@/api_factory/modules/freezers"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useGetFreezer = () => {
  const loading = ref(false)
  const freezer = ref<any>(null)
  const { showToast } = useCustomToast()

  const getFreezer = async (freezer_id: string) => {
    loading.value = true
    try {
      const res = (await freezers_api.$_get_freezer(freezer_id)) as any
      if (res.type !== "ERROR") {
        freezer.value = res.data
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch freezer"
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
    freezer,
    getFreezer
  }
}
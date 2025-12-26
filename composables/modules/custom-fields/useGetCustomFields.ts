import { ref } from "vue"
import { custom_fields_api } from "@/api_factory/modules/custom_fields"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useGetCustomFields = () => {
  const loading = ref(false)
  const customFields = ref<any[]>([])
  const { showToast } = useCustomToast()

  const getCustomFields = async (active_only: boolean = true) => {
    loading.value = true
    try {
      const res = (await custom_fields_api.$_get_custom_fields(active_only)) as any
      if (res.type !== "ERROR") {
        customFields.value = res.data
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch custom attributes"
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
    customFields,
    getCustomFields
  }
}
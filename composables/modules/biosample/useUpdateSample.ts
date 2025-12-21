import { ref } from "vue"
import { biosample_api } from "@/api_factory/modules/biosample"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useUpdateSample = () => {
  const loading = ref(false)
  const sample = ref(null)
  const { showToast } = useCustomToast()

  const updateSample = async (uuid: string, payload: {
    sample_label?: string
    free_fields?: Record<string, any>
  }) => {
    loading.value = true
    try {
      const res = (await biosample_api.$_update_sample(uuid, payload)) as any
      if (res.type !== "ERROR") {
        sample.value = res.data
        showToast({
          title: "Success",
          message: "Sample updated successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to update sample"
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
    sample,
    updateSample
  }
}
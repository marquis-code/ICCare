

import { ref } from "vue"
import { biosample_api } from "@/api_factory/modules/biosample"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useRegisterSample = () => {
  const loading = ref(false)
  const sample = ref(null)
  const { showToast } = useCustomToast()

  const registerSample = async (payload: {
    site_id: string
    sample_category_id: string
    sample_serial_no: string
    sample_label: string
    free_fields?: Record<string, any>
    storage_location: {
      site: string
      freezer: string
      rack: string
      box: string
      position: string
    }
    collection_date: string
    collection_time: string
    researcher_info: string
    field_collector_info: string
  }) => {
    loading.value = true
    try {
      const res = (await biosample_api.$_register_sample(payload)) as any
      if (res.type !== "ERROR") {
        sample.value = res.data
        showToast({
          title: "Success",
          message: "Sample registered successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to register sample"
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
    registerSample
  }
}
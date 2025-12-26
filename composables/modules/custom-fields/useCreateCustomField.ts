import { ref } from "vue"
import { custom_fields_api } from "@/api_factory/modules/custom_fields"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useCreateCustomField = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const createCustomField = async (payload: {
    attribute_id: string
    attribute_name: string
    attribute_type: string
    allowed_values: string[]
    is_required: boolean
    description: string
  }) => {
    loading.value = true
    try {
      const res = (await custom_fields_api.$_create_custom_field(payload)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Custom attribute created successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to create custom attribute"
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
    createCustomField
  }
}
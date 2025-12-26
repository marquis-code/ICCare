import { ref } from "vue"
import { templates_api } from "@/api_factory/modules/templates"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useCreateTemplate = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const createTemplate = async (payload: {
    template_id: string
    template_name: string
    rows: number
    columns: number
    total_positions: number
    additional_props: Record<string, any>
    description: string
  }) => {
    loading.value = true
    try {
      const res = (await templates_api.$_create_template(payload)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Position template created successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to create template"
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
    createTemplate
  }
}
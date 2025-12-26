import { ref } from "vue"
import { templates_api } from "@/api_factory/modules/templates"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useGetTemplates = () => {
  const loading = ref(false)
  const templates = ref<any[]>([])
  const { showToast } = useCustomToast()

  const getTemplates = async (active_only: boolean = true) => {
    loading.value = true
    try {
      const res = (await templates_api.$_get_templates(active_only)) as any
      if (res.type !== "ERROR") {
        templates.value = res.data
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch templates"
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
    templates,
    getTemplates
  }
}
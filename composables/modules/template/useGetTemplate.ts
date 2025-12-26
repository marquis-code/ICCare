import { ref } from "vue"
import { templates_api } from "@/api_factory/modules/templates"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useGetTemplate = () => {
  const loading = ref(false)
  const template = ref<any>(null)
  const { showToast } = useCustomToast()

  const getTemplate = async (template_id: string) => {
    loading.value = true
    try {
      const res = (await templates_api.$_get_template(template_id)) as any
      if (res.type !== "ERROR") {
        template.value = res.data
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch template"
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
    template,
    getTemplate
  }
}
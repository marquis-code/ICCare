import { ref } from "vue"
import { boxes_api } from "@/api_factory/modules/boxes"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useCreateBox = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const createBox = async (payload: {
    box_id: string
    box_name: string
    rack_id: string
    freezer_id: string
    site_id: string
    position_template_id: string
    box_type: string
    manufacturer: string
    model: string
  }) => {
    loading.value = true
    try {
      const res = (await boxes_api.$_create_box(payload)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Box created successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to create box"
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
    createBox
  }
}
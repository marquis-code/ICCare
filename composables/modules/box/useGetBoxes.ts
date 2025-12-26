import { ref } from "vue"
import { boxes_api } from "@/api_factory/modules/boxes"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useGetBoxes = () => {
  const loading = ref(false)
  const boxes = ref<any[]>([])
  const { showToast } = useCustomToast()

  const getBoxes = async (site_id?: string, freezer_id?: string, rack_id?: string, active_only: boolean = true) => {
    loading.value = true
    try {
      const res = (await boxes_api.$_get_boxes(site_id, freezer_id, rack_id, active_only)) as any
      if (res.type !== "ERROR") {
        boxes.value = res.data
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch boxes"
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
    boxes,
    getBoxes
  }
}
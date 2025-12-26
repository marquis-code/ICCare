import { ref } from "vue"
import { boxes_api } from "@/api_factory/modules/boxes"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useGetBox = () => {
  const loading = ref(false)
  const box = ref<any>(null)
  const { showToast } = useCustomToast()

  const getBox = async (box_id: string) => {
    loading.value = true
    try {
      const res = (await boxes_api.$_get_box(box_id)) as any
      if (res.type !== "ERROR") {
        box.value = res.data
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch box"
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
    box,
    getBox
  }
}
import { ref } from "vue"
import { biosample_api } from "@/api_factory/modules/biosample"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useGetSamples = () => {
  const loading = ref(false)
  const samples = ref([])
  const { showToast } = useCustomToast()

  const getSamples = async () => {
    loading.value = true
    try {
      const res = (await biosample_api.$_get_samples()) as any
      if (res.type !== "ERROR") {
        samples.value = res.data
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch samples"
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

  onMounted(() => {
    getSamples()
  })

  return {
    loading,
    samples,
    getSamples
  }
}
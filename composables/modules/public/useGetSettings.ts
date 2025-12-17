import { ref } from "vue"
import { public_api } from "@/api_factory/modules/public"

export const useGetSettings = () => {
  const loading = ref(false)
  const settings = ref(null)
  const error = ref(null)

  const getSettings = async () => {
    loading.value = true
    error.value = null
    try {
      const res = (await public_api.getSettings()) as any
      if (res.type !== "ERROR") {
        settings.value = res.data
        return res.data
      } else {
        error.value = res.message || "Failed to fetch settings"
        return null
      }
    } catch (err: any) {
      error.value = err.message || "An error occurred"
      return null
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    getSettings()
  })

  return { 
    loading, 
    settings, 
    error, 
    getSettings 
  }
}
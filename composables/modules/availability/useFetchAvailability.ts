import { ref } from "vue"
import { appointments_api } from "@/api_factory/modules/appointments"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useFetchAvailability = () => {
  const loading = ref(false)
  const availability = ref<any[]>([])
  const error = ref<string | null>(null) as any
  const { showToast } = useCustomToast()

  const fetchAvailability = async (consultationType?: "physical" | "virtual") => {
    loading.value = true
    error.value = null

    try {
      const res = await appointments_api.getAvailability(consultationType) as any

      // ✅ Handle success
      if (res.type !== "ERROR") {
        availability.value = res.data || []
        return res.data
      }

      // ❌ Handle custom backend error responses
      error.value = res.message || "Failed to load availability"
      showToast({
        title: "Error",
        message: error.value,
        toastType: "error",
        duration: 3000,
      })
      throw new Error(error.value)

    } catch (err: any) {
      error.value = err?.message || "Failed to load availability"

      showToast({
        title: "Error",
        message: error.value,
        toastType: "error",
        duration: 3000,
      })

      throw err
    } finally {
      loading.value = false
    }
  }

  return { loading, availability, error, fetchAvailability }
}

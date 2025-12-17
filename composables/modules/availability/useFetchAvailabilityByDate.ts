import { ref } from "vue"
import { appointments_api } from "@/api_factory/modules/appointments"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useFetchAvailabilityByDate = () => {
  const loading = ref(false)
  const availability = ref<any>(null)
  const error = ref<string | null>(null) as any
  const { showToast } = useCustomToast()

  const fetchAvailabilityByDate = async (
    date?: string,
    time?: string,
    consultationType?: "physical" | "virtual"
  ) => {
    loading.value = true
    error.value = null

    try {
      const res = await appointments_api.getAvailabilityByDate(date, time, consultationType) as any

      if (res.type !== "ERROR") {
        availability.value = res.data
        return res.data
      } else {
        error.value = res.message || "Failed to fetch availability"
        showToast({
          title: "Error",
          message: error.value,
          toastType: "error",
          duration: 3000,
        })
        throw new Error(error.value)
      }
    } catch (err: any) {
      error.value = err?.message || "Error fetching availability"
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

  return {
    loading,
    availability,
    error,
    fetchAvailabilityByDate,
  }
}

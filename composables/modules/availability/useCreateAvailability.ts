import { ref } from "vue"
import { appointments_api } from "@/api_factory/modules/appointments"

export const useCreateAvailability = () => {
  const loading = ref(false)
  const success = ref(false)
  const error = ref<string | null>(null)

  const createAvailability = async (payload: {
    dayOfWeek: number
    timeSlots: Array<{ startTime: string; endTime: string }>
    consultationType: "physical" | "virtual"
    isAvailable?: boolean
  }) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      await appointments_api.createAvailability(payload)
      success.value = true
    } catch (err: any) {
      error.value = err?.response?.data?.message || "Failed to create availability"
      console.error("createAvailability error:", err)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    success,
    error,
    createAvailability
  }
}

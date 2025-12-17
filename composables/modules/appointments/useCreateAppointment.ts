import { ref } from "vue"
import { appointments_api } from "@/api_factory/modules/appointments"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useCreateAppointment = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const { showToast } = useCustomToast()

  const createAppointment = async (payload: {
    consultationType: "physical" | "virtual"
    consultationMode?: "voice" | "video"
    date: string
    timeSlot: string
    location?: string
    price: number
  }) => {
    loading.value = true
    error.value = null
    try {
      const res = (await appointments_api.createAppointment(payload)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Appointment booked successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        error.value = res.message
        showToast({
          title: "Error",
          message: res.message || "Failed to create appointment",
          toastType: "error",
          duration: 3000,
        })
        throw new Error(res.message)
      }
    } catch (err: any) {
      error.value = err.message
      showToast({
        title: "Error",
        message: err.message || "Failed to create appointment",
        toastType: "error",
        duration: 3000,
      })
      throw err
    } finally {
      loading.value = false
    }
  }

  return { loading, error, createAppointment }
}

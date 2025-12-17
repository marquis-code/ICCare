import { ref } from "vue"
import { appointments_api } from "@/api_factory/modules/appointments"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useCancelAppointment = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const { showToast } = useCustomToast()

  const cancelAppointment = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const res = (await appointments_api.cancelAppointment(id)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Appointment canceled successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        error.value = res.message
        showToast({
          title: "Error",
          message: res.message || "Failed to cancel appointment",
          toastType: "error",
          duration: 3000,
        })
        throw new Error(res.message)
      }
    } catch (err: any) {
      error.value = err.message
      showToast({
        title: "Error",
        message: err.message || "Failed to cancel appointment",
        toastType: "error",
        duration: 3000,
      })
      throw err
    } finally {
      loading.value = false
    }
  }

  return { loading, error, cancelAppointment }
}
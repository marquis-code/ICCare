import { ref } from "vue"
import { appointments_api } from "@/api_factory/modules/appointments"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useFetchAppointmentById = () => {
  const loading = ref(false)
  const appointment = ref<any | null>(null)
  const error = ref<string | null>(null)
  const { showToast } = useCustomToast()

  const fetchAppointmentById = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const res = (await appointments_api.getAppointmentById(id)) as any
      if (res.type !== "ERROR") {
        appointment.value = res.data.appointment || null
        return res.data
      } else {
        error.value = res.message
        showToast({
          title: "Error",
          message: res.message || "Failed to load appointment details",
          toastType: "error",
          duration: 3000,
        })
        throw new Error(res.message)
      }
    } catch (err: any) {
      error.value = err.message
      showToast({
        title: "Error",
        message: err.message || "Failed to load appointment details",
        toastType: "error",
        duration: 3000,
      })
      throw err
    } finally {
      loading.value = false
    }
  }

  return { loading, appointment, error, fetchAppointmentById }
}

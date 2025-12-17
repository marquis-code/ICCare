import { ref } from "vue"
import { appointments_api } from "@/api_factory/modules/appointments"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useFetchAppointments = () => {
  const loading = ref(false)
  const appointments = ref<any[]>([])
  const error = ref<string | null>(null)
  const { showToast } = useCustomToast()

  const fetchAppointments = async (filters?: {
    status?: string
    type?: string
  }) => {
    loading.value = true
    error.value = null
    try {
      const res = (await appointments_api.getAppointments(filters)) as any
      if (res.type !== "ERROR") {
        appointments.value = res.data || []
        return res.data
      } else {
        error.value = res.message
        showToast({
          title: "Error",
          message: res.message || "Failed to load appointments",
          toastType: "error",
          duration: 3000,
        })
        throw new Error(res.message)
      }
    } catch (err: any) {
      error.value = err.message
      showToast({
        title: "Error",
        message: err.message || "Failed to load appointments",
        toastType: "error",
        duration: 3000,
      })
      throw err
    } finally {
      loading.value = false
    }
  }

  return { loading, appointments, error, fetchAppointments }
}
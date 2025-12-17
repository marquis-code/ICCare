import { ref } from "vue"
import { appointments_api } from "@/api_factory/modules/appointments"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useRescheduleAppointment = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const { showToast } = useCustomToast()

  const rescheduleAppointment = async (id: string, date: string, timeSlot: string) => {
    loading.value = true
    error.value = null
    try {
        const paylaodObj = {
        date,
        timeSlot,
      } as any
      const res = (await appointments_api.rescheduleAppointment(id, paylaodObj)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Appointment rescheduled successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        error.value = res.message
        showToast({
          title: "Error",
          message: res.message || "Failed to reschedule appointment",
          toastType: "error",
          duration: 3000,
        })
        throw new Error(res.message)
      }
    } catch (err: any) {
      error.value = err.message
      showToast({
        title: "Error",
        message: err.message || "Failed to reschedule appointment",
        toastType: "error",
        duration: 3000,
      })
      throw err
    } finally {
      loading.value = false
    }
  }

  return { loading, error, rescheduleAppointment }
}
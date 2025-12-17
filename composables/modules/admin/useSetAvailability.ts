import { ref } from "vue"
import { admin_api } from "@/api_factory/modules/admin"

export const useSetAvailability = () => {
  const loading = ref(false)

  const setAvailability = async (payload: {
    dayOfWeek: number
    timeSlots: { startTime: string; endTime: string }[]
    consultationType: "physical" | "virtual"
    isAvailable: boolean
  }) => {
    loading.value = true
    try {
      const res = (await admin_api.setAvailability(payload)) as any
      if (res.type !== "ERROR") {
        return res.data
      }
    } finally {
      loading.value = false
    }
  }

  return { loading, setAvailability }
}
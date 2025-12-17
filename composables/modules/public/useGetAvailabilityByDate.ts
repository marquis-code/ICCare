import { ref } from "vue"
import { public_api } from "@/api_factory/modules/public"

export const useGetAvailabilityByDate = () => {
  const loading = ref(false)
  const availability = ref(null)
  const error = ref(null)

  const getAvailabilityByDate = async (filters?: { 
    date?: string; 
    time?: string; 
    consultationType?: string 
  }) => {
    loading.value = true
    error.value = null
    try {
      const res = (await public_api.getAvailabilityByDate(filters)) as any
      console.log(res.data.availability, 'resv h')
      if (res.type !== "ERROR") {
        availability.value = res.data
        return res.data
      } else {
        error.value = res.message || "Failed to fetch availability"
        return null
      }
    } catch (err: any) {
      error.value = err.message || "An error occurred"
      return null
    } finally {
      loading.value = false
    }
  }

  return { 
    loading, 
    availability, 
    error, 
    getAvailabilityByDate 
  }
}
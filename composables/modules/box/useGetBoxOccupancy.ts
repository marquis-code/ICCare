import { ref } from "vue"
import { occupancy_api } from "@/api_factory/modules/occupancy"
import { useCustomToast } from "@/composables/core/useCustomToast"

interface BoxOccupancyParams {
  box_id: string
  site_id?: string
  freezer_id?: string
  rack_id?: string
}

export const useGetBoxOccupancy = () => {
  const loading = ref(false)
  const occupancy = ref<any>(null)
  const { showToast } = useCustomToast()

  const getBoxOccupancy = async ({
    box_id,
    site_id,
    freezer_id,
    rack_id
  }: BoxOccupancyParams) => {
    loading.value = true
    try {
      const res = (await occupancy_api.$_get_box_occupancy(box_id, site_id, freezer_id, rack_id)) as any
      if (res.type !== "ERROR") {
        occupancy.value = res.data
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch box occupancy"
        showToast({
          title: "Error",
          message: errorMsg,
          toastType: "error",
          duration: 3000,
        })
        return null
      }
    } catch (error: any) {
      showToast({
        title: "Error",
        message: error?.message || "Something went wrong",
        toastType: "error",
        duration: 3000,
      })
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    occupancy,
    getBoxOccupancy
  }
}
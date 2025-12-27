import { ref } from "vue"
import { racks_api } from "@/api_factory/modules/racks"
import { useCustomToast } from "@/composables/core/useCustomToast"

interface GetRacksParams {
  site_id?: string
  freezer_id?: string
  active_only?: boolean
}

export const useGetRacks = () => {
  const loading = ref(false)
  const racks = ref<any[]>([])
  const { showToast } = useCustomToast()

  const getRacks = async ({
    site_id,
    freezer_id,
    active_only = false
  }: GetRacksParams = {}) => {
    loading.value = true
    try {
      const res = (await racks_api.$_get_racks(site_id, freezer_id, active_only)) as any
      if (res.type !== "ERROR") {
        racks.value = res.data.racks
        return res.data.racks
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch racks"
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
    racks,
    getRacks
  }
}
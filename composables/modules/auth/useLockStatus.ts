import { ref } from "vue"
import { auth_api } from "@/api_factory/modules/auth"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useLockStatus = () => {
  const loading = ref(false)
  const lockStatus = ref(null)
  const { showToast } = useCustomToast()

  const getLockStatus = async (user_id: string) => {
    loading.value = true
    try {
      const res = (await auth_api.$_get_lock_status(user_id)) as any
      if (res.type !== "ERROR") {
        lockStatus.value = res.data
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch lock status"
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

  const updateLockStatus = async (payload: {
    user_id: string
    lu_status: boolean
  }) => {
    loading.value = true
    try {
      const res = (await auth_api.$_update_lock_status(payload)) as any
      if (res.type !== "ERROR") {
        lockStatus.value = res.data
        showToast({
          title: "Success",
          message: `User ${payload.lu_status ? 'locked' : 'unlocked'} successfully`,
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to update lock status"
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
    lockStatus,
    getLockStatus,
    updateLockStatus
  }
}
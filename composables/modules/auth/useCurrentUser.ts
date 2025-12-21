import { ref } from "vue"
import { auth_api } from "@/api_factory/modules/auth"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useCurrentUser = () => {
  const loading = ref(false)
  const user = ref(null)
  const { showToast } = useCustomToast()

  const fetchCurrentUser = async () => {
    loading.value = true
    try {
      const res = (await auth_api.$_get_current_user()) as any
      if (res.type !== "ERROR") {
        user.value = res.data
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch user details"
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
    user,
    fetchCurrentUser
  }
}
import { ref } from "vue"
import { auth_api } from "@/api_factory/modules/auth"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useUpdateProfile = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const { showToast } = useCustomToast()

  const updateProfile = async (data: any) => {
    loading.value = true
    error.value = null
    try {
      const res = (await auth_api.updateProfile(data)) as any
      if (res.type !== "ERROR") {
        localStorage.setItem("auth_user", JSON.stringify(res.data.user))
        showToast({
          title: "Success",
          message: "Profile updated successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        error.value = res.message
        showToast({
          title: "Error",
          message: res.message || "Failed to update profile",
          toastType: "error",
          duration: 3000,
        })
        throw new Error(res.message)
      }
    } catch (err: any) {
      error.value = err.message
      showToast({
        title: "Error",
        message: err.message || "Failed to update profile",
        toastType: "error",
        duration: 3000,
      })
      throw err
    } finally {
      loading.value = false
    }
  }

  return { loading, error, updateProfile }
}
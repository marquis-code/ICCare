import { ref } from "vue"
import { auth_api } from "@/api_factory/modules/auth"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useAssignRole = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()

  const assignRole = async (payload: {
    user_id: string
    role_type: string
  }) => {
    loading.value = true
    try {
      const res = (await auth_api.$_assign_role(payload)) as any
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Role assigned successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to assign role"
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
    assignRole
  }
}
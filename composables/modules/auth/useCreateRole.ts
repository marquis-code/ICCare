import { ref } from "vue"
import { auth_api } from "@/api_factory/modules/auth"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useCreateRole = () => {
  const loading = ref(false)
  const role = ref(null)
  const { showToast } = useCustomToast()

  const createRole = async (payload: {
    role_type: string
    role_function: string
    role_function_rights: Array<{
      function_name: string
      rights: string[]
    }>
    expiration_date: string
    status: string
  }) => {
    loading.value = true
    try {
      const res = (await auth_api.$_create_role(payload)) as any
      if (res.type !== "ERROR") {
        role.value = res.data
        showToast({
          title: "Success",
          message: "Role created successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to create role"
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
    role,
    createRole
  }
}
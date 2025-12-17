// composables/modules/auth/useRegister.ts
import { ref } from "vue"
import { auth_api } from "@/api_factory/modules/auth"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useRegister = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const { showToast } = useCustomToast()

  const form = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
});

  const register = async (data: {
    name: string
    email: string
    phone: string
    password: string
  }) => {
    loading.value = true
    error.value = null
    try {
      const paylaodObj = {
        ...data,
        role: 'admin',
      }
      const res = (await auth_api.register(paylaodObj)) as any
      if (res.type !== "ERROR") {
        localStorage.setItem("auth_token", res.data.token)
        localStorage.setItem("auth_user", JSON.stringify(res.data.user))
        showToast({
          title: "Success",
          message: "Registration successful",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        error.value = res.message
        showToast({
          title: "Error",
          message: res.message || "Registration failed",
          toastType: "error",
          duration: 3000,
        })
        throw new Error(res.message)
      }
    } catch (err: any) {
      error.value = err.message
      showToast({
        title: "Error",
        message: err.message || "Registration failed",
        toastType: "error",
        duration: 3000,
      })
      throw err
    } finally {
      loading.value = false
    }
  }

  return { loading, error, register, form }
}

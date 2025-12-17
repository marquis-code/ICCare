import { ref } from "vue"
import { useRouter } from "vue-router"
import { auth_api } from "@/api_factory/modules/auth"
import { useUser } from "@/composables/modules/auth/user"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useLogin = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const router = useRouter()
  const { createUser } = useUser()
  const { showToast } = useCustomToast()


        const form = ref({
        email: '',
        password: '',
        })

  const login = async (paylaod: any) => {
    loading.value = true
    error.value = null
    try {
      const res = (await auth_api.login(paylaod)) as any
      if (res.type !== "ERROR") {
        createUser(res.data)
        showToast({
          title: "Success",
          message: "Login successful",
          toastType: "success",
          duration: 3000,
        })
        router.push('/dashboard')
        return res.data
      } else {
        error.value = res.message
        showToast({
          title: "Error",
          message: res.message || "Login failed",
          toastType: "error",
          duration: 3000,
        })
        throw new Error(res.message)
      }
    } catch (err: any) {
      error.value = err.message
      showToast({
        title: "Error",
        message: err.message || "Login failed",
        toastType: "error",
        duration: 3000,
      })
      throw err
    } finally {
      loading.value = false
    }
  }

  return { loading, error, login, form }
}
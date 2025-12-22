import { ref } from "vue"
import { auth_api } from "@/api_factory/modules/auth"
import { useCustomToast } from "@/composables/core/useCustomToast"
import { useRouter } from "vue-router"

export const useSignup = () => {
  const loading = ref(false)
  const user = ref(null)
  const { showToast } = useCustomToast()
  const router = useRouter()

  const signup = async (payload: {
    first_name: string
    last_name: string
    email: string
    password: string
    password_confirm: string
  }) => {
    loading.value = true
    try {
      const res = (await auth_api.$_signup(payload)) as any
      if (res.type !== "ERROR") {
        router.push('/')
        user.value = res.data
        showToast({
          title: "Success",
          message: "Account created successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } 
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    user,
    signup
  }
}
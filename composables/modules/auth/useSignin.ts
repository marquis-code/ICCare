import { ref } from "vue"
import { auth_api } from "@/api_factory/modules/auth"
import { useCustomToast } from "@/composables/core/useCustomToast"
import { useRouter } from "vue-router"
import { useUser } from "@/composables/modules/auth/user"

export const useSignin = () => {
  const loading = ref(false)
  const authData = ref(null)
  const { showToast } = useCustomToast()
  const router = useRouter()
  const { createUser } = useUser()

  const signin = async (payload: {
    email: string
    password: string
  }) => {
    loading.value = true
    try {
      const res = (await auth_api.$_sign_in(payload)) as any
      if (res.type !== "ERROR") {
        createUser(res.data)
        
        showToast({
          title: "Success",
          message: "Signed in successfully",
          toastType: "success",
          duration: 3000,
        })
        router.push('/dashboard')
        return res.data
      }
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    signin
  }
}
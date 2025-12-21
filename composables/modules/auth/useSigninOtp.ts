import { ref } from "vue"
import { auth_api } from "@/api_factory/modules/auth"
import { useCustomToast } from "@/composables/core/useCustomToast"
import { useRouter } from "vue-router"

export const useSigninOtp = () => {
  const loading = ref(false)
  const authData = ref(null)
  const { showToast } = useCustomToast()
  const router = useRouter()

  const verifyOtp = async (payload: {
    email: string
    otp: string
  }) => {
    loading.value = true
    try {
      const res = (await auth_api.$_signin_otp(payload)) as any
      if (res.type !== "ERROR") {
        authData.value = res.data
        
        // Store tokens if present
        if (res.data.access_token) {
          localStorage.setItem('access_token', res.data.access_token)
        }
        if (res.data.refresh_token) {
          localStorage.setItem('refresh_token', res.data.refresh_token)
        }
        
        showToast({
          title: "Success",
          message: "OTP verified successfully",
          toastType: "success",
          duration: 3000,
        })
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to verify OTP"
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
    authData,
    verifyOtp
  }
}
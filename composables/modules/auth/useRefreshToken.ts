// import { ref } from "vue"
// import { auth_api } from "@/api_factory/modules/auth"
// import { useCustomToast } from "@/composables/core/useCustomToast"

// export const useRefreshToken = () => {
//   const loading = ref(false)
//   const { showToast } = useCustomToast()

//   const refreshToken = async (refresh_token?: string) => {
//     loading.value = true
//     try {
//       const token = refresh_token || localStorage.getItem('refresh_token')
      
//       if (!token) {
//         showToast({
//           title: "Error",
//           message: "No refresh token available",
//           toastType: "error",
//           duration: 3000,
//         })
//         return null
//       }

//       const res = (await auth_api.$_refresh_token({ refresh_token: token })) as any
//       if (res.type !== "ERROR") {
//         // Update tokens
//         if (res.data.access_token) {
//           localStorage.setItem('access_token', res.data.access_token)
//         }
//         if (res.data.refresh_token) {
//           localStorage.setItem('refresh_token', res.data.refresh_token)
//         }
        
//         return res.data
//       } else {
//         const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to refresh token"
//         showToast({
//           title: "Error",
//           message: errorMsg,
//           toastType: "error",
//           duration: 3000,
//         })
//         return null
//       }
//     } catch (error: any) {
//       showToast({
//         title: "Error",
//         message: error?.message || "Something went wrong",
//         toastType: "error",
//         duration: 3000,
//       })
//       return null
//     } finally {
//       loading.value = false
//     }
//   }

//   return {
//     loading,
//     refreshToken
//   }
// }

import { ref } from "vue"
import { auth_api } from "@/api_factory/modules/auth"
import { useCustomToast } from "@/composables/core/useCustomToast"
import { useUser } from "@/composables/modules/auth/user"

export const useRefreshToken = () => {
  const loading = ref(false)
  const { showToast } = useCustomToast()
  const { setToken, setRefreshToken, getRefreshToken } = useUser()

  const refreshToken = async (refresh_token?: string) => {
    loading.value = true
    try {
      const token = refresh_token || getRefreshToken()
      
      if (!token) {
        showToast({
          title: "Error",
          message: "No refresh token available",
          toastType: "error",
          duration: 3000,
        })
        return null
      }

      const res = (await auth_api.$_refresh_token({ refresh_token: token })) as any
      
      if (res.type !== "ERROR" && res.data?.access_token) {
        // Update tokens using the composable methods
        setToken(res.data.access_token)
        
        if (res.data.refresh_token) {
          setRefreshToken(res.data.refresh_token)
        }
        
        return res.data
      } else {
        const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to refresh token"
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
    refreshToken
  }
}

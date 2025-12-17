import { useCustomToast } from "@/composables/core/useCustomToast"

export const useLogout = () => {
  const { showToast } = useCustomToast()

  const logout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
    showToast({
      title: "Success",
      message: "Logged out successfully",
      toastType: "success",
      duration: 3000,
    })
  }

  return { logout }
}

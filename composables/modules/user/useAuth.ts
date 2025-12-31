import { ref } from "vue"
import { auth_api, type SignUpPayload, type SignInPayload, type SignInResponse, type User } from "@/api_factory/modules/auth"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useAuth = () => {
    const loading = ref(false)
    const currentUser = ref<User | null>(null)
    const { showToast } = useCustomToast()

    const signUp = async (payload: SignUpPayload): Promise<User | null> => {
        loading.value = true
        try {
            const res = (await auth_api.$_sign_up(payload)) as any
            if (res.type !== "ERROR") {
                showToast({
                    title: "Success",
                    message: "Account created successfully",
                    toastType: "success",
                    duration: 3000,
                })
                return res.data
            } else {
                const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to create account"
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

    const signIn = async (payload: SignInPayload): Promise<SignInResponse | null> => {
        loading.value = true
        try {
            const res = (await auth_api.$_sign_in(payload)) as any
            if (res.type !== "ERROR") {
                currentUser.value = res.data.user
                // Store tokens in localStorage or sessionStorage
                localStorage.setItem('access_token', res.data.access_token)
                localStorage.setItem('refresh_token', res.data.refresh_token)

                showToast({
                    title: "Success",
                    message: "Logged in successfully",
                    toastType: "success",
                    duration: 3000,
                })
                return res.data
            } else {
                const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to sign in"
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

    const refreshToken = async (): Promise<boolean> => {
        const refresh_token = localStorage.getItem('refresh_token')
        if (!refresh_token) return false

        try {
            const res = (await auth_api.$_refresh_token({ refresh_token })) as any
            if (res.type !== "ERROR") {
                localStorage.setItem('access_token', res.data.access_token)
                localStorage.setItem('refresh_token', res.data.refresh_token)
                return true
            } else {
                return false
            }
        } catch (error: any) {
            return false
        }
    }

    const getCurrentUser = async (): Promise<User | null> => {
        loading.value = true
        try {
            const res = (await auth_api.$_get_current_user()) as any
            if (res.type !== "ERROR") {
                currentUser.value = res.data
                return res.data
            } else {
                return null
            }
        } catch (error: any) {
            return null
        } finally {
            loading.value = false
        }
    }

    const logout = () => {
        currentUser.value = null
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        showToast({
            title: "Success",
            message: "Logged out successfully",
            toastType: "success",
            duration: 3000,
        })
    }

    return {
        loading,
        currentUser,
        signUp,
        signIn,
        refreshToken,
        getCurrentUser,
        logout
    }
}
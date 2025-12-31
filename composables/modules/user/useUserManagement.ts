import { ref } from "vue"
import { auth_api, type User, type UpdateUserPayload } from "@/api_factory/modules/auth"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useUserManagement = () => {
    const loading = ref(false)
    const users = ref<User[]>([])
    const { showToast } = useCustomToast()

    const getAllUsers = async (): Promise<User[] | null> => {
        loading.value = true
        try {
            const res = (await auth_api.$_get_all_users()) as any
            if (res.type !== "ERROR") {
                users.value = res.data
                return res.data
            } else {
                const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch users"
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

    const updateUser = async (userId: string, payload: UpdateUserPayload): Promise<User | null> => {
        loading.value = true
        try {
            const res = (await auth_api.$_update_user(userId, payload)) as any
            if (res.type !== "ERROR") {
                // Update local users array
                const userIndex = users.value.findIndex(u => u.user_id === userId)
                if (userIndex !== -1) {
                    users.value[userIndex] = res.data
                }

                showToast({
                    title: "Success",
                    message: "User updated successfully",
                    toastType: "success",
                    duration: 3000,
                })
                return res.data
            } else {
                const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to update user"
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

    const deactivateUser = async (userId: string): Promise<User | null> => {
        loading.value = true
        try {
            const res = (await auth_api.$_deactivate_user(userId)) as any
            if (res.type !== "ERROR") {
                // Update local users array
                const userIndex = users.value.findIndex(u => u.user_id === userId)
                if (userIndex !== -1) {
                    users.value[userIndex] = res.data
                }

                showToast({
                    title: "Success",
                    message: "User deactivated successfully",
                    toastType: "success",
                    duration: 3000,
                })
                return res.data
            } else {
                const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to deactivate user"
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

    onMounted(async () => {
        await getAllUsers()
    })

    return {
        loading,
        users,
        getAllUsers,
        updateUser,
        deactivateUser
    }
}
import { ref } from "vue"
import { auth_api, type LockStatus, type UpdateLockStatusPayload } from "~/api_factory/modules/auth"
import { useCustomToast } from "~/composables/core/useCustomToast"

export const useLockManagement = () => {
    const loading = ref(false)
    const lockStatus = ref<LockStatus | null>(null)
    const { showToast } = useCustomToast()

    const getLockStatus = async (userId: string): Promise<LockStatus | null> => {
        loading.value = true
        try {
            const res = (await auth_api.$_get_lock_status(userId)) as any
            if (res.type !== "ERROR") {
                lockStatus.value = res.data
                return res.data
            } else {
                const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch lock status"
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

    const updateLockStatus = async (payload: UpdateLockStatusPayload): Promise<LockStatus | null> => {
        loading.value = true
        try {
            const res = (await auth_api.$_update_lock_status(payload)) as any
            if (res.type !== "ERROR") {
                lockStatus.value = res.data

                const action = payload.lu_status ? "locked" : "unlocked"
                showToast({
                    title: "Success",
                    message: `User ${action} successfully`,
                    toastType: "success",
                    duration: 3000,
                })
                return res.data
            } else {
                const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to update lock status"
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

    const lockUser = async (userId: string): Promise<LockStatus | null> => {
        return updateLockStatus({ user_id: userId, lu_status: true })
    }

    const unlockUser = async (userId: string): Promise<LockStatus | null> => {
        return updateLockStatus({ user_id: userId, lu_status: false })
    }

    return {
        loading,
        lockStatus,
        getLockStatus,
        updateLockStatus,
        lockUser,
        unlockUser
    }
}
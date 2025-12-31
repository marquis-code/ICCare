import { ref } from "vue"
import { auth_api, type Role, type CreateRolePayload, type UpdateRolePayload, type AssignRolePayload } from "@/api_factory/modules/auth"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useRoleManagement = () => {
    const loading = ref(false)
    const roles = ref<Role[]>([])
    const { showToast } = useCustomToast()

    const createRole = async (payload: CreateRolePayload): Promise<boolean> => {
        loading.value = true
        try {
            const res = (await auth_api.$_create_role(payload)) as any
            if (res.type !== "ERROR") {
                showToast({
                    title: "Success",
                    message: `Role '${payload.role_type}' created successfully`,
                    toastType: "success",
                    duration: 3000,
                })
                return true
            } else {
                const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to create role"
                showToast({
                    title: "Error",
                    message: errorMsg,
                    toastType: "error",
                    duration: 3000,
                })
                return false
            }
        } catch (error: any) {
            showToast({
                title: "Error",
                message: error?.message || "Something went wrong",
                toastType: "error",
                duration: 3000,
            })
            return false
        } finally {
            loading.value = false
        }
    }

    const getAllRoles = async (): Promise<Role[] | null> => {
        loading.value = true
        try {
            const res = (await auth_api.$_get_all_roles()) as any
            if (res.type !== "ERROR") {
                roles.value = res.data
                return res.data
            } else {
                const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch roles"
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

    const updateRole = async (roleType: string, payload: UpdateRolePayload): Promise<Role | null> => {
        loading.value = true
        try {
            const res = (await auth_api.$_update_role(roleType, payload)) as any
            if (res.type !== "ERROR") {
                // Update local roles array
                const roleIndex = roles.value.findIndex(r => r.role_type === roleType)
                if (roleIndex !== -1) {
                    roles.value[roleIndex] = res.data
                }

                showToast({
                    title: "Success",
                    message: `Role '${roleType}' updated successfully`,
                    toastType: "success",
                    duration: 3000,
                })
                return res.data
            } else {
                const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to update role"
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

    const deleteRole = async (roleType: string): Promise<boolean> => {
        loading.value = true
        try {
            const res = (await auth_api.$_delete_role(roleType)) as any
            if (res.type !== "ERROR") {
                // Remove from local roles array
                roles.value = roles.value.filter(r => r.role_type !== roleType)

                showToast({
                    title: "Success",
                    message: `Role '${roleType}' deleted successfully`,
                    toastType: "success",
                    duration: 3000,
                })
                return true
            } else {
                const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to delete role"
                showToast({
                    title: "Error",
                    message: errorMsg,
                    toastType: "error",
                    duration: 3000,
                })
                return false
            }
        } catch (error: any) {
            showToast({
                title: "Error",
                message: error?.message || "Something went wrong",
                toastType: "error",
                duration: 3000,
            })
            return false
        } finally {
            loading.value = false
        }
    }

    const assignRole = async (payload: AssignRolePayload): Promise<boolean> => {
        loading.value = true
        try {
            const res = (await auth_api.$_assign_role(payload)) as any
            if (res.type !== "ERROR") {
                showToast({
                    title: "Success",
                    message: `Role '${payload.role_type}' assigned successfully`,
                    toastType: "success",
                    duration: 3000,
                })
                return true
            } else {
                const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to assign role"
                showToast({
                    title: "Error",
                    message: errorMsg,
                    toastType: "error",
                    duration: 3000,
                })
                return false
            }
        } catch (error: any) {
            showToast({
                title: "Error",
                message: error?.message || "Something went wrong",
                toastType: "error",
                duration: 3000,
            })
            return false
        } finally {
            loading.value = false
        }
    }

    onMounted(async () => {
        await getAllRoles()
    })

    return {
        loading,
        roles,
        createRole,
        getAllRoles,
        updateRole,
        deleteRole,
        assignRole
    }
}
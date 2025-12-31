import { ref } from "vue"
import { audit_api, type CreateAuditLogPayload, type AuditLogEntry } from "@/api_factory/modules/audit"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useCreateAuditLog = () => {
    const loading = ref(false)
    const { showToast } = useCustomToast()

    const createAuditLog = async (payload: CreateAuditLogPayload): Promise<AuditLogEntry | null> => {
        loading.value = true
        try {
            const res = (await audit_api.$_create_audit_log(payload)) as any
            if (res.type !== "ERROR") {
                showToast({
                    title: "Success",
                    message: "Audit log created successfully",
                    toastType: "success",
                    duration: 3000,
                })
                return res.data
            } else {
                const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to create audit log"
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
        createAuditLog
    }
}
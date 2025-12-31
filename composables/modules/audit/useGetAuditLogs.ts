import { ref } from "vue"
import { audit_api, type AuditLogResponse } from "@/api_factory/modules/audit"
import { useCustomToast } from "@/composables/core/useCustomToast"

export interface AuditLogsFilters {
    startDate?: string
    endDate?: string
    userID?: string
    actionType?: string
    keyword?: string
    limit?: number
    offset?: number
}

export const useGetAuditLogs = () => {
    const loading = ref(false)
    const auditLogs = ref<AuditLogResponse | null>(null)
    const { showToast } = useCustomToast()

    const getAuditLogs = async (filters?: AuditLogsFilters): Promise<AuditLogResponse | null> => {
        loading.value = true
        try {
            // Clean up the filters - remove empty strings and undefined values
            const cleanFilters: Record<string, any> = {}

            if (filters) {
                Object.keys(filters).forEach((key) => {
                    const value = filters[key as keyof AuditLogsFilters]
                    // Only include the parameter if it has a valid value (not empty string, not undefined, not null)
                    if (value !== undefined && value !== null && value !== '') {
                        cleanFilters[key] = value
                    }
                })
            }

            const res = (await audit_api.$_get_audit_logs(cleanFilters)) as any
            if (res.type !== "ERROR") {
                auditLogs.value = res.data
                return res.data
            } else {
                const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch audit logs"
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
        auditLogs,
        getAuditLogs
    }
}
import { ref } from "vue"
import { audit_api, type ExportAuditLogsPayload } from "@/api_factory/modules/audit"
import { useCustomToast } from "@/composables/core/useCustomToast"

export interface ExportResponse {
    message: string
    format: string
    file_path: string
}

export const useExportAuditLogs = () => {
    const loading = ref(false)
    const { showToast } = useCustomToast()

    const exportAuditLogs = async (payload: ExportAuditLogsPayload): Promise<ExportResponse | null> => {
        loading.value = true
        try {
            const res = (await audit_api.$_export_audit_logs(payload)) as any
            if (res.type !== "ERROR") {
                showToast({
                    title: "Success",
                    message: `Audit logs exported successfully as ${payload.format}`,
                    toastType: "success",
                    duration: 3000,
                })
                return res.data
            } else {
                const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to export audit logs"
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
        exportAuditLogs
    }
}
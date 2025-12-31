import { ref } from "vue"
import { audit_api } from "@/api_factory/modules/audit"
import { useCustomToast } from "@/composables/core/useCustomToast"

export interface CustodyReportResponse {
    message: string
    sampleID: string
    format: string
    file_path: string
    events_count: number
}

export const useCustodyReport = () => {
    const loading = ref(false)
    const { showToast } = useCustomToast()

    const generateCustodyReport = async (
        sampleID: string,
        format: 'PDF' | 'CSV' | 'JSON'
    ): Promise<CustodyReportResponse | null> => {
        loading.value = true
        try {
            const res = (await audit_api.$_get_custody_report(sampleID, format)) as any
            if (res.type !== "ERROR") {
                showToast({
                    title: "Success",
                    message: `Custody report generated successfully for ${sampleID}`,
                    toastType: "success",
                    duration: 3000,
                })
                return res.data
            } else {
                const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to generate custody report"
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
        generateCustodyReport
    }
}
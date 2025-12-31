import { ref } from "vue"
import { audit_api, type CustodyEvent, type RecordCustodyEventPayload } from "@/api_factory/modules/audit"
import { useCustomToast } from "@/composables/core/useCustomToast"

export interface CustodyEventsFilters {
    sampleID?: string
    userID?: string
    eventType?: string
    startDate?: string
    endDate?: string
    limit?: number
    offset?: number
}

export const useCustodyEvents = () => {
    const loading = ref(false)
    const custodyEvents = ref<CustodyEvent[]>([])
    const { showToast } = useCustomToast()

    const recordCustodyEvent = async (payload: RecordCustodyEventPayload): Promise<CustodyEvent | null> => {
        loading.value = true
        try {
            const res = (await audit_api.$_record_custody_event(payload)) as any
            if (res.type !== "ERROR") {
                showToast({
                    title: "Success",
                    message: "Custody event recorded successfully",
                    toastType: "success",
                    duration: 3000,
                })
                return res.data
            } else {
                const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to record custody event"
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

    const getCustodyEvents = async (filters?: CustodyEventsFilters): Promise<CustodyEvent[] | null> => {
        loading.value = true
        try {
            const res = (await audit_api.$_get_custody_events(filters)) as any
            if (res.type !== "ERROR") {
                custodyEvents.value = res.data
                return res.data
            } else {
                const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch custody events"
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
        custodyEvents,
        recordCustodyEvent,
        getCustodyEvents
    }
}
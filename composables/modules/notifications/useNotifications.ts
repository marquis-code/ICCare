import { ref } from "vue"
import { notification_api, type Notification, type UnreadCountResponse } from "@/api_factory/modules/notification"
import { useCustomToast } from "@/composables/core/useCustomToast"

export interface NotificationFilters {
    limit?: number
    offset?: number
    unread_only?: boolean
}

export const useNotifications = () => {
    const loading = ref(false)
    const notifications = ref<Notification[]>([])
    const unreadCount = ref(0)
    const { showToast } = useCustomToast()

    const getNotificationFeed = async (filters?: NotificationFilters): Promise<Notification[] | null> => {
        loading.value = true
        try {
            const res = (await notification_api.$_get_notification_feed(filters)) as any
            if (res.type !== "ERROR") {
                notifications.value = res.data
                return res.data
            } else {
                const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to fetch notifications"
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

    const markNotificationRead = async (notificationId: string): Promise<boolean> => {
        try {
            const res = (await notification_api.$_mark_notification_read(notificationId)) as any
            if (res.type !== "ERROR") {
                // Update local notifications array
                const notifIndex = notifications.value.findIndex(n => n.notification_id === notificationId)
                if (notifIndex !== -1) {
                    notifications.value[notifIndex].read = true
                }
                // Decrement unread count
                if (unreadCount.value > 0) {
                    unreadCount.value--
                }
                return true
            } else {
                const errorMsg = res?.data?.detail?.[0]?.msg || res?.data?.error || "Failed to mark notification as read"
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
        }
    }

    const getUnreadCount = async (): Promise<number | null> => {
        try {
            const res = (await notification_api.$_get_unread_count()) as any
            if (res.type !== "ERROR") {
                unreadCount.value = res.data.unread_count
                return res.data.unread_count
            } else {
                return null
            }
        } catch (error: any) {
            return null
        }
    }

    return {
        loading,
        notifications,
        unreadCount,
        getNotificationFeed,
        markNotificationRead,
        getUnreadCount
    }
}
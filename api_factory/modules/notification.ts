import { GATEWAY_ENDPOINT } from '../axios.config'

export interface Notification {
    notification_id: string
    notification_type: string
    title: string
    message: string
    timestamp: string
    read: boolean
    priority: 'normal' | 'high' | 'urgent'
    action_url: string | null
}

export interface UnreadCountResponse {
    unread_count: number
}

export interface MarkReadResponse {
    status: string
    notification_id: string
    read_at: string
}

export const notification_api = {
    // Get user notification feed
    $_get_notification_feed: (params?: {
        limit?: number
        offset?: number
        unread_only?: boolean
    }) => {
        return GATEWAY_ENDPOINT.get('/notification/feed', { params })
    },

    // Mark notification as read
    $_mark_notification_read: (notificationId: string) => {
        return GATEWAY_ENDPOINT.post(`/notification/feed/${notificationId}/mark-read`)
    },

    // Get unread notification count
    $_get_unread_count: () => {
        return GATEWAY_ENDPOINT.get('/notification/feed/unread/count')
    }
}
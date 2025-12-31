import { GATEWAY_ENDPOINT } from '../axios.config'

export interface AuditLogEntry {
    logID: string
    userID: string
    actionType: string
    affectedEntity: string
    details: Record<string, any>
    timestamp: string
}

export interface AuditLogResponse {
    data: AuditLogEntry[]
    total: number
    limit: number
    offset: number
}

export interface CreateAuditLogPayload {
    userID: string
    actionType: string
    affectedEntity: string
    details: Record<string, any>
}

export interface SearchAuditLogsPayload {
    startDate?: string
    endDate?: string
    userID?: string
    actionType?: string
    keyword?: string
}

export interface ExportAuditLogsPayload {
    format: 'CSV' | 'PDF' | 'JSON'
    filters: {
        startDate?: string
        endDate?: string
        userID?: string
        actionType?: string
        keyword?: string
    }
}

export interface CustodyEvent {
    eventID: string
    sampleID: string
    userID: string
    eventType: string
    notes?: string
    timestamp: string
}

export interface RecordCustodyEventPayload {
    sampleID: string
    userID: string
    eventType: 'RECEIVED' | 'TRANSFERRED' | 'ANALYZED' | 'STORED' | 'DISPOSED'
    notes?: string
}

export interface RecordTransferPayload {
    sampleID: string
    fromPersonnelID: string
    toPersonnelID: string
    transfer_documentation: string
    digital_signature: string
}

export const audit_api = {
    // Create audit log entry
    $_create_audit_log: (payload: CreateAuditLogPayload) => {
        return GATEWAY_ENDPOINT.post('/audit/log', payload)
    },

    // Retrieve audit logs with filtering and pagination
    $_get_audit_logs: (params?: {
        startDate?: string
        endDate?: string
        userID?: string
        actionType?: string
        keyword?: string
        limit?: number
        offset?: number
    }) => {
        return GATEWAY_ENDPOINT.get('/audit/logs', { params })
    },

    // Search audit logs (POST-based)
    $_search_audit_logs: (payload: SearchAuditLogsPayload) => {
        return GATEWAY_ENDPOINT.post('/audit/search', payload)
    },

    // Export audit logs
    $_export_audit_logs: (payload: ExportAuditLogsPayload) => {
        return GATEWAY_ENDPOINT.post('/audit/export', payload)
    },

    // Record custody event
    $_record_custody_event: (payload: RecordCustodyEventPayload) => {
        return GATEWAY_ENDPOINT.post('/audit/coc/events', payload)
    },

    // List custody events
    $_get_custody_events: (params?: {
        sampleID?: string
        userID?: string
        eventType?: string
        startDate?: string
        endDate?: string
        limit?: number
        offset?: number
    }) => {
        return GATEWAY_ENDPOINT.get('/audit/coc/events', { params })
    },

    // Record sample transfer
    $_record_transfer: (payload: RecordTransferPayload) => {
        return GATEWAY_ENDPOINT.post('/audit/coc/transfer', payload)
    },

    // Generate custody report
    $_get_custody_report: (sampleID: string, format: 'PDF' | 'CSV' | 'JSON') => {
        return GATEWAY_ENDPOINT.get(`/audit/coc/report/${sampleID}`, {
            params: { format }
        })
    }
}
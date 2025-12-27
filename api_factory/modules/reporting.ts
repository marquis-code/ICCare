// import { GATEWAY_ENDPOINT } from '../axios.config'

// export const reporting_api = {
//   // Get dashboard data
//   $_get_dashboard_data: (site_id?: string) => {
//     const params = site_id ? { site_id } : {}
//     return GATEWAY_ENDPOINT.get('/reporting/reports/dashboard-data', { params })
//   },

//   // Get utilization level for freezer
//   $_get_utilization_level: (freezer_id: string) => {
//     return GATEWAY_ENDPOINT.get(`/reporting/reports/utilization/${freezer_id}`)
//   },

//   // Export data
//   $_export_data: (payload: {
//     format: string
//     start_date: string
//     end_date: string
//     filters?: {
//       sample_type?: string
//       site?: string
//     }
//   }) => {
//     return GATEWAY_ENDPOINT.post('/reporting/reports/export', payload)
//   },

//   // Schedule report
//   $_schedule_report: (payload: {
//     report_name: string
//     format: string
//     frequency: string
//     recipients: string[]
//     filters?: {
//       sample_type?: string
//     }
//   }) => {
//     return GATEWAY_ENDPOINT.post('/reporting/reports/schedule', payload)
//   },

//   // Export audit logs
//   $_export_audit_logs: (payload: {
//     format: string
//     start_date: string
//     end_date: string
//     filters?: {
//       action?: string
//       status?: string
//     }
//   }) => {
//     return GATEWAY_ENDPOINT.post('/audit/export', payload)
//   }
// }


import { GATEWAY_ENDPOINT } from '../axios.config'

export const reporting_api = {
  // Get dashboard data (global or site-specific)
  $_get_dashboard_data: (site_id?: string) => {
    const params = site_id ? { site_id } : {}
    return GATEWAY_ENDPOINT.get('/reporting/reports/dashboard-data', { params })
  },

  // Get utilization level for freezer
  $_get_utilization_level: (freezer_id: string) => {
    return GATEWAY_ENDPOINT.get(`/reporting/reports/utilization/${freezer_id}`)
  },

  // Export data - Updated to match API spec
  $_export_data: (payload: {
    items_to_export: string[]  // Changed from filters to items array
    format: 'excel' | 'csv' | 'json'  // Specific format types
  }) => {
    return GATEWAY_ENDPOINT.post('/reporting/reports/export', payload)
  },

  // Schedule report - Updated to match API spec
  $_schedule_report: (payload: {
    report_name: string
    scheduled_period: 'daily' | 'weekly' | 'monthly'  // Changed from frequency
    recipient_emails?: string[]  // Changed from recipients
    recipient_roles?: string[]  // Added roles support
  }) => {
    return GATEWAY_ENDPOINT.post('/reporting/reports/schedule', payload)
  },

  // Check and notify alerts - Updated to match API spec
  $_check_and_notify_alerts: (payload: {
    threshold_data: {
      item: string
      units: string
      number: number  // Changed from threshold
      admin_notes?: string
    }
    current_value: number
  }) => {
    return GATEWAY_ENDPOINT.post('/reporting/reports/alerts/check-and-notify', payload)
  },

  // Export audit logs (keeping as is, seems separate)
  $_export_audit_logs: (payload: {
    format: string
    start_date: string
    end_date: string
    filters?: {
      action?: string
      status?: string
    }
  }) => {
    return GATEWAY_ENDPOINT.post('/audit/export', payload)
  }
}
import { GATEWAY_ENDPOINT } from '../axios.config'

export const reporting_api = {
  // Get dashboard data
  $_get_dashboard_data: (site_id?: string) => {
    const params = site_id ? { site_id } : {}
    return GATEWAY_ENDPOINT.get('/reporting/dashboard-data', { params })
  },

  // Get utilization level for freezer
  $_get_utilization_level: (freezer_id: string) => {
    return GATEWAY_ENDPOINT.get(`/reporting/utilization/${freezer_id}`)
  },

  // Export data
  $_export_data: (payload: {
    format: string
    start_date: string
    end_date: string
    filters?: {
      sample_type?: string
      site?: string
    }
  }) => {
    return GATEWAY_ENDPOINT.post('/reporting/export', payload)
  },

  // Schedule report
  $_schedule_report: (payload: {
    report_name: string
    format: string
    frequency: string
    recipients: string[]
    filters?: {
      sample_type?: string
    }
  }) => {
    return GATEWAY_ENDPOINT.post('/reporting/schedule', payload)
  },

  // Export audit logs
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
import { GATEWAY_ENDPOINT } from '../axios.config'

export const reporting_api = {
  // Get dashboard data
  $_get_dashboard_data: (site_id?: string) => {
    const params = site_id ? { site_id } : {}
    return GATEWAY_ENDPOINT.get('/reports/dashboard-data', { params })
  },

  // Get utilization level for freezer
  $_get_utilization_level: (freezer_id: string) => {
    return GATEWAY_ENDPOINT.get(`/reports/utilization/${freezer_id}`)
  },

  // Export data
  $_export_data: (payload: {
    items_to_export: string[]
    format: string
  }) => {
    return GATEWAY_ENDPOINT.post('/reports/export', payload)
  },

  // Schedule report
  $_schedule_report: (payload: {
    report_name: string
    scheduled_period: string
    recipient_emails: string[]
    recipient_roles: string[]
  }) => {
    return GATEWAY_ENDPOINT.post('/reports/schedule', payload)
  },

  // Check and notify alerts
  $_check_and_notify_alerts: (
    current_value: number,
    payload: {
      item: string
      units: string
      threshold: number
      admin_notes: string
    }
  ) => {
    return GATEWAY_ENDPOINT.post('/reports/alerts/check-and-notify', payload, {
      params: { current_value }
    })
  }
}
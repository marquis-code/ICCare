// import { GATEWAY_ENDPOINT } from '../axios.config'

// export const disposal_api = {
//   // Use or dispose sample
//   $_dispose_sample: (payload: {
//     sample_uuids: string
//     request_by: string
//     approved_by: string
//     reason_for_disposal: string
//     mark_as_disposed: boolean
//   }) => {
//     return GATEWAY_ENDPOINT.post('/biospecimen/samples/dispose', payload)
//   }
// }

import { GATEWAY_ENDPOINT } from '../axios.config'

export const disposal_api = {
  // Direct disposal (original endpoint)
  $_dispose_sample: (payload: {
    sample_uuids: string
    request_by: string
    approved_by: string
    reason_for_disposal: string
    mark_as_disposed: boolean
  }) => {
    return GATEWAY_ENDPOINT.post('/biospecimen/samples/dispose', payload)
  },

  // Workflow endpoints

  // Submit a new disposal request for approval
  $_submit_disposal_request: (payload: {
    sample_uuid: string
    reason_for_disposal: string
    disposal_method: string
    mark_as_disposed: boolean
    notes?: string
  }) => {
    return GATEWAY_ENDPOINT.post('/biospecimen/samples/dispose/request', payload)
  },

  // Approve and execute disposal request
  $_approve_disposal_request: (request_id: string, notes?: string) => {
    return GATEWAY_ENDPOINT.post(
      `/biospecimen/samples/dispose/approve/${request_id}`,
      { notes }
    )
  },

  // Reject disposal request
  $_reject_disposal_request: (request_id: string, rejection_reason: string) => {
    return GATEWAY_ENDPOINT.post(
      `/biospecimen/samples/dispose/reject/${request_id}`,
      { rejection_reason }
    )
  },

  // List pending disposal requests
  $_get_pending_disposal_requests: (params?: {
    requested_by?: string
    sample_uuid?: string
    limit?: number
    offset?: number
  }) => {
    return GATEWAY_ENDPOINT.get('/biospecimen/samples/dispose/pending', { params })
  },

  // List approved disposal requests
  $_get_approved_disposal_requests: (params?: {
    requested_by?: string
    approved_by?: string
    sample_uuid?: string
    date_from?: string
    date_to?: string
    limit?: number
    offset?: number
  }) => {
    return GATEWAY_ENDPOINT.get('/biospecimen/samples/dispose/approved', { params })
  },

  // List rejected disposal requests
  $_get_rejected_disposal_requests: (params?: {
    requested_by?: string
    approved_by?: string
    sample_uuid?: string
    date_from?: string
    date_to?: string
    limit?: number
    offset?: number
  }) => {
    return GATEWAY_ENDPOINT.get('/biospecimen/samples/dispose/rejected', { params })
  },

  // List completed disposal requests (approved + rejected)
  $_get_completed_disposal_requests: (params?: {
    requested_by?: string
    approved_by?: string
    sample_uuid?: string
    date_from?: string
    date_to?: string
    limit?: number
    offset?: number
  }) => {
    return GATEWAY_ENDPOINT.get('/biospecimen/samples/dispose/completed', { params })
  },

  // List all disposal requests with filters
  $_get_all_disposal_requests: (params?: {
    status?: 'Pending' | 'Completed' | 'Rejected'
    requested_by?: string
    approved_by?: string
    sample_uuid?: string
    date_from?: string
    date_to?: string
    limit?: number
    offset?: number
  }) => {
    return GATEWAY_ENDPOINT.get('/biospecimen/samples/dispose/requests', { params })
  },

  // Get complete disposal history (direct + workflow)
  $_get_disposal_history: (params?: {
    sample_uuid?: string
    sample_serial_no?: string
    disposed_by?: string
    date_from?: string
    date_to?: string
    execution_type?: 'direct' | 'workflow' | 'all'
    limit?: number
    offset?: number
  }) => {
    return GATEWAY_ENDPOINT.get('/biospecimen/samples/dispose/history', { params })
  }
}
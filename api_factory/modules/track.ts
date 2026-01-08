

import { GATEWAY_ENDPOINT } from '../axios.config'

export const track_api = {
  // Direct track biosample movement (original endpoint)
  $_track_sample: (payload: {
    sample_uuid: string
    source_attributes: {
      site: string
      freezer: string
      rack: string
      box: string
      position: number
    }
    destination_attributes: {
      site: string
      freezer: string
      rack: string
      box: string
      position: number
    }
    movement_type: string
    reservation_time: string
    start_date_time: string
    end_date_time: string
    request_by: string
    approved_by: string[]
  }) => {
    return GATEWAY_ENDPOINT.post('/biospecimen/samples/track', payload)
  },

  // Workflow endpoints
  
  // Submit a new tracking request for approval
  $_submit_tracking_request: (payload: {
    sample_uuid: string
    source_attributes: {
      site: string
      freezer: string
      rack: string
      box: string
      position: number
    }
    destination_attributes: {
      site: string
      freezer: string
      rack: string
      box: string
      position: number
    }
    request_type: string
    notes?: string
  }) => {
    return GATEWAY_ENDPOINT.post('/biospecimen/samples/track/request', payload)
  },

  // Approve and execute tracking request
  $_approve_tracking_request: (request_id: string, notes?: string) => {
    return GATEWAY_ENDPOINT.post(
      `/biospecimen/samples/track/approve/${request_id}`,
      { notes }
    )
  },

  // Reject tracking request
  $_reject_tracking_request: (request_id: string, rejection_reason: string) => {
    return GATEWAY_ENDPOINT.post(
      `/biospecimen/samples/track/reject/${request_id}`,
      { rejection_reason }
    )
  },

  // List pending tracking requests
  $_get_pending_tracking_requests: (params?: {
    requested_by?: string
    sample_uuid?: string
    limit?: number
    offset?: number
  }) => {
    return GATEWAY_ENDPOINT.get('/biospecimen/samples/track/pending', { params })
  },

  // List approved tracking requests
  $_get_approved_tracking_requests: (params?: {
    requested_by?: string
    approved_by?: string
    sample_uuid?: string
    date_from?: string
    date_to?: string
    limit?: number
    offset?: number
  }) => {
    return GATEWAY_ENDPOINT.get('/biospecimen/samples/track/approved', { params })
  },

  // List rejected tracking requests
  $_get_rejected_tracking_requests: (params?: {
    requested_by?: string
    approved_by?: string
    sample_uuid?: string
    date_from?: string
    date_to?: string
    limit?: number
    offset?: number
  }) => {
    return GATEWAY_ENDPOINT.get('/biospecimen/samples/track/rejected', { params })
  },

  // List completed tracking requests (approved + rejected)
  $_get_completed_tracking_requests: (params?: {
    requested_by?: string
    approved_by?: string
    sample_uuid?: string
    date_from?: string
    date_to?: string
    limit?: number
    offset?: number
  }) => {
    return GATEWAY_ENDPOINT.get('/biospecimen/samples/track/completed', { params })
  },

  // List all tracking requests with filters
  $_get_all_tracking_requests: (params?: {
    status?: 'Pending' | 'Completed' | 'Rejected'
    requested_by?: string
    approved_by?: string
    sample_uuid?: string
    date_from?: string
    date_to?: string
    limit?: number
    offset?: number
  }) => {
    return GATEWAY_ENDPOINT.get('/biospecimen/samples/track/requests', { params })
  },

  // Get complete tracking history (direct + workflow)
  $_get_tracking_history: (params?: {
    sample_uuid?: string
    sample_serial_no?: string
    tracked_by?: string
    date_from?: string
    date_to?: string
    execution_type?: 'direct' | 'workflow' | 'all'
    limit?: number
    offset?: number
  }) => {
    return GATEWAY_ENDPOINT.get('/biospecimen/samples/track/history', { params })
  }
}
import { GATEWAY_ENDPOINT } from '../axios.config'

export const biosample_api = {
  // Register new sample
  $_register_sample: (payload: {
    site_id: string
    sample_category_id: string
    sample_serial_no: string
    sample_label: string
    free_fields?: Record<string, any>
    storage_location: {
      site: string
      freezer: string
      rack: string
      box: string
      position: number
    }
    collection_date: string
    collection_time: string
    researcher_info: string
    field_collector_info: string
  }) => {
    return GATEWAY_ENDPOINT.post('/samples/', payload)
  },

  // Update sample attribute
  $_update_sample: (uuid: string, payload: {
    sample_label?: string
    free_fields?: Record<string, any>
  }) => {
    return GATEWAY_ENDPOINT.put(`/samples/${uuid}`, payload)
  },

  // Get sample status
  $_get_sample_status: (uuid: string) => {
    return GATEWAY_ENDPOINT.get(`/samples/${uuid}/status`)
  },

  // Track biosample movement
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
    return GATEWAY_ENDPOINT.post('/samples/track', payload)
  },

  // Use or dispose sample
  $_dispose_sample: (payload: {
    sample_uuids: string
    request_by: string
    approved_by: string
    reason_for_disposal: string
    mark_as_disposed: boolean
  }) => {
    return GATEWAY_ENDPOINT.post('/samples/dispose', payload)
  }
}
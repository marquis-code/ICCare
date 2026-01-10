import { GATEWAY_ENDPOINT } from '../axios.config'

export const biosample_api = {
  // Register new sample
  $_register_sample: (payload: {
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
    return GATEWAY_ENDPOINT.post('/biospecimen/samples/', payload)
  },

  // Get all samples
  $_get_all_samples: () => {
    return GATEWAY_ENDPOINT.get('/biospecimen/samples/')
  },

  $_get_samples: () => {
    return GATEWAY_ENDPOINT.get('/biospecimen/samples/')
  },

  // Get sample by ID
  $_get_sample_by_id: (uuid: string) => {
    return GATEWAY_ENDPOINT.get(`/biospecimen/samples/${uuid}`)
  },

  // Update sample attribute
  $_update_sample: (uuid: string, payload: {
    sample_label?: string
    free_fields?: Record<string, any>
  }) => {
    return GATEWAY_ENDPOINT.put(`/biospecimen/samples/${uuid}`, payload)
  },

  // Get sample status
  $_get_sample_status: (uuid: string) => {
    return GATEWAY_ENDPOINT.get(`/biospecimen/samples/${uuid}/status`)
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
    return GATEWAY_ENDPOINT.post('/biospecimen/samples/track', payload)
  },

  // Use or dispose sample
  $_dispose_sample: (payload: {
    sample_uuid: string
    notes: string
    disposal_method: string
    reason_for_disposal: string
    mark_as_disposed: boolean
  }) => {
    return GATEWAY_ENDPOINT.post('/biospecimen/samples/dispose/request', payload)
  }
}
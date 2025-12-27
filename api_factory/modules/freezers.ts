import { GATEWAY_ENDPOINT } from '../axios.config'

export const freezers_api = {
  // Create a new freezer
  $_create_freezer: (payload: {
    freezer_id: string
    freezer_name: string
    site_id: string
    temperature: string
    manufacturer: string
    model: string
    serial_number: string
  }) => {
    return GATEWAY_ENDPOINT.post('/biospecimen/attributes/freezers/', payload)
  },

  // Get all freezers (optionally filtered by site)
  $_get_freezers: (site_id?: string, active_only: boolean = true) => {
    const params: any = { active_only }
    if (site_id) params.site_id = site_id
    return GATEWAY_ENDPOINT.get('/biospecimen/attributes/freezers/', { params })
  },

  // Get a specific freezer by ID
  $_get_freezer: (freezer_id: string) => {
    return GATEWAY_ENDPOINT.get(`/biospecimen/attributes/freezers/${freezer_id}`)
  }
}
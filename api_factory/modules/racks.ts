import { GATEWAY_ENDPOINT } from '../axios.config'

export const racks_api = {
  // Create a new rack linked to a freezer and site
  $_create_rack: (payload: {
    rack_id: string
    rack_name: string
    freezer_id: string
    site_id: string
    description: string
  }) => {
    return GATEWAY_ENDPOINT.post('/attributes/racks/', payload)
  },

  // Get all racks (optionally filtered by site and/or freezer)
  $_get_racks: (site_id?: string, freezer_id?: string, active_only: boolean = true) => {
    const params: any = { active_only }
    if (site_id) params.site_id = site_id
    if (freezer_id) params.freezer_id = freezer_id
    return GATEWAY_ENDPOINT.get('/attributes/racks/', { params })
  },

  // Get a specific rack by ID
  $_get_rack: (rack_id: string) => {
    return GATEWAY_ENDPOINT.get(`/attributes/racks/${rack_id}`)
  }
}
import { GATEWAY_ENDPOINT } from '../axios.config'

export const boxes_api = {
  // Create a new box linked to rack, freezer, and site
  $_create_box: (payload: {
    box_id: string
    box_name: string
    rack_id: string
    freezer_id: string
    site_id: string
    position_template_id: string
    box_type: string
    manufacturer: string
    model: string
  }) => {
    return GATEWAY_ENDPOINT.post('/biospecimen/attributes/boxes/', payload)
  },

  // Get all boxes (optionally filtered by site, freezer, and/or rack)
  $_get_boxes: (site_id?: string, freezer_id?: string, rack_id?: string, active_only: boolean = true) => {
    const params: any = { active_only }
    if (site_id) params.site_id = site_id
    if (freezer_id) params.freezer_id = freezer_id
    if (rack_id) params.rack_id = rack_id
    return GATEWAY_ENDPOINT.get('/biospecimen/attributes/boxes/', { params })
  },

  // Get a specific box by ID
  $_get_box: (box_id: string) => {
    return GATEWAY_ENDPOINT.get(`/biospecimen/attributes/boxes/${box_id}`)
  }
}
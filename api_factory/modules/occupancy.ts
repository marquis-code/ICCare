import { GATEWAY_ENDPOINT } from '../axios.config'

export const occupancy_api = {
  // Get box occupancy information with position grid and statistics
  $_get_box_occupancy: (
    box_id: string,
    site_id?: string,
    freezer_id?: string,
    rack_id?: string
  ) => {
    const params: any = {}
    if (site_id) params.site_id = site_id
    if (freezer_id) params.freezer_id = freezer_id
    if (rack_id) params.rack_id = rack_id
    return GATEWAY_ENDPOINT.get(`/biospecimen/attributes/boxes/${box_id}/occupancy`, { params })
  }
}
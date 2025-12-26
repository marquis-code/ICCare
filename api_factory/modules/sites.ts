import { GATEWAY_ENDPOINT } from '../axios.config'

export const sites_api = {
  // Create a new site
  $_create_site: (payload: {
    site_id: string
    site_name: string
    location: string
    description: string
  }) => {
    return GATEWAY_ENDPOINT.post('/attributes/sites/', payload)
  },

  // Get all sites
  $_get_sites: (active_only: boolean = true) => {
    return GATEWAY_ENDPOINT.get('/attributes/sites/', {
      params: { active_only }
    })
  },

  // Get a specific site by ID
  $_get_site: (site_id: string) => {
    return GATEWAY_ENDPOINT.get(`/attributes/sites/${site_id}`)
  }
}
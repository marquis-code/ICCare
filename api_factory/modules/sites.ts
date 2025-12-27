import { GATEWAY_ENDPOINT } from '../axios.config'

export const sites_api = {
  // Create a new site
  $_create_site: (payload: {
    site_id: string
    site_name: string
    location: string
    contact_person: string
    contact_email: string
    contact_phone: string
  }) => {
    return GATEWAY_ENDPOINT.post('/biospecimen/attributes/sites/', payload)
  },

  // Get all sites
  $_get_sites: (active_only: boolean = true) => {
    return GATEWAY_ENDPOINT.get('/biospecimen/attributes/sites/', {
      params: { active_only }
    })
  },

  // Get a specific site by ID
  $_get_site: (site_id: string) => {
    return GATEWAY_ENDPOINT.get(`/biospecimen/attributes/sites/${site_id}`)
  }
}
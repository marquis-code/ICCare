import { GATEWAY_ENDPOINT } from '../axios.config'

export const templates_api = {
  // Create a new position template for box layouts
  $_create_template: (payload: {
    template_id: string
    template_name: string
    rows: number
    columns: number
    total_positions: number
    additional_props: Record<string, any>
    description: string
  }) => {
    return GATEWAY_ENDPOINT.post('/biospecimen/attributes/templates/', payload)
  },

  // Get all position templates
  $_get_templates: (active_only: boolean = true) => {
    return GATEWAY_ENDPOINT.get('/biospecimen/attributes/templates/', {
      params: { active_only }
    })
  },

  // Get a specific position template by ID
  $_get_template: (template_id: string) => {
    return GATEWAY_ENDPOINT.get(`/biospecimen/attributes/templates/${template_id}`)
  }
}
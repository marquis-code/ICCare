import { GATEWAY_ENDPOINT } from '../axios.config'

export const custom_fields_api = {
  // Create a new custom attribute (free field) definition
  $_create_custom_field: (payload: {
    attribute_id: string
    attribute_name: string
    attribute_type: string
    allowed_values: string[]
    is_required: boolean
    description: string
  }) => {
    return GATEWAY_ENDPOINT.post('/attributes/custom-fields/', payload)
  },

  // Get all custom attribute definitions
  $_get_custom_fields: (active_only: boolean = true) => {
    return GATEWAY_ENDPOINT.get('/attributes/custom-fields/', {
      params: { active_only }
    })
  },

  // Get a specific custom attribute by ID
  $_get_custom_field: (attribute_id: string) => {
    return GATEWAY_ENDPOINT.get(`/attributes/custom-fields/${attribute_id}`)
  }
}
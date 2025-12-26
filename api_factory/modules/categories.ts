import { GATEWAY_ENDPOINT } from '../axios.config'

export const categories_api = {
  // Create a new sample category
  $_create_category: (payload: {
    cat_id: string
    cat_name: string
    abbreviation: string
    description: string
  }) => {
    return GATEWAY_ENDPOINT.post('/attributes/categories/', payload)
  },

  // Get all sample categories
  $_get_categories: (active_only: boolean = true) => {
    return GATEWAY_ENDPOINT.get('/attributes/categories/', {
      params: { active_only }
    })
  },

  // Get a specific category by ID
  $_get_category: (cat_id: string) => {
    return GATEWAY_ENDPOINT.get(`/attributes/categories/${cat_id}`)
  }
}
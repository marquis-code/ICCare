import { GATEWAY_ENDPOINT } from '../axios.config'

export const subject_api = {
  // Create new subject
  $_create_subject: (payload: {
    demographic_data: {
      age: number
      gender: string
      nationality: string
      ethnicity: string
    }
    epidemiological_data: {
      history: string
      risk_factors: string
      geolocation: {
        country: string
        state_prov: string
        lga: string
        city: string
        address: string
      }
    }
    facility_level: string
    clinical_data: {
      diagnosis: string
      treatment_status: string
      outcome: string
      contact_class: Record<string, any>
    }
  }) => {
    return GATEWAY_ENDPOINT.post('/subjects/', payload)
  },

  // Get subject data by token
  $_get_subject: (subject_token: string) => {
    return GATEWAY_ENDPOINT.get(`/subjects/${subject_token}`)
  }
}
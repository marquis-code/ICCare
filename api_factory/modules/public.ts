import { GATEWAY_ENDPOINT } from '../axios.config'

export const public_api = {
  getAvailabilityByDate: (filters?: { date?: string; time?: string; consultationType?: string }) => {
    const url = "/public/availability/by-date"
    return GATEWAY_ENDPOINT.get(url, { params: filters })
  },

  getSettings: () => {
    const url = "/public/settings"
    return GATEWAY_ENDPOINT.get(url)
  },
}
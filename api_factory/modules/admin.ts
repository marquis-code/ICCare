import { GATEWAY_ENDPOINT } from "../axios.config"

export const admin_api = {
  getDashboard: () => {
    const url = "/admin/dashboard"
    return GATEWAY_ENDPOINT.get(url)
  },

  getUsers: (limit?: number, offset?: number) => {
    const url = "/admin/users"
    return GATEWAY_ENDPOINT.get(url, { params: { limit, offset } })
  },

  getTransactions: (limit?: number, offset?: number) => {
    const url = "/admin/transactions"
    return GATEWAY_ENDPOINT.get(url, { params: { limit, offset } })
  },

  setAvailability: (payload: {
    dayOfWeek: number
    timeSlots: { startTime: string; endTime: string }[]
    consultationType: "physical" | "virtual"
    isAvailable: boolean
  }) => {
    const url = "/admin/availability"
    return GATEWAY_ENDPOINT.post(url, payload)
  },

  updateSettings: (payload: {
    physicalConsultationFee?: number
    virtualConsultationFee?: number
    clinicLocation?: string
    contactInfo?: string
  }) => {
    const url = "/admin/settings"
    return GATEWAY_ENDPOINT.post(url, payload)
  },

  getSettings: () => {
    const url = "/admin/settings"
    return GATEWAY_ENDPOINT.get(url)
  },

  exportTransactions: () => {
    const url = "/admin/transactions/export"
    return GATEWAY_ENDPOINT.get(url)
  },

  exportAppointments: () => {
    const url = "/admin/appointments/export"
    return GATEWAY_ENDPOINT.get(url)
  },
}

import { GATEWAY_ENDPOINT } from '../axios.config'

export const appointments_api = {
  getAppointments: (filters?: { status?: string; type?: string }) => {
    const url = "/admin/appointments"
    return GATEWAY_ENDPOINT.get(url, { params: filters })
  },

  getAppointmentById: (id: string) => {
    const url = `/appointments/${id}`
    return GATEWAY_ENDPOINT.get(url)
  },

  createAppointment: (payload: {
    consultationType: "physical" | "virtual"
    consultationMode?: "voice" | "video"
    date: string
    timeSlot: string
    location?: string
    price: number
  }) => {
    const url = "/appointments"
    return GATEWAY_ENDPOINT.post(url, payload)
  },

  /** ✅ Create Availability API */
  createAvailability: (payload: {
    dayOfWeek: number
    timeSlots: Array<{ startTime: string; endTime: string }>
    consultationType: "physical" | "virtual"
    isAvailable?: boolean
  }) => {
    const url = "/admin/availability"
    return GATEWAY_ENDPOINT.post(url, payload)
  },

  cancelAppointment: (id: string) => {
    const url = `/appointments/${id}/cancel`
    return GATEWAY_ENDPOINT.put(url, {})
  },

  rescheduleAppointment: (id: string, payload: { newDate: string | Record<string, any>; newTimeSlot: string | Record<string, any> }) => {
    const url = `/appointments/${id}/reschedule`
    return GATEWAY_ENDPOINT.put(url, payload)
  },

getAvailability: (consultationType?: "physical" | "virtual") => {
  const url = "/admin/availability"
  return GATEWAY_ENDPOINT.get(url, {
    params: consultationType ? { consultationType } : {}
  })
},

  getTimeSlots: (date: string, consultationType: "physical" | "virtual") => {
    const url = "/appointments/time-slots"
    return GATEWAY_ENDPOINT.get(url, { params: { date, consultationType } })
  },

  getAvailabilityByDate: (
  dateString?: string,
  timeString?: string,
  consultationType?: "physical" | "virtual"
) => {
  const url = "/admin/availability/by-date"
  return GATEWAY_ENDPOINT.get(url, {
    params: {
      ...(dateString && { date: dateString }),
      ...(timeString && { time: timeString }),
      ...(consultationType && { consultationType }),
    },
  })
},

}

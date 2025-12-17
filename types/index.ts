export interface User {
  _id: string
  name: string
  email: string
  phone: string
  role: 'user' | 'admin'
  authProvider: 'email' | 'google'
  emailVerified: boolean
  profilePicture?: string
  bio?: string
  createdAt: string
}

export interface Appointment {
  _id: string
  userId: string
  consultationType: 'physical' | 'virtual'
  consultationMode: 'voice' | 'video'
  date: string
  timeSlot: string
  location?: string
  googleMeetLink?: string
  price: number
  paymentStatus: 'pending' | 'successful' | 'failed'
  status: 'booked' | 'completed' | 'canceled'
  transactionId?: string
  cancellationReason?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface Transaction {
  _id: string
  userId: string
  appointmentId: string
  amount: number
  paymentMethod: 'Paystack' | 'Mono'
  transactionRef: string
  paymentStatus: 'pending' | 'successful' | 'failed'
  createdAt: string
}

export interface Availability {
  _id: string
  dayOfWeek: number
  timeSlots: Array<{ startTime: string; endTime: string }>
  consultationType: 'physical' | 'virtual'
  isAvailable: boolean
}

export interface Settings {
  _id: string
  physicalConsultationFee: number
  virtualConsultationFee: number
  clinicLocation: string
  clinicLatitude: number
  clinicLongitude: number
  contactEmail: string
  contactPhone: string
  businessHours?: any
  bankDetails?: any
}
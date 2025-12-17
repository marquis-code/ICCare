import { GATEWAY_ENDPOINT } from '../axios.config'

export const payments_api = {
  initiatePayment: (payload: {
    appointmentId: string
    amount: number
    paymentMethod: "Paystack" | "Mono"
    email: string
    phone: string
    address: string
    customerName: string
    bvn?: string
    redirectUrl?: string
    description?: string
  }) => {
    const url = "/payments/initiate"
    return GATEWAY_ENDPOINT.post(url, payload)
  },

  verifyPayment: (payload: {
    transactionRef: string
    paymentMethod: "Paystack" | "Mono"
  }) => {
    const url = "/payments/verify"
    return GATEWAY_ENDPOINT.post(url, payload)
  },

  getPaymentHistory: (limit?: number, offset?: number) => {
    const url = "/payments/history"
    return GATEWAY_ENDPOINT.get(url, { params: { limit, offset } })
  },

  downloadReceipt: (transactionId: string) => {
    const url = `/payments/${transactionId}/receipt`
    return GATEWAY_ENDPOINT.get(url)
  },
}

import { GATEWAY_ENDPOINT } from '../axios.config'

export const auth_api = {
  register: (payload: {
    name: string
    email: string
    phone: string
    password: string
  }) => {
    const url = "/auth/register"
    return GATEWAY_ENDPOINT.post(url, payload)
  },

  login: (payload: { email: string; password: string }) => {
    const url = "/auth/login"
    return GATEWAY_ENDPOINT.post(url, payload)
  },

  forgotPassword: (payload: { email: string }) => {
    const url = "/auth/forgot-password"
    return GATEWAY_ENDPOINT.post(url, payload)
  },

  resetPassword: (payload: { token: string; newPassword: string }) => {
    const url = "/auth/reset-password"
    return GATEWAY_ENDPOINT.post(url, payload)
  },

  getProfile: () => {
    const url = "/auth/profile"
    return GATEWAY_ENDPOINT.get(url)
  },

  updateProfile: (payload: any) => {
    const url = "/auth/profile"
    return GATEWAY_ENDPOINT.put(url, payload)
  },

  logout: () => {
    const url = "/auth/logout"
    return GATEWAY_ENDPOINT.post(url, {})
  },
}

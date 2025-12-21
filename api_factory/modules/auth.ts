import { GATEWAY_ENDPOINT } from '../axios.config'

export const auth_api = {
  // Create new user
  $_signup: (payload: {
    first_name: string
    last_name: string
    email: string
    password: string
    password_confirm: string
  }) => {
    return GATEWAY_ENDPOINT.post('/signup', payload)
  },

  // Sign in user
  $_signin: (payload: {
    email: string
    password: string
  }) => {
    return GATEWAY_ENDPOINT.post('/signin', payload)
  },

  // Handle 2FA OTP authentication
  $_signin_otp: (payload: {
    email: string
    otp: string
  }) => {
    return GATEWAY_ENDPOINT.post('/signin-otp', payload)
  },

  // Initiate forgot password flow
  $_forgot_password: (payload: {
    email: string
    new_password: string
  }) => {
    return GATEWAY_ENDPOINT.post('/forgot-password', payload)
  },

  // Refresh access token
  $_refresh_token: (payload: {
    refresh_token: string
  }) => {
    return GATEWAY_ENDPOINT.post('/refresh', payload)
  },

  // Get current authenticated user
  $_get_current_user: () => {
    return GATEWAY_ENDPOINT.get('/me')
  },

  // Create new role
  $_create_role: (payload: {
    role_type: string
    role_function: string
    role_function_rights: Array<{
      function_name: string
      rights: string[]
    }>
    expiration_date: string
    status: string
  }) => {
    return GATEWAY_ENDPOINT.post('/user/roles', payload)
  },

  // Assign role to user
  $_assign_role: (payload: {
    user_id: string
    role_type: string
  }) => {
    return GATEWAY_ENDPOINT.post('/user/roles/assign', payload)
  },

  // Get user lock status
  $_get_lock_status: (user_id: string) => {
    return GATEWAY_ENDPOINT.get(`/user/lock-status/${user_id}`)
  },

  // Lock or unlock user
  $_update_lock_status: (payload: {
    user_id: string
    lu_status: boolean
  }) => {
    return GATEWAY_ENDPOINT.put('/user/lock-status', payload)
  }
}
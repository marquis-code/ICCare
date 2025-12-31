import { GATEWAY_ENDPOINT } from '../axios.config'

export interface User {
  user_id: string
  email: string
  first_name: string
  last_name: string
  is_active?: boolean
  is_verified?: boolean
  created_at?: string
}

export interface SignUpPayload {
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirm: string
}

export interface SignInPayload {
  email: string
  password: string
}

export interface SignInResponse {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
  user: User
}

export interface RefreshTokenPayload {
  refresh_token: string
}

export interface UpdateUserPayload {
  first_name?: string
  last_name?: string
  email?: string
  is_active?: boolean
  is_verified?: boolean
}

export interface Role {
  role_type: string
  role_function: string
  role_function_rights: Array<{
    function_name: string
    rights: string[]
  }>
  expiration_date: string | null
  status: 'Enabled' | 'Disabled'
}

export interface CreateRolePayload {
  role_type: string
  role_function: string
  role_function_rights: Array<{
    function_name: string
    rights: string[]
  }>
  expiration_date?: string | null
  status: 'Enabled' | 'Disabled'
}

export interface UpdateRolePayload {
  role_function?: string
  role_function_rights?: Array<{
    function_name: string
    rights: string[]
  }>
  expiration_date?: string | null
  status?: 'Enabled' | 'Disabled'
}

export interface AssignRolePayload {
  user_id: string
  role_type: string
}

export interface LockStatus {
  user_id: string
  is_locked: boolean
  failed_login_attempts: number
  lockout_until: string | null
}

export interface UpdateLockStatusPayload {
  user_id: string
  lu_status: boolean
}

export const auth_api = {
  // Authentication endpoints
  $_sign_up: (payload: SignUpPayload) => {
    return GATEWAY_ENDPOINT.post('/auth/signup', payload)
  },

  $_sign_in: (payload: SignInPayload) => {
    return GATEWAY_ENDPOINT.post('/auth/signin', payload)
  },

  $_refresh_token: (payload: RefreshTokenPayload) => {
    return GATEWAY_ENDPOINT.post('/auth/refresh', payload)
  },

  $_get_current_user: () => {
    return GATEWAY_ENDPOINT.get('/auth/me')
  },

  // User management endpoints
  $_get_all_users: () => {
    return GATEWAY_ENDPOINT.get('/auth/users')
  },

  $_update_user: (userId: string, payload: UpdateUserPayload) => {
    return GATEWAY_ENDPOINT.put(`/auth/users/${userId}`, payload)
  },

  $_deactivate_user: (userId: string) => {
    return GATEWAY_ENDPOINT.post(`/auth/users/${userId}/deactivate`)
  },

  // Role management endpoints
  $_create_role: (payload: CreateRolePayload) => {
    return GATEWAY_ENDPOINT.post('/auth/user/roles', payload)
  },

  $_get_all_roles: () => {
    return GATEWAY_ENDPOINT.get('/auth/user/roles')
  },

  $_update_role: (roleType: string, payload: UpdateRolePayload) => {
    return GATEWAY_ENDPOINT.put(`/auth/user/roles/${roleType}`, payload)
  },

  $_delete_role: (roleType: string) => {
    return GATEWAY_ENDPOINT.delete(`/auth/user/roles/${roleType}`)
  },

  $_assign_role: (payload: AssignRolePayload) => {
    return GATEWAY_ENDPOINT.post('/auth/user/roles/assign', payload)
  },

  // Lock/Unlock endpoints
  $_get_lock_status: (userId: string) => {
    return GATEWAY_ENDPOINT.get(`/auth/user/lock-status/${userId}`)
  },

  $_update_lock_status: (payload: UpdateLockStatusPayload) => {
    return GATEWAY_ENDPOINT.put('/auth/user/lock-status', payload)
  }
}
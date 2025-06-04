// Tipos de respuesta de la API
export interface LoginResponse {
    success?: boolean
    token?: string
    user?: any
    message?: string
    error?: string
  }
  
  export interface RegisterResponse {
    success?: boolean
    user?: any
    message?: string
    error?: string
  }
  
  export interface UserResponse {
    user?: any
    message?: string
    error?: string
  }
  
  export interface ApiError {
    data?: {
      message?: string
      error?: string
    }
    message?: string
    statusCode?: number
  }
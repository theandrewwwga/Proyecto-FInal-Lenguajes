export interface ContactFormData {
    fullName: string
    email: string
    message: string
  }
  
  export interface ContactFormErrors {
    fullName?: string
    email?: string
    message?: string
  }
  
  export interface ContactInfo {
    address: {
      street: string
      city: string
      country: string
    }
    phone: string
    email: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  
  export interface ContactSubmissionResponse {
    success: boolean
    message: string
    id?: string
  }
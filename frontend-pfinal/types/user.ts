// frontend/types/user.ts
export interface User {
    id: string | number
    name: string
    email: string
    avatar?: string
    // Campos adicionales del backend
    rol?: string
    nombre?: string
    apaterno?: string
    amaterno?: string
    telefono?: string
    direccion?: string
    ciudad?: string
    estado?: string
  }
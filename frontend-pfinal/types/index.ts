export interface Product {
    id: number
    name: string
    description?: string
    price: number
    image?: string
    category: string
    stock?: number
  }
  
  export interface CartItem extends Product {
    quantity: number
  }
  
  export interface User {
    id: number
    name: string
    email: string
    avatar?: string
  }
  
  export interface Order {
    id: number
    userId: number
    items: CartItem[]
    total: number
    status: 'pending' | 'processing' | 'shipped' | 'delivered'
    createdAt: string
  }
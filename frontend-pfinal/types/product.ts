export interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  image: string
  images: string[]
  stock: number
  featured: boolean
  isNew: boolean
  discount?: number
  rating: number
  reviewCount: number
  specifications: ProductSpecification[]
  colors?: ProductColor[]
  sizes?: ProductSize[]
  tags: string[]
  createdAt: string
  updatedAt: string
  quantity?: number
}

export interface ProductSpecification {
  name: string
  value: string
}

export interface ProductColor {
  name: string
  value: string
  image?: string
}

export interface ProductSize {
  name: string
  value: string
  price?: number
}

export interface ProductReview {
  id: number
  productId: number
  userName: string
  userAvatar: string
  rating: number
  comment: string
  createdAt: string
  helpful: number
}

export interface Category {
  id: string
  name: string
  slug: string
}

export interface CartItem {
  id: number
  product: Product
  quantity: number
  selectedColor?: ProductColor
  selectedSize?: ProductSize
}
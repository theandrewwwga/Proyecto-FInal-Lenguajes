import type { Product, CartItem } from '~/types/product'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  // Getters
  const itemCount = computed((): number => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalPrice = computed((): number => {
    return items.value.reduce((total, item) => {
      const discountedPrice = item.product.discount 
        ? item.product.price * (1 - item.product.discount / 100)
        : item.product.price
      return total + (discountedPrice * item.quantity)
    }, 0)
  })

  const isInCart = (productId: number): boolean => {
    return items.value.some(item => item.product.id === productId)
  }

  // Actions
  const addItem = (product: Product, quantity: number = 1): void => {
    const existingItem = items.value.find(item => item.product.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({
        id: Date.now(),
        product,
        quantity
      })
    }
  }

  const removeItem = (itemId: number): void => {
    const index = items.value.findIndex(item => item.id === itemId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  const updateQuantity = (itemId: number, quantity: number): void => {
    const item = items.value.find(item => item.id === itemId)
    if (item) {
      if (quantity <= 0) {
        removeItem(itemId)
      } else {
        item.quantity = quantity
      }
    }
  }

  const clearCart = (): void => {
    items.value = []
  }

  return {
    items: readonly(items),
    itemCount,
    totalPrice,
    isInCart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  }
}, {
  persist: {
    key: 'vista-create-cart',
    storage: typeof window !== 'undefined' ? localStorage : undefined,
  }
})
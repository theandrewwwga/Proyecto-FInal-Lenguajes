// types/product.ts
export interface Product {
    id: number
    name: string
    description: string
    price: number
    category: string
    image: string
    stock: number
    featured: boolean
    isNew: boolean
    discount?: number
  }
  
  export interface Category {
    id: string
    name: string
    slug: string
  }
  
  // stores/products.ts
  export const useProductsStore = defineStore('products', () => {
    const products = ref<Product[]>([
      // Living Room
      {
        id: 1,
        name: 'Loveseat Sofa',
        description: 'Comfortable gray loveseat perfect for small spaces. Premium fabric upholstery with solid wood legs.',
        price: 899.00,
        category: 'living-room',
        image: 'https://i0.wp.com/mercatienda.es/wp-content/uploads/2024/06/3778617812.jpg?resize=430,430&ssl=1',
        stock: 5,
        featured: true,
        isNew: true,
        discount: 15
      },
      {
        id: 2,
        name: 'Modern Accent Chair',
        description: 'Stylish teal accent chair with wooden frame. Perfect for reading corner or as statement piece.',
        price: 449.00,
        category: 'living-room',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80',
        stock: 8,
        featured: true,
        isNew: false
      },
      {
        id: 3,
        name: 'Round Coffee Table',
        description: 'Minimalist round coffee table with solid wood construction. Perfect for modern living rooms.',
        price: 299.00,
        category: 'living-room',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80',
        stock: 12,
        featured: true,
        isNew: false
      },
      {
        id: 4,
        name: 'Table Lamp',
        description: 'Elegant beige table lamp with modern design. Soft lighting perfect for bedside or desk.',
        price: 129.00,
        category: 'bedroom',
        image: 'https://www.ikea.com/mx/es/images/products/solklint-lampara-de-mesa-laton-vidrio-transparente-gris__0842257_pe781832_s5.jpg?f=xl',
        stock: 15,
        featured: true,
        isNew: true,
        discount: 25
      },
  
      // Bedroom
      {
        id: 5,
        name: 'Bamboo Basket',
        description: 'Handwoven bamboo storage basket. Perfect for organizing and adding natural texture to any room.',
        price: 45.00,
        category: 'bedroom',
        image: 'https://www.ikea.com/my/ms/images/products/vaexthus-bakul-buluh-buatan-tangan__1200044_pe904825_s5.jpg?f=xl',
        stock: 20,
        featured: true,
        isNew: true,
        discount: 20
      },
      {
        id: 6,
        name: 'Beige Table Lamp',
        description: 'Elegant beige table lamp with modern design. Soft lighting perfect for bedside or desk.',
        price: 129.00,
        category: 'bedroom',
        image: 'https://www.ikea.com/mx/es/images/products/blasverk-lampara-de-mesa-beige__1150245_pe884435_s5.jpg?f=xl',
        stock: 15,
        featured: true,
        isNew: true,
        discount: 25
      },
      {
        id: 7,
        name: 'Modern Nightstand',
        description: 'Clean-lined nightstand with two drawers. Oak wood finish with contemporary handles.',
        price: 199.00,
        category: 'bedroom',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80',
        stock: 10,
        featured: false,
        isNew: false
      },
  
      // Kitchen
      {
        id: 8,
        name: 'Toasted Toaster',
        description: 'Retro-style toaster in cream color. Combines vintage aesthetics with modern functionality.',
        price: 89.00,
        category: 'kitchen',
        image: 'https://media.istockphoto.com/id/520221509/es/foto/retro-tostadora.jpg?s=170667a&w=0&k=20&c=UeytTi0nrYdJ-vdnFcWNq-Mu6Pe7DipbijX52Wr7jAY=',
        stock: 25,
        featured: true,
        isNew: true,
        discount: 30
      },
      {
        id: 9,
        name: 'Kitchen Bar Stools',
        description: 'Set of 2 modern bar stools with wooden seats and metal legs. Perfect for kitchen islands.',
        price: 189.00,
        category: 'kitchen',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80',
        stock: 6,
        featured: false,
        isNew: false
      },
  
      // Office
      {
        id: 10,
        name: 'Ergonomic Office Chair',
        description: 'Professional office chair with lumbar support and adjustable height. Breathable mesh back.',
        price: 299.00,
        category: 'office',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80',
        stock: 8,
        featured: false,
        isNew: false
      },
      {
        id: 11,
        name: 'Standing Desk',
        description: 'Height-adjustable standing desk with electric motor. Promotes healthy work habits.',
        price: 599.00,
        category: 'office',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80',
        stock: 4,
        featured: false,
        isNew: true
      }
    ])
  
    const categories = ref<Category[]>([
      { id: 'living-room', name: 'Living Room', slug: 'living-room' },
      { id: 'bedroom', name: 'Bedroom', slug: 'bedroom' },
      { id: 'kitchen', name: 'Kitchen', slug: 'kitchen' },
      { id: 'office', name: 'Office', slug: 'office' },
      { id: 'dining', name: 'Dining', slug: 'dining' },
      { id: 'outdoor', name: 'Outdoor', slug: 'outdoor' }
    ])
  
    // Getters
    const getFeaturedProducts = (limit: number | null = null): Product[] => {
      const featured = products.value.filter(product => product.featured)
      return limit ? featured.slice(0, limit) : featured
    }
  
    const getNewArrivals = (limit: number | null = null): Product[] => {
      const newProducts = products.value.filter(product => product.isNew)
      return limit ? newProducts.slice(0, limit) : newProducts
    }
  
    const getProductsByCategory = (categorySlug: string): Product[] => {
      return products.value.filter(product => product.category === categorySlug)
    }
  
    const getProductById = (id: number | string): Product | undefined => {
      return products.value.find(product => product.id === parseInt(id.toString()))
    }
  
    const getSaleProducts = (): Product[] => {
      return products.value.filter(product => product.discount && product.discount > 0)
    }
  
    const searchProducts = (query: string): Product[] => {
      const searchTerm = query.toLowerCase()
      return products.value.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.includes(searchTerm)
      )
    }
  
    return {
      products: readonly(products),
      categories: readonly(categories),
      getFeaturedProducts,
      getNewArrivals,
      getProductsByCategory,
      getProductById,
      getSaleProducts,
      searchProducts
    }
  })
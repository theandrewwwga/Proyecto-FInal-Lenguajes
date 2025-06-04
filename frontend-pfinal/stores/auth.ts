// frontend/stores/auth.ts

// Si el import no funciona, define el tipo directamente aquí
interface User {
  id: string | number
  name: string
  email: string
  avatar?: string
  rol?: string
  nombre?: string
  apaterno?: string
  amaterno?: string
  telefono?: string
  direccion?: string
  ciudad?: string
  estado?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => !!user.value && !!token.value)
  const isAdmin = computed(() => user.value?.rol === 'admin' || user.value?.rol === 'administrador')
  const isUsuario = computed(() => user.value?.rol === 'usuario')

  const { $api } = useNuxtApp()

  const login = async (email: string, password: string) => {
    loading.value = true
    try {
      console.log('Intentando login con:', { email })
      
      const response = await $api<any>('/users/login', {
        method: 'POST',
        body: {
          usuario: email,
          password
        }
      })

      console.log('Respuesta de login:', response)

      // El backend ahora devuelve token y user
      if (response && response.token && response.user) {
        // Mapear respuesta del backend al formato esperado por el frontend
        const mappedUser: User = {
          id: response.user.id,
          name: `${response.user.nombre} ${response.user.apaterno} ${response.user.amaterno}`.trim(),
          email: response.user.usuario,
          avatar: "/api/placeholder/64/64",
          // Guardar campos adicionales del backend
          ...response.user
        }
        
        user.value = mappedUser
        token.value = response.token
        
        // Guardar en localStorage y cookie
        localStorage.setItem('auth-token', response.token)
        localStorage.setItem('user', JSON.stringify(mappedUser))
        
        const tokenCookie = useCookie('auth-token', {
          httpOnly: false,
          secure: true,
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 7 // 7 días
        })
        tokenCookie.value = response.token
        
        return mappedUser
      } else {
        throw new Error('Respuesta inválida del servidor')
      }
    } catch (error: any) {
      console.error('Error en login:', error)
      throw new Error(error.data?.message || 'Error al iniciar sesión')
    } finally {
      loading.value = false
    }
  }

  const register = async (userData: any) => {
    loading.value = true
    try {
      const response = await $api<any>('/users', {
        method: 'POST',
        body: userData
      })
      
      console.log('Respuesta del registro:', response)
      
      if (response && (response.user || response.id)) {
        return response.user || response
      } else {
        throw new Error('Error al registrar usuario')
      }
    } catch (error: any) {
      console.error('Error en registro:', error)
      throw new Error(error.data?.message || 'Error al registrar')
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    try {
      if (token.value) {
        await $api('/users/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token.value}`
          }
        }).catch(err => {
          console.log('Error al cerrar sesión en el servidor:', err)
        })
      }
    } finally {
      // Limpiar estado local independientemente del resultado
      user.value = null
      token.value = null
      
      localStorage.removeItem('auth-token')
      localStorage.removeItem('user')
      
      const tokenCookie = useCookie('auth-token')
      tokenCookie.value = null
      
      loading.value = false
    }
  }

  const initAuth = () => {
    const tokenCookie = useCookie('auth-token')
    const storedToken = tokenCookie.value || localStorage.getItem('auth-token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      try {
        token.value = storedToken
        user.value = JSON.parse(storedUser)
      } catch (error) {
        console.error('Error parsing stored user:', error)
        logout()
      }
    }
  }

  return {
    user: readonly(user),
    token: readonly(token),
    loading: readonly(loading),
    isAuthenticated,
    isAdmin,
    isUsuario,
    login,
    register,
    logout,
    initAuth
  }
})
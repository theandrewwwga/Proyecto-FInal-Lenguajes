// backend-pfinal/src/scripts/check-server-routes.js
// Script para verificar las rutas del servidor corriendo

async function checkRoutes() {
    const baseUrl = 'http://localhost:5050/api'
    
    console.log('🔍 Verificando rutas del servidor...\n')
    
    // Intentar hacer OPTIONS request para ver si el endpoint existe
    const endpoints = [
      { method: 'POST', url: '/users', desc: 'Registro de usuario' },
      { method: 'POST', url: '/users/', desc: 'Registro de usuario (con /)' },
      { method: 'POST', url: '/users/login', desc: 'Login' },
      { method: 'GET', url: '/users', desc: 'Listar usuarios' },
    ]
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`${baseUrl}${endpoint.url}`, {
          method: 'OPTIONS',
          headers: {
            'Origin': 'http://localhost:3000'
          }
        })
        
        console.log(`${endpoint.method} ${endpoint.url} - ${endpoint.desc}`)
        console.log(`  Status: ${response.status}`)
        console.log(`  Headers Allow: ${response.headers.get('allow') || 'No especificado'}`)
        console.log('')
      } catch (error) {
        console.log(`${endpoint.method} ${endpoint.url} - Error: ${error.message}\n`)
      }
    }
    
    // Intentar el registro directamente
    console.log('\n📝 Intentando registro de prueba...')
    try {
      const testUser = {
        nombre: 'Test',
        apaterno: 'Usuario',
        amaterno: 'Prueba',
        direccion: 'Calle Test 123',
        telefono: '1234567890',
        ciudad: 'Irapuato',
        estado: 'Guanajuato',
        usuario: `test${Date.now()}@test.com`,
        password: '123456'
      }
      
      const response = await fetch(`${baseUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testUser)
      })
      
      console.log(`Status: ${response.status}`)
      const text = await response.text()
      console.log(`Response: ${text}`)
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
  }
  
  checkRoutes()
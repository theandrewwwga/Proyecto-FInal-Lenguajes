// backend-pfinal/src/scripts/check-routes.js
import express from 'express'
import userRoutes from '../routes/userRoutes.js'

const app = express()

// Registrar rutas como lo hace tu aplicación
userRoutes.forEach(route => {
    const { method, path, handler, middleware = [] } = route
    const fullPath = `/api/users${path}`
    
    console.log(`${method.toUpperCase()} ${fullPath} - Middleware: ${middleware.length > 0 ? 'Sí' : 'No'}`)
})

console.log('\n📝 Rutas esperadas:')
console.log('POST /api/users - Crear usuario (registro)')
console.log('POST /api/users/login - Iniciar sesión')
console.log('GET /api/users - Listar usuarios (requiere auth)')
console.log('etc...')
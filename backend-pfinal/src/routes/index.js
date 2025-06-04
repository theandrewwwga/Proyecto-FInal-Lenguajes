// backend-pfinal/src/routes/index.js
import express from 'express'
import userRoutes from './userRoutes.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({ message: 'Servidor de API '})
})

// Crear un sub-router para usuarios
const userRouter = express.Router()

// Registrar cada ruta del array userRoutes
userRoutes.forEach(route => {
    const { method, path, handler, middleware = [] } = route
    
    // Verificar que handler sea una función
    if (typeof handler !== 'function') {
        console.error(`Handler no es una función para ${method} ${path}`)
        return
    }
    
    // Registrar la ruta con su método correspondiente
    userRouter[method](path, ...middleware, handler)
})

// Montar el router de usuarios en /users
router.use('/users', userRouter)

export default router
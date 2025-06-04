// backend-pfinal/src/routes/userRoutes.js
import userController from '../controllers/userController.js'
import authMiddleware from '../middlewares/authMiddleware.js'  // Corregido: middlewares con 's'

const controller = new userController()

export default [
    // Rutas públicas (sin autenticación)
    {
        method: 'post',
        path: '/login',
        handler: controller.login.bind(controller)
    },
    {
        method: 'post',
        path: '/',  // POST /api/users para crear usuario (registro)
        handler: controller.create.bind(controller)
    },
    
    // Rutas protegidas (requieren autenticación)
    {
        method: 'get',
        path: '/',
        middleware: [authMiddleware],
        handler: controller.getAll.bind(controller)
    },
    {
        method: 'get',
        path: '/user/:usuario',
        middleware: [authMiddleware],
        handler: controller.getByUser.bind(controller)
    },
    {
        method: 'get',
        path: '/rol/:rol',
        middleware: [authMiddleware],
        handler: controller.getByRol.bind(controller)
    },
    {
        method: 'put',
        path: '/:id',
        middleware: [authMiddleware],
        handler: controller.update.bind(controller)
    },
    {
        method: 'delete',
        path: '/:id',
        middleware: [authMiddleware],
        handler: controller.delete.bind(controller)
    },
    {
        method: 'post',
        path: '/logout',
        middleware: [authMiddleware],
        handler: controller.logout.bind(controller)
    },
    {
        method: 'post',
        path: '/logout-all',
        middleware: [authMiddleware],
        handler: controller.logoutAllDevices.bind(controller)
    },
    {
        method: 'get',
        path: '/sessions',
        middleware: [authMiddleware],
        handler: controller.getUserSessions.bind(controller)
    },
    {
        method: 'post',
        path: '/unlock/:id',
        middleware: [authMiddleware],
        handler: controller.unlockUser.bind(controller)
    },
    {
        method: 'get',
        path: '/me',
        middleware: [authMiddleware],
        handler: controller.getUserByUsername.bind(controller)
    }
]
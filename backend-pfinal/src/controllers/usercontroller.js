import userService from "../services/userService.js"

export default class userController {
    constructor () {
        this.userService = new userService()
    }

    async getAll (req, res, next) {
        try {
           const users = await this.userService.getAll()
           res.json(users)
        } catch (error) {
            next(error)
        }
    }

    async getByUser (req, res, next) {
        try {
            const { usuario } = req.params
            const user = await this.userService.getByUser(usuario)
            res.json(user)
        } catch (error) {
            next(error)
        }
    }

    async getByRol (req, res, next) {
        try {
            const { rol } = req.params
            const users = await this.userService.getByRol(rol)
            res.json(users)
        } catch (error) {
            next(error)
        }
    }

    async create (req, res, next) {
        try {
            console.log('@@@ Creando usuario - Body recibido:', req.body)
            const newUser = await this.userService.create(req.body)
            console.log('@@@ Usuario creado exitosamente:', newUser)
            
            // Devolver respuesta exitosa
            res.status(201).json({
                message: 'Usuario creado exitosamente',
                user: newUser
            })
        } catch (error) {
            console.error('@@@ Error al crear usuario:', error)
            next(error)
        }
    }

    async update (req, res, next) {
        try {
            const { id } = req.params
            const updateUser = await this.userService.update(id, req.body)
            res.json(updateUser)
        } catch (error) {
            next(error)
        }
    }

    async delete (req, res, next) {
        try {
            const { id } = req.params
            await this.userService.delete(id)
            res.status(204).send()
        } catch (error) {
            next(error)
        }
    }

    async login (req, res, next) {
        const { usuario, password } = req.body
        console.log('@@@ user => ', usuario, password)
        try {
            // Obtener información del dispositivo
            const deviceInfo = {
                userAgent: req.headers['user-agent'],
                ip: req.ip || req.connection.remoteAddress
            }
            
            const result = await this.userService.login(usuario, password, deviceInfo)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    
    async logout (req, res, next) {
        try {
            const token = req.token // Viene del middleware
            const userId = req.user.id

            await this.userService.logout(userId, token)
            res.status(200).json({ message: 'Sesión Cerrada'})
        } catch (error) {
            next(error)
        }
    }
    
    // NUEVO: Cerrar todas las sesiones del usuario
    async logoutAllDevices (req, res, next) {
        try {
            const userId = req.user.id
            await this.userService.logoutAllDevices(userId)
            res.status(200).json({ message: 'Todas las sesiones cerradas'})
        } catch (error) {
            next(error)
        }
    }
    
    // NUEVO: Obtener sesiones activas del usuario
    async getUserSessions (req, res, next) {
        try {
            const userId = req.user.id
            const sessions = await this.userService.getUserSessions(userId)
            res.json({ sessions })
        } catch (error) {
            next(error)
        }
    }

    async unlockUser (req, res, next) {
        try {
          const { id } = req.params
          await this.userService.unlockUser(id)
          res.json({ message: 'Usuario Desbloqueado' })  
        } catch (error) {
            next(error)
        }
    }

    async getUserByUsername (req, res, next) {
        try {
            const { usuario } = req.user
            const user = await this.userService.getByUser(usuario)
            if (!user) {
                return res.status(400).json({ message: 'Usuario no encontrado'})
            }
            return res.status(200).json({ user })
        } catch (error) {
            next(error)
        }
    }
}
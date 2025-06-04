import userRepository from '../repositories/userRepository.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import TokenService from './tokenService.js'
import { User } from './../models/user.js'

export default class userService {
    constructor() {
        this.userRepository = new userRepository()
    }
    
    async getAll () {
        return await this.userRepository.getAll()
    }
    
    async findByUser (username) {
        const user = await this.userRepository.findByUser(username)
        if (!user) {
            throw new Error('Usuario no encontrado')      
        }
        return user
    }
    
    async findByRol (rol) {
        return await this.userRepository.findByRol(rol)
    }
    
    async create (user) {
        const userExists = await this.userRepository.findByUser(user.usuario)

        if (userExists) {
            throw { statusCode: 400, message: 'Usuario ya existe' }          
        }
        const fullNameExists = await this.userRepository.findByFullName(user.nombre, user.apaterno, user.amaterno)

        if (fullNameExists) {
            throw { statusCode: 400, message: 'Nombre completo ya existe' }  
        }

        user.password = await bcrypt.hash(user.password, 10)

        const newUser = new User({ ...user })
        return await this.userRepository.create({ ...newUser })
    }
    
    async update (id, user) {
        const userExists = await this.userRepository.getById(id)

        if (!userExists) {
            throw { message: 'Usuario no encontrado', statusCode: 404 }
        }

        if (user.password) {
            user.password = await bcrypt.hash(user.password, 10)
        }
        const newUser = new User({ ...user })
        return await this.userRepository.update(id, { ...newUser })
    }
    
    async delete (id) {
        const existUser = await this.userRepository.getById(id)
        if (!existUser) {
            throw { statusCode: 404, message: 'Usuario no encontrado' }
        }
        return await this.userRepository.delete(id)
    }
    
    async login (usuario, password, deviceInfo = {}) {
        const user = await this.findByUser(usuario)
        console.log('@@@ user =>', user)
        if (!user) {
            throw { message: 'Usuario no encontrado', statusCode: 404 }            
        }
        if (user.bloqueado) {
            throw { message: 'Usuario Bloqueado, contacta al administrador', statusCode: 403 }
        }

        const validPassword = await bcrypt.compare(password, user.password)
        console.log('@@@ password =>', validPassword)
        if (!validPassword) {
            await this.handleFailedLogin(user.id)
            throw { message: 'Contraseña Incorrecta', statusCode: 401 }
        }

        // CAMBIO: Ya no verificamos sesión existente, permitimos múltiples
        // Opcionalmente, podemos obtener las sesiones activas para mostrarlas
        const activeSessions = await this.userRepository.getUserSessions(user.id)
        console.log(`Usuario tiene ${activeSessions.length} sesiones activas`)

        // Crear token
        const token = jwt.sign({
            id: user.id, 
            usuario: user.usuario, 
            rol: user.rol
        }, process.env.JWT_SECRET, { expiresIn: '1h'})

        // Crear nueva sesión
        await this.userRepository.createSession(user.id, token, deviceInfo)

        // Resetear intentos fallidos
        if (user.intentos > 0) {
            await this.userRepository.update(user.id, { intentos: 0 })
        }

        // Devolver token y datos del usuario
        return { 
            token,
            user: {
                id: user.id,
                nombre: user.nombre,
                apaterno: user.apaterno,
                amaterno: user.amaterno,
                usuario: user.usuario,
                rol: user.rol,
                // No devolver campos sensibles
                // password, bloqueado, intentos, etc.
            }
        }
    }
    
    async logout (userId, token) {
        // Eliminar la sesión específica
        await this.userRepository.deleteSession(token)
        
        // Ya no necesitamos revocar el token en memoria
        // porque verificamos en la base de datos
    }
    
    async logoutAllDevices (userId) {
        // Cerrar todas las sesiones del usuario
        await this.userRepository.deleteAllUserSessions(userId)
    }
    
    async getUserSessions (userId) {
        // Obtener todas las sesiones activas con información del dispositivo
        return await this.userRepository.getUserSessions(userId)
    }
    
    async unlockUser (id) {
        const user = await this.userRepository.getById(id)
        if (!user) {
            throw { message: 'Usuario no existe', statusCode: 404 }
        }
        await this.userRepository.update(id, { bloqueado: false, intentos: 0 })
    }
    
    async handleFailedLogin (id) {
        const user = await this.userRepository.getById(id)
        const intentos = user.intentos + 1
        if (intentos >= 5) {
            await this.userRepository.update(id, { bloqueado: true })
            throw { message: 'Usuario bloqueado después de 5 intentos', statusCode: 403 }
        }
        await this.userRepository.update(id, { intentos })
    }
    
    async getByUser (usuario) {
        const user = await this.userRepository.findByUser(usuario)
        if (!user) {
            throw { message: 'Usuario no encontrado', statusCode: 404 }
        }
        return user
    }
}
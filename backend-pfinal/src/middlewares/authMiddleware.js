import jwt from 'jsonwebtoken'
import UserRepository from '../repositories/userRepository.js'
import dotenv from 'dotenv'

dotenv.config()

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
        return res.status(401).json({ message: 'No Autorizado' })
    }
    
    const token = authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' })
    }
    
    const userRepository = new UserRepository()
    
    try {
        // Verificar que el token sea válido con JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        // Verificar que la sesión existe y no ha expirado en la DB
        const isValid = await userRepository.isTokenValid(token)
        if (!isValid) {
            return res.status(403).json({ message: 'Sesión expirada o inválida' }) 
        }
        
        // Agregar información del usuario a la request
        req.user = decoded
        req.token = token
        
        // Opcionalmente, agregar información del dispositivo para tracking
        req.deviceInfo = {
            userAgent: req.headers['user-agent'],
            ip: req.ip || req.connection.remoteAddress
        }
        
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Token expirado' })
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Token inválido' })
        }
        return res.status(403).json({ message: 'Error de autenticación' })
    }
}

export default authMiddleware
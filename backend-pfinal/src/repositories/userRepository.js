import IUserRepository from '../interfaces/IUserRepository.js'
import { db } from '../config/firebase.js'

export default class userRepository extends IUserRepository {
    constructor() {
        super();
        this.collection = db.collection('users-node');
        this.sessionsCollection = db.collection('user-sessions');
    }

    async create(user) {
        const newUser =  await this.collection.add(user);
        return {
            id: newUser.id,
            ...user,
        }
    }

    async update(id, user) {
        await this.collection.doc(id).update(user);
        return {
            id,
            ...user,
        }
    }

    async delete(id) {
        // Eliminar todas las sesiones del usuario
        await this.deleteAllUserSessions(id);
        await this.collection.doc(id).delete();
        return { id, message: 'Usuario eliminado' };
    }

    async getAll() {
        const users = await this.collection.get();
        return users.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    }

    async findByFullName(nombre, apaterno, amaterno) {
        const users = await this.collection
        .where('nombre', '==', nombre)
        .where('apaterno', '==', apaterno)
        .where('amaterno', '==', amaterno)
        .get();    
    return users.empty ? null : {
        id: users.docs[0].id,
        ...users.docs[0].data(),
        }   
    }

    async findByUser (username) {
        const users = await this.collection
            .where('usuario', '==', username)
            .get();
        return users.empty ? null : {
            id: users.docs[0].id,
            ...users.docs[0].data()
        }   
    }

    async findByRol (rol) {
        const users = await this.collection
        .where('rol', '==', rol)
        .get();
    return users.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));     
    }

    // NUEVO: Crear sesión en lugar de actualizarla
    async createSession(userId, token, deviceInfo = {}) {
        const session = {
            userId,
            token,
            createdAt: new Date(),
            lastActivity: new Date(),
            expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hora
            deviceInfo: {
                userAgent: deviceInfo.userAgent || 'unknown',
                ip: deviceInfo.ip || 'unknown',
                ...deviceInfo
            }
        };
        
        const newSession = await this.sessionsCollection.add(session);
        return { id: newSession.id, ...session };
    }

    // NUEVO: Obtener todas las sesiones activas de un usuario
    async getUserSessions(userId) {
        const now = new Date();
        const sessions = await this.sessionsCollection
            .where('userId', '==', userId)
            .where('expiresAt', '>', now)
            .get();
            
        return sessions.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }

    // NUEVO: Verificar si un token específico es válido
    async isTokenValid(token) {
        const now = new Date();
        const sessions = await this.sessionsCollection
            .where('token', '==', token)
            .where('expiresAt', '>', now)
            .limit(1)
            .get();
            
        if (sessions.empty) return false;
        
        // Actualizar última actividad
        const sessionId = sessions.docs[0].id;
        await this.sessionsCollection.doc(sessionId).update({
            lastActivity: new Date()
        });
        
        return true;
    }

    // NUEVO: Eliminar una sesión específica (logout)
    async deleteSession(token) {
        const sessions = await this.sessionsCollection
            .where('token', '==', token)
            .get();
            
        const batch = db.batch();
        sessions.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        
        await batch.commit();
    }

    // NUEVO: Eliminar todas las sesiones de un usuario
    async deleteAllUserSessions(userId) {
        const sessions = await this.sessionsCollection
            .where('userId', '==', userId)
            .get();
            
        const batch = db.batch();
        sessions.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        
        await batch.commit();
    }

    // NUEVO: Limpiar sesiones expiradas (ejecutar periódicamente)
    async cleanExpiredSessions() {
        const now = new Date();
        const expiredSessions = await this.sessionsCollection
            .where('expiresAt', '<', now)
            .get();
            
        const batch = db.batch();
        expiredSessions.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        
        await batch.commit();
        return expiredSessions.size;
    }

    // DEPRECADO: Estos métodos ya no se usan
    async updateSessionToken(id, sessionToken) {
        // Mantener por compatibilidad pero no usar
        console.warn('updateSessionToken está deprecado. Usa createSession en su lugar.');
    }

    async getSessionToken(id) {
        // Mantener por compatibilidad pero no usar
        console.warn('getSessionToken está deprecado. Usa getUserSessions en su lugar.');
        return null;
    }

    async getById(id) {
        const user = await this.collection.doc(id).get();
        return user.exists ? { id, ...user.data() } : null;
    }
}
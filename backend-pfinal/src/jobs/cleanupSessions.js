// backend-pfinal/src/jobs/cleanupSessions.js
// Ejecutar este script periódicamente (cron job) para limpiar sesiones expiradas

import UserRepository from '../repositories/userRepository.js'
import dotenv from 'dotenv'
import admin from 'firebase-admin'

dotenv.config()

// Inicializar Firebase si no está inicializado
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
    });
}

async function cleanupExpiredSessions() {
    const userRepository = new UserRepository()
    
    try {
        console.log('Iniciando limpieza de sesiones expiradas...')
        const deletedCount = await userRepository.cleanExpiredSessions()
        console.log(`Se eliminaron ${deletedCount} sesiones expiradas`)
    } catch (error) {
        console.error('Error al limpiar sesiones:', error)
    }
}

// Ejecutar la limpieza
cleanupExpiredSessions()

// Para ejecutar como cron job, puedes usar:
// - node-cron en tu aplicación
// - Cron del sistema operativo
// - Cloud Functions programadas (si usas Firebase)
// Ejemplo: ejecutar cada hora
// 0 * * * * node /path/to/cleanupSessions.js
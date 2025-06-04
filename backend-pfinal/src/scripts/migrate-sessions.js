// backend-pfinal/src/scripts/migrate-sessions.js
// Script para migrar usuarios existentes y limpiar el campo currentSessionToken

import admin from 'firebase-admin'
import dotenv from 'dotenv'
import { db } from '../config/firebase.js'

dotenv.config()

async function migrateUsers() {
    try {
        console.log('🔄 Iniciando migración de usuarios...')
        
        // Obtener todos los usuarios
        const usersSnapshot = await db.collection('users-node').get()
        
        if (usersSnapshot.empty) {
            console.log('No hay usuarios para migrar')
            return
        }
        
        console.log(`📊 Encontrados ${usersSnapshot.size} usuarios`)
        
        let migrated = 0
        let skipped = 0
        
        // Procesar cada usuario
        for (const doc of usersSnapshot.docs) {
            const userData = doc.data()
            
            if (userData.currentSessionToken) {
                try {
                    // Eliminar el campo currentSessionToken
                    await doc.ref.update({
                        currentSessionToken: admin.firestore.FieldValue.delete()
                    })
                    
                    console.log(`✅ Usuario ${userData.usuario} migrado`)
                    migrated++
                } catch (error) {
                    console.error(`❌ Error migrando usuario ${userData.usuario}:`, error)
                }
            } else {
                skipped++
            }
        }
        
        console.log('\n📋 Resumen de migración:')
        console.log(`✅ Usuarios migrados: ${migrated}`)
        console.log(`⏭️  Usuarios sin cambios: ${skipped}`)
        console.log(`📊 Total procesados: ${usersSnapshot.size}`)
        
        console.log('\n✨ Migración completada!')
        
    } catch (error) {
        console.error('❌ Error durante la migración:', error)
        process.exit(1)
    }
}

// Confirmar antes de ejecutar
console.log('⚠️  Este script eliminará el campo currentSessionToken de todos los usuarios.')
console.log('Esto permitirá que los usuarios puedan iniciar sesión desde múltiples dispositivos.')
console.log('\nPresiona Ctrl+C para cancelar o espera 5 segundos para continuar...\n')

setTimeout(() => {
    migrateUsers().then(() => {
        console.log('\n👋 Proceso terminado')
        process.exit(0)
    })
}, 5000)
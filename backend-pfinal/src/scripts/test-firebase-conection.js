// backend-pfinal/src/scripts/test-firebase.js
import { db } from '../config/firebase.js'
import dotenv from 'dotenv'

dotenv.config()

async function testFirebaseConnection() {
  try {
    console.log('🔍 Verificando conexión con Firebase...\n')
    
    // Verificar variables de entorno
    console.log('📋 Variables de entorno:')
    console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID ? '✅ Configurado' : '❌ No configurado')
    console.log('FIREBASE_PRIVATE_KEY:', process.env.FIREBASE_PRIVATE_KEY ? '✅ Configurado' : '❌ No configurado')
    console.log('FIREBASE_CLIENT_EMAIL:', process.env.FIREBASE_CLIENT_EMAIL ? '✅ Configurado' : '❌ No configurado')
    
    // Intentar leer una colección
    console.log('\n🔄 Intentando acceder a la colección users-node...')
    const usersSnapshot = await db.collection('users-node').limit(1).get()
    
    console.log('✅ Conexión exitosa!')
    console.log(`📊 Usuarios en la base de datos: ${usersSnapshot.size}`)
    
    // Intentar crear un documento de prueba
    console.log('\n🔄 Intentando crear un documento de prueba...')
    const testDoc = await db.collection('test-connection').add({
      timestamp: new Date(),
      test: true
    })
    
    console.log('✅ Documento creado:', testDoc.id)
    
    // Eliminar documento de prueba
    await testDoc.delete()
    console.log('🗑️  Documento de prueba eliminado')
    
    console.log('\n✨ Firebase está funcionando correctamente!')
    
  } catch (error) {
    console.error('\n❌ Error de conexión con Firebase:')
    console.error(error.message)
    
    if (error.code === 'permission-denied') {
      console.error('\n⚠️  Error de permisos. Verifica:')
      console.error('1. Que las credenciales sean correctas')
      console.error('2. Que el service account tenga los permisos necesarios')
      console.error('3. Las reglas de seguridad en Firestore')
    }
    
    if (error.message.includes('FIREBASE_')) {
      console.error('\n⚠️  Parece que faltan variables de entorno.')
      console.error('Asegúrate de que tu archivo .env contenga:')
      console.error('FIREBASE_PROJECT_ID=tu-project-id')
      console.error('FIREBASE_PRIVATE_KEY="tu-private-key"')
      console.error('FIREBASE_CLIENT_EMAIL=tu-client-email')
    }
  }
}

testFirebaseConnection()
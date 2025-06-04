import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes/index.js'
import errorMiddleware from './middlewares/errorMiddleware.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api', router)
app.use(errorMiddleware)

const PORT = process.env.PORT || 6000
app.listen(PORT, () => {
    console.log(`Servidor Corriendo en ${PORT}`)
})
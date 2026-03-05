import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './libs/db.js'
import authRoute from './routes/authRoute.js'
import cookieParse from 'cookie-parser'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5001
// middlewares
app.use(express.json())
app.use(cookieParse())

// public route
app.use('/api/auth', authRoute)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server đang chạy trên cổng ${PORT}`)
    })
})


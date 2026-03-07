import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './libs/db.js'
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import cookieParse from 'cookie-parser'
import cors from 'cors';
import { protectedRoute } from './middlewares/authMiddlewares.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5001

// middlewares
app.use(express.json())
app.use(cookieParse())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

// public route
app.use('/api/auth', authRoute)

// private route
app.use(protectedRoute)
app.use('/api/users', userRoute)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server đang chạy trên cổng ${PORT}`)
    })
})


import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import registerRouter from './routes/register'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// --- Middleware ---
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }))
app.use(express.json())

// --- Health check (used by ALB target group) ---
app.get('/health', (_req, res) => res.json({ status: 'ok' }))

// --- Routes ---
app.use('/api/register', registerRouter)

// --- Start ---
app.listen(PORT, () => {
  console.log(`FitChain API running on port ${PORT}`)
})
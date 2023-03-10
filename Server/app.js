import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
config()
import cookieParser from 'cookie-parser'
import routes from './routes/index.js'

const app = express()

app.use(express.json())
app.use(cors({
	origin: 'http://localhost:3000',
	methods: ["GET", "POST", "PUT", "DELETE"],
	credentials: true
}))
app.use(cookieParser())

app.use("/v1", routes)

export default app
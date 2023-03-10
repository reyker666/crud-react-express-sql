import app from '../app.js'
import { config } from 'dotenv'
config()
const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
	console.log(`Your server is running on port ${PORT}`)
})
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

const { verify } = jwt

const verifyToken = (request, response, next) => {
    const token = request.params.tokenUser
	
	if(!token) {
		return response
		.status(400)
		.send({
			auth: false,
			message: "Missing token"
		})
	}

	verify(token, process.env.RESET_PASSWORD_SECRET, (error, decodedData) => {
        
		if(error) {
			return response
			.send({
				auth: false,
				message: "Token is not valid or expired"
			})
		}

		request.user_id = decodedData.user_id

		next()
	})

}

export default verifyToken
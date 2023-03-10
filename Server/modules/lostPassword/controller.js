import handleError from '../../Utils/handleError.js'
import jwt from 'jsonwebtoken'
import sendEmail from '../../Utils/sendEmail.js'
import { getUserByEmail, updateUserPasswordById} from '../users/dao.js'
import { hash, genSalt } from 'bcrypt'

const { sign } = jwt

const lostPassword = (request, response)=>{
	const { email } = request.body
	const successResponseObject = {
		auth: false
	}

	//Verify user exist
	const verifyUser = userData => {
		const userNotFound = !Object.keys(userData).length
		if(userNotFound) {
			const error = new Error()
			error.customMessage = 'Email not found'
			error.statusCode = 404
			throw error
		}

		return userData
	}

	//Create token by id
	const signTokenById = (data) => {
		const { user_id, username, email } = data

		const resetPasswordToken = sign({ user_id }, process.env.RESET_PASSWORD_SECRET, { expiresIn: '10m'})

		const dataResult = { resetPasswordToken, username, email, successResponseObject }
		return dataResult
	}

	//Send response
	const successResponse = () => {
		return response
		.status(200)
		.send(successResponseObject)
	}
	
	getUserByEmail(email)
	.then(verifyUser)
	.then(signTokenById)
	.then(sendEmail)
	.then(successResponse)
	.catch(handleError(response))
}

const verifyTokenToShow = (request, response)=>{

	const successResponse = ()=> {
		return response
		.status(200)
		.send({
			auth: true,
			message: "Token OK"
		})
	}

	successResponse()
}

const updatePassword = async (request, response)=>{
	const { password: pass } = request.body
	const { user_id } = request
	const salt = await genSalt(10)
	const password = await hash(pass, salt)

	updateUserPasswordById(user_id, password, response)
}

export { lostPassword, verifyTokenToShow, updatePassword }
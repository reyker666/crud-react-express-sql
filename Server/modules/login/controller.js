import { compare } from 'bcrypt'
import handleError from '../../Utils/handleError.js'
import jwt from 'jsonwebtoken'
import { getUserByEmail } from '..//users/dao.js'

const { sign } = jwt

const logging = (request, response)=> {
    const  { email, password } = request.body;
    const successResponseObject = {
		auth: false,
		token: ''
	}

	//Verify user exist
	const verifyUser = userData => {
		const userNotFound = !Object.keys(userData).length
		if(userNotFound) {
			const error = new Error()
			error.customMessage = 'Wrong username or password'
			error.statusCode = 401
			throw error
		}

		return userData
	}

	//Verify password
	const verifyPassword = async user => {
		const isNotValidPassword = !await compare(password, user.password)
		if(isNotValidPassword) {
			const error = new Error()
			error.customMessage = 'Wrong username or password'
			error.statusCode = 401
			throw error
		}

		//Create token
		const token = sign(
			{ id: user.user_id },
			process.env.TOKEN_SECRET
		)

		successResponseObject.auth= true
		successResponseObject.token= token

		//Create cookie
		response
		.cookie('tokenUser', token)
		.cookie('tokenSession', successResponseObject.auth)

		return
	}

	//Send response
	const successResponse = () => {
		return response
		.status(200)
		.send(successResponseObject)
	}
	
	getUserByEmail(email)
	.then(verifyUser)
	.then(verifyPassword)
	.then(successResponse)
	.catch(handleError(response))
}

export default logging
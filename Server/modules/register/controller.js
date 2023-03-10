import { hash, genSalt } from 'bcrypt'
import handleError from '../../Utils/handleError.js'
import { getUserByEmail, insertUser } from '../../modules/users/dao.js';

const postUser = async (request, response) => {
	const  { username, email: emailUpperCase, password: pass} = request.body;
	const email = emailUpperCase.toLowerCase()
	const salt =  await genSalt(10)
	const password = await hash(pass, salt)
	const successResponseObject = {
		isRegistered: false
	}

	//Verify user exist
	const verifyUser = userData => {
		const userFound = Object.keys(userData).length
		if(userFound) {
			const error = new Error()
			error.customMessage = 'Email registered'
			error.statusCode = 401
			throw error
		}
		
		return userData
	}

	//Send response
	const successResponse = () => {
		return response
		.status(200)
		.send(successResponseObject)
	}

	getUserByEmail(email)
	.then(verifyUser)
	.then(insertUser(username, password, email, successResponseObject))
	.then(successResponse)
	.catch(handleError(response))
}

export default postUser
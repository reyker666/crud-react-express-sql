const handleError = response => 
	error => {
		console.error(error.customMessage || error);
		return response
		.status(error.statusCode || 500)
		.send({ auth: false, message: error.customMessage || 'Server Error'})
    }
  
export default handleError
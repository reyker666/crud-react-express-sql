import db from '../../database/bbdd.js'

//GET user
const getUserByEmail = async (email) => {
    const queryResult = await new Promise((resolve, reject)=>{
        db.query(
            "SELECT * FROM users WHERE email = ?;",
            email,
            (err, userD) => {
                if(err) {
                    console.log(err)
                    const error = new Error()
                    error.customMessage = 'Request error'
                    error.statusCode = 400
                    throw error
                }

                if(userD.length > 0) resolve(userD[0])
                else resolve(userD)
            }
        )
    })

    return queryResult
}

//UPDATE user
const updateUserPasswordById = (user_id, password, response)=> {
    db.query(
        `UPDATE users SET password= ? WHERE user_id=${user_id}`,
        password,
        (error, result)=> {
            if(error) {
                return response
                .status(400)
                .send("Request Error")
            }

            response.send({passChanged: true, message: "Password change success"})
        }
    )
}

//INSERT user
const insertUser = (username, password, email, successResponseObject) => 
    userData => {
        userData.push(username, password, email)
        db.query(
            "INSERT INTO users (username, password, email) VALUES (?,?,?)",
            userData,
            (err, result) => {
                if(err) console.log("Error into the query")
            }
        )

        return successResponseObject.isRegistered = true
    }

export { getUserByEmail, updateUserPasswordById, insertUser }
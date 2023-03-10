import mysql from 'mysql'

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'crud-react-mysql'
})

export default db
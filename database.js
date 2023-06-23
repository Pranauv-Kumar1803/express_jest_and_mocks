const mysql = require('mysql2');

const connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  database : 'some_database'
})

async function getUser(username) {
  const [rows] = await connection.promise().query(
    `SELECT * 
      FROM users 
      WHERE username = ?`,
    [username]
  )

  return rows[0]
}

async function createUser(username, password) {
  const { insertId } = await connection.promise().query(
    `INSERT INTO users (username, password) 
      VALUES (?, ?)`,
    [username, password]
  )

  return insertId
}

module.exports = {createUser, getUser};
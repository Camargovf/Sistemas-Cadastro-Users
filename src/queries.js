// const { uuid } = require('uuidv4'); 
const bodyParser = require('body-parser')
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'macaquinho',
  host: 'localhost',
  database: 'projeto',
  password: 'dede123',
  port: 5432,
  
})
console.log('pool rodando ate aqui!');

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { firstname, lastname, email } = request.body

  pool.query('INSERT INTO users (firstname, lastname, email) VALUES ($1, $2, $3) RETURNING id', [firstname, lastname, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { firstname, lastname, email } = request.body

  pool.query(
    'UPDATE users SET firstname = $1, lastname = $2, email = $3 WHERE id = $4',
    [firstname, lastname, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
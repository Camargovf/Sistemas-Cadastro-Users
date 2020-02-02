const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./src/queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', bodyParser.json(),  db.getUsers)
app.get('/users/:id', bodyParser.json(), db.getUserById)
app.post('/users', bodyParser.json(), db.createUser)
app.put('/users/:id', bodyParser.json(),  db.updateUser)
app.delete('/users/:id', bodyParser.json(),  db.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
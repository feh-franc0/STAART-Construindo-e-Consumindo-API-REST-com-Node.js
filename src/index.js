const express = require('express')
const { TodosRepository } = require('./todos/repository')

const app = express()

app.use(express.json())

// GET /hello
app.get('/hello', (req, res) => {
  res.status(200).send('Hello world')
})

// GET /hello/:name
app.get('/hello/:name', (req, res) => {
  const name = req.params.name
  res.status(200).send(`Hello ${name}`)
})

// ** TODOS **

const todosRepository = TodosRepository()

const NotFound = {
  error: 'Not found',
  message: 'Resource not found',
}

// GET /todos/:id
app.get('/todos/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const todo = await todosRepository.get(id)
  if (!todo) {
    res.status(404).send(NotFound)
    return
  }
  res.status(200).send(todo)
})
//* comando curl para dar get: curl -X GET http://localhost:3000/todos/1

// POST /todos
app.post('/todos', (req, res) => {
  const todo = req.body
  todosRepository.insert(todo)
    .then(inserted => {
      res.status(201).send(inserted)
    })
})
//* comando curl para dar push: curl -X POST http://localhost:3000/todos -H 'Content-Type: application/json' -d '{"text":"meu texto","title":"meu titulo"}'


app
  .listen(3000, '0.0.0.0', () => {
    console.log("Server started")
  })
  .once('error', (error) => {
    console.error(error)
    process.exit(1)
  })

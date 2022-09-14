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
app.post('/todos', async (req, res) => {
  const todo = req.body
  const inserted = await todosRepository.insert(todo)

  res
    .status(201)
    .header('Location', `/todos/${inserted.id}`)
    .send(inserted)
})
//* comando curl para dar push: curl -X POST http://localhost:3000/todos -H 'Content-Type: application/json' -d '{"text":"meu texto","title":"meu titulo"}'

// PUT /todos/:id
app.put('/todos/:id',  async (req, res) => {
  const id = parseInt(req.params.id)
  const todo = { ...req.body, id }

  const found = await todosRepository.get(id)
  if (!found) {
    res.status(404).send(NotFound)
    return
  }
  const updated = await todosRepository.update(todo)
  res.status(200).send(updated)
})

// DEL /todos/:id
app.delete('/todos/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const found = await todosRepository.get(id)
  if (!found) {
    res.status(404).send(NotFound)
    return
  }
  await todosRepository.del(id)
  res.status(204).send()
})

// GET /TODOS
app.get('/todos', (_req, res) => {
  todosRepository
    .list()
    .then(todos => res.status(200).send({todos}))
})

app
  .listen(3000, '0.0.0.0', () => {
    console.log("Server started")
  })
  .once('error', (error) => {
    console.error(error)
    process.exit(1)
  })

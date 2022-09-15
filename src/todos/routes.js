const { Router } = require('express')
const { TodosRepository } = require('./repository')

const todosRepository = TodosRepository()

const NotFound = {
  error: 'Not found',
  message: 'Resource not found',
}

const router = Router()
// router.use(logger(console.log))

// GET /todos/:id
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const todo = await todosRepository.get(id)
  if (!todo) {
    res.status(404).send(NotFound)
    return
  }
  res.status(200).send(todo)
})//* comando curl para dar get: curl -X GET http://localhost:3000/todos/1

// POST /todos
router.post('/', async (req, res) => {
  const todo = req.body
  const inserted = await todosRepository.insert(todo)

  res
    .status(201)
    .header('Location', `/todos/${inserted.id}`)
    .send(inserted)
})//* comando curl para dar push: curl -X POST http://localhost:3000/todos -H 'Content-Type: application/json' -d '{"text":"meu texto","title":"meu titulo"}'

// PUT /todos/:id
router.put('/:id',  async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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
router.get('/', (_req, res) => {
  todosRepository
    .list()
    .then(todos => res.status(200).send({todos}))
})

module.exports = router

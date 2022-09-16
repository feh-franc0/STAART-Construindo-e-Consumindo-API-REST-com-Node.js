const { Router } = require('express')

const withAsyncErrorHandler = require('../middlewares/async-error')

// CRUD:
// Create: endpoint que faz a criação de novos usuarios
// POST /users { ...user }

// Read: endpoint que faz leitura de um usuário | endpoint que lista usuários
// Get /users { users:[ ...users ] }
// Get /users/:id { ...user }

// Update: endpoint que faz a atualização de dados do usuário
// PUT /users/:id { ...updatableUser }

// Delete: endpoint que remove um usuário
// DELETE /user/:id ''

const router = Router()

const createUser = async (req, res) => {
  res.status(201).header('Location', '/users/???').send({})
}
router.post('/users', withAsyncErrorHandler(createUser))

router.get('/', withAsyncErrorHandler(async (req, res) => {
  res.status(200).send({ users: [] })
}))

router.get('/:id', withAsyncErrorHandler(async (req, res) => {
  res.status(200).send({})
}))

router.put('/:id', withAsyncErrorHandler(async (req, res) => {
  res.status(200).send({})
}))

router.delete('/:id', withAsyncErrorHandler(async (req, res) => {
  res.status(204).send({})
}))

module.exports = router

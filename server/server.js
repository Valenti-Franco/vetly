import express from 'express'
import cors from 'cors'
import { getAllItems, saveItem } from './db/index.js'

const USER_TYPES = ['ADMIN', 'CLIENTE', 'PROFESIONAL', 'VETERINARIA']

const app = express()
const port = 5555

app.use(express.json())
app.use(cors())

// Endpoint to get all users
app.get('/api/Usuarios', (req, res) => {
  const users = getAllItems()

  res.status(200).json(users)
})

// Endpoint to signup user
app.post('/api/Usuario/RegistrarUsuario', (req, res) => {
  const { id_tipo_usuario: idUserType, email } = req.body
  const users = getAllItems()
  const userType = USER_TYPES[idUserType] || USER_TYPES[1]
  const lastUserId = users[users.length - 1]?.id || 0

  const newUser = {
    id: lastUserId + 1,
    email,
    tipo_usuario: userType,
    familias_asignadas: null,
    patentes_individuales_asignadas: null,
    patentes_por_familia_asignadas: null
  }

  users.push(newUser)
  saveItem(users)

  res.status(201).json({
    message: 'Usuario insertado exitosamente',
    newUser
  })
})

// Endpoint to login user
app.post('/api/Usuario/LoginPerfilByEmail', (req, res) => {
  const { email } = req.body
  const users = getAllItems()
  const user = users.find(u => u.email === email)

  if (user) {
    res.json(user)
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' })
  }

  res.send()
})

// Endpoint to update user type
app.patch('/api/Usuario/ActualizarUsuario', (req, res) => {
  const { email, idNewType } = req.body
  const users = getAllItems()
  const userIndex = users.findIndex(user => user.email === email)
  const userType = USER_TYPES[idNewType] || USER_TYPES[1]

  if (userIndex === -1) { // Doesn't exists
    res.status(404).json({ message: 'Usuario no encontrado' })
    return
  }

  users[userIndex].tipo_usuario = userType
  saveItem(users)

  res.status(200).json({
    message: 'Usuario actualizado exitosamente',
    updatedUser: users[userIndex]
  })
})

// Endpoint to get all categories
app.get('/api/CategoriasProducto/getCategoriasProducto', (req, res) => {
  const categoriesJSON = getAllItems('categories')

  res.status(200).json(categoriesJSON.categories)
})

// Endpoint to get categories by user type
app.get('/api/CategoriasProducto/getCategoriasProducto/:type', (req, res) => {
  const { type } = req.params
  const categoriesJSON = getAllItems('categories')
  const categoriesByType = categoriesJSON.userTypes[type.toLocaleLowerCase()]

  if (categoriesByType) {
    const categories = categoriesByType.map(id => {
      return categoriesJSON.categories.find(cat => cat.id === id)
    })

    res.json(categories)
  } else {
    res.status(404).json({ error: 'Tipo de usuario no encontrado' })
  }
})

app.listen(port, () => {
  console.log(`API server is running at http://localhost:${port}`)
})

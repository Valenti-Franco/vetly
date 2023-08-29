const API_URL = import.meta.env.VITE_API_URL

export async function getUserByEmail (email) {
  try {
    const response = await fetch(`${API_URL}/api/Usuario/LoginPerfilByEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })

    if (!response.ok) {
      throw new Error('Error al obtener el usuario')
    }

    const user = await response.json()
    // Aqui solo devuelvo la informacion necesaria por el momento
    const userInfo = {
      email: user.email,
      type: user.tipo_usuario
    }
    return userInfo
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function registerUser (user) {
  const newUser = {
    email: user.email,
    id_tipo_usuario: user.type
  }

  try {
    const response = await fetch(`${API_URL}/api/Usuario/RegistrarUsuario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })

    if (!response.ok) {
      throw new Error('Error al registrar el usuario')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function updateUserType (email, type) {
  const newUser = {
    email,
    idNewType: type
  }

  try {
    const response = await fetch(`${API_URL}/api/Usuario/ActualizarUsuario`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })

    if (!response.ok) {
      throw new Error('Error al actualizar el usuario')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

const API_URL = import.meta.env.VITE_API_URL

export async function getCategoriesByUserType (type = 'invitado') {
  try {
    const response = await fetch(`${API_URL}/api/CategoriasProducto/getCategoriasProducto/${type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Error al obtener las categorias')
    }

    const categories = await response.json()
    // Mapeo la respuesta de la API para adaptarla al uso de la aplicacion
    const mappedCategories = categories.map(item => ({
      id: item.id,
      name: item.categoria_producto,
      icon: item.icono
    }))

    return mappedCategories
  } catch (error) {
    console.error(error)
    throw error
  }
}

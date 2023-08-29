import { useState, useEffect } from 'react'
import { getCategoriesByUserType } from '../services/categories'
import { useUser } from './useUser'

export function useCategories () {
  const { user } = useUser()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      try {
        const fetchedCategories = await getCategoriesByUserType(user.type) // Llamado a una API para obtener las categorias especificas para el tipo de usuario
        setCategories(fetchedCategories)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    if (user) {
      getCategories()
    }
  }, [user])

  return { categories }
}

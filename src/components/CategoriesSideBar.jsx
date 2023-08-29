import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { CategoriesSideBarLoader } from './Loaders'

export function CategoriesSideBar ({ categories, selectCategory }) {
  const { isLoading } = useAuth0()
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false) // Estado para controlar si el menú de categorías está abierto

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen)
  }

  if (isLoading) {
    return <CategoriesSideBarLoader />
  }

  return (
    <aside className='w-full h-auto md:w-80 md:h-full'>
      <div className='h-full px-3 py-4 rounded-lg shadow-lg'>
        <h3
          className='text-xl font-bold border-b-2 cursor-pointer flex items-center'
          onClick={toggleCategories}
        >
          Categorías

        </h3>

        <button
          className={`hamburger-button text-gray-900 md:hidden ${
            isCategoriesOpen ? 'open' : ''
          }`}
          onClick={toggleCategories}
        >
          {/* Icono de hamburguesa */}
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
        {isCategoriesOpen && ( // Mostrar las opciones de categorías si el menú está abierto
          <ul
            className={`categories-list flex items-center flex-wrap space-y-2 font-medium md:block ${
             isCategoriesOpen ? 'open' : ''
           }`}
          >
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => selectCategory(category)}
                  className='w-full flex items-center p-2 text-gray-900 rounded-lg hover:bg-gradient-to-br from-purple-600 to-blue-500 hover:text-white'
                >
                  {category.icon}
                  <span className='ml-3'>{category.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  )
}

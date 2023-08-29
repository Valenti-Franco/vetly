import { useAuth0 } from '@auth0/auth0-react'

export const LoginButton = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

  const handleClick = () => {
    if (isAuthenticated) {
      logout({ logoutParams: { returnTo: window.location.origin } })
      return
    }

    loginWithRedirect({
      authorizationParams: {
        ui_locales: 'es'
      }
    })
  }

  return (
    <button onClick={handleClick} className='w-52 inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300'>
      <span className='w-52 px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0'>
        {isAuthenticated ? 'Cerrar Sesión' : 'Iniciar Sesión'}
      </span>
    </button>
  )
}

export const SignUpButton = () => {
  const { loginWithRedirect } = useAuth0()

  const handleClick = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
        ui_locales: 'es',
        redirect_uri: `${window.location.origin}/login`
      }
    })
  }

  return (
    <button onClick={handleClick} className='w-52 inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300'>
      <span className='w-52 px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0'>
        ¡Unirme a Vetly!
      </span>
    </button>
  )
}

import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import { LoginButton } from './Auth'
import { AvatarIcon } from './Icons'
import { Link } from 'wouter'

export function UserNav () {
  const [isShow, setIsShow] = useState(false)
  const { isAuthenticated, isLoading, user } = useAuth0()
  // const { user } = useUser()

  const handleClick = (e) => {
    setIsShow(!isShow)
  }

  const onMouseOut = () => {
    setIsShow(false)
  }

  return (
    <div>
      {isAuthenticated && !isLoading
        ? <img onClick={handleClick} className='w-7 h-7 rounded-full cursor-pointer bg-gray-500' src={user.picture} alt={`${user.name} picture`} />
        : <AvatarIcon onClick={(e) => handleClick(e)} className='w-5 h-5 cursor-pointer' />}
      <div onMouseLeave={onMouseOut} className={`${isShow ? '' : 'hidden'} absolute right-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow`}>
        <div className='flex flex-col justify-center items-center p-4'>
          <Link to='/user' className='w-52 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'>
            Mi cuenta
          </Link>
          <LoginButton />
        </div>
      </div>
    </div>
  )
}

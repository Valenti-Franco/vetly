import { useAuth0 } from '@auth0/auth0-react'
import { useUser } from '../hooks/useUser'
import { LoginButton } from './Auth'
import { AvatarIcon } from './Icons'
import { UserCardLoader } from './Loaders'

export function UserCard ({ buttonAction }) {
  const { user, isAuthenticated, isLoading } = useAuth0()
  const { userTypes, user: contextUser } = useUser()
  const userType = userTypes.find(userType => userType.type === contextUser.type)

  if (isLoading) {
    return (
      <div className='w-full max-w-lg h-96 self-center border-gray-200 rounded-lg shadow'>
        <UserCardLoader />
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <article className='w-full max-w-lg h-96 self-center bg-white border border-gray-200 rounded-lg shadow flex flex-col items-center justify-center'>
        <img className='w-24 h-24 mb-3 rounded-full shadow-lg' src={user?.picture} alt={`${user?.name} picture`} />
        <h5 className='mb-1 text-xl font-medium'>{user?.name}</h5>
        <div className='inline-flex items-center justify-center gap-1'>
          <span className='w-8'>{userType?.icon}</span>
          <span className='text-lg text-violet-500'>{userType?.label}</span>
        </div>
        <div className='flex flex-col gap-5 mt-4 md:mt-6'>
          <LoginButton />
        </div>
      </article>
    )
  }

  return (
    <article className='w-full max-w-lg h-96 self-center bg-white border border-gray-200 rounded-lg shadow flex flex-col items-center justify-center pb-10'>
      <AvatarIcon className='w-10 h-10 mb-3 rounded-full shadow-lg' />
      <h5 className='mb-1 text-xl font-medium'>Invitado</h5>
      <div className='flex flex-col gap-5 mt-4 md:mt-6'>
        <LoginButton />
      </div>
    </article>
  )
}

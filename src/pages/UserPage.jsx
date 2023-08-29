import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useUser } from '../hooks/useUser'
import { UserCard } from '../components/UserCard'
import { PickTypeUser } from '../components/PickTypeUser.jsx'
import { AdminForm } from '../components/AdminForm'

export default function UserPage () {
  const [showEditor, setShowEditor] = useState(false)
  const [showAdminForm, setShowAdminForm] = useState(false)
  const { user } = useAuth0()
  const { updateType } = useUser()

  const handleEdit = (type) => {
    updateType(user.email, type)
    setShowEditor(false)
  }
  return (
    <section className='h-full flex flex-col'>
      <h2 className='text-3xl font-bold py-5'>Mi Cuenta</h2>
      <UserCard user={user} buttonAction={() => setShowEditor(!showEditor)} />

      <form>
        {showEditor && <PickTypeUser onPick={handleEdit} />}
      </form>

      {showAdminForm && <AdminForm closeModal={() => setShowAdminForm(false)} />}
    </section>
  )
}

import { useState } from 'react'
import { useUser } from '../hooks/useUser'

export function AdminForm ({ closeModal }) {
  const [password, SetPassword] = useState('')
  const { user, loginAsAdmin } = useUser()

  console.log('La contraseña es admin12345 🤫')

  const handleSumbit = (e) => {
    e.preventDefault()
    loginAsAdmin(user, password)
    closeModal()
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='absolute inset-0 bg-black opacity-50' />
      <div className='relative bg-white rounded-lg p-4 z-10'>
        <h2 className='text-lg font-semibold mb-2'>Ingresar como Administrador</h2>
        <form onSubmit={handleSumbit} className='mt-4'>
          <label className='block mb-2'>Ingrese la contraseña de administrador</label>
          <input
            type='password'
            className='border rounded-lg px-3 py-2 w-full'
            placeholder='••••••••'
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
          />
          <button type='submit' className='w-full mt-5 bg-white border border-gray-300 hover:bg-gray-100 text-sm rounded-lg px-5 py-2.5'>
            Entrar
          </button>
          <button type='button' className='absolute right-2 -top-3 mt-4 bg-white text-dark px-4 py-2 rounded-lg' onClick={closeModal}>
            X
          </button>
        </form>
      </div>
    </div>
  )
}

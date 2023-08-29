import { useState } from 'react'
import { useUser } from '../hooks/useUser'

export function PickTypeUser ({ onPick }) {
  const { userTypes } = useUser()
  const [selectedType, setSelectedType] = useState(null)

  return (
    <div className='mt-10 px-3 grid place-items-center'>
      <h3 className='mb-5 text-lg font-medium'>Seleccione el tipo de usuario:</h3>
      <ul className='grid place-items-center grid-cols-3 w-full max-w-lg gap-6 md:grid-cols-3'>
        {userTypes.slice(1).map((userType, index) => {
          const Icon = () => userType.icon
          return (
            <li key={index} className='inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300'>
              <input type='radio' id={userType.label} name='userType' onChange={() => setSelectedType(userType.id)} className='hidden peer' />
              <label htmlFor={userType.label} className='w-24 h-24 md:w-auto md:h-auto md:p-5 flex flex-col items-center justify-center bg-white border-gray-200 rounded-md cursor-pointer transition-all ease-in duration-75 group-hover:bg-opacity-0 group-hover:fill-white peer-checked:bg-opacity-0 peer-checked:fill-white peer-checked:text-white'>
                <span className='w-8 h-8 md:w-28 md:h-28 pointer-events-none'>
                  <Icon />
                </span>
                <div className='w-full text-sm md:text-lg text-center font-semibold'>{userType.label}</div>
              </label>
            </li>
          )
        })}
      </ul>
      <button type='submit' onClick={() => onPick(selectedType)} className='w-full max-w-lg mt-5 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 shadow-lg shadow-purple-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>Seleccionar</button>
    </div>
  )
}

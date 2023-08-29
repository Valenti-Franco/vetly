import { Link } from 'wouter'
import { UserNav } from './UserNav'
import logo from '../components/logo.jpg'

export function Navbar () {
  return (
    <nav className='relative flex flex-wrap items-center justify-between gap-5 mx-auto p-4 border-b-[1px] border-gray-200 container'>
      <h1 className='self-center text-purple-600 text-2xl md:text-4xl font-bold whitespace-nowrap '>
        <Link href='/'><a className='link'><img src={logo} alt='logo' /></a></Link>
      </h1>
      <div className='hidden md:block'>
        <input type='search' placeholder='Buscar...' className='w-80 p-2 text-sm border border-gray-300 rounded-lg bg-gray-50' />
      </div>
      <div>
        <ul className='flex gap-5 [&>li:hover]:underline '>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li><Link to='/login'>Login</Link></li>
          <li>
            <UserNav />
          </li>
        </ul>
      </div>
    </nav>
  )
}

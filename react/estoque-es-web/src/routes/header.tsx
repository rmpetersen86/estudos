import { Outlet } from 'react-router-dom'
import storageIcon from '../assets/storage-package-svgrepo-com.svg'
import { NavLink } from '../components/nav-link'

export function Header() {
  return (
    <div className='flex flex-col gap-4'>
    <div className='flex items-center gap-5'>
      <img src={storageIcon} className='w-10'/>

      <nav className='flex items-center gap-5 py-2'>
        <NavLink href='/storage/list'>Estoques</NavLink>
        <NavLink href='/place/list'>Locais</NavLink>
        <NavLink href='/items/list'>Itens</NavLink>
      </nav>     
    </div>
      <Outlet />
    </div>
  )
}
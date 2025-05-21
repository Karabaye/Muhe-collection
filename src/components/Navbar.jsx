import React, {useState} from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
function Navbar() {
    const [visible, setVisible] = useState(false)
  return (
    <div className='flex justify-between items-center py-4 font-medium'>

     <Link to='/'><img src={assets.logo} className='w-32' alt="" /></Link>
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
          <NavLink to='/' className='flex flex-col items-center gap-1'>
           <p>HOME</p>
           <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
            <NavLink to='/collection' className='flex flex-col items-center gap-1'>
             <p>COLLECTION</p>
             <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/about' className='flex flex-col items-center gap-1'>
             <p>ABOUT</p>
             <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/contact' className='flex flex-col items-center gap-1'>
             <p>CONTACT</p>
             <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
      </ul>
 
        <div className='flex item-center gap-5'>
           <img src={assets.search_icon} className='w-5 cursor-pointer' alt="" /> 

           <div className='group relative'>
             <img className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
             <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                <div className='flex flex-col gap-2 w-36 py-5 px-5 bg-slate-100 text-gray-500 rounded'>
                   <p className='cursor-pointer hover:text-black'>My Profile</p>
                   <p className='cursor-pointer hover:text-black'>Orders</p>
                   <p className='cursor-pointer hover:text-black'>Logout</p>
                </div>
             </div>
           </div>
           <Link to='/cart' className='relative'>
              <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
              <p className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-1 rounded'>12</p>
           </Link>
           <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 z-50 overflow-hidden bg-white transition-all duration-300 ${visible ? 'w-full' : 'w-0'} sm:hidden`}>
    <div className='flex flex-col text-gray-600 h-full'>
        <div onClick={() => setVisible(false)} className='flex flex-row items-center gap-2 p-3 cursor-pointer'>
    <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
    <p>Back</p>
   </div>
      <NavLink onClick={() => setVisible(false)} className='py-2 px-3 hover:bg-gray-100' to='/'>HOME</NavLink>
      <NavLink onClick={() => setVisible(false)} className='py-2 px-3 hover:bg-gray-100' to='/collection'>COLLECTION</NavLink>
      <NavLink onClick={() => setVisible(false)} className='py-2 px-3 hover:bg-gray-100' to='/about'>ABOUT</NavLink>
      <NavLink onClick={() => setVisible(false)} className='py-2 px-3 hover:bg-gray-100' to='/contact'>CONTACT</NavLink>
    </div>
     </div>
    </div>
  )
}

export default Navbar

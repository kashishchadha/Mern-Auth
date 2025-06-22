import React from 'react'
import { Link } from 'react-router-dom'
function Header() {
  return (
    <div className=' bg-slate-200 '>
<div className='flex justify-between items-center'>
       <Link to='/'><h1 className='font-bold text-2xl p-7'>Auth-Mern</h1></Link>

        <ul className='flex gap-4 text-lg font-semibold p-7'>

            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/signin'>Signin</Link></li>
            <li><Link to='/signup'>Signup</Link></li>
        </ul>
    </div>
    </div>
  )
}

export default Header
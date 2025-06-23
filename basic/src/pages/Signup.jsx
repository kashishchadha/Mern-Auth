import React from 'react'
import { Link } from 'react-router-dom'
function Signup() {
  return (
<div className='p-3 max-w-lg mx-auto'>

  <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
<form className='flex flex-col gap-4'>
  <input type='text' placeholder='username' className='bg-slate-100 p-3 rounded-lg'/>
  <input type='email' placeholder='email' className='bg-slate-100 p-3 rounded-lg my-3'/>
  <input type='password' placeholder='password' className='bg-slate-100 p-3 rounded-lg mb-3'/>
  <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign up</button>
</form>
<div className='flex  gap-2 mt-5'>
<p>Have an account?</p>
<Link to='/signin' ><span className='text-blue-500'>Sign In</span></Link>
</div>
</div>
  )
}

export default Signup
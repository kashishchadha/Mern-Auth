import React from 'react'
import { useSelector } from 'react-redux'
import {useRef} from 'react'
function Profile() {
  const fileref = useRef(null);
  const { user } = useSelector((state) => state.user);
  return (
    
 <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form  className='flex flex-col gap-4'>
        <input
          type='file' ref={fileref} hidden accept='image/* '></input>
<img onClick={() => fileref.current.click()} src={user.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4UqtveShnljVRyv6Yjhhl34q5wROeK1NZwA&s"} alt='profile' className='h-24 w-24 rounded-full self-center cursor-pointer object-cover mt-2' />
  <input
          defaultValue={user.username}
          type='text'
          id='username'
          placeholder='Username'
          className='bg-slate-100 rounded-lg p-3'
       
        />
        <input
          defaultValue={user.email}
          type='email'
          id='email'
          placeholder='Email'
          className='bg-slate-100 rounded-lg p-3'
         
        />
        <input
          type='password'
          id='password'
          placeholder='Password'
          className='bg-slate-100 rounded-lg p-3'
         
        />
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          Update
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span
      
          className='text-red-700 cursor-pointer'
        >
          Delete Account
        </span>
        <span className='text-red-700 cursor-pointer'>
          Sign out
        </span>
        </div>
    </div>
  );
}

export default Profile
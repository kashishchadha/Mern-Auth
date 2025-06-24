import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { signinstart,signinSuccess,signinFailure } from '../redux/user/userSlice'
import { useDispatch ,useSelector} from 'react-redux';
function Signin() {
  const [formdata, setFormdata] = useState({})
 const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlechange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value })
  }

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    dispatch(signinstart());
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formdata)
    });
    const data = await res.json();

    if (data.status === 'error' || data.success === false) {
      dispatch(signinFailure(data.message || "Sign in failed"));
      return;
    }

    dispatch(signinSuccess(data));
    setFormdata({});
    navigate('/');
  } catch (error) {
    dispatch(signinFailure("Network error"));
  }
};
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input  value={formdata.email || ""} type='email' id='email' placeholder='email' className='bg-slate-100 p-3 rounded-lg my-3' onChange={handlechange} />
        <input value={formdata.password || ""} type='password' id='password' placeholder='password' className='bg-slate-100 p-3 rounded-lg mb-3' onChange={handlechange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading..' : 'Sign in'}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to='/signup'><span className='text-blue-500'>Sign up</span></Link>
      </div>
      <p className='text-red-700 mt-5'>{error ? error|| 'Something went wrong!' : ""}</p>
    </div>
  )
}

export default Signin
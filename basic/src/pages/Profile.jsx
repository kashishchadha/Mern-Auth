import React, { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signinSuccess, signout } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const fileref = useRef(null);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
    profilePicture: user?.profilePicture || ""
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    try {
      const res = await fetch(`/api/user/update/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signinSuccess(data));
        setMessage('Profile updated successfully!');
      } else {
        setError(data.message || 'Update failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const handleDelete = async () => {
    setMessage(null);
    setError(null);
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;
    try {
      const res = await fetch(`/api/user/delete/${user._id}`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signout());
        navigate('/signin');
      } else {
        setError(data.message || 'Delete failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const handleSignout = () => {
    dispatch(signout());
    navigate('/signin');
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type='file' ref={fileref} hidden accept='image/* ' />
        <img onClick={() => fileref.current.click()} src={formData.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4UqtveShnljVRyv6Yjhhl34q5wROeK1NZwA&s"} alt='profile' className='h-24 w-24 rounded-full self-center cursor-pointer object-cover mt-2' />
        <input
          value={formData.username}
          type='text'
          id='username'
          placeholder='Username' onChange={handleChange}
          className='bg-slate-100 rounded-lg p-3'
        />
        <input
          value={formData.email}
          type='email'
          id='email'
          placeholder='Email' onChange={handleChange}
          className='bg-slate-100 rounded-lg p-3'
        />
        <input
          value={formData.password}
          type='password'
          id='password'
          placeholder='Password' onChange={handleChange}
          className='bg-slate-100 rounded-lg p-3'
        />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          Update
        </button>
      </form>
      {message && <p className='text-green-600 mt-2'>{message}</p>}
      {error && <p className='text-red-600 mt-2'>{error}</p>}
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer' onClick={handleDelete}>
          Delete Account
        </span>
        <span className='text-red-700 cursor-pointer' onClick={handleSignout}>
          Sign out
        </span>
      </div>
    </div>
  );
}

export default Profile
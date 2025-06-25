import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { user } = useSelector((state) => state.user);
  return (
    <div className='bg-slate-200'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold'>Auth App</h1>
        </Link>
        <ul className='flex gap-4'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            {user ? (
              <Link to='/profile'>
                <img
                  src={user.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4UqtveShnljVRyv6Yjhhl34q5wROeK1NZwA&s"}
                  alt='profile'
                  className='h-7 w-7 rounded-full object-cover'
                />
              </Link>
            ) : (
              <Link to='/signin'>Sign In</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
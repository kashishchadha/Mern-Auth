import React from 'react'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signinSuccess } from '../redux/user/userSlice';

function Oauth() {  
  const dispatch = useDispatch();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log("Google sign-in successful:", result);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          photo: result.user.photoURL,
          name: result.user.displayName,
          email: result.user.email
        })
      });
      const data = await res.json();
      if (data.user) {
        dispatch(signinSuccess(data.user)); // Only the user object!
      }
    } catch (error) {
      console.log("Google sign-in failed:", error);
    }
  };

  return (
    <>
      <button
        type='button'
        onClick={handleGoogleSignIn}
        className='bg-red-700 text-white rounded-lg p-3 hover:opacity-80'
      >
        Continue with Google
      </button>
    </>
  );
}

export default Oauth
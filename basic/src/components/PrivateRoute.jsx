import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

function PrivateRoute() {
  const { user } = useSelector((state) => state.user)

  return user ? <Outlet /> : <Navigate to='/signin' />
}

export default PrivateRoute
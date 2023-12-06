import React, { ReactElement } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import DefaultLayout from '../layout/DefaultLayout'

const PrivateRoutes = () => {
  const res = localStorage.getItem('auth-token')

  return res ? (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  ) : ( 
    <Navigate to="/login" />
  )
}

export default PrivateRoutes

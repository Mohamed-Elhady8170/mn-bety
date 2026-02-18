import React from 'react'
import { Outlet } from 'react-router-dom';
import AuthNavbar from '../Components/AuthNavbar';
import AuthFooter from '../Components/AuthFooter';

export default function AuthLayout() {
  return (
   <>
      <AuthNavbar />
      <main >
        <Outlet /> 
      </main>
      <AuthFooter />
    </>
  )
}

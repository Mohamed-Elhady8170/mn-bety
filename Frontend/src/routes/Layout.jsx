
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../roles/Users/Components/Navbar';
import Footer from '../roles/Users/Components/Footer';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> 
      </main>
      <Footer />
    </>
  );
};

export default Layout;
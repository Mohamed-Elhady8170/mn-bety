
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../roles/Users/Components/Navbar';
import Footer from '../roles/Users/Components/Footer';

const Layout = () => {
  return (
    <>
      <Navbar className="print:hidden"/>
      <main>
        <Outlet /> 
      </main>
      <Footer className="print:hidden" />
    </>
  );
};

export default Layout;
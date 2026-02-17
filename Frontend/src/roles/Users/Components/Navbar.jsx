import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const navLinkStyles = ({ isActive }) => 
    `hover:text-blue-500 transition-colors duration-300 ${isActive ? 'text-blue-600 font-bold border-b-2 border-blue-600' : 'text-gray-700'}`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
       
        <div className="text-2xl font-bold text-gray-800">
          {"هادي ماركت"}
        </div>
        <div className="hidden md:flex space-x-8 items-center">
          <NavLink to="/" className={navLinkStyles}>
            Home
          </NavLink>
          
          <NavLink to="/about" className={navLinkStyles}>
            About
          </NavLink>
          
          <NavLink to="/services" className={navLinkStyles}>
            Services
          </NavLink>
          
          <NavLink to="/contact" className={navLinkStyles}>
            Contact
          </NavLink>
        </div>

        <div className=" ">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>


      </div>
    </nav>
  );
};

export default Navbar;
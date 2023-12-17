// Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext.js';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  return (
    <nav className="bg-green p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-white text-xl font-bold" activeClassName="text-yellow-500">
          RhythmicLlama
        </NavLink>

        <div className="flex space-x-4">
          {isLoggedIn ? (
            <>
              <NavLink to="/my-songs" className="text-white" activeClassName="text-yellow-500">
                My Songs
              </NavLink>
              <button className="text-white" onClick={logout}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="text-white" activeClassName="text-yellow-500">
                Login
              </NavLink>
              <NavLink to="/register" className="text-white" activeClassName="text-yellow-500">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

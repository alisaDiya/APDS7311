import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './NavBar.css';

const NavBar = ({ token, setToken }) => {
  const handleLogout = () => {
    setToken('');
  };

  let userInfo = null;
  if (token) {
    userInfo = jwtDecode(token);
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          PaymentHub
        </Link>
        
        <ul className="nav-links">
          {userInfo && (
            <li className="user-info">
              Welcome, {userInfo.username}
              {userInfo.role === 'admin' && <span>Admin</span>}
            </li>
          )}
          
          {!token ? (
            <>
              <li>
                <Link to="/register">Sign Up</Link>
              </li>
              <li>
                <Link to="/login">Sign In</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/payments">Payments</Link>
              </li>
              {userInfo.role === 'admin' && (
                <li>
                  <Link to="/admin/register">Register Users</Link>
                </li>
              )}
              <li>
                <button className="nav-button" onClick={handleLogout}>
                  Sign Out
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

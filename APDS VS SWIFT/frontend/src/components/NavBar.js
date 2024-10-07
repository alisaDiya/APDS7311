import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li style={{ display: 'inline', marginRight: '20px' }}>
          <Link to="/">Home</Link>
        </li>
        <li style={{ display: 'inline', marginRight: '20px' }}>
          <Link to="/register">Register</Link>
        </li>
        <li style={{ display: 'inline', marginRight: '20px' }}>
          <Link to="/login">Login</Link>
        </li>
        <li style={{ display: 'inline', marginRight: '20px' }}>
          <Link to="/posts">Posts</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

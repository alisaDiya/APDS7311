// src/components/RegisterUser.js
import React, { useState } from 'react';
import axios from 'axios';

const RegisterUser = ({ token }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [role, setRole] = useState('user');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/api/users/register',
        { username, password, email, idNumber, role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('User registered successfully!');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Registration failed. Please check your input and try again.');
    }
  };

  return (
    <div>
      <h2>Admin: Register a New User</h2>
      <form onSubmit={handleRegister}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} placeholder="ID Number" required />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterUser;

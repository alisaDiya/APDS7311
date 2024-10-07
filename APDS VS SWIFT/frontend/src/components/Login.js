
import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; 

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:3000/api/users/login', {
        username,
        password,
      });
      setToken(response.data.token);
      alert('Login successful!');
    } catch (error) {
      console.error('Error logging in:', error);
      const errorMessage = error.response ? error.response.data.error : 'Login failed, please try again.';
      alert(`Error logging in: ${errorMessage}`);
    }
  };

  return (
    <form onSubmit={handleLogin} className="form-container">
      <h2>Login</h2>
      <div className="input-container">
        <label>Username:</label>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="input-container">
        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submit-btn">Login</button>
    </form>
  );
};

export default Login;



import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:3000/api/users/register', {
        username,
        password,
        email,
        idNumber,
      });
      console.log('User registered:', response.data);
      alert('Registration successful!');
    } catch (error) {
      console.error('Error registering user:', error);

      let errorMessage = 'Registration failed.';

      if (error.response) {
        // Check for validation errors
        if (error.response.data.errors) {
          const validationErrors = error.response.data.errors.map(err => err.msg).join('\n');
          errorMessage += `\n\nValidation Errors:\n${validationErrors}`;
        } else if (error.response.data.error) {
          errorMessage += `\n\n${error.response.data.error}`;
        }
      } else {
        errorMessage += '\n\nAn unknown error occurred. Please try again later.';
      }

      alert(errorMessage);
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="input-container">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>ID Number:</label>
          <input
            type="text"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
};

export default Register;










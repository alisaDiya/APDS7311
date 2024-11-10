import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const AdminRegister = ({ token }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    idNumber: '',
    role: 'user'
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await axios.post(
        'https://localhost:3000/api/users/create',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessMessage('User registered successfully!');
      setFormData({
        username: '',
        password: '',
        email: '',
        idNumber: '',
        role: 'user'
      });
    } catch (error) {
      let message = 'Registration failed.';
      if (error.response?.data?.errors) {
        message = error.response.data.errors
          .map(err => err.message)
          .join('\n');
      } else if (error.response?.data?.error) {
        message = error.response.data.error;
      }
      setErrorMessage(message);
    }
  };

  return (
    <div className="form-container">
      <h2>Register New User</h2>
      {errorMessage && (
        <div className="error-messages">
          <p>{errorMessage}</p>
        </div>
      )}
      {successMessage && (
        <div className="success-message">
          <p>{successMessage}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <label>ID Number:</label>
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <label>Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="form-select"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">Register User</button>
      </form>
    </div>
  );
};

export default AdminRegister; 
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Register from './components/Register';
import Login from './components/Login';
import Payment from './components/Payment';
import HomePage from './components/HomePage';
import AdminRegister from './components/AdminRegister';
import './App.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <Router>
      <div className="App">
        <NavBar token={token} setToken={setToken} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route
            path="/payments"
            element={token ? <Payment token={token} /> : <p>Please log in to view payments</p>}
          />
          <Route
            path="/admin/register"
            element={token ? <AdminRegister token={token} /> : <p>Please log in to access this page</p>}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

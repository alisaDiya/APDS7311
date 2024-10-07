
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Updated import
import NavBar from './components/NavBar';
import Register from './components/Register';
import Login from './components/Login';
import Posts from './components/Posts';
import './App.css';

const App = () => {
  const [token, setToken] = useState('');

  return (
    <Router>
      <div className="App">
        <NavBar />
        <header className="App-header">
          <Routes>  {/* Updated Switch to Routes */}
            <Route path="/" element={<h1>Welcome to the APDS7311 Application</h1>} />
            <Route path="/" element={<h2>Ethan Robinson, Jordan Betts, Jared Herbst, Alisa , Tk Myende</h2>} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/posts" element={token ? <Posts token={token} /> : <p>Please log in to view posts</p>} />
          </Routes>
        </header>
      </div>
    </Router>
  );
};

export default App;



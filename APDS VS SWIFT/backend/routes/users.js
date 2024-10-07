
const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

// Initialize router
const router = express.Router();

// Define RegEx patterns
const usernamePattern = /^[a-zA-Z0-9]+$/; 
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/; 

// Registration Route with input validation
router.post('/register', [
  body('username')
    .matches(usernamePattern).withMessage('Username must be alphanumeric and contain no special characters.')
    .notEmpty().withMessage('Username is required'),
  body('password')
    .matches(passwordPattern).withMessage('Password must have at least one uppercase letter, one lowercase letter, one number, and be at least 6 characters long.')
    .notEmpty().withMessage('Password is required'),
  body('email')
    .isEmail().withMessage('Please provide a valid email address.')
    .notEmpty().withMessage('Email is required'),
  body('idNumber')
    .isNumeric().withMessage('ID number must be numeric.')
    .notEmpty().withMessage('ID number is required')
], async (req, res) => {
  
  console.log('Incoming registration request:', req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, email, idNumber } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('Username already in use:', username);
      return res.status(400).json({ error: 'Username already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      idNumber,
      createdAt: new Date(), 
    });

    // Save the user to db
    await newUser.save();

    console.log('User registered successfully:', newUser);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Compare the password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Successful login
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Export the router
module.exports = router;


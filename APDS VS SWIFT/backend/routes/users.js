const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Registration Route (Accessible by anyone)
router.post(
  '/register',
  [
    // Username Validation
    body('username')
      .matches(/^[a-zA-Z0-9]+$/)
      .withMessage('Username must be alphanumeric and contain no special characters.')
      .notEmpty()
      .withMessage('Username is required'),

    // Password Validation
    body('password')
      .notEmpty()
      .withMessage('Password is required.')
      .bail()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long.')
      .matches(/[a-z]/)
      .withMessage('Password must contain at least one lowercase letter.')
      .matches(/[A-Z]/)
      .withMessage('Password must contain at least one uppercase letter.')
      .matches(/\d/)
      .withMessage('Password must contain at least one number.'),

    // Email Validation
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email address.')
      .notEmpty()
      .withMessage('Email is required'),

    // ID Number Validation
    body('idNumber')
      .isNumeric()
      .withMessage('ID number must be numeric.')
      .notEmpty()
      .withMessage('ID number is required'),
  ],
  async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      }));
      return res.status(400).json({ errors: errorMessages });
    }

    const { username, password, email, idNumber } = req.body;

    try {
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already in use' });
      }

      // Check if the email already exists
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ error: 'Email already in use' });
      }

      // Check if the ID number already exists
      const existingIdNumber = await User.findOne({ idNumber });
      if (existingIdNumber) {
        return res.status(400).json({ error: 'ID Number already in use' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user with default role 'user'
      const newUser = new User({
        username,
        password: hashedPassword,
        email,
        idNumber,
        createdAt: new Date(),
        role: 'user',
      });

      // Save the user to the database
      await newUser.save();

      // Generate JWT token
      const payload = {
        userId: newUser._id,
        username: newUser.username,
        role: newUser.role,
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
      console.error('Error registering user:', error);

      if (error.code === 11000) {
        const duplicateField = Object.keys(error.keyValue)[0];
        return res.status(400).json({ error: `${duplicateField} already in use` });
      }

      res.status(500).json({ error: 'Server error during registration' });
    }
  }
);

// Login Route (Accessible by anyone)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Compare the password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Generate JWT token
    const payload = {
      userId: user._id,
      username: user.username,
      role: user.role,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    // Successful login
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Create User (Admin Only)
router.post(
  '/create',
  auth('admin'),
  [
    // Username Validation
    body('username')
      .matches(/^[a-zA-Z0-9]+$/)
      .withMessage('Username must be alphanumeric and contain no special characters.')
      .notEmpty()
      .withMessage('Username is required'),

    // Password Validation
    body('password')
      .notEmpty()
      .withMessage('Password is required.')
      .bail()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long.')
      .matches(/[a-z]/)
      .withMessage('Password must contain at least one lowercase letter.')
      .matches(/[A-Z]/)
      .withMessage('Password must contain at least one uppercase letter.')
      .matches(/\d/)
      .withMessage('Password must contain at least one number.'),

    // Email Validation
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email address.')
      .notEmpty()
      .withMessage('Email is required'),

    // ID Number Validation
    body('idNumber')
      .isNumeric()
      .withMessage('ID number must be numeric.')
      .notEmpty()
      .withMessage('ID number is required'),

    // Role Validation
    body('role')
      .optional()
      .isIn(['user', 'admin'])
      .withMessage('Role must be either user or admin'),
  ],
  async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      }));
      return res.status(400).json({ errors: errorMessages });
    }

    const { username, password, email, idNumber, role } = req.body;

    try {
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already in use' });
      }

      // Check if the email already exists
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ error: 'Email already in use' });
      }

      // Check if the ID number already exists
      const existingIdNumber = await User.findOne({ idNumber });
      if (existingIdNumber) {
        return res.status(400).json({ error: 'ID Number already in use' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user with specified role
      const newUser = new User({
        username,
        password: hashedPassword,
        email,
        idNumber,
        createdAt: new Date(),
        role: role || 'user',
      });

      // Save the user to the database
      await newUser.save();

      res.status(201).json({ message: 'User created successfully by admin' });
    } catch (error) {
      console.error('Error creating user:', error);

      if (error.code === 11000) {
        const duplicateField = Object.keys(error.keyValue)[0];
        return res.status(400).json({ error: `${duplicateField} already in use` });
      }

      res.status(500).json({ error: 'Server error during user creation' });
    }
  }
);

module.exports = router;

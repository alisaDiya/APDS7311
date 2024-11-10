const express = require('express');
const { body, validationResult } = require('express-validator');
const Payment = require('../models/Payment');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a Payment (Accessible by authenticated users)
router.post(
  '/',
  auth(['user', 'admin']),
  [
    body('bankDetails.accountNumber')
      .notEmpty()
      .withMessage('Account Number is required'),
    body('bankDetails.bankName').notEmpty().withMessage('Bank Name is required'),
    body('bankDetails.routingNumber')
      .notEmpty()
      .withMessage('Routing Number is required'),
    body('amount')
      .isNumeric()
      .withMessage('Amount must be a number')
      .notEmpty()
      .withMessage('Amount is required'),
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

    const { bankDetails, amount } = req.body;

    try {
      // Create a new payment
      const newPayment = new Payment({
        user: req.user.userId,
        bankDetails,
        amount,
        status: 'pending',
        createdAt: new Date(),
      });

      // Save the payment to the database
      await newPayment.save();

      res.status(201).json({ message: 'Payment created successfully', payment: newPayment });
    } catch (error) {
      console.error('Error creating payment:', error);
      res.status(500).json({ error: 'Server error during payment creation' });
    }
  }
);

// Get Payments (Accessible by authenticated users)
router.get('/', auth(['user', 'admin']), async (req, res) => {
  try {
    let payments;

    if (req.user.role === 'admin') {
      // Admins can see all payments
      payments = await Payment.find().populate('user', 'username email');
    } else {
      // Users can see only their own payments
      payments = await Payment.find({ user: req.user.userId });
    }

    res.status(200).json({ payments });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ error: 'Server error during fetching payments' });
  }
});

// Mark Payment as Complete (Admin Only)
router.put('/:id/complete', auth('admin'), async (req, res) => {
  const paymentId = req.params.id;

  try {
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    payment.status = 'completed';
    await payment.save();

    res.status(200).json({ message: 'Payment marked as complete', payment });
  } catch (error) {
    console.error('Error updating payment:', error);
    res.status(500).json({ error: 'Server error during updating payment' });
  }
});

module.exports = router;

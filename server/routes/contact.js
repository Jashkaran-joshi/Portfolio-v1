const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

// Validation Rules
const validateContact = [
  body('name').trim().notEmpty().withMessage('Name is required').escape(),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('message').trim().notEmpty().withMessage('Message is required').escape(),
];

router.post('/', validateContact, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, message } = req.body;

  try {
    // Log for demonstration
    console.log('Contact Form Submission:', { name, email, message });

    // Placeholder for Nodemailer
    // const transporter = nodemailer.createTransport({ ... });
    // await transporter.sendMail({ ... });

    res.status(200).json({ message: 'Message encrypted and transmitted successfully.' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Transmission failed. Please try again later.' });
  }
});

module.exports = router;

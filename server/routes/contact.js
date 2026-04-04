const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { submitContactForm } = require('../controllers/contactController');

// Validation Rules
const validateContact = [
  body('name').trim().notEmpty().withMessage('Name is required').escape(),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('subject').optional().trim().escape().isLength({ max: 200 }),
  body('message').trim().notEmpty().withMessage('Message is required').escape(),
  body('website').optional().isEmpty().withMessage('Bot behavior detected'),
];

router.post('/', validateContact, submitContactForm);

module.exports = router;

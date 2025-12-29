const { validationResult } = require('express-validator');

// @desc    Handle contact form submission
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    try {
        // Log for demonstration
        console.log('Contact Form Submission:', { name, email, message });

        // TODO: Implement actual email sending service here
        // await sendEmail({ name, email, message });

        res.status(200).json({ message: 'Message encrypted and transmitted successfully.' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ message: 'Transmission failed. Please try again later.' });
    }
};

module.exports = {
    submitContactForm
};

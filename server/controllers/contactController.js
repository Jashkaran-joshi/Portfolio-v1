const { validationResult } = require('express-validator');
const Contact = require('../models/Contact');

// Custom Rate Limiting (In-Memory) - Kept for basic protection
const rateLimitMap = new Map();
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5; // 5 submissions per 15 mins per IP

// Simple cleanup for rate limit map
setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of rateLimitMap.entries()) {
        if (now - data.startTime > WINDOW_MS) {
            rateLimitMap.delete(ip);
        }
    }
}, WINDOW_MS);

// Helper to check rate limit
const checkRateLimit = (ip) => {
    const now = Date.now();
    const data = rateLimitMap.get(ip) || { count: 0, startTime: now };

    if (now - data.startTime > WINDOW_MS) {
        data.count = 1;
        data.startTime = now;
    } else {
        data.count++;
    }

    rateLimitMap.set(ip, data);
    return data.count <= MAX_REQUESTS;
};

// @desc    Handle contact form submission
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res) => {
    // 1. Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message, subject } = req.body;
    const clientIp = req.ip || req.connection.remoteAddress;

    // 2. Spam Prevention (Basic)
    if (message.length > 5000) {
        return res.status(400).json({ message: 'Message too long.' });
    }

    // 3. Custom Rate Limiting
    if (!checkRateLimit(clientIp)) {
        return res.status(429).json({ message: 'Too many requests. Please try again later.' });
    }

    try {
        // 4. Save to Database
        const newContact = new Contact({
            name,
            email,
            subject: subject || 'No Subject',
            message,
            ip: clientIp
        });

        await newContact.save();

        res.status(200).json({ message: 'Message received and saved successfully.' });

    } catch (error) {
        console.error('Database Save Error:', error);
        res.status(500).json({ message: 'Failed to save message.' });
    }
};

module.exports = {
    submitContactForm
};

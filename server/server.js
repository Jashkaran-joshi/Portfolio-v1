const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust local proxy - essential for rate limiting behind Render/Vercel/Cloudflare
app.set('trust proxy', 1);

// Middleware
app.use(helmet());

// Global Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(limiter);

const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
const normalizedOrigin = clientUrl.endsWith('/') ? clientUrl.slice(0, -1) : clientUrl;

app.use(cors({
  origin: normalizedOrigin,
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start Server & Connect to DB
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
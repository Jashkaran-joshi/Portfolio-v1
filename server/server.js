const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

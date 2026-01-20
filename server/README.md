# Portfolio - Backend API

> Secure RESTful API built with Node.js, Express, and MongoDB for portfolio contact form management.

## 📌 Overview

The backend provides a secure API for the portfolio website, handling contact form submissions with comprehensive security measures including rate limiting, input validation, and spam prevention. All contact messages are stored in MongoDB with timestamps and IP logging for audit purposes.

## 🛠️ Tech Stack

### Core
- **Node.js** - JavaScript runtime
- **Express.js** 5.2.1 - Web framework
- **MongoDB** 9.0.2 (Mongoose) - NoSQL database

### Security
- **Helmet** 8.1.0 - Security headers (XSS, CSP, HSTS, etc.)
- **CORS** 2.8.5 - Cross-Origin Resource Sharing
- **Express Rate Limit** 8.2.1 - DDoS protection
- **Express Validator** 7.3.1 - Input validation & sanitization

### Development
- **dotenv** 17.2.3 - Environment variables
- **Nodemon** 3.1.11 - Auto-restart on changes

## 📁 Folder Structure

```
server/
├── api/                      # (Future: Additional API modules)
│
├── config/
│   └── db.js                # MongoDB connection setup
│
├── controllers/
│   └── contactController.js # Contact form business logic
│
├── models/
│   └── Contact.js           # Mongoose Contact schema
│
├── routes/
│   └── contact.js           # Contact API routes
│
├── .env                     # Environment variables (not committed)
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies & scripts
├── server.js                # Server entry point
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB account (MongoDB Atlas recommended)

### Installation

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the `server/` directory:

```env
# Server Configuration
PORT=5000
CLIENT_URL=http://localhost:5173

# MongoDB Configuration
# Get your MongoDB URI from: https://cloud.mongodb.com
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?appName=Portfolio

# Email Configuration (Optional - for future email notifications)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

### Getting MongoDB URI

1. **Sign up** at [MongoDB Atlas](https://cloud.mongodb.com) (free tier available)
2. **Create a cluster** (M0 Free Tier is sufficient)
3. **Database Access** → Create database user with password
4. **Network Access** → Add IP address:
   - Development: Add your IP or `0.0.0.0/0`
   - Production: Add your server IP
5. **Connect** → "Connect your application"
6. **Copy connection string** and replace `<password>` with your database user password

### Development

Start the development server with auto-restart:

```bash
npm run dev
```

Server runs on: `http://localhost:5000`

**Expected output:**
```
Server running on port 5000
MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net
```

### Production

Start the production server:

```bash
npm start
```

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `node server.js` | Start production server |
| `dev` | `nodemon server.js` | Start development server with auto-restart |
| `test` | `echo "Error: no test specified" && exit 1` | Run tests (not implemented) |

## 📡 API Documentation

### Base URL

```
Development: http://localhost:5000
Production: https://your-backend-domain.com
```

### Authentication

Currently, the API does not require authentication for public endpoints. Contact form submissions rely on rate limiting and IP tracking for spam prevention.

### Endpoints

#### Health Check

**GET** `/`

Check if the API is running.

**Response:**
```
API is running...
```

---

#### Submit Contact Form

**POST** `/api/contact`

Submit a contact form message.

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "subject": "Project Inquiry",
  "message": "Hello, I'd like to discuss a potential project collaboration."
}
```

**Validation Rules:**
- `name`: Required, trimmed, sanitized (XSS protection)
- `email`: Required, valid email format, normalized
- `subject`: Optional, defaults to "No Subject"
- `message`: Required, trimmed, max 5000 characters, sanitized

**Success Response (200):**
```json
{
  "message": "Message received and saved successfully."
}
```

**Validation Error (400):**
```json
{
  "errors": [
    {
      "msg": "Valid email is required",
      "param": "email",
      "location": "body"
    }
  ]
}
```

**Rate Limit Error (429):**
```json
{
  "message": "Too many requests. Please try again later."
}
```

**Server Error (500):**
```json
{
  "message": "Failed to save message."
}
```

### Rate Limiting

#### Global Rate Limit
- **Window:** 15 minutes
- **Max Requests:** 100 per IP
- **Headers:**
  - `RateLimit-Limit`: Total allowed requests
  - `RateLimit-Remaining`: Requests remaining
  - `RateLimit-Reset`: Time when limit resets

#### Contact Form Rate Limit
- **Window:** 15 minutes
- **Max Submissions:** 5 per IP
- **Purpose:** Spam prevention

### Error Handling

All errors follow a consistent format:

```json
{
  "message": "Error description",
  "errors": [/* validation errors if applicable */]
}
```

**Status Codes:**
- `200` - Success
- `400` - Bad Request (validation errors)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

## 🗄️ Database Schema

### Contact Collection

```javascript
{
  _id: ObjectId,
  name: String,           // Required, trimmed
  email: String,          // Required, lowercase, validated
  subject: String,        // Default: "No Subject"
  message: String,        // Required, max 5000 chars
  ip: String,            // Submitter IP address
  timestamp: Date        // Default: Date.now
}
```

**Indexes:** (Recommended for production)
- `email`: Index for faster queries
- `timestamp`: Index for sorting
- `ip`: Index for rate limiting queries

## 🔐 Security Features

### Implemented Security Measures

1. **Helmet.js** - Sets secure HTTP headers:
   - X-DNS-Prefetch-Control
   - X-Frame-Options (SAMEORIGIN)
   - X-Content-Type-Options
   - X-XSS-Protection
   - Strict-Transport-Security
   - Content Security Policy

2. **CORS Configuration:**
   - Restricted to specific origin (`CLIENT_URL`)
   - Allowed methods: `POST` only for contact endpoint
   - Allowed headers: `Content-Type`

3. **Rate Limiting:**
   - Global: 100 requests per 15 minutes
   - Contact form: 5 submissions per 15 minutes
   - In-memory storage (consider Redis for production scaling)

4. **Input Validation & Sanitization:**
   - Express-validator for schema validation
   - XSS protection via `.escape()` and `.normalizeEmail()`
   - Email format validation
   - Message length limits (max 5000 characters)

5. **IP Logging:**
   - Records client IP for each submission
   - Helps identify spam patterns
   - Audit trail for contact attempts

6. **Environment Variables:**
   - Sensitive credentials stored in `.env`
   - `.env` file gitignored
   - `.env.example` provides template

### Security Best Practices

✅ **Do:**
- Always use HTTPS in production
- Regularly update dependencies (`npm audit`)
- Use strong, unique MongoDB passwords
- Enable MongoDB IP whitelist
- Monitor rate limit violations
- Log suspicious activity

❌ **Don't:**
- Commit `.env` files to Git
- Use default or weak passwords
- Expose detailed error messages in production
- Allow `0.0.0.0/0` IP access in production MongoDB

## 🐛 Common Issues & Fixes

### Issue: MongoDB connection fails

**Error:**
```
MongooseServerSelectionError: connect ECONNREFUSED
```

**Solutions:**
1. **Verify MongoDB URI** format in `.env`:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/
   ```
2. **Check IP whitelist** in MongoDB Atlas → Network Access
3. **Verify credentials** (username/password)
4. **Test connection** using MongoDB Compass

### Issue: CORS errors from frontend

**Error:**
```
Access to fetch at 'http://localhost:5000/api/contact' has been blocked by CORS policy
```

**Solutions:**
1. **Verify `CLIENT_URL`** in `.env` matches frontend URL exactly
2. **Check for trailing slashes** (normalized in code)
3. **Restart server** after changing `.env`

### Issue: Rate limit not working

**Problem:** Users can submit unlimited requests

**Solutions:**
1. **Check rate limiter import:**
   ```javascript
   const rateLimit = require('express-rate-limit');
   ```
2. **Verify middleware order** (rate limiter before routes)
3. **For production:** Consider Redis-backed rate limiting:
   ```bash
   npm install rate-limit-redis redis
   ```

### Issue: Environment variables not loading

**Error:**
```
process.env.MONGO_URI is undefined
```

**Solutions:**
1. **Ensure `.env` file exists** in `server/` directory
2. **Check dotenv initialization:**
   ```javascript
   require('dotenv').config();
   ```
3. **Restart server** after changing `.env`
4. **Verify no syntax errors** in `.env` (no spaces around `=`)

### Issue: Port already in use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**
```bash
# Find process using port (Windows)
netstat -ano | findstr :5000

# Kill process
taskkill /PID <PID> /F

# Or use different port in .env
PORT=5001
```

## 📱 Deployment

### Render (Recommended)

1. **Create Web Service** on [Render](https://render.com)

2. **Settings:**
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Node Version:** 18 or higher

3. **Environment Variables:**
   ```
   PORT=5000
   CLIENT_URL=https://your-frontend.vercel.app
   MONGO_URI=mongodb+srv://...
   ```

4. **Deploy:** Push to connected GitHub repository

### Railway

```yaml
# railway.toml (optional)
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npm start"
restartPolicyType = "ON_FAILURE"
```

Set environment variables in Railway dashboard.

### AWS EC2

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone <repository>
cd server

# Install dependencies
npm install

# Use PM2 for process management
sudo npm install -g pm2
pm2 start server.js --name portfolio-api
pm2 startup
pm2 save
```

Set environment variables in `.env` or use AWS Secrets Manager.

### Vercel (Serverless)

Create `vercel.json` in server directory:

```json
{
  "version": 2,
  "builds": [
    { "src": "server.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "server.js" }
  ]
}
```

**Note:** Serverless functions have limitations:
- Cold starts
- Execution time limits (10s on free tier)
- Stateless (no in-memory rate limiting)

## 🧪 Testing

### Manual Testing

```bash
# Health check
curl http://localhost:5000/

# Submit contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Message",
    "message": "This is a test message."
  }'
```

### Automated Testing (TODO)

Recommended frameworks:
- **Jest** - Unit testing
- **Supertest** - API endpoint testing
- **MongoDB Memory Server** - In-memory database for tests

## 📊 Monitoring & Logging

### Production Recommendations

1. **Application Monitoring:**
   - [Sentry](https://sentry.io/) - Error tracking
   - [New Relic](https://newrelic.com/) - Performance monitoring
   - [Datadog](https://www.datadoghq.com/) - Full-stack observability

2. **Logging:**
   ```bash
   npm install winston
   ```
   - Structured logging
   - Log rotation
   - Different log levels (error, warn, info, debug)

3. **Database Monitoring:**
   - MongoDB Atlas built-in monitoring
   - Set up alerts for high connection counts, slow queries

4. **Uptime Monitoring:**
   - [UptimeRobot](https://uptimerobot.com/)
   - [Pingdom](https://www.pingdom.com/)

## 🔗 Related Documentation

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Helmet.js Documentation](https://helmetjs.github.io/)
- [Express Validator Documentation](https://express-validator.github.io/)

## 📞 Support

For issues or questions:
- Email: jashkaranjoshi@gmail.com
- GitHub Issues: [Create an issue](https://github.com/Jashkaran-joshi/Portfolio-v2/issues)
- Security: See [SECURITY.md](../SECURITY.md) for vulnerability reporting

---

**Built with Node.js + Express + MongoDB**  
Made with ❤️ by Jaskaran Joshi

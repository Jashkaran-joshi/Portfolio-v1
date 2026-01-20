# Jaskaran Joshi - Portfolio Website

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://jaskaranjoshi.online)

> A modern, cybersecurity-themed portfolio website showcasing full-stack development skills, projects, certifications, and experience. Built with React, Node.js, and MongoDB.

## 🌐 Live Demo

**Website:** [https://jaskaranjoshi.online](https://jaskaranjoshi.online)

## 📸 Screenshots

![Portfolio Homepage](docs/screenshots/homepage.png)
_Modern cybersecurity-themed interface with smooth animations_

![Contact Form](docs/screenshots/contact.png)
_Secure contact form with rate limiting and validation_

## ✨ Features

### Frontend
- 🎨 **Modern UI/UX** - Cybersecurity-themed design with neon accents and dark mode
- ⚡ **Performance Optimized** - Built with Vite for lightning-fast builds
- 🎭 **Smooth Animations** - Framer Motion for fluid interactions
- 📱 **Fully Responsive** - Mobile-first design using Tailwind CSS
- 🔍 **SEO Optimized** - Complete meta tags, Open Graph, and JSON-LD structured data
- 🌐 **Multi-Page Routing** - React Router with smooth scroll navigation
- 🎯 **Interactive Sections**:
  - Hero section with dynamic typing effect
  - About Me with terminal-style content
  - Skills showcase with progress indicators
  - Projects portfolio with live demos
  - Work experience timeline
  - Certifications display
  - Contact form with real-time validation

### Backend
- 🔒 **Security First** - Helmet.js, CORS, and rate limiting
- 📧 **Contact Form API** - MongoDB-backed message storage
- ✅ **Input Validation** - Express-validator for data sanitization
- 🛡️ **DDoS Protection** - Rate limiting (100 requests per 15 minutes)
- 🔐 **Environment Variables** - Secure credential management
- 📊 **MongoDB Integration** - Contact submissions with timestamps and IP logging

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.4
- **Styling:** Tailwind CSS 3.4.17
- **Animations:** Framer Motion 12.23.26
- **Routing:** React Router DOM 7.11.0
- **Icons:** Lucide React 0.562.0
- **SEO:** React Helmet Async 2.0.5
- **PWA:** Vite Plugin PWA 1.2.0

### Backend
- **Runtime:** Node.js
- **Framework:** Express 5.2.1
- **Database:** MongoDB (Mongoose 9.0.2)
- **Security:** Helmet 8.1.0, CORS 2.8.5
- **Validation:** Express Validator 7.3.1
- **Rate Limiting:** Express Rate Limit 8.2.1
- **Environment:** dotenv 17.2.3

### DevOps & Tools
- **Version Control:** Git & GitHub
- **Deployment:** Vercel (Frontend), Custom (Backend)
- **Package Manager:** npm
- **Code Quality:** ESLint 9.39.1

## 📁 Project Structure

```
Portfolio/
├── client/                 # Frontend application
│   ├── public/            # Static assets
│   │   ├── favicon.svg
│   │   ├── og-image.png
│   │   └── ...
│   ├── src/
│   │   ├── assets/        # Images, fonts, etc.
│   │   ├── components/    # Reusable UI components
│   │   │   ├── common/    # Shared components (Background, Spinner, etc.)
│   │   │   ├── layout/    # Layout components (Navbar, Footer, etc.)
│   │   │   ├── sections/  # Page sections (Hero, About, Skills, etc.)
│   │   │   ├── ui/        # UI primitives (Button, Card, etc.)
│   │   │   └── SEO.jsx    # SEO component
│   │   ├── pages/         # Route pages
│   │   ├── constants/     # Data and configuration
│   │   ├── utils/         # Helper functions
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── .env.example       # Environment variable template
│   ├── vite.config.js     # Vite configuration
│   ├── tailwind.config.js # Tailwind configuration
│   └── package.json
│
├── server/                # Backend application
│   ├── api/              # (Future API modules)
│   ├── config/           # Configuration files
│   │   └── db.js         # MongoDB connection
│   ├── controllers/      # Route controllers
│   │   └── contactController.js
│   ├── models/           # Mongoose models
│   │   └── Contact.js
│   ├── routes/           # API routes
│   │   └── contact.js
│   ├── .env.example      # Environment variable template
│   ├── server.js         # Server entry point
│   └── package.json
│
├── .gitignore            # Git ignore rules
├── SECURITY.md           # Security policy
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **MongoDB** account (MongoDB Atlas recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jashkaran-joshi/Portfolio-v2.git
   cd Portfolio-v2
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```

### Environment Setup

#### Backend Environment Variables

Create `server/.env` file:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=Portfolio
```

**To get MongoDB URI:**
- Sign up at [MongoDB Atlas](https://cloud.mongodb.com)
- Create a cluster → Database Access → Create user
- Network Access → Add IP (0.0.0.0/0 for development)
- Connect → Connect your application → Copy connection string

#### Frontend Environment Variables

Create `client/.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

> ⚠️ **Security Warning:** Never commit `.env` files. Use `.env.example` as a template.

## 💻 Running the Project

### Development Mode

1. **Start Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   Server runs on: `http://localhost:5000`

2. **Start Frontend (in new terminal)**
   ```bash
   cd client
   npm run dev
   ```
   Client runs on: `http://localhost:5173`

### Production Build

1. **Build Frontend**
   ```bash
   cd client
   npm run build
   ```
   Output: `client/dist/`

2. **Preview Production Build**
   ```bash
   npm run preview
   ```

3. **Run Backend in Production**
   ```bash
   cd server
   npm start
   ```

## 📡 API Overview

### Base URL
```
Development: http://localhost:5000/api
Production: https://your-api-domain.com/api
```

### Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/contact` | Submit contact form | None |
| GET | `/` | Health check | None |

### Contact Form Submission

**Endpoint:** `POST /api/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello, I'd like to discuss..."
}
```

**Response:**
```json
{
  "message": "Message received and saved successfully."
}
```

**Error Response:**
```json
{
  "message": "Too many requests. Please try again later."
}
```

**Rate Limit:** 5 submissions per 15 minutes per IP

## 🔐 Security Features

- ✅ **Helmet.js** - Security headers (XSS, CSP, HSTS, etc.)
- ✅ **CORS** - Restricted to specific origin
- ✅ **Rate Limiting** - Global (100 req/15min) + Contact form (5 req/15min)
- ✅ **Input Validation** - Express-validator with sanitization
- ✅ **Environment Variables** - Sensitive data not committed
- ✅ **IP Logging** - Track contact form submissions
- ✅ **MongoDB Injection Protection** - Mongoose schema validation
- ✅ **Content Security Policy** - Configured in Vercel deployment

## 📦 Deployment

### Frontend (Vercel)

1. **Connect GitHub repository** to Vercel
2. **Configure environment variables:**
   - `VITE_API_URL` = Your backend API URL
3. **Build settings:**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Backend (Render / Railway / AWS)

1. **Create new web service**
2. **Set environment variables:**
   - `PORT`, `CLIENT_URL`, `MONGO_URI`
3. **Build command:** `npm install`
4. **Start command:** `npm start`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

**Please ensure:**
- Code follows existing style conventions
- All tests pass
- Environment variables are not committed
- Security best practices are followed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Jaskaran Joshi**

- Website: [jaskaranjoshi.online](https://jaskaranjoshi.online)
- LinkedIn: [@jaskaran-joshi](https://www.linkedin.com/in/jaskaran-joshi/)
- GitHub: [@Jashkaran-joshi](https://github.com/Jashkaran-joshi)

## 🙏 Acknowledgments

- [React](https://react.dev/) - Frontend library
- [Vite](https://vite.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Database hosting
- [Vercel](https://vercel.com/) - Frontend hosting

---

**⭐ If you like this project, please give it a star on GitHub!**

Made with ❤️ by Jaskaran Joshi

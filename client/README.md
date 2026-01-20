# Portfolio - Frontend

> Modern, cybersecurity-themed portfolio website built with React, Vite, and Tailwind CSS.

## 📌 Overview

The frontend is a single-page application (SPA) with multi-page routing that showcases a professional portfolio with smooth animations, responsive design, and SEO optimization. Features a dark cybersecurity theme with neon accents, interactive sections, and a fully functional contact form.

## 🛠️ Tech Stack

### Core
- **React** 19.2.0 - UI library
- **Vite** 7.2.4 - Build tool & dev server
- **React Router DOM** 7.11.0 - Client-side routing

### Styling & Animation
- **Tailwind CSS** 3.4.17 - Utility-first CSS framework
- **Framer Motion** 12.23.26 - Animation library
- **PostCSS** 8.5.6 - CSS processing
- **Autoprefixer** 10.4.23 - Vendor prefix automation

### UI & Icons
- **Lucide React** 0.562.0 - Icon library
- **React Scroll** 1.9.3 - Smooth scrolling

### SEO & Performance
- **React Helmet Async** 2.0.5 - Document head management
- **Vite Plugin PWA** 1.2.0 - Progressive Web App support
- **Workbox** 7.4.0 - Service worker library
- **Web Vitals** 5.1.0 - Performance monitoring

### Development
- **ESLint** 9.39.1 - Code linting
- **@vitejs/plugin-react** 5.1.1 - Vite React plugin

## 📁 Folder Structure

```
client/
├── public/                    # Static assets
│   ├── favicon.svg           # Site favicon
│   ├── favicon.ico
│   ├── og-image.png          # Open Graph image
│   ├── apple-touch-icon.png
│   ├── web-app-manifest-*.png
│   ├── site.webmanifest      # PWA manifest
│   └── 404.html              # 404 error page
│
├── src/
│   ├── assets/               # Images, fonts, etc.
│   │
│   ├── components/
│   │   ├── common/           # Shared components
│   │   │   ├── CyberBackground.jsx    # Animated background
│   │   │   ├── ErrorBoundary.jsx      # Error handling
│   │   │   ├── LoadingSpinner.jsx     # Loading state
│   │   │   └── SectionHeading.jsx     # Section titles
│   │   │
│   │   ├── layout/           # Layout components
│   │   │   ├── Navbar.jsx    # Top navigation
│   │   │   ├── Footer.jsx    # Page footer
│   │   │   └── Layout.jsx    # Page wrapper
│   │   │
│   │   ├── sections/         # Main page sections
│   │   │   ├── Hero.jsx      # Landing hero
│   │   │   ├── About.jsx     # About section
│   │   │   ├── Skills.jsx    # Skills showcase
│   │   │   ├── Projects.jsx  # Portfolio projects
│   │   │   ├── Experience.jsx # Work history
│   │   │   ├── Certifications.jsx # Certs display
│   │   │   └── Contact.jsx   # Contact form
│   │   │
│   │   ├── ui/               # Reusable UI primitives
│   │   │   ├── GlassCard.jsx # Glassmorphism card
│   │   │   ├── NeonButton.jsx # Styled button
│   │   │   └── Reveal.jsx    # Animation wrapper
│   │   │
│   │   └── SEO.jsx           # SEO meta tags component
│   │
│   ├── pages/                # Route pages
│   │   ├── HomePage.jsx      # Main page (all sections)
│   │   ├── AboutPage.jsx
│   │   ├── SkillsPage.jsx
│   │   ├── ProjectsPage.jsx
│   │   ├── ExperiencePage.jsx
│   │   ├── CertificationsPage.jsx
│   │   └── ContactPage.jsx
│   │
│   ├── constants/
│   │   └── data.js           # Portfolio data (projects, skills, etc.)
│   │
│   ├── utils/
│   │   └── performanceUtils.js # Performance helpers
│   │
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles & Tailwind
│
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── .npmrc                    # npm configuration
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML template
├── package.json              # Dependencies & scripts
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Tailwind configuration
├── vite.config.js            # Vite configuration
├── vercel.json               # Vercel deployment config
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Clone the repository (if not already done)
git clone https://github.com/Jashkaran-joshi/Portfolio-v2.git
cd Portfolio-v2/client

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the `client/` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
```

**For production:**
```env
VITE_API_URL=https://your-backend-api.com/api
```

> ⚠️ **Important:** Vite requires env vars to be prefixed with `VITE_` to be exposed to the client.

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at: `http://localhost:5173`

**Hot Module Replacement (HMR)** is enabled - changes will reflect instantly.

### Build for Production

```bash
npm run build
```

Output: `dist/` directory

**Build optimizations:**
- Code splitting
- Tree shaking
- Minification (esbuild)
- Asset optimization
- Source map generation (disabled in production)
- PWA service worker generation

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally at `http://localhost:4173`

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Start development server with HMR |
| `build` | `vite build && npm run generate-sitemap` | Build for production + generate sitemap |
| `preview` | `vite preview` | Preview production build locally |
| `lint` | `eslint .` | Run ESLint code quality checks |
| `generate-sitemap` | `node generate-sitemap.js` | Generate sitemap.xml |

## 🎨 Styling

### Tailwind CSS

Custom theme configured in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      neon: '#00f3ff',        // Primary neon color
      dark: '#020c1b',        // Background dark
      'dark-lighter': '#0a192f',
      // ... more custom colors
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['Fira Code', 'monospace'],
      display: ['Space Grotesk', 'sans-serif'],
    },
  },
}
```

### Global Styles

Located in `src/index.css`:
- CSS custom properties for theming
- Tailwind base, components, and utilities
- Global animations (glow, pulse, etc.)
- Scrollbar styling
- Selection styling

## 🎭 Features

### Animations
- **Framer Motion** - Used throughout for:
  - Page transitions
  - Scroll-triggered reveals
  - Hover effects
  - Stagger animations
  - Loading states

### SEO Optimization
- Dynamic meta tags via React Helmet
- Open Graph tags for social media
- Twitter Card support
- JSON-LD structured data (Person, Website schemas)
- Canonical URLs
- Sitemap generation
- Robots meta tags

### Performance
- **Vite Build Optimizations:**
  - Code splitting (vendor chunks)
  - Route-based lazy loading
  - Asset optimization
  - Tree shaking
  - Minification via esbuild

- **PWA Support:**
  - Offline functionality
  - Service worker caching
  - App manifest
  - Installable on mobile/desktop

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus management
- Color contrast compliance

## 🌐 Routing

Routes configured with React Router DOM:

| Path | Component | Description |
|------|-----------|-------------|
| `/` | HomePage | Main landing page (all sections) |
| `/about` | AboutPage | About section |
| `/skills` | SkillsPage | Skills showcase |
| `/projects` | ProjectsPage | Portfolio projects |
| `/experience` | ExperiencePage | Work experience |
| `/certifications` | CertificationsPage | Certifications |
| `/contact` | ContactPage | Contact form |

**Smooth scrolling** enabled for in-page navigation.

## ⚙️ Configuration Files

### `vite.config.js`
- React plugin
- PWA configuration
- Build optimizations
- Chunk splitting strategy
- Service worker setup

### `tailwind.config.js`
- Custom color palette
- Typography settings
- Breakpoints
- Custom utilities
- Purge configuration

### `postcss.config.js`
- Tailwind CSS processing
- Autoprefixer setup

### `eslint.config.js`
- React-specific rules
- Hook linting
- Fast refresh configuration

### `vercel.json`
- Deployment routing
- Security headers
- Cache control
- Rewrites for SPA

## 🐛 Common Issues & Fixes

### Issue: Environment variables not loading

**Solution:**
```bash
# Ensure .env file exists in client/ directory
# Variable names must start with VITE_
VITE_API_URL=http://localhost:5000/api
```

Restart dev server after changing `.env`.

### Issue: CORS errors when calling API

**Solution:**
- Ensure backend `CLIENT_URL` matches frontend URL
- Check API URL in `.env` is correct
- Verify backend CORS configuration allows frontend origin

### Issue: Port 5173 already in use

**Solution:**
```bash
# Find process using port
netstat -ano | findstr :5173

# Kill the process (Windows)
taskkill /PID <PID> /F

# Or use a different port
vite --port 3000
```

### Issue: Slow build times

**Solution:**
- Clear `node_modules` and reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
- Update dependencies: `npm update`
- Check for large bundle sizes in build output

### Issue: PWA not updating

**Solution:**
- Hard refresh: `Ctrl + Shift + R`
- Clear service worker cache
- Update `version` in `vite.config.js` PWA manifest

## 📱 Deployment

### Vercel (Recommended)

1. **Connect GitHub repository** to Vercel

2. **Project Settings:**
   - **Framework Preset:** Vite
   - **Root Directory:** `client/`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

3. **Environment Variables:**
   - Add `VITE_API_URL` with your backend URL

4. **Deploy:**
   - Push to `main` branch
   - Auto-deploys on every push

### Netlify

```bash
# Build command
npm run build

# Publish directory
dist

# Redirects (_redirects file needed for SPA routing)
/*    /index.html   200
```

Add environment variables in Netlify dashboard.

### Static Hosting (GitHub Pages, etc.)

```bash
# Build the project
npm run build

# Deploy the dist/ folder
```

Ensure proper routing configuration for SPA.

## 🔗 Related Documentation

- [Vite Documentation](https://vite.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [React Router Documentation](https://reactrouter.com/)

## 📞 Support

For issues or questions:
- Email: jashkaranjoshi@gmail.com
- GitHub Issues: [Create an issue](https://github.com/Jashkaran-joshi/Portfolio-v2/issues)

---

**Built with React + Vite + Tailwind CSS**  
Made with ❤️ by Jaskaran Joshi

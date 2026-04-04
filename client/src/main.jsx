import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/fonts.css'
import './index.css'
import App from './App.jsx'

// Lazy-load web-vitals only in development
if (import.meta.env.DEV) {
  import('web-vitals').then(({ onCLS, onINP, onLCP }) => {
    onCLS(console.log);
    onINP(console.log);
    onLCP(console.log);
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)

// Defer service worker registration until after window.load
// This prevents registerSW.js from blocking LCP on slow connections
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    import('virtual:pwa-register').then(({ registerSW }) => {
      registerSW({ immediate: false });
    }).catch(() => {
      // Silently fail if PWA registration is unavailable
    });
  });
}

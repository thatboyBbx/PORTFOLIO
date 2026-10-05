import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import './index.css';
import App from './App.tsx';

// Conservative Service Worker Registration: update automatically when new content is published
registerSW({
  onNeedRefresh() {
    console.log('[PWA] New content available. Reload to update.');
  },
  onOfflineReady() {
    console.log('[PWA] Portfolio application shell ready for offline use.');
  },
});

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);
// A fallback-served page must not hydrate HTML rendered for a different route.
const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
if (root.hasChildNodes() && root.dataset.route === currentPath) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}

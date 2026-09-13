import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

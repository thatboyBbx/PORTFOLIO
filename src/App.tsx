import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PageShell from './components/layout/PageShell';
import './styles/global.css';

// Lazy-loaded route views
const LandingPage = lazy(() => import('./pages/LandingPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const OfflinePage = lazy(() => import('./pages/OfflinePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const PageLoader: React.FC = () => (
  <div className="container" style={{ padding: 'var(--space-16) var(--space-4)', textAlign: 'center' }}>
    <div
      style={{
        display: 'inline-block',
        width: '24px',
        height: '24px',
        border: '2px solid var(--border)',
        borderTopColor: 'var(--accent)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
      aria-label="Loading page content"
    />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageShell />}>
          <Route
            index
            element={
              <Suspense fallback={<PageLoader />}>
                <LandingPage />
              </Suspense>
            }
          />
          <Route
            path="work"
            element={
              <Suspense fallback={<PageLoader />}>
                <ProjectsPage />
              </Suspense>
            }
          />
          <Route
            path="projects"
            element={<Navigate to="/work" replace />}
          />
          <Route
            path="work/:slug"
            element={
              <Suspense fallback={<PageLoader />}>
                <CaseStudyPage />
              </Suspense>
            }
          />
          <Route
            path="projects/:slug"
            element={
              <Suspense fallback={<PageLoader />}>
                <CaseStudyPage />
              </Suspense>
            }
          />
          <Route
            path="about"
            element={
              <Suspense fallback={<PageLoader />}>
                <AboutPage />
              </Suspense>
            }
          />
          <Route
            path="experience"
            element={
              <Suspense fallback={<PageLoader />}>
                <ExperiencePage />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={<PageLoader />}>
                <ContactPage />
              </Suspense>
            }
          />
          <Route
            path="offline"
            element={
              <Suspense fallback={<PageLoader />}>
                <OfflinePage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<PageLoader />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

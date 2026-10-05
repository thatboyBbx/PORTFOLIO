import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppRoutes } from './App';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import CaseStudyPage from './pages/CaseStudyPage';
import ExperiencePage from './pages/ExperiencePage';
import ContactPage from './pages/ContactPage';
import OfflinePage from './pages/OfflinePage';
import NotFoundPage from './pages/NotFoundPage';
export { publicRoutes, getMetadata, metadataTags, siteUrl } from './content/seo';

export function render(path: string): string {
  // Every build-time view is already resolved. Synchronous HTML avoids streamed
  // segments whose inline recovery scripts cannot run under our CSP or without JS.
  return renderToString(
    <StrictMode><StaticRouter location={path}><AppRoutes pages={{ LandingPage, AboutPage, ProjectsPage, CaseStudyPage, ExperiencePage, ContactPage, OfflinePage, NotFoundPage }} /></StaticRouter></StrictMode>,
  );
}

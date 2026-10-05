import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { profileData } from '../../content/profile';
import styles from './PageShell.module.css';

export const PageShell: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    mainRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Work', path: '/work' },
    { label: 'About', path: '/about' },
    { label: 'Experience', path: '/experience' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <div className={styles.shell}>
      {/* Accessibility Skip Link */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Header Landmark */}
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <Link to="/" className={styles.brand} onClick={closeMobileMenu}>
            <span>Panashe Bobojani</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.navDesktop} aria-label="Main Navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }: { isActive: boolean }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <a
              href={profileData.contact.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navLink}
            >
              Resume ↗
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            ref={toggleRef}
            className={styles.mobileMenuBtn}
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
          <nav id="mobile-navigation" hidden={!mobileMenuOpen} className={styles.mobileNav} aria-label="Mobile Navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={closeMobileMenu}
                className={({ isActive }: { isActive: boolean }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <a
              href={profileData.contact.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
              className={styles.navLink}
            >
              Resume ↗
            </a>
          </nav>
      </header>

      {/* Main Content Landmark */}
      <main id="main-content" ref={mainRef} tabIndex={-1} className={`${styles.main} page-enter`}>
        <Outlet />
      </main>

      {/* Footer Landmark (Section 27 of Guide) */}
      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <div className={styles.footerInfo}>
            <p className={styles.footerTitle}>Panashe Bobojani</p>
            <p className={styles.footerMeta}>
              Application development • AI/ML • Software systems
            </p>
            <p className={styles.footerMeta}>Harare, Zimbabwe</p>
          </div>

          <div className={styles.footerLinks}>
            <a href={`mailto:${profileData.contact.email}`} className={styles.footerLink}>Email</a>
            <a href={profileData.contact.github} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>GitHub ↗</a>
            <a href={profileData.contact.linkedin} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>LinkedIn ↗</a>
            <a href={profileData.contact.resumeUrl} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>CV ↗</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageShell;

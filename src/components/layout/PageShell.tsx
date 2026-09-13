import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import styles from './PageShell.module.css';

export const PageShell: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Overview', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'Experience', path: '/experience' },
    { label: 'About', path: '/about' },
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
            <span>Alex Vance</span>
            <span className={styles.brandBadge}>AI / ML Systems</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.navDesktop} aria-label="Main Navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className={styles.mobileMenuBtn}
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
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
        {mobileMenuOpen && (
          <nav className={styles.mobileNav} aria-label="Mobile Navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      {/* Main Content Landmark */}
      <main id="main-content" className={styles.main}>
        <Outlet />
      </main>

      {/* Footer Landmark */}
      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <div className={styles.footerInfo}>
            <p className={styles.footerTitle}>Computer Scientist & Application Engineer</p>
            <p className={styles.footerMeta}>
              Specializing in AI/ML engineering, system architecture, & scalable applications.
            </p>
          </div>

          <div className={styles.footerLinks}>
            <Link to="/about" className={styles.footerLink}>About</Link>
            <Link to="/projects" className={styles.footerLink}>Projects</Link>
            <Link to="/experience" className={styles.footerLink}>Capabilities</Link>
            <Link to="/contact" className={styles.footerLink}>Contact</Link>
            <Link to="/offline" className={styles.footerLink}>Offline Status</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageShell;

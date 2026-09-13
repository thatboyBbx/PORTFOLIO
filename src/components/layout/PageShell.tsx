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
    { label: 'Work', path: '/' },
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
              href="/Panashe_Bobojani_CV.pdf"
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
                className={({ isActive }: { isActive: boolean }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <a
              href="/Panashe_Bobojani_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
              className={styles.navLink}
            >
              Resume ↗
            </a>
          </nav>
        )}
      </header>

      {/* Main Content Landmark */}
      <main id="main-content" className={`${styles.main} page-enter`}>
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
            <a href="mailto:panashe.bobojani@example.com" className={styles.footerLink}>Email</a>
            <a href="https://github.com/thatboyBbx" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>GitHub ↗</a>
            <a href="https://linkedin.com/in/example-panashe-bobojani" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>LinkedIn ↗</a>
            <a href="/Panashe_Bobojani_CV.pdf" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>CV ↗</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageShell;

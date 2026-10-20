import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { Button } from '../Button/Button';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'PROJECTS', path: '/projects' },
    { name: 'SKILLS', path: '/skills' },
    { name: 'ACHIEVEMENTS', path: '/achievements' },
    { name: 'CONTACT', path: '/contact' }
  ];

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container nav-container">
        
        {/* Brand Monogram */}
        <Link to="/" className="brand-logo" aria-label="Dhanush G Portfolio">
          <span className="brand-monogram">DG</span>
          <span className="brand-text">
            Dhanush<span className="red-dot">.</span>G
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  end={item.path === '/'}
                >
                  <span className="nav-item-name">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Action CTAs */}
        <div className="nav-actions">
          <Button
            to="/contact"
            variant="primary"
            size="sm"
            className="nav-cta-btn"
            icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>}
          >
            LET'S TALK
          </Button>

          {/* Mobile Hamburger Toggle */}
          <button
            className={`mobile-menu-btn ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                end={item.path === '/'}
              >
                <span className="mobile-item-name">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mobile-drawer-footer">
          <Button to="/contact" variant="primary" size="md" style={{ width: '100%' }}>
            GET IN TOUCH
          </Button>
        </div>
      </div>
    </header>
  );
}

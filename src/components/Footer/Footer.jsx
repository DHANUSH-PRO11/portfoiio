import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { socialLinks, contactInfo } from '../../data/socialLinks';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        
        <div className="footer-top">
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              <span className="brand-monogram">DG</span>
              <span className="brand-text">DHANUSH<span className="red-dot">.</span>DEV</span>
            </Link>
            <p className="footer-tagline">
              Computer Science Engineering scholar &amp; software developer architecting intelligent systems, predictive models, and high-performance web platforms.
            </p>
            <div className="footer-status">
              <span className="pulse-dot-green"></span>
              <span className="accent-green-text">{contactInfo.status}</span>
            </div>
          </div>

          <div className="footer-nav-col">
            <h4 className="footer-col-title">NAVIGATION</h4>
            <ul className="footer-links-list">
              <li><Link to="/">01 // Home</Link></li>
              <li><Link to="/about">02 // About Me</Link></li>
              <li><Link to="/projects">03 // Selected Projects</Link></li>
              <li><Link to="/skills">04 // Technical Stack</Link></li>
              <li><Link to="/achievements">05 // Achievements</Link></li>
              <li><Link to="/contact">06 // Contact</Link></li>
            </ul>
          </div>

          <div className="footer-connect-col">
            <h4 className="footer-col-title">CONNECT</h4>
            <ul className="footer-links-list">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.name} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {currentYear} DHANUSH G. All rights reserved.
          </p>
          <p className="footer-location">
            {contactInfo.location} • Space Grotesk &amp; React 19
          </p>
        </div>

      </div>
    </footer>
  );
}

import React from 'react';
import './ContactCTA.css';
import { Button } from '../../components/Button/Button';
import { contactInfo, socialLinks } from '../../data/socialLinks';

export function ContactCTA() {
  return (
    <section className="contact-cta-section" id="contact-cta">
      <div className="container">
        
        <div className="contact-cta-box">
          <div className="cta-ambient-glow"></div>

          <div className="cta-content">
            <span className="mono-tag">INITIATE CONNECTION // 06</span>
            
            <h2 className="cta-headline">
              LET'S BUILD SOMETHING<br />
              <span className="gradient-red-text">DISRUPTIVE TOGETHER.</span>
            </h2>

            <p className="cta-lead">
              Actively open to software engineering internships, AI/ML roles, hackathons, and high-impact software systems. Direct communication lines are active.
            </p>

            <div className="cta-button-group">
              <Button
                to="/contact"
                variant="primary"
                size="lg"
                icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>}
              >
                OPEN CONTACT DESK
              </Button>

              <Button
                href={`mailto:${contactInfo.email}`}
                variant="outline"
                size="lg"
                icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>}
              >
                DIRECT EMAIL
              </Button>
            </div>

            <div className="cta-channels-strip">
              <div className="channel-item">
                <span className="channel-label">EMAIL</span>
                <a href={`mailto:${contactInfo.email}`} className="channel-val">{contactInfo.email}</a>
              </div>
              <div className="channel-item">
                <span className="channel-label">LOCATION</span>
                <span className="channel-val">{contactInfo.location}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

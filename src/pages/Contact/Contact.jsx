import React, { useState } from 'react';
import './Contact.css';
import { contactInfo, socialLinks } from '../../data/socialLinks';
import { Button } from '../../components/Button/Button';
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      <div className="container">
        
        {/* Page Header */}
        <ScrollReveal>
          <div className="badge-roman">06 // DIRECT DISPATCH</div>
          <h1 className="contact-hero-title">
            START A DIALOGUE &amp;<br />
            <span className="gradient-red-text">COLLABORATE.</span>
          </h1>
          <p className="lead-text" style={{ maxWidth: '750px', marginTop: '1rem' }}>
            Available for software engineering internships, AI/ML research roles, competitive hackathons, and technical collaborations.
          </p>
        </ScrollReveal>

        <div className="contact-main-grid">
          
          {/* Left Column: Direct Communication Channels */}
          <div className="contact-channels-col">
            <h2 className="channels-heading">DIRECT CHANNELS</h2>

            {/* Email Box */}
            <div
              className="channel-card"
              onClick={() => handleCopy(contactInfo.email, 'email')}
              title="Click to copy email"
            >
              <div className="channel-card-icon">✉</div>
              <div className="channel-card-body">
                <span className="channel-card-label">PRIMARY EMAIL</span>
                <span className="channel-card-value">{contactInfo.email}</span>
              </div>
              <span className="channel-copy-tag">
                {copiedKey === 'email' ? 'COPIED ✓' : 'COPY'}
              </span>
            </div>

            {/* Phone Box */}
            <div
              className="channel-card"
              onClick={() => handleCopy(contactInfo.phone, 'phone')}
              title="Click to copy phone number"
            >
              <div className="channel-card-icon">☎</div>
              <div className="channel-card-body">
                <span className="channel-card-label">PHONE / WHATSAPP</span>
                <span className="channel-card-value">+91 {contactInfo.phone}</span>
              </div>
              <span className="channel-copy-tag">
                {copiedKey === 'phone' ? 'COPIED ✓' : 'COPY'}
              </span>
            </div>

            {/* Social / Portfolio Links */}
            <h3 className="social-links-subheading">DEVELOPER NETWORKS</h3>
            <div className="social-links-list">
              {socialLinks.filter(s => s.name !== 'Email' && s.name !== 'Phone').map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-network-card"
                >
                  <div className="network-info">
                    <span className="network-name">{link.name}</span>
                    <span className="network-handle">{link.handle}</span>
                  </div>
                  <span className="network-arrow">↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="contact-form-col">
            <div className="contact-form-card">
              <div className="corner-crosshair top-left"></div>
              <div className="corner-crosshair top-right"></div>
              <div className="corner-crosshair bottom-left"></div>
              <div className="corner-crosshair bottom-right"></div>

              {submitted ? (
                <div className="form-success-box">
                  <span className="pulse-dot-green"></span>
                  <h3 className="success-heading">MESSAGE DISPATCHED</h3>
                  <p className="success-message">
                    Thank you, <strong>{formData.name}</strong>. Your communication has been routed to Dhanush G. Expect a prompt response within 24 hours.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    variant="outline"
                    size="sm"
                  >
                    SEND ANOTHER MESSAGE
                  </Button>
                </div>
              ) : (
                <form className="contact-html-form" onSubmit={handleSubmit}>
                  <div className="form-header-row">
                    <h3 className="form-title">TRANSMIT MESSAGE</h3>
                    <span className="form-status-indicator">
                      <span className="pulse-dot-green"></span>
                      <span>ACTIVE PIPELINE</span>
                    </span>
                  </div>

                  <div className="form-field-group">
                    <label className="form-field-label" htmlFor="name">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="form-text-input"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="form-field-label" htmlFor="email">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-text-input"
                      required
                      placeholder="e.g. alex@enterprise.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="form-field-label" htmlFor="subject">
                      SUBJECT / ROLE
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="form-text-input"
                      placeholder="e.g. Software Engineering Opportunity / Project Collab"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="form-field-label" htmlFor="message">
                      MESSAGE *
                    </label>
                    <textarea
                      id="message"
                      className="form-text-area"
                      rows="5"
                      required
                      placeholder="Discussing an engineering challenge or project..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    style={{ width: '100%', marginTop: '0.5rem' }}
                    icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>}
                  >
                    SEND MESSAGE
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

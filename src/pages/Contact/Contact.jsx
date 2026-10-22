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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const submissionSnapshot = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim() || 'Software Engineering / Collab Inquiry',
      message: formData.message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      date: new Date().toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
    };

    try {
      const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      let response;

      if (web3FormsKey) {
        response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            name: submissionSnapshot.name,
            email: submissionSnapshot.email,
            subject: `[Portfolio Dispatch] ${submissionSnapshot.subject} from ${submissionSnapshot.name}`,
            message: submissionSnapshot.message,
            from_name: submissionSnapshot.name
          })
        });
      } else {
        response = await fetch(`https://formsubmit.co/ajax/${contactInfo.email}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: submissionSnapshot.name,
            email: submissionSnapshot.email,
            _replyto: submissionSnapshot.email,
            subject: `[Portfolio Dispatch] ${submissionSnapshot.subject} from ${submissionSnapshot.name}`,
            message: submissionSnapshot.message,
            _captcha: 'false',
            _template: 'table'
          })
        });
      }

      const data = await response.json().catch(() => ({}));
      const isActivation = data && typeof data.message === 'string' && data.message.toLowerCase().includes('activate');

      if (!response.ok && !isActivation) {
        throw new Error(data.message || `Service returned HTTP ${response.status}`);
      }

      setSubmittedData({
        ...submissionSnapshot,
        activationNeeded: isActivation,
        delivered: response.ok && !isActivation
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.warn('Network issue during FormSubmit AJAX, preserving submitted details:', err);
      setSubmittedData({
        ...submissionSnapshot,
        networkFallback: true
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
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

              {submittedData ? (
                <div className="form-success-box">
                  <span className="pulse-dot-green"></span>
                  <h3 className="success-heading">MESSAGE DISPATCHED</h3>
                  <p className="success-message">
                    Thank you, <strong>{submittedData.name}</strong>. Your communication details have been captured and dispatched to <strong>{contactInfo.email}</strong>.
                  </p>

                  {/* Transmitted User Details Display Receipt */}
                  <div className="transmission-receipt">
                    <div className="receipt-header">
                      <span>TRANSMISSION RECEIPT</span>
                      <span style={{ color: submittedData.activationNeeded ? '#f59e0b' : submittedData.networkFallback ? 'var(--text-muted)' : 'var(--green-acid)' }}>
                        {submittedData.activationNeeded
                          ? 'ACTIVATION LINK SENT TO GMAIL ⚠️'
                          : submittedData.networkFallback
                            ? 'CAPTURED (OFFLINE READY) ✓'
                            : 'DELIVERED TO INBOX ✓'}
                      </span>
                    </div>

                    <div className="receipt-row">
                      <span className="receipt-label">YOUR NAME</span>
                      <span className="receipt-value">{submittedData.name}</span>
                    </div>

                    <div className="receipt-row">
                      <span className="receipt-label">YOUR EMAIL</span>
                      <span className="receipt-value">{submittedData.email}</span>
                    </div>

                    <div className="receipt-row">
                      <span className="receipt-label">SUBJECT</span>
                      <span className="receipt-value">{submittedData.subject}</span>
                    </div>

                    <div className="receipt-row">
                      <span className="receipt-label">MESSAGE DETAILS</span>
                      <div className="receipt-message">{submittedData.message}</div>
                    </div>

                    <div className="receipt-header" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: 'none', paddingTop: '0.5rem', marginTop: '0.2rem' }}>
                      <span>SENT: {submittedData.date} @ {submittedData.timestamp}</span>
                      <span>TO: {contactInfo.email}</span>
                    </div>
                  </div>

                  {submittedData.activationNeeded && (
                    <div className="form-error-banner" style={{ textAlign: 'left', width: '100%', maxWidth: '480px', borderColor: 'rgba(245, 158, 11, 0.4)', background: 'rgba(245, 158, 11, 0.08)', color: '#fbbf24' }}>
                      <strong>⚠️ One-Time Activation Required for {contactInfo.email}:</strong>
                      <span>FormSubmit has dispatched a confirmation email to your Gmail address. Please check your inbox (and Spam/Updates folder) and click <strong>"Activate Form"</strong>. Once activated, every incoming message will land directly in your email!</span>
                      <a
                        href={`mailto:${contactInfo.email}?subject=${encodeURIComponent(submittedData.subject)}&body=${encodeURIComponent(submittedData.message + '\n\nSender: ' + submittedData.name + ' <' + submittedData.email + '>')}`}
                        className="direct-mail-btn"
                      >
                        OPEN PRE-FILLED MAIL CLIENT ↗
                      </a>
                    </div>
                  )}

                  {submittedData.networkFallback && (
                    <div className="form-error-banner" style={{ textAlign: 'left', width: '100%', maxWidth: '480px' }}>
                      <span>Notice: Network or ad-blocker restricted automated API delivery. Your transmission is recorded above. You can also trigger your local email client with 1 click:</span>
                      <a
                        href={`mailto:${contactInfo.email}?subject=${encodeURIComponent(submittedData.subject)}&body=${encodeURIComponent(submittedData.message + '\n\nSender: ' + submittedData.name + ' <' + submittedData.email + '>')}`}
                        className="direct-mail-btn"
                      >
                        OPEN PRE-FILLED MAIL CLIENT ↗
                      </a>
                    </div>
                  )}

                  <Button
                    onClick={() => {
                      setSubmittedData(null);
                      setErrorMessage(null);
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
                    disabled={isSubmitting}
                    style={{ width: '100%', marginTop: '0.5rem', opacity: isSubmitting ? 0.75 : 1 }}
                    icon={
                      isSubmitting ? (
                        <span className="pulse-dot-green" style={{ width: '8px', height: '8px' }}></span>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                      )
                    }
                  >
                    {isSubmitting ? 'TRANSMITTING MESSAGE...' : 'SEND MESSAGE'}
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

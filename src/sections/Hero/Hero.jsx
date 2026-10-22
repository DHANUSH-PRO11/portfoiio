import React from 'react';
import './Hero.css';
import { Button } from '../../components/Button/Button';
import { socialLinks } from '../../data/socialLinks';

export function Hero() {
  const leetcodeLink = socialLinks.find(s => s.name === 'LeetCode')?.url || '#';
  const githubLink = socialLinks.find(s => s.name === 'GitHub')?.url || '#';

  return (
    <section className="hero-section" id="hero">
      <div className="container hero-container">
        
        {/* Top Status Strip */}
        <div className="hero-top-meta">
          <div className="hero-code-stamp">
            <span className="mono-tag">CSE_SCHOLAR // 2024–2028</span>
          </div>
        </div>

        {/* Oversized Editorial Name Display */}
        <div className="hero-title-block">
          <span className="hero-eyebrow">HELLO, WORLD. I AM</span>
          <h1 className="hero-main-title">
            <span className="title-first">DHANUSH</span>
          </h1>
          <div className="hero-red-line-wrap">
            <div className="animated-red-line"></div>
            <span className="hero-role-badge">MACHINE LEARNING ENGINEER</span>
          </div>
        </div>

        {/* Hero Narrative Split Grid */}
        <div className="hero-narrative-grid">
          <div className="hero-bio-col">
            <p className="hero-bio-lead">
              Computer Science Engineering scholar architecting high-throughput full-stack platforms, dynamic graph route optimizers, and predictive machine learning models.
            </p>
            <p className="hero-bio-sub">
              Passionate about turning mathematical algorithms into real-world software—from sub-second A* road chokepoint recalculation to multi-horizon MLOps passenger density prediction.
            </p>

            {/* CTAs */}
            <div className="hero-cta-row">
              <Button
                to="/projects"
                variant="primary"
                size="lg"
                icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>}
              >
                EXPLORE PROJECTS
              </Button>

              <Button
                href={githubLink}
                variant="outline"
                size="lg"
                icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>}
              >
                GITHUB REPOS
              </Button>
            </div>
          </div>

          {/* Right Metrics & Telemetry Column */}
          <div className="hero-telemetry-col">
            <div className="telemetry-card">
              <div className="telemetry-card-header">
                <span className="telemetry-label">KEY TELEMETRY</span>
                <span className="accent-green-text">● VERIFIED</span>
              </div>

              <div className="telemetry-items">
                <a href={leetcodeLink} target="_blank" rel="noopener noreferrer" className="telemetry-row">
                  <div className="telemetry-stat">
                    <span className="stat-number gradient-red-text">500+</span>
                    <span className="stat-desc">LeetCode Problems Solved</span>
                  </div>
                  <span className="telemetry-tag">RATING 1554 ↗</span>
                </a>


                <div className="telemetry-row">
                  <div className="telemetry-stat">
                    <span className="stat-number">2nd</span>
                    <span className="stat-desc">Hackathon Runner-Up Podium</span>
                  </div>
                  <span className="telemetry-tag">AWARD</span>
                </div>

                <div className="telemetry-row">
                  <div className="telemetry-stat">
                    <span className="stat-number">7.9</span>
                    <span className="stat-desc">B.E. Computer Science CGPA</span>
                  </div>
                  <span className="telemetry-tag">ACADEMIC</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Prompt Indicator */}
        <div className="hero-scroll-prompt">
          <div className="scroll-mouse-icon">
            <div className="scroll-wheel"></div>
          </div>
          <span className="scroll-prompt-text">SCROLL TO EXPERIENCE CIRCULAR SHOWCASE</span>
        </div>

      </div>
    </section>
  );
}

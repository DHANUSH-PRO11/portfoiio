import React from 'react';
import './Achievements.css';
import { achievements, education } from '../../data/achievements';
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal';
import { Button } from '../../components/Button/Button';

export function Achievements() {
  return (
    <div className="achievements-page">
      <div className="container">
        
        {/* Page Header */}
        <ScrollReveal>
          <div className="badge-roman">05 // MERIT &amp; MILESTONES</div>
          <h1 className="achievements-hero-title">
            COMPETITIVE MERIT &amp;<br />
            <span className="gradient-red-text">ACADEMIC EXCELLENCE.</span>
          </h1>
          <p className="lead-text" style={{ maxWidth: '750px', marginTop: '1rem' }}>
            Verified competitive programming ratings, hackathon podium finishes, technical campus leadership, and engineering academics.
          </p>
        </ScrollReveal>

        {/* Featured Achievement Spotlight: LeetCode */}
        <ScrollReveal>
          <div className="leetcode-spotlight-card">
            <div className="corner-crosshair top-left"></div>
            <div className="corner-crosshair top-right"></div>
            <div className="corner-crosshair bottom-left"></div>
            <div className="corner-crosshair bottom-right"></div>

            <div className="spotlight-left">
              <span className="spotlight-badge">⭐ COMPETITIVE PROGRAMMING SPOTLIGHT</span>
              <h2 className="spotlight-title">500+ LEETCODE PROBLEMS SOLVED</h2>
              <p className="spotlight-subtitle">Global Contest Rating: 1554 • Handle: @dev_coder_11</p>
              <p className="spotlight-description">
                Demonstrated algorithmic mastery across dynamic programming, graph traversals, segment trees, binary heaps, and optimization puzzles with rigorous daily practice.
              </p>
              <div className="spotlight-actions">
                <Button
                  href="https://leetcode.com/u/dev_coder_11/"
                  variant="primary"
                  size="md"
                  icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>}
                >
                  VISIT LEETCODE PROFILE
                </Button>
              </div>
            </div>

            <div className="spotlight-right-stats">
              <div className="spotlight-stat-box">
                <span className="stat-big gradient-red-text">500+</span>
                <span className="stat-sub">Problems Solved</span>
              </div>
              <div className="spotlight-stat-box">
                <span className="stat-big accent-green-text">1554</span>
                <span className="stat-sub">Contest Rating</span>
              </div>
              <div className="spotlight-stat-box">
                <span className="stat-big">TOP 25%</span>
                <span className="stat-sub">Global Standing</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Secondary Achievements Grid */}
        <div className="achievements-cards-grid">
          {achievements.filter(a => a.id !== 'leetcode-500').map((ach, idx) => (
            <ScrollReveal key={ach.id} delay={idx * 0.1}>
              <div className="achievement-detail-card">
                <div className="ach-card-top">
                  <span className="ach-card-badge">{ach.badge}</span>
                  <span className="ach-card-metric">{ach.metric}</span>
                </div>
                <h3 className="ach-card-title">{ach.title}</h3>
                <p className="ach-card-sub">{ach.subtitle}</p>
                <p className="ach-card-desc">{ach.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Education Timeline Section */}
        <div className="achievements-edu-section">
          <div className="edu-section-header">
            <span className="mono-tag">ACADEMIC BACKGROUND // 2024–2028</span>
            <h2 className="section-title">EDUCATION &amp; DEGREES</h2>
          </div>

          <div className="edu-cards-grid">
            {education.map((edu, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="edu-detail-card">
                  <div className="edu-card-top">
                    <span className="edu-timeline-pill">{edu.timeline}</span>
                    <span className="edu-grade-badge">{edu.grade}</span>
                  </div>
                  <h3 className="edu-card-degree">{edu.degree}</h3>
                  <h4 className="edu-card-school">{edu.institution}</h4>
                  <p className="edu-card-details">{edu.details}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

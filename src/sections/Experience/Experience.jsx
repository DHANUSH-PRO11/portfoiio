import React from 'react';
import './Experience.css';
import { education, achievements } from '../../data/achievements';

export function Experience() {
  const leadership = achievements.find(a => a.id === 'render-rush-organizer');

  return (
    <section className="experience-section" id="experience">
      <div className="container">
        
        <div className="experience-header">
          <div className="badge-roman">04 // ACADEMICS &amp; LEADERSHIP</div>
          <h2 className="section-title">
            ACADEMIC FOUNDATION &amp;<br />
            <span className="gradient-red-text">TECHNICAL LEADERSHIP.</span>
          </h2>
        </div>

        <div className="experience-grid">
          
          {/* Left: Education Timeline */}
          <div className="experience-col">
            <h3 className="col-subheading">DEGREE &amp; INSTITUTION</h3>
            <div className="timeline-wrap">
              {education.map((edu, idx) => (
                <div key={idx} className="timeline-node">
                  <div className="node-marker"></div>
                  <div className="node-content">
                    <span className="node-timeline">{edu.timeline}</span>
                    <h4 className="node-degree">{edu.degree}</h4>
                    <p className="node-institution">{edu.institution}</p>
                    <span className="node-grade-tag">{edu.grade}</span>
                    <p className="node-details">{edu.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Leadership & Organization */}
          <div className="experience-col">
            <h3 className="col-subheading">EVENT LEADERSHIP</h3>
            {leadership && (
              <div className="leadership-card">
                <div className="leadership-badge">
                  <span className="pulse-dot-green"></span>
                  <span>CAMPUS ORGANIZER</span>
                </div>
                <h4 className="leadership-title">{leadership.title}</h4>
                <p className="leadership-sub">{leadership.subtitle}</p>
                <p className="leadership-desc">{leadership.description}</p>
                <div className="leadership-tags">
                  <span className="lead-tag">Event Operations</span>
                  <span className="lead-tag">Judging Protocols</span>
                  <span className="lead-tag">Student Coordination</span>
                  <span className="lead-tag">Technical Infrastructure</span>
                </div>
              </div>
            )}

            {/* Hackathon Podium Feature */}
            <div className="podium-card">
              <span className="podium-accent-badge">PODIUM FINISH</span>
              <h4 className="podium-title">Runner-Up (2nd Place)</h4>
              <p className="podium-subtitle">Erode Sengunthar Engineering College Hackathon</p>
              <p className="podium-desc">
                Engineered and delivered an end-to-end intelligent predictive software system evaluated under intense hackathon deadlines against regional engineering teams.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

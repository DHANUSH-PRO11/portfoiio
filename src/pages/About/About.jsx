import React from 'react';
import './About.css';
import { Button } from '../../components/Button/Button';
import { socialLinks, contactInfo } from '../../data/socialLinks';
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal';

export function About() {
  return (
    <div className="about-page">
      <div className="container about-container">
        
        {/* Page Header */}
        <ScrollReveal>
          <div className="badge-roman">02 // PROFILE &amp; PHILOSOPHY</div>
          <h1 className="about-hero-title">
            ENGINEERING AT THE EDGE OF<br />
            <span className="gradient-red-text">MATHEMATICS &amp; PRODUCTION CODE.</span>
          </h1>
        </ScrollReveal>

        {/* Editorial Split Layout */}
        <div className="about-editorial-grid">
          
          {/* Left Column: Avatar & Visual Telemetry */}
          <div className="about-visual-col">
            <ScrollReveal animation="slide-left">
              <div className="about-avatar-card">
                <div className="corner-crosshair top-left"></div>
                <div className="corner-crosshair top-right"></div>
                <div className="corner-crosshair bottom-left"></div>
                <div className="corner-crosshair bottom-right"></div>

                <div className="about-img-container">
                  <img
                    src="/images/dhanush_avatar.jpg"
                    alt="Dhanush G - Computer Science Engineer"
                    className="about-avatar-img"
                  />
                  <div className="about-img-scrim"></div>
                </div>

                <div className="about-avatar-meta">
                  <div className="avatar-meta-row">
                    <span className="mono-tag">IDENTITY</span>
                    <span className="meta-val">DHANUSH G</span>
                  </div>
                  <div className="avatar-meta-row">
                    <span className="mono-tag">ROLE</span>
                    <span className="meta-val text-red-glow">CS ENGINEER &amp; SWE</span>
                  </div>
                  <div className="avatar-meta-row">
                    <span className="mono-tag">ALMA MATER</span>
                    <span className="meta-val">SRI SHAKTHI INST. ENGG &amp; TECH</span>
                  </div>
                  <div className="avatar-meta-row">
                    <span className="mono-tag">CGPA</span>
                    <span className="meta-val accent-green-text">7.9 / 10.0</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Quick Stat Bar */}
            <div className="about-stats-strip">
              <div className="about-stat-box">
                <span className="stat-large gradient-red-text">500+</span>
                <span className="stat-label">LeetCode Solved</span>
              </div>
              <div className="about-stat-box">
                <span className="stat-large accent-green-text">1554</span>
                <span className="stat-label">Contest Rating</span>
              </div>
              <div className="about-stat-box">
                <span className="stat-large">0.957</span>
                <span className="stat-label">Peak Model R²</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative */}
          <div className="about-narrative-col">
            <ScrollReveal delay={0.1}>
              <div className="narrative-block">
                <h2 className="narrative-heading">
                  THE DISCIPLINE OF <span className="gradient-red-text">ALGORITHMIC RIGOR.</span>
                </h2>
                <p className="narrative-p">
                  I am a Computer Science Engineering student based in Tamil Nadu, India, driven by a deep fascination with how computational theory and discrete mathematics convert into resilient, high-speed software.
                </p>
                <p className="narrative-p">
                  Rather than treating software as merely putting UI components on a canvas, I focus on the underlying computational engines—optimizing graph traversals with A* and Dijkstra, eliminating data leakage in time-series regression with chronological cross-validation, and containerizing asynchronous microservices with FastAPI and Docker.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="narrative-block">
                <h3 className="narrative-subheading">WHAT I BUILD</h3>
                <ul className="narrative-points">
                  <li>
                    <strong className="text-red-glow">Predictive Machine Learning Systems:</strong> From GBDT continuous travel-time regression in traffic networks to multi-horizon commuter density risk scoring (achieving 0.957 R² and outperforming naive baselines by 53%+).
                  </li>
                  <li>
                    <strong className="text-red-glow">Graph Routing &amp; Spatial Solvers:</strong> Implementing dynamic graph recalculation to bypass urban road chokepoints in under 18 milliseconds.
                  </li>
                  <li>
                    <strong className="text-red-glow">Full-Stack Asynchronous Architectures:</strong> High-speed React 19 frontends paired with FastAPI, PostgreSQL/Supabase, and bilingual real-time streaming audio pipelines.
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="narrative-block">
                <h3 className="narrative-subheading">TECHNICAL LEADERSHIP</h3>
                <p className="narrative-p">
                  Beyond individual problem-solving, I served as the Lead Organizer for <strong>Render Rush</strong> at Sri Shakthi Institute of Engineering and Technology, coordinating participant logistics, judging rubrics, and technical infrastructure for hundreds of student competitors.
                </p>

                <div className="about-cta-row">
                  <Button
                    to="/projects"
                    variant="primary"
                    size="md"
                    icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>}
                  >
                    EXPLORE PROJECTS
                  </Button>
                  <Button
                    to="/contact"
                    variant="outline"
                    size="md"
                  >
                    GET IN TOUCH
                  </Button>
                </div>
              </div>
            </ScrollReveal>

          </div>

        </div>

      </div>
    </div>
  );
}

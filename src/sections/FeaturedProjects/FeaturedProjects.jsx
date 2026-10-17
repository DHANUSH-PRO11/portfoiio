import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './FeaturedProjects.css';
import { projects } from '../../data/projects';
import { initCircularReveal } from '../../animations/circularReveal';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Button } from '../../components/Button/Button';

export function FeaturedProjects() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const slidesRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const cleanup = initCircularReveal({
      container: containerRef.current,
      track: trackRef.current,
      slides: slidesRef.current,
      reducedMotion: prefersReducedMotion,
      onSlideChange: (idx, progress) => {
        setActiveIndex(idx);
        setScrollProgress(progress);
      }
    });

    return () => cleanup();
  }, [prefersReducedMotion]);

  return (
    <section className="featured-showcase-section" id="featured-projects">
      <div className="container">
        <div className="showcase-header">
          <div className="badge-roman">03 // SELECTED PROJECTS</div>
          <div className="showcase-header-grid">
            <h2 className="section-title">
              ENGINEERED SYSTEMS.<br />
              <span className="gradient-red-text">MEASURABLE VALUE.</span>
            </h2>
            <p className="lead-text">
              Scroll through the circular portal. Each project unfolds with full-bleed visuals, live telemetry metrics, and deep architecture breakdowns.
            </p>
          </div>
        </div>
      </div>

      {/* Pinned Scroll Track Container */}
      <div className="showcase-scroll-track" ref={trackRef}>
        <div className="showcase-pinned-viewport" ref={containerRef}>
          <div className="container showcase-stage-container">
            
            {/* The Architectural Mask Frame */}
            <div className="showcase-mask-card">
              
              {/* Corner crosshair brackets */}
              <div className="corner-crosshair top-left"></div>
              <div className="corner-crosshair top-right"></div>
              <div className="corner-crosshair bottom-left"></div>
              <div className="corner-crosshair bottom-right"></div>

              {/* Layered Project Slides */}
              {projects.map((project, index) => {
                const indexStr = String(index + 1).padStart(2, '0');
                const totalStr = String(projects.length).padStart(2, '0');

                return (
                  <div
                    key={project.id}
                    className={`showcase-slide slide-${index} ${activeIndex === index ? 'is-active' : ''}`}
                    ref={(el) => (slidesRef.current[index] = el)}
                  >
                    {/* Background Visual */}
                    <div className="slide-visual-layer">
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="slide-bg-img"
                      />
                      <div className="slide-overlay-scrim"></div>
                    </div>

                    {/* Synchronized Editorial Content */}
                    <div className="slide-content-wrap">
                      <div className="slide-meta-row">
                        <span className="slide-index-tag">
                          {indexStr} // {project.category}
                        </span>
                        <span className="status-indicator">
                          <span className="pulse-dot-green"></span>
                          <span>LIVE TELEMETRY</span>
                        </span>
                      </div>

                      <h3 className="slide-headline">
                        {project.title}
                      </h3>

                      <p className="slide-tagline">
                        "{project.tagline}"
                      </p>

                      <p className="slide-description">
                        {project.summary}
                      </p>

                      {/* Tech stack badges */}
                      <div className="slide-tech-list">
                        {project.technologies.slice(0, 6).map((tech) => (
                          <span key={tech} className="slide-tech-pill">
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Telemetry metrics strip */}
                      <div className="slide-telemetry-strip">
                        {project.metrics.map((metric, mIdx) => (
                          <div key={mIdx} className="telemetry-block">
                            <span className="telemetry-key">{metric.label}</span>
                            <span className="telemetry-val gradient-red-text">{metric.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="slide-actions">
                        <Button
                          to={`/projects/${project.slug}`}
                          variant="primary"
                          size="md"
                          icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>}
                        >
                          FULL CASE STUDY
                        </Button>

                        {project.githubUrl && (
                          <Button
                            href={project.githubUrl}
                            variant="outline"
                            size="md"
                            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>}
                          >
                            GITHUB
                          </Button>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}

              {/* Bottom-Center Circular Portal Anchor (Awwwards Reference Element) */}
              <div className="circular-portal-anchor">
                <div className="portal-ring">
                  <div className="portal-ping"></div>
                  <div className="portal-dot"></div>
                </div>
                <div className="portal-meta">
                  <span className="portal-label">SCROLL TO EXPAND CIRCULAR MASK</span>
                  <span className="portal-counter">
                    PROJECT {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                  </span>
                </div>
                <div className="portal-progress-bar">
                  <div
                    className="portal-progress-fill"
                    style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Slide Number Indicators */}
              <div className="showcase-nav-dots">
                {projects.map((_, i) => (
                  <span
                    key={i}
                    className={`showcase-dot ${activeIndex === i ? 'active' : ''}`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                ))}
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

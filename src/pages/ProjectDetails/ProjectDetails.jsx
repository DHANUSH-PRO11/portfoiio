import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import './ProjectDetails.css';
import { getProjectBySlug, projects } from '../../data/projects';
import { Button } from '../../components/Button/Button';
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal';

export function ProjectDetails() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  // Find next project for continuous case-study flow
  const currentIndex = projects.findIndex(p => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="project-details-page">
      <div className="container">
        
        {/* Breadcrumb Header */}
        <div className="project-breadcrumb">
          <Link to="/projects" className="breadcrumb-back-link">
            ← BACK TO ARCHIVES
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{project.shortTitle}</span>
        </div>

        {/* Project Title Block */}
        <div className="project-title-header">
          <div className="badge-roman">{project.category}</div>
          <h1 className="project-main-heading">{project.title}</h1>
          <p className="project-tagline-text">"{project.tagline}"</p>
        </div>

        {/* Hero Visual Display */}
        <div className="project-hero-media">
          <div className="corner-crosshair top-left"></div>
          <div className="corner-crosshair top-right"></div>
          <div className="corner-crosshair bottom-left"></div>
          <div className="corner-crosshair bottom-right"></div>
          
          <img
            src={project.coverImage}
            alt={project.title}
            className="project-hero-img"
          />
        </div>

        {/* Meta & Telemetry Strip */}
        <div className="project-telemetry-banner">
          {project.metrics.map((metric, idx) => (
            <div key={idx} className="banner-metric-box">
              <span className="banner-key">{metric.label}</span>
              <span className="banner-val gradient-red-text">{metric.value}</span>
            </div>
          ))}

          <div className="banner-actions">
            {project.githubUrl && (
              <Button
                href={project.githubUrl}
                variant="primary"
                size="md"
                icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>}
              >
                VIEW GITHUB REPO
              </Button>
            )}
          </div>
        </div>

        {/* Architectural Deep Dive Split Grid */}
        <div className="project-deep-dive-grid">
          
          <div className="deep-dive-main">
            <h2 className="deep-dive-title">SYSTEM ARCHITECTURE &amp; OVERVIEW</h2>
            <p className="deep-dive-desc">{project.description}</p>

            <h3 className="deep-dive-subtitle">KEY IMPLEMENTATION HIGHLIGHTS</h3>
            <ul className="deep-dive-bullets">
              {project.highlights.map((highlight, idx) => (
                <li key={idx}>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="deep-dive-sidebar">
            <div className="sidebar-card">
              <h4 className="sidebar-title">TECHNOLOGIES USED</h4>
              <div className="sidebar-tech-tags">
                {project.technologies.map((tech) => (
                  <span key={tech} className="sidebar-tag">{tech}</span>
                ))}
              </div>
            </div>

            <div className="sidebar-card">
              <h4 className="sidebar-title">ENGINEERING CREDITS</h4>
              <p className="sidebar-text">
                Lead Architecture, Modeling &amp; Full-Stack Deployment: <strong>Dhanush G</strong>
              </p>
              <p className="sidebar-text">
                Status: <strong>Production Ready &amp; Dockerized</strong>
              </p>
            </div>
          </div>

        </div>

        {/* Next Project Footer Link */}
        {nextProject && (
          <div className="next-project-footer">
            <span className="next-label">NEXT CASE STUDY</span>
            <Link to={`/projects/${nextProject.slug}`} className="next-link-title">
              {nextProject.title} →
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

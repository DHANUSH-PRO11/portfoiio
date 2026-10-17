import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectCard.css';
import { Button } from '../Button/Button';

export function ProjectCard({ project, index = 0 }) {
  const indexStr = String(index + 1).padStart(2, '0');

  return (
    <article className="project-card">
      <div className="project-card-image-wrap">
        <Link to={`/projects/${project.slug}`} className="project-card-image-link">
          <img
            src={project.coverImage}
            alt={project.title}
            className="project-card-image"
            loading="lazy"
          />
          <div className="project-card-overlay"></div>
          <span className="project-card-num-watermark">{indexStr}</span>
        </Link>
      </div>

      <div className="project-card-body">
        <div className="project-card-meta">
          <span className="project-card-index">{indexStr} // {project.category}</span>
          {project.metrics && project.metrics[0] && (
            <span className="project-card-metric-badge">
              {project.metrics[0].label}: <strong>{project.metrics[0].value}</strong>
            </span>
          )}
        </div>

        <h3 className="project-card-title">
          <Link to={`/projects/${project.slug}`}>
            {project.title}
          </Link>
        </h3>

        <p className="project-card-summary">
          {project.summary}
        </p>

        <div className="project-card-tech-list">
          {project.technologies.slice(0, 5).map((tech) => (
            <span key={tech} className="project-card-tech-pill">
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="project-card-tech-pill more">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        <div className="project-card-actions">
          <Button
            to={`/projects/${project.slug}`}
            variant="outline"
            size="sm"
            icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>}
          >
            VIEW CASE STUDY
          </Button>

          {project.githubUrl && (
            <Button
              href={project.githubUrl}
              variant="secondary"
              size="sm"
              icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>}
            >
              GITHUB
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

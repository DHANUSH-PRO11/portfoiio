import React, { useState } from 'react';
import './Projects.css';
import { projects } from '../../data/projects';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal';

export function Projects() {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const categories = ['ALL', 'MACHINE LEARNING', 'GRAPH ALGORITHMS', 'FULL-STACK'];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'MACHINE LEARNING') return project.technologies.some(t => t.includes('Machine Learning') || t.includes('XGBoost') || t.includes('GBDT'));
    if (activeFilter === 'GRAPH ALGORITHMS') return project.technologies.some(t => t.includes('A*') || t.includes('Dijkstra'));
    if (activeFilter === 'FULL-STACK') return project.technologies.some(t => t.includes('React') || t.includes('FastAPI') || t.includes('PostgreSQL'));
    return true;
  });

  return (
    <div className="projects-page">
      <div className="container">
        
        {/* Page Header */}
        <ScrollReveal>
          <div className="badge-roman">03 // PORTFOLIO ARCHIVES</div>
          <h1 className="projects-hero-title">
            ENGINEERED SYSTEMS &amp;<br />
            <span className="gradient-red-text">PRODUCTION ARCHITECTURES.</span>
          </h1>
          <p className="lead-text" style={{ maxWidth: '720px', marginTop: '1rem' }}>
            Comprehensive showcase of production software, continuous predictive regressors, and algorithmic graph solvers engineered by Dhanush G.
          </p>
        </ScrollReveal>

        {/* Filter Bar */}
        <div className="projects-filter-bar">
          <div className="filter-buttons">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <span className="filter-count">
            SHOWING {filteredProjects.length} OF {projects.length} PROJECTS
          </span>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project, idx) => (
            <ScrollReveal key={project.id} delay={idx * 0.1}>
              <ProjectCard project={project} index={idx} />
            </ScrollReveal>
          ))}
        </div>

      </div>
    </div>
  );
}

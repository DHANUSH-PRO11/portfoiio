import React from 'react';
import './Skills.css';
import { skillCategories } from '../../data/skills';
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal';
import { Button } from '../../components/Button/Button';

export function Skills() {
  return (
    <div className="skills-page">
      <div className="container">
        
        {/* Page Header */}
        <ScrollReveal>
          <div className="badge-roman">04 // TECHNICAL ARSENAL</div>
          <h1 className="skills-hero-title">
            TECHNICAL COMPETENCIES &amp;<br />
            <span className="gradient-red-text">DISCIPLINED SYSTEMS.</span>
          </h1>
          <p className="lead-text" style={{ maxWidth: '750px', marginTop: '1rem' }}>
            A structured breakdown of core engineering proficiencies, algorithms, frameworks, and deployment workflows verified across production projects and competitive coding.
          </p>
        </ScrollReveal>

        {/* Categories Grid */}
        <div className="skills-categories-grid">
          {skillCategories.map((category, catIdx) => (
            <ScrollReveal key={category.id} delay={catIdx * 0.1}>
              <div className="skills-category-block">
                
                <div className="category-block-header">
                  <span className="cat-roman-num">DOMAIN // 0{catIdx + 1}</span>
                  <h2 className="cat-block-title">{category.title}</h2>
                  <p className="cat-block-desc">{category.description}</p>
                </div>

                <div className="skills-cards-list">
                  {category.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="skill-spec-card">
                      <div className="skill-spec-top">
                        <span className="skill-spec-name">{skill.name}</span>
                        <span className="skill-status-tag">
                          <span className="pulse-dot-green"></span>
                          <span>{skill.level}</span>
                        </span>
                      </div>
                      <p className="skill-spec-highlight">
                        {skill.highlight}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA Strip */}
        <div className="skills-bottom-cta">
          <div className="bottom-cta-text">
            <h3 className="bottom-cta-heading">WANT TO SEE THESE SKILLS IN ACTION?</h3>
            <p className="bottom-cta-desc">
              Explore the real-world applications engineered with these exact technologies.
            </p>
          </div>
          <Button to="/projects" variant="primary" size="md">
            VIEW IMPLEMENTATIONS →
          </Button>
        </div>

      </div>
    </div>
  );
}

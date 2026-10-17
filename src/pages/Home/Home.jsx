import React from 'react';
import './Home.css';
import { Hero } from '../../sections/Hero/Hero';
import { FeaturedProjects } from '../../sections/FeaturedProjects/FeaturedProjects';
import { Experience } from '../../sections/Experience/Experience';
import { ContactCTA } from '../../sections/ContactCTA/ContactCTA';
import { Button } from '../../components/Button/Button';
import { skillCategories } from '../../data/skills';
import { achievements } from '../../data/achievements';
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal';

export function Home() {
  return (
    <div className="home-page">
      {/* Hero Opening Screen */}
      <Hero />

      {/* Signature Scroll-Driven Circular Mask Featured Projects */}
      <FeaturedProjects />

      {/* Skills Preview Section */}
      <section className="home-skills-preview">
        <div className="container">
          <ScrollReveal>
            <div className="badge-roman">04 // CORE CAPABILITIES</div>
            <div className="preview-header-split">
              <h2 className="section-title">
                TECHNICAL ARSENAL &amp;<br />
                <span className="gradient-red-text">DISCIPLINED SYSTEMS.</span>
              </h2>
              <div className="preview-cta-wrap">
                <Button to="/skills" variant="outline" size="md">
                  VIEW FULL SKILLS MATRIX ↗
                </Button>
              </div>
            </div>
          </ScrollReveal>

          <div className="skills-preview-grid">
            {skillCategories.map((cat, idx) => (
              <ScrollReveal key={cat.id} delay={idx * 0.1}>
                <div className="skill-cat-tile">
                  <span className="cat-num">0{idx + 1}</span>
                  <h3 className="cat-tile-title">{cat.title}</h3>
                  <p className="cat-tile-desc">{cat.description}</p>
                  <div className="cat-pills-row">
                    {cat.skills.slice(0, 4).map((s) => (
                      <span key={s.name} className="cat-pill">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements & Milestones Preview */}
      <section className="home-achieve-preview">
        <div className="container">
          <ScrollReveal>
            <div className="badge-roman">05 // MILESTONES</div>
            <div className="preview-header-split">
              <h2 className="section-title">
                VERIFIED TRACK RECORD &amp;<br />
                <span className="gradient-red-text">ACHIEVEMENTS.</span>
              </h2>
              <Button to="/achievements" variant="outline" size="md">
                ALL AWARDS &amp; EDUCATION ↗
              </Button>
            </div>
          </ScrollReveal>

          <div className="achieve-preview-grid">
            {achievements.map((ach, idx) => (
              <ScrollReveal key={ach.id} delay={idx * 0.1}>
                <div className="achieve-tile">
                  <div className="achieve-tile-top">
                    <span className="achieve-badge">{ach.badge}</span>
                    <span className="achieve-metric-tag">{ach.metric}</span>
                  </div>
                  <h3 className="achieve-tile-title">{ach.title}</h3>
                  <p className="achieve-tile-sub">{ach.subtitle}</p>
                  <p className="achieve-tile-desc">{ach.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Foundation & Leadership */}
      <Experience />

      {/* Contact Call-To-Action */}
      <ContactCTA />
    </div>
  );
}

import React from 'react';
import './NotFound.css';
import { Button } from '../../components/Button/Button';

export function NotFound() {
  return (
    <div className="notfound-page">
      <div className="container notfound-container">
        
        <div className="notfound-content">
          <span className="mono-tag">ERROR 404 // ROUTE NOT FOUND</span>
          <h1 className="notfound-code gradient-red-text">404</h1>
          <h2 className="notfound-title">SYSTEM TRAVERSAL TERMINATED</h2>
          <p className="notfound-lead">
            The requested route or case study node does not exist in the active graph topology.
          </p>

          <div className="notfound-actions">
            <Button
              to="/"
              variant="primary"
              size="lg"
              icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>}
            >
              RETURN TO BASE
            </Button>
            <Button
              to="/projects"
              variant="outline"
              size="lg"
            >
              BROWSE ARCHIVES
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}

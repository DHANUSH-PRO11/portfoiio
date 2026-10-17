import React from 'react';
import './Loader.css';

export function Loader({ text = 'INITIALIZING SYSTEM...' }) {
  return (
    <div className="loader-container">
      <div className="loader-box">
        <div className="loader-monogram">DG</div>
        <div className="loader-spinner-bar">
          <div className="loader-spinner-progress"></div>
        </div>
        <span className="loader-text">{text}</span>
      </div>
    </div>
  );
}

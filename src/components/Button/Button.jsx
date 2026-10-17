import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';
import { playFuturisticTone } from '../../animations/transitions';

export function Button({
  children,
  to,
  href,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'acid'
  size = 'md',        // 'sm', 'md', 'lg'
  icon,
  onClick,
  type = 'button',
  className = '',
  target,
  rel,
  ...props
}) {
  const handleClick = (e) => {
    playFuturisticTone(variant === 'primary' ? 880 : 660, 0.08, 0.04);
    if (onClick) onClick(e);
  };

  const btnClass = `btn btn-${variant} btn-${size} ${className}`.trim();

  const content = (
    <>
      <span className="btn-text">{children}</span>
      {icon && <span className="btn-icon">{icon}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={btnClass} onClick={handleClick} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={btnClass}
        onClick={handleClick}
        target={target || (href.startsWith('http') ? '_blank' : undefined)}
        rel={rel || (href.startsWith('http') ? 'noopener noreferrer' : undefined)}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={btnClass} onClick={handleClick} {...props}>
      {content}
    </button>
  );
}

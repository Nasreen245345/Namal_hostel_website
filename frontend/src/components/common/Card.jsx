import React from 'react';

const Card = ({
  children,
  title,
  subtitle,
  image,
  imageAlt,
  footer,
  onClick,
  className = '',
  variant = 'default',
  hoverable = false,
  flat = false,
}) => {
  return (
    <div
      className={`card card-${variant} ${hoverable ? 'card-hoverable' : ''} ${
        flat ? 'card-flat' : ''
      } ${className}`}
      onClick={onClick}
    >
      {image && (
        <div className="card-image-container">
          <img src={image} alt={imageAlt || 'Card image'} className="card-image" />
        </div>
      )}
      
      <div className="card-content">
        {title && <h3 className="card-title">{title}</h3>}
        {subtitle && <div className="card-subtitle">{subtitle}</div>}
        <div className="card-body">{children}</div>
      </div>

      {footer && <div className="card-footer">{footer}</div>}

      <style jsx>{`
        .card {
          background-color: var(--bg-primary);
          border-radius: var(--border-radius);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: var(--transition);
          height: 100%;
        }
        
        .card:not(.card-flat) {
          box-shadow: var(--box-shadow);
        }
        
        .card-flat {
          border: 1px solid var(--border-color);
        }
        
        .card-hoverable {
          cursor: pointer;
        }
        
        .card-hoverable:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        .card-image-container {
          width: 100%;
          position: relative;
          padding-top: 56.25%; /* 16:9 Aspect Ratio */
        }
        
        .card-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .card-content {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }
        
        .card-subtitle {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }
        
        .card-body {
          flex: 1;
        }
        
        .card-footer {
          padding: 1rem 1.5rem;
          border-top: 1px solid var(--border-color);
          background-color: var(--bg-secondary);
        }
        
        /* Card variants */
        .card-default {
          /* Default styling already applied */
        }
        
        .card-primary {
          border-top: 4px solid var(--primary-color);
        }
        
        .card-secondary {
          border-top: 4px solid var(--secondary-color);
        }
        
        .card-accent {
          border-top: 4px solid var(--accent-color);
        }
        
        .card-outlined {
          background-color: transparent;
          border: 2px solid var(--primary-color);
          box-shadow: none;
        }
      `}</style>
    </div>
  );
};

export default Card;
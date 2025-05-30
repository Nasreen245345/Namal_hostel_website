import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  to = null,
  href = null,
  onClick = null,
  disabled = false,
  fullWidth = false,
  icon = null,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  // Classes based on props
  const buttonClasses = `
    btn 
    btn-${variant} 
    btn-${size} 
    ${fullWidth ? 'btn-full' : ''} 
    ${icon ? `btn-icon-${iconPosition}` : ''} 
    ${className}
  `;

  // Render button content with or without icon
  const renderContent = () => (
    <>
      {icon && iconPosition === 'left' && <span className="btn-icon">{icon}</span>}
      <span className="btn-text">{children}</span>
      {icon && iconPosition === 'right' && <span className="btn-icon">{icon}</span>}
    </>
  );

  // Determine which element to render based on props
  if (to) {
    return (
      <Link to={to} className={buttonClasses} {...props}>
        {renderContent()}
      </Link>
    );
  } else if (href) {
    return (
      <a href={href} className={buttonClasses} target="_blank" rel="noopener noreferrer" {...props}>
        {renderContent()}
      </a>
    );
  } else {
    return (
      <button
        type={type}
        className={buttonClasses}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {renderContent()}
        
        <style jsx>{`
          .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            border-radius: var(--border-radius);
            transition: var(--transition);
            cursor: pointer;
            text-align: center;
            border: none;
            outline: none;
            text-decoration: none;
          }
          
          .btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
          
          /* Variants */
          .btn-primary {
            background-color: var(--primary-color);
            color: var(--text-light);
          }
          
          .btn-primary:hover:not(:disabled) {
            background-color: var(--secondary-color);
          }
          
          .btn-secondary {
            background-color: transparent;
            color: var(--primary-color);
            border: 1px solid var(--primary-color);
          }
          
          .btn-secondary:hover:not(:disabled) {
            background-color: var(--primary-color);
            color: var(--text-light);
          }
          
          .btn-accent {
            background-color: var(--accent-color);
            color: var(--text-light);
          }
          
          .btn-accent:hover:not(:disabled) {
            background-color: #e89209;
          }
          
          .btn-text {
            background-color: transparent;
            color: var(--primary-color);
            padding: 0;
          }
          
          .btn-text:hover:not(:disabled) {
            color: var(--secondary-color);
            text-decoration: underline;
          }
          
          .btn-danger {
            background-color: #f43f5e;
            color: var(--text-light);
          }
          
          .btn-danger:hover:not(:disabled) {
            background-color: #e11d48;
          }
          
          .btn-success {
            background-color: #10b981;
            color: var(--text-light);
          }
          
          .btn-success:hover:not(:disabled) {
            background-color: #059669;
          }
          
          /* Sizes */
          .btn-sm {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
          }
          
          .btn-md {
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
          }
          
          .btn-lg {
            padding: 1rem 2rem;
            font-size: 1.125rem;
          }
          
          /* Full width */
          .btn-full {
            width: 100%;
          }
          
          /* Icon positions */
          .btn-icon-left {
            flex-direction: row;
          }
          
          .btn-icon-right {
            flex-direction: row-reverse;
          }
          
          .btn-icon {
            display: flex;
            align-items: center;
          }
          
          .btn-icon-left .btn-icon {
            margin-right: 0.5rem;
          }
          
          .btn-icon-right .btn-icon {
            margin-left: 0.5rem;
          }
        `}</style>
      </button>
    );
  }
};

export default Button;
import React from 'react';

const Loader = ({ size = 'md', color = 'primary', fullScreen = false, text = 'Loading...' }) => {
  return (
    <div className={`loader-container ${fullScreen ? 'loader-fullscreen' : ''}`}>
      <div className={`loader loader-${size} loader-${color}`}></div>
      {text && <p className="loader-text">{text}</p>}

      <style jsx>{`
        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }
        
        .loader-fullscreen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.8);
          z-index: 9999;
        }
        
        .loader {
          border-radius: 50%;
          border: 3px solid transparent;
          animation: spin 1s linear infinite;
        }
        
        .loader-sm {
          width: 30px;
          height: 30px;
          border-width: 2px;
        }
        
        .loader-md {
          width: 40px;
          height: 40px;
          border-width: 3px;
        }
        
        .loader-lg {
          width: 60px;
          height: 60px;
          border-width: 4px;
        }
        
        .loader-primary {
          border-top-color: var(--primary-color);
        }
        
        .loader-secondary {
          border-top-color: var(--secondary-color);
        }
        
        .loader-accent {
          border-top-color: var(--accent-color);
        }
        
        .loader-success {
          border-top-color: #10b981;
        }
        
        .loader-danger {
          border-top-color: #f43f5e;
        }
        
        .loader-text {
          margin-top: 1rem;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }
        
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
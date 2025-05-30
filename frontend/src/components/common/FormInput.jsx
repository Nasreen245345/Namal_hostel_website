import React from 'react';

const FormInput = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
  error,
  required = false,
  disabled = false,
  className = '',
  options = [],
  multiple = false,
  rows = 3
}) => {
  // Render different input types based on the type prop
  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`form-input ${error ? 'form-input-error' : ''} ${className}`}
            required={required}
            disabled={disabled}
            rows={rows}
          />
        );
      case 'select':
        return (
          <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className={`form-input form-select ${error ? 'form-input-error' : ''} ${className}`}
            required={required}
            disabled={disabled}
            multiple={multiple}
          >
            <option value="" disabled>
              {placeholder || 'Select an option'}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <div className="form-checkbox-wrapper">
            <input
              type="checkbox"
              id={id}
              name={name}
              checked={value}
              onChange={onChange}
              className={`form-checkbox ${error ? 'form-checkbox-error' : ''} ${className}`}
              required={required}
              disabled={disabled}
            />
            <label htmlFor={id} className="form-checkbox-label">
              {label}
            </label>
          </div>
        );
      case 'radio':
        return (
          <div className="form-radio-group">
            {options.map((option) => (
              <div key={option.value} className="form-radio-wrapper">
                <input
                  type="radio"
                  id={`${id}-${option.value}`}
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={onChange}
                  className={`form-radio ${error ? 'form-radio-error' : ''} ${className}`}
                  required={required}
                  disabled={disabled}
                />
                <label htmlFor={`${id}-${option.value}`} className="form-radio-label">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );
      case 'file':
        return (
          <div className="form-file-wrapper">
            <input
              type="file"
              id={id}
              name={name}
              onChange={onChange}
              className={`form-file ${error ? 'form-file-error' : ''} ${className}`}
              required={required}
              disabled={disabled}
              multiple={multiple}
              accept={placeholder} // Using placeholder for 'accept' attribute in file inputs
            />
            <label htmlFor={id} className="form-file-label">
              Choose file
            </label>
          </div>
        );
      default:
        return (
          <input
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`form-input ${error ? 'form-input-error' : ''} ${className}`}
            required={required}
            disabled={disabled}
          />
        );
    }
  };

  return (
    <div className="form-group">
      {type !== 'checkbox' && (
        <label htmlFor={id} className="form-label">
          {label} {required && <span className="required-mark">*</span>}
        </label>
      )}
      {renderInput()}
      {error && <div className="form-error-message">{error}</div>}

      <style jsx>{`
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--text-primary);
        }
        
        .required-mark {
          color: #f43f5e;
        }
        
        .form-input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius);
          font-size: 1rem;
          color: var(--text-primary);
          background-color: var(--bg-primary);
          transition: var(--transition);
        }
        
        .form-input:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 2px rgba(30, 64, 175, 0.2);
        }
        
        .form-input-error {
          border-color: #f43f5e;
        }
        
        .form-input-error:focus {
          box-shadow: 0 0 0 2px rgba(244, 63, 94, 0.2);
        }
        
        .form-error-message {
          margin-top: 0.25rem;
          color: #f43f5e;
          font-size: 0.875rem;
        }
        
        .form-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1em;
          padding-right: 2.5rem;
        }
        
        .form-checkbox-wrapper,
        .form-radio-wrapper {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        
        .form-checkbox-label,
        .form-radio-label {
          margin-left: 0.5rem;
          margin-bottom: 0;
        }
        
        .form-radio-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .form-file-wrapper {
          position: relative;
          display: inline-block;
          width: 100%;
        }
        
        .form-file {
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
        
        .form-file-label {
          display: block;
          padding: 0.75rem;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius);
          text-align: center;
          cursor: pointer;
          transition: var(--transition);
        }
        
        .form-file:focus + .form-file-label,
        .form-file:hover + .form-file-label {
          background-color: var(--border-color);
        }
      `}</style>
    </div>
  );
};

export default FormInput;
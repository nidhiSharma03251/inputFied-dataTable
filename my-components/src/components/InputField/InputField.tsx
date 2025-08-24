import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';


interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'password';
  showClearButton?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  value: propValue = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  showClearButton = false,
}) => {
  
  const [internalValue, setInternalValue] = useState<string>(propValue);
  
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>(type);

  
  useEffect(() => {
    setInternalValue(propValue);
  }, [propValue]);

  
  useEffect(() => {
    if (type === 'password' && isPasswordVisible) {
      setInputType('text');
    } else {
      setInputType(type);
    }
  }, [type, isPasswordVisible]);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  
  const handleClear = () => {
    const e = {
      target: {
        value: '',
      },
    } as React.ChangeEvent<HTMLInputElement>;
    setInternalValue('');
    if (onChange) {
      onChange(e);
    }
  };

  
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  
  const baseClasses = 'peer w-full h-full bg-transparent text-gray-900 dark:text-gray-100 font-sans font-normal outline-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-t-transparent';
  
  
  const variantClasses = {
    outlined: `border border-gray-300 dark:border-gray-600 focus:border-2 ${invalid ? 'border-red-500' : 'focus:border-blue-500'}`,
    filled: 'border-0 bg-gray-100 dark:bg-gray-700 focus:ring-1 focus:ring-blue-500',
    ghost: 'border-0 bg-transparent focus:ring-1 focus:ring-blue-500',
  };

  
  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-3 py-2',
    lg: 'text-lg px-4 py-3',
  };

  const ringClasses = `focus:ring-2 focus:ring-offset-2`;

  const dynamicInputClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;

  
  const stateClasses = {
    disabled: 'cursor-not-allowed opacity-50',
    invalid: 'border-red-500 focus:border-red-500',
    valid: 'focus:border-blue-500',
  };

  
  const containerClasses = `relative w-full min-w-[200px] h-10`;

  
  const labelClasses = `
    absolute left-0 -top-1.5 peer-placeholder-shown:top-2 peer-focus:-top-1.5
    text-sm text-gray-500 dark:text-gray-400 peer-focus:text-blue-500
    peer-focus:peer-invalid:text-red-500
    pointer-events-none transition-all
  `;

  return (
    <div className={`flex flex-col mb-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm ${disabled ? 'opacity-50' : ''}`}>
      {label && (
        <label htmlFor="input-field" className="text-gray-700 dark:text-gray-300 mb-1 text-sm font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id="input-field"
          type={inputType}
          value={internalValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full rounded-md font-sans text-gray-900 dark:text-gray-100 transition-all 
            ${size === 'sm' ? 'px-2 py-1' : ''}
            ${size === 'md' ? 'px-3 py-2' : ''}
            ${size === 'lg' ? 'px-4 py-3' : ''}
            ${variant === 'outlined' ? 'border border-gray-300 dark:border-gray-600 focus:border-blue-500' : ''}
            ${variant === 'filled' ? 'bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500' : ''}
            ${variant === 'ghost' ? 'border-none bg-transparent focus:ring-2 focus:ring-blue-500' : ''}
            ${invalid ? 'border-red-500 focus:border-red-500' : ''}
            ${disabled ? 'cursor-not-allowed bg-gray-200 dark:bg-gray-800' : ''}
          `}
        />
        {(showClearButton && internalValue) || (type === 'password') ? (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {showClearButton && internalValue && (
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 focus:outline-none mr-2"
                aria-label="Clear input"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            {type === 'password' && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
              >
                {isPasswordVisible ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8-4.03-8-9s3.582-9 8-9c.928 0 1.83.17 2.68.49" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12c-1.574 2.864-4.22 5-7.5 5.5s-6.938 1.5-10.5 0" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12.102a.896.896 0 01-.005-.316A12.001 12.001 0 0112 4c2.812 0 5.488.946 7.642 2.766a.916.916 0 01.006.319A12.001 12.001 0 0112 20c-2.812 0-5.488-.946-7.642-2.766z" />
                  </svg>
                )}
              </button>
            )}
          </div>
        ) : null}
      </div>
      {helperText && !invalid && (
        <span className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</span>
      )}
      {errorMessage && invalid && (
        <span className="mt-1 text-sm text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};


const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [invalidValue, setInvalidValue] = useState('This is invalid');

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-8 min-h-screen text-gray-900 dark:text-gray-100 font-sans">
      <div className="max-w-xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-600 dark:text-blue-400">
          InputField Component Showcase
        </h1>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2">Outlined Variant</h2>
          <InputField
            label="Outlined Small"
            placeholder="Enter text..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            size="sm"
            variant="outlined"
            helperText="A small outlined input field."
            showClearButton
          />
          <InputField
            label="Outlined Medium"
            placeholder="Enter text..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            size="md"
            variant="outlined"
            helperText="A medium outlined input field."
            showClearButton
          />
          <InputField
            label="Outlined Large"
            placeholder="Enter text..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            size="lg"
            variant="outlined"
            helperText="A large outlined input field."
            showClearButton
          />
          <InputField
            label="Outlined Invalid"
            value={invalidValue}
            onChange={(e) => setInvalidValue(e.target.value)}
            invalid
            errorMessage="This field is invalid."
            variant="outlined"
          />
          <InputField
            label="Outlined Disabled"
            placeholder="This is disabled"
            disabled
            variant="outlined"
          />
        </div>

        
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2">Filled Variant</h2>
          <InputField
            label="Filled Medium"
            placeholder="Enter text..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            size="md"
            variant="filled"
            helperText="A filled input field."
            showClearButton
          />
          <InputField
            label="Filled Invalid"
            value={invalidValue}
            onChange={(e) => setInvalidValue(e.target.value)}
            invalid
            errorMessage="This field is invalid."
            variant="filled"
          />
          <InputField
            label="Filled Disabled"
            placeholder="This is disabled"
            disabled
            variant="filled"
          />
        </div>


        <div className="space-y-4">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2">Ghost Variant</h2>
          <InputField
            label="Ghost Medium"
            placeholder="Enter text..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            size="md"
            variant="ghost"
            helperText="A ghost input field."
            showClearButton
          />
          <InputField
            label="Ghost Invalid"
            value={invalidValue}
            onChange={(e) => setInvalidValue(e.target.value)}
            invalid
            errorMessage="This field is invalid."
            variant="ghost"
          />
          <InputField
            label="Ghost Disabled"
            placeholder="This is disabled"
            disabled
            variant="ghost"
          />
        </div>

        
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2">Password Fields</h2>
          <InputField
            label="Password Input"
            placeholder="Enter password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            type="password"
            size="md"
            variant="outlined"
            helperText="Click the icon to show/hide the password."
          />
        </div>

      </div>
    </div>
  );
};

export default App;

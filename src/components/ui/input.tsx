import React, { useId } from 'react';
import { inputStyles, combineClasses } from '@/lib/styles/component-styles';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'error' | 'success';
  inputSize?: 'sm' | 'md' | 'lg';
  label?: string;
  error?: string;
  helpText?: string;
}

export const Input: React.FC<InputProps> = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className = '', 
    variant = 'default',
    inputSize = 'md',
    label,
    error,
    helpText,
    id,
    ...props 
  }, ref) => {
    const baseClasses = inputStyles.base;
    const variantClasses = inputStyles.variants[variant] || inputStyles.variants.default;
    const sizeClasses = inputStyles.sizes[inputSize] || inputStyles.sizes.md;
    
    const inputClasses = combineClasses(
      baseClasses,
      variantClasses,
      sizeClasses,
      error && 'border-red-300 focus:border-red-500 focus:ring-red-500',
      className
    );

    const generatedId = useId();
  const inputId = id || generatedId;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          suppressHydrationWarning
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
        {helpText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helpText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input; 
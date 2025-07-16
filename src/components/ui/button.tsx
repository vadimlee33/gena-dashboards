import React from 'react';
import { buttonStyles, combineClasses } from '@/lib/styles/component-styles';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost' | 'outline' | 'withIcon';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  loading = false,
  icon,
  iconPosition = 'left',
  disabled,
  ...props
}) => {
  const baseClasses = buttonStyles.base;
  const variantClasses = buttonStyles.variants[variant] || buttonStyles.variants.primary;
  const sizeClasses = buttonStyles.sizes[size] || buttonStyles.sizes.md;
  
  const classes = combineClasses(
    baseClasses,
    variantClasses,
    sizeClasses,
    loading && 'opacity-75 cursor-not-allowed',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="animate-spin -ml-1 mr-2">
          ⏳
        </span>
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      
      {children}
      
      {!loading && icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

export default Button; 
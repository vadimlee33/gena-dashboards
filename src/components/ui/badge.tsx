import React from 'react';
import { badgeStyles, combineClasses } from '@/lib/styles/component-styles';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const baseClasses = badgeStyles.base;
  const variantClasses = badgeStyles.variants[variant] || badgeStyles.variants.primary;
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm',
  };
  
  const classes = combineClasses(
    baseClasses,
    variantClasses,
    sizeClasses[size] || sizeClasses.md,
    className
  );

  return (
    <span className={classes}>
      {children}
    </span>
  );
};

export default Badge; 
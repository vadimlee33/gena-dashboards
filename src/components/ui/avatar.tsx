import React from 'react';
import { avatarStyles, combineClasses } from '@/lib/styles/component-styles';

export interface AvatarProps {
  src?: string;
  alt?: string;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const baseClasses = avatarStyles.base;
  const variantClasses = avatarStyles.variants[variant] || avatarStyles.variants.primary;
  const sizeClasses = avatarStyles.sizes[size] || avatarStyles.sizes.md;
  
  const classes = combineClasses(
    baseClasses,
    variantClasses,
    sizeClasses,
    className
  );

  if (src) {
    return (
      <img
        src={src}
        alt={alt || 'Avatar'}
        className={combineClasses(baseClasses, sizeClasses, className)}
      />
    );
  }

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Avatar; 
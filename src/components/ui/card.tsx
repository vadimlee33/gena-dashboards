import React from 'react';
import { cardStyles } from '@/lib/styles/component-styles';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  padding = 'md',
  onClick,
  ...props 
}) => {
  const baseClasses = cardStyles.base;
  const paddingClasses = cardStyles.padding[padding] || cardStyles.padding.md;
  
  const classes = [
    baseClasses,
    paddingClasses,
    onClick && 'cursor-pointer',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={classes}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
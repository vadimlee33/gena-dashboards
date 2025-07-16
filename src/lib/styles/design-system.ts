// Design System - Tailwind CSS Configuration
// This file contains all design tokens and utility classes for consistent styling

export const colors = {
  // Primary Colors
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  // Secondary Colors
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  // Success Colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  // Warning Colors
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  // Danger Colors
  danger: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
};

export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
};

export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
};

export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

// Utility class generators
export const generateButtonClasses = (variant: string, size: string) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500 shadow-sm hover:shadow-md',
    secondary: 'bg-secondary-100 hover:bg-secondary-200 text-secondary-900 focus:ring-secondary-500 border border-secondary-300',
    success: 'bg-success-600 hover:bg-success-700 text-white focus:ring-success-500 shadow-sm hover:shadow-md',
    danger: 'bg-danger-600 hover:bg-danger-700 text-white focus:ring-danger-500 shadow-sm hover:shadow-md',
    ghost: 'bg-transparent hover:bg-secondary-100 text-secondary-700 hover:text-secondary-900',
    outline: 'bg-transparent border border-secondary-300 text-secondary-700 hover:bg-secondary-50 hover:text-secondary-900',
  };
  
  const sizes = {
    xs: 'px-2 py-1 text-xs rounded',
    sm: 'px-3 py-1.5 text-sm rounded',
    md: 'px-4 py-2 text-sm rounded-md',
    lg: 'px-6 py-3 text-base rounded-lg',
    xl: 'px-8 py-4 text-lg rounded-lg',
  };
  
  return `${baseClasses} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md}`;
};

export const generateInputClasses = (variant: string = 'default') => {
  const baseClasses = 'w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0';
  
  const variants = {
    default: 'border-secondary-300 focus:border-primary-500 focus:ring-primary-500 bg-white',
    error: 'border-danger-300 focus:border-danger-500 focus:ring-danger-500 bg-white',
    success: 'border-success-300 focus:border-success-500 focus:ring-success-500 bg-white',
  };
  
  return `${baseClasses} ${variants[variant]} rounded-md px-3 py-2 text-sm`;
};

export const generateCardClasses = (variant: string = 'default') => {
  const baseClasses = 'rounded-lg border transition-all duration-200';
  
  const variants = {
    default: 'bg-white border-secondary-200 shadow-sm hover:shadow-md',
    elevated: 'bg-white border-secondary-200 shadow-md hover:shadow-lg',
    outline: 'bg-transparent border-secondary-300',
    ghost: 'bg-secondary-50 border-transparent',
  };
  
  return `${baseClasses} ${variants[variant]}`;
};

// Animation utilities
export const animations = {
  fadeIn: 'animate-in fade-in duration-200',
  slideIn: 'animate-in slide-in-from-bottom-2 duration-200',
  scaleIn: 'animate-in zoom-in-95 duration-200',
  fadeOut: 'animate-out fade-out duration-200',
  slideOut: 'animate-out slide-out-to-bottom-2 duration-200',
  scaleOut: 'animate-out zoom-out-95 duration-200',
};

// Layout utilities
export const layout = {
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-8 sm:py-12 lg:py-16',
  grid: 'grid gap-4 sm:gap-6 lg:gap-8',
  flex: 'flex items-center justify-between',
  center: 'flex items-center justify-center',
}; 
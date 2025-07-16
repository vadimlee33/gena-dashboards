// Component Styles - Reusable style classes for UI components
// This file contains pre-defined style classes for consistent component styling

export const buttonStyles = {
  base: 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  variants: {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-sm hover:shadow-md active:scale-95',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-500 border border-gray-300 active:scale-95',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 shadow-sm hover:shadow-md active:scale-95',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-sm hover:shadow-md active:scale-95',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 hover:text-gray-900 active:scale-95',
    outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 active:scale-95',
    withIcon: 'bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-900 active:scale-95 transition-all duration-200',
  },
  sizes: {
    xs: 'px-2 py-1 text-xs rounded',
    sm: 'px-3 py-1.5 text-sm rounded',
    md: 'px-4 py-2 text-sm rounded-md',
    lg: 'px-6 py-3 text-base rounded-lg',
    xl: 'px-8 py-4 text-lg rounded-lg',
  },
};

export const inputStyles = {
  base: 'w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0',
  variants: {
    default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white placeholder-gray-400',
    error: 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-white placeholder-gray-400',
    success: 'border-green-300 focus:border-green-500 focus:ring-green-500 bg-white placeholder-gray-400',
  },
  sizes: {
    sm: 'px-2 py-1 text-xs rounded',
    md: 'px-3 py-2 text-sm rounded-md',
    lg: 'px-4 py-3 text-base rounded-lg',
  },
};

export const cardStyles = {
  base: 'rounded-lg border-2 border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md mb-4',
  padding: {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  },
};

export const modalStyles = {
  overlay: 'fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm',
  content: 'bg-white rounded-lg shadow-xl p-6 min-w-[320px] max-w-[90vw] max-h-[90vh] overflow-auto relative z-10',
  header: 'flex items-center justify-between mb-4 pb-4 border-b border-gray-200',
  body: 'mb-4',
  footer: 'flex items-center justify-end gap-2 pt-4 border-t border-gray-200',
  closeButton: 'absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors',
};

export const badgeStyles = {
  base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
  variants: {
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
  },
};

export const avatarStyles = {
  base: 'inline-flex items-center justify-center rounded-full font-medium',
  sizes: {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  },
  variants: {
    primary: 'bg-blue-100 text-blue-600',
    secondary: 'bg-gray-100 text-gray-600',
    success: 'bg-green-100 text-green-600',
    warning: 'bg-yellow-100 text-yellow-600',
    danger: 'bg-red-100 text-red-600',
  },
};

export const tooltipStyles = {
  base: 'absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg',
  arrow: 'absolute w-2 h-2 bg-gray-900 transform rotate-45',
};

export const dropdownStyles = {
  base: 'absolute z-50 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1',
  item: 'block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer',
  divider: 'border-t border-gray-200 my-1',
};

export const tableStyles = {
  base: 'min-w-full divide-y divide-gray-200',
  header: 'bg-gray-50',
  headerCell: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
  row: 'bg-white hover:bg-gray-50 transition-colors',
  cell: 'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
  pagination: 'bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6',
};

export const formStyles = {
  group: 'space-y-2',
  label: 'block text-sm font-medium text-gray-700',
  helpText: 'mt-1 text-sm text-gray-500',
  errorText: 'mt-1 text-sm text-red-600',
  fieldset: 'space-y-4',
  legend: 'text-lg font-medium text-gray-900',
};

export const navigationStyles = {
  base: 'flex space-x-8',
  item: 'text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors',
  active: 'bg-blue-100 text-blue-700',
  mobile: 'block px-3 py-2 rounded-md text-base font-medium',
};

export const sidebarStyles = {
  base: 'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out',
  overlay: 'fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden',
  header: 'flex items-center justify-between p-4 border-b border-gray-200',
  nav: 'mt-4 px-2 space-y-1',
  navItem: 'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
  navItemActive: 'bg-blue-100 text-blue-700',
  navItemInactive: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
};

export const chartStyles = {
  container: 'bg-white rounded-lg border border-gray-200 p-4 shadow-sm',
  header: 'flex items-center justify-between mb-4',
  title: 'text-lg font-semibold text-gray-900',
  loading: 'flex items-center justify-center h-64 text-gray-500',
  error: 'flex items-center justify-center h-64 text-red-500',
  empty: 'flex items-center justify-center h-64 text-gray-400',
};

export const dashboardStyles = {
  grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
  card: 'rounded-xl shadow-lg hover:shadow-xl transition-all duration-300',
  header: 'flex items-center justify-between mb-6',
  title: 'text-2xl font-bold text-gray-900',
  subtitle: 'text-gray-600',
  actions: 'flex items-center space-x-2',
  empty: 'text-center py-12 text-gray-500',
  container: 'space-y-8 w-full',
  createSection: 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200',
  createHeader: 'mb-6',
  createTitle: 'text-2xl mb-2',
  createForm: 'flex gap-4 items-end',
  createInput: 'flex-1',
  createButton: 'px-8',
  listSection: 'space-y-6 w-full',
  emptyCard: 'text-center',
  emptyIcon: 'mx-auto h-20 w-20 text-gray-300 flex items-center justify-center text-4xl mb-4',
  emptyTitle: 'text-lg font-semibold text-gray-900 mb-2',
  emptyDescription: 'text-gray-500 mb-6 max-w-md mx-auto',
};

export const layoutStyles = {
  page: 'min-h-screen bg-gray-50',
  header: 'bg-white shadow-sm border-b border-gray-200',
  main: 'w-full',
  sidebar: 'w-64 bg-white shadow-lg border-r border-gray-200',
  content: 'flex-1 overflow-auto',
  footer: 'bg-white border-t border-gray-200 py-4',
};

export const headerStyles = {
  container: 'px-4 sm:px-6 lg:px-8',
  content: 'flex items-center justify-between h-16 max-w-6xl mx-auto',
  logo: 'flex items-center',
  title: 'text-xl font-bold text-blue-600',
  navigation: 'hidden md:flex space-x-8',
  navLink: 'text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors',
  actions: 'flex items-center space-x-4',
  menuButton: 'p-2 text-gray-400 hover:text-gray-600 transition-colors',
};

export const layoutSidebarStyles = {
  container: 'p-4',
  navigation: 'space-y-2',
  navLink: 'flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 transition-colors',
};

export const mainContentStyles = {
  container: 'w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8',
  content: 'w-full max-w-4xl mx-auto',
};

// Utility functions for combining styles
export const combineClasses = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const createVariantClasses = (base: string, variants: Record<string, string>, variant: string): string => {
  return combineClasses(base, variants[variant] || variants.default || '');
}; 
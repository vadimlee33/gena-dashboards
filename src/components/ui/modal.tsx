import React, { useEffect } from 'react';
import { modalStyles, combineClasses } from '@/lib/styles/component-styles';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ 
  open, 
  onClose, 
  children, 
  title,
  size = 'md',
  showCloseButton = true 
}) => {
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = 'unset';
      return;
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose]);

  if (!open) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-4xl',
  };

  const modalContentClasses = combineClasses(
    modalStyles.content,
    sizeClasses[size],
    'animate-in zoom-in-95 duration-200'
  );

  return (
    <div className={modalStyles.overlay} role="dialog" aria-modal="true" onClick={onClose}>
      <div className={modalContentClasses} onClick={(e) => e.stopPropagation()}>
        {showCloseButton && (
          <button
            className={modalStyles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        )}
        
        {title && (
          <div className={modalStyles.header}>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          </div>
        )}
        
        <div className={modalStyles.body}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal; 
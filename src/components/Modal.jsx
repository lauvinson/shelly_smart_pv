import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';

export const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      <div
        ref={modalRef}
        className="bg-white dark:bg-[#2a1d15] rounded-2xl shadow-2xl w-full max-w-md transform transition-all scale-100 opacity-100"
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-gray-800">
           <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <span className="material-symbols-outlined">close</span>
           </button>
        </div>
        <div className="p-6">
           {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

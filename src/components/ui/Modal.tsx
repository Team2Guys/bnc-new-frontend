'use client';
import React from 'react';
import { X } from 'lucide-react';

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: React.ReactNode;
  showCloseButton?: boolean;
  width?: number | string; // NEW width prop
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  children,
  title,
  showCloseButton = true,
  width = 'max-w-4xl', // default tailwind class
}) => {
  if (!open) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getWidthClass = () => {
    if (typeof width === 'string') return width;
    if (typeof width === 'number') return `max-w-[${width}px]`;
    return 'max-w-4xl';
  };

  return (
    <div
      className="fixed -inset-4 bg-black/50 z-[60] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-secondary-foreground shadow-xl w-full relative z-50 rounded-lg m-2 ${getWidthClass()}`}
        onClick={(e) => e.stopPropagation()}
      >
          <div className="px-6 py-4 border-b border-gray-200 relative shadow-md">
            <div className="text-xl font-semibold">{title ?? " "}</div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="bg-secondary rounded-full text-white absolute -top-2 md:top-2 -right-1 md:right-2"
              >
                <X className="w-7 h-7" />
              </button>
            )}
          </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;

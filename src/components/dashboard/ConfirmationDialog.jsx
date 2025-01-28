import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';

const ConfirmationDialog = ({ 
  children,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Continue",
  cancelText = "Cancel",
  onConfirm = () => {},
}) => {
    const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  return (
    <div>
      <button 
      className="p-2 rounded-full hover:bg-gray-700 transition-colors
      focus:outline-none focus:ring-2 focus:ring-gray-500"
      aria-label="Logout"
        onClick={() => setIsOpen(true)}
      >
        {children}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          
          <div className="relative bg-gray-100 rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="text-red-500" size={24} />
              <h2 className="text-lg text-gray-600 font-semibold">{title}</h2>
            </div>

            <p className="text-gray-600 mb-6">{description}</p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded text-gray-600 bg-gray-200 hover:bg-gray-300"
              >
                {cancelText}
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmationDialog;
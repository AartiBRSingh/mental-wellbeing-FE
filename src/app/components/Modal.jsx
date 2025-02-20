import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useState } from "react";

const Modal = ({ children, onClose, autoOpen = true }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (autoOpen) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [autoOpen]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center 
                    animate-in fade-in duration-300"
    >
      <div
        className="bg-white dark:bg-gray-800 w-full max-w-lg mx-4 rounded-xl shadow-2xl 
                      transform scale-100 animate-in zoom-in-95 duration-300"
      >
        <div className="p-6">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 
                         transition-colors duration-200"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          <div className="mt-2">{children}</div>
        </div>
        <div
          className="h-4 bg-gradient-to-t from-white dark:from-gray-800 to-transparent 
                        rounded-b-xl"
        />
      </div>
    </div>
  );
};

export default Modal;

import React, { useEffect } from 'react';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-blue-950 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-yellow-400/40 animate-slide-up max-w-md">
      <div className="p-1.5 rounded-xl bg-yellow-400 text-blue-950">
        <Sparkles className="w-5 h-5" />
      </div>
      <span className="text-xs sm:text-sm font-bold flex-1">{message}</span>
      <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

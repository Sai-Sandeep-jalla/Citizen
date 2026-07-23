import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 duration-200">
      <div className={`p-4 rounded-xl shadow-2xl border flex items-center space-x-3 text-xs font-bold max-w-md ${toast.type === 'success'
          ? 'bg-emerald-950 text-emerald-100 border-emerald-700'
          : toast.type === 'warning'
            ? 'bg-orange-950 text-orange-100 border-orange-700'
            : 'bg-blue-950 text-blue-100 border-blue-700'
        }`}>
        {toast.type === 'success' ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        ) : (
          <AlertCircle className="w-5 h-5 text-orange-400 shrink-0" />
        )}
        <div className="flex-1">{toast.message}</div>
        <button onClick={onClose} className="p-1 hover:opacity-70">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

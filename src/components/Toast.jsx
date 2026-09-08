import React from 'react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isError = toast.type === 'error';
  const isWarning = toast.type === 'warning';
  const isSuccess = !isError && !isWarning;

  let bgClass = 'bg-slate-900/95 text-white border-slate-700/60';
  let iconName = 'check_circle';
  let iconColor = 'text-green-400';

  if (isError) {
    bgClass = 'bg-red-900/95 text-white border-red-700/60';
    iconName = 'error';
    iconColor = 'text-red-300';
  } else if (isWarning) {
    bgClass = 'bg-amber-900/95 text-white border-amber-700/60';
    iconName = 'warning';
    iconColor = 'text-amber-300';
  }

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-sm pointer-events-auto transition-all duration-300 animate-in fade-in slide-in-from-top-4">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-md ${bgClass}`}>
        <span className={`material-symbols-outlined text-[22px] shrink-0 ${iconColor}`}>
          {iconName}
        </span>
        <div className="flex-1 text-sm font-medium tracking-tight">
          {toast.message}
        </div>
        <button 
          onClick={onClose}
          className="p-1 rounded-full text-white/60 hover:text-white transition-colors"
          aria-label="Close notification"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    </div>
  );
}

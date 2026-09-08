import React from 'react';

export default function BottomNav({ currentScreen, onNavigate, unreadAlerts = 0 }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: 'yard' },
    { id: 'irrigation', label: 'Irrigation', icon: 'water_drop' },
    { id: 'advisory-ai', label: 'AI Consult', icon: 'psychology' },
    { id: 'alerts', label: 'Alerts', icon: 'notifications', badge: unreadAlerts },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] transition-all">
      <div className="max-w-md sm:max-w-lg mx-auto flex justify-around items-center h-18 py-1 px-2">
        {tabs.map((tab) => {
          const isActive = currentScreen === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`group flex flex-col items-center justify-center min-w-[58px] h-14 rounded-2xl transition-all duration-200 active:scale-95 ${
                isActive 
                  ? 'text-blue-700 font-semibold' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div 
                className={`relative px-3 py-1 rounded-full transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                    : 'group-hover:bg-slate-100 text-slate-500'
                }`}
              >
                <span 
                  className={`material-symbols-outlined text-[23px] ${
                    isActive ? 'fill-1 font-semibold' : ''
                  }`}
                >
                  {tab.icon}
                </span>

                {tab.badge > 0 && !isActive && (
                  <span className="absolute top-0.5 right-1 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
                )}
              </div>
              <span className="text-[11px] font-medium tracking-tight mt-0.5">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

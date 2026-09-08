import React from 'react';

export default function Sidebar({ currentScreen, onNavigate, unreadAlerts = 0 }) {
  const navItems = [
    { id: 'home', label: 'Dashboard', icon: 'yard', description: 'Overview & Vital Health' },
    { id: 'irrigation', label: 'Irrigation Control', icon: 'water_drop', description: 'Manual, Timer & Auto', badge: 'Active' },
    { id: 'advisory-ai', label: 'AI Crop Advisor', icon: 'psychology', description: 'Leaf Pathology Scanner' },
    { id: 'alerts', label: 'Field Alerts', icon: 'notifications', description: 'Sensors & Climate Alerts', alertCount: unreadAlerts },
    { id: 'farm-overview', label: 'Farm Overview', icon: 'agriculture', description: 'Plot & Soil Horizons' },
    { id: 'profile', label: 'Farmer Profile', icon: 'person', description: 'Kisan ID & Landholding' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0 min-h-screen">
      <div className="p-5">
        {/* Brand / Logo */}
        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group mb-8 pb-5 border-b border-slate-100"
        >
          <div className="w-11 h-11 rounded-2xl bg-blue-700 p-1 flex items-center justify-center shadow-md shadow-blue-700/20 group-hover:bg-blue-800 transition-colors">
            <svg className="w-7 h-7" viewBox="0 0 100 100" fill="none">
              <rect width="100" height="100" rx="24" fill="#1D4ED8" />
              <path d="M50 20C45 28 32 38 32 54C32 64 40 72 50 72C60 72 68 64 68 54C68 38 55 28 50 20Z" fill="#4ADE80" />
              <path d="M50 32C46 38 38 46 38 56C38 63 43 68 50 68C57 68 62 63 62 56C62 46 54 38 50 32Z" fill="#EFF6FF" />
              <path d="M50 38V64" stroke="#1D4ED8" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M50 50L58 44" stroke="#1D4ED8" strokeWidth="3" strokeLinecap="round" />
              <circle cx="50" cy="22" r="3.5" fill="#F59E0B" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-lg text-slate-900 leading-none">
                CropSync 2.0
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 tracking-wider uppercase block mt-1">
              Bio-IoT Platform
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 px-3 block mb-2">
            Main Menu
          </span>

          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-left transition-all duration-200 active:scale-98 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <span className={`material-symbols-outlined text-[20px] ${isActive ? 'fill-1' : ''}`}>
                      {item.icon}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm block truncate leading-tight">
                      {item.label}
                    </span>
                    <span className={`text-[10px] truncate block ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                      {item.description}
                    </span>
                  </div>
                </div>

                {/* Badges */}
                {item.alertCount > 0 && !isActive && (
                  <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px] font-mono font-bold">
                    {item.alertCount}
                  </span>
                )}
                {item.badge && !isActive && (
                  <span className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[9px] font-mono font-bold uppercase">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sidebar Footer Info Card */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/70">
        <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs font-mono font-bold mb-1">
            <span className="text-slate-500 uppercase">Field 01 Status</span>
            <span className="text-emerald-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Online
            </span>
          </div>
          <div className="text-[11px] text-slate-600">
            Plot 01 • Gudlavalleru
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>Solenoid Mesh</span>
            <span className="text-blue-600 font-semibold">16 / 16 Nodes</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

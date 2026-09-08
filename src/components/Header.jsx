import React from 'react';

export default function Header({ 
  currentScreen, 
  onNavigate, 
  unreadAlertCount = 2, 
  farmerAvatar,
  farmerName = 'Ravi Kumar',
  kisanId = 'KS-8842',
  isMobileLayout = false
}) {
  return (
    <header className="w-full bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 text-white rounded-b-2xl sm:rounded-b-3xl shadow-header transition-all duration-300">
      <div className="w-full px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Brand & Field Identification */}
          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-1 flex items-center justify-center shadow-inner group-hover:bg-white/20 transition-all">
              <svg className="w-7 h-7" viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" rx="24" fill="#0D47A1" />
                <path d="M50 20C45 28 32 38 32 54C32 64 40 72 50 72C60 72 68 64 68 54C68 38 55 28 50 20Z" fill="#4ADE80" />
                <path d="M50 32C46 38 38 46 38 56C38 63 43 68 50 68C57 68 62 63 62 56C62 46 54 38 50 32Z" fill="#EFF6FF" />
                <path d="M50 38V64" stroke="#0D47A1" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M50 50L58 44" stroke="#0D47A1" strokeWidth="3" strokeLinecap="round" />
                <circle cx="50" cy="22" r="3.5" fill="#F59E0B" />
              </svg>
            </div>
            
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-lg sm:text-xl tracking-tight leading-tight">
                  CropSync 2.0
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-400/20 border border-emerald-400/40 text-[10px] font-mono font-semibold text-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Online</span>
                </span>
              </div>
              <div className="flex items-center gap-1 text-blue-100 text-xs font-medium mt-0.5">
                <span className="material-symbols-outlined text-[13px] text-blue-200">location_on</span>
                <span className="truncate uppercase tracking-wider font-mono text-[10px] sm:text-[11px]">
                  Field 01 • Gudlavalleru Central
                </span>
              </div>
            </div>
          </div>

          {/* Right Action Icons: Connectivity, Notification Bell, Farmer Identity */}
          <div className="flex items-center gap-3">
            {/* Live Sensor Connectivity */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono font-medium text-blue-100">
              <span className="material-symbols-outlined text-[15px] text-emerald-300">sensors</span>
              <span>98% Mesh Telemetry</span>
            </div>

            {/* Notification Bell */}
            <button 
              onClick={() => onNavigate('alerts')}
              aria-label="View Alerts"
              className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95 ${
                currentScreen === 'alerts' 
                  ? 'bg-white text-blue-800 shadow-md' 
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              {unreadAlertCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
              )}
            </button>

            {/* Farmer Profile Button with Name and Avatar */}
            <button
              onClick={() => onNavigate('profile')}
              aria-label="Farmer Profile"
              className={`flex items-center gap-2.5 pl-1.5 pr-2.5 py-1 rounded-full transition-all active:scale-95 ${
                currentScreen === 'profile' 
                  ? 'bg-white text-blue-900 shadow-md' 
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <img 
                src={farmerAvatar || "https://lh3.googleusercontent.com/aida/AEtjO1W7TFn_OmnHuAktV3x-Y3yg7AX4iW83vL5aKjTwW8RwruDOCWERWPhevHq4MQflfAcLwC5bNc9QKQWrzP8cCrIyB4C7RncGtUDQH6iru0YWaBAwbp3CuMOx_sPjVohiup94zj7Mz99m90azw18xin_G9s2SP9Lz-YoManbt5UdzQSU_phlqprILq0p0_M8ITFkQ8yj88GZSr18j99ROlTTy6H7ViGk9x_zkGjHuPSvTEClYraSna87DkP01"} 
                alt="Farmer Profile" 
                className="w-8 h-8 rounded-full object-cover border-2 border-white/40"
              />
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold font-display leading-tight">
                  {farmerName}
                </span>
                <span className="text-[10px] font-mono opacity-80 leading-none">
                  #{kisanId}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

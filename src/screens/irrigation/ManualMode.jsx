import React from 'react';

export default function ManualMode({ 
  zones, 
  onToggleZone, 
  npkActive, 
  onToggleNpk, 
  onBack 
}) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Info */}
      <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <span className="material-symbols-outlined text-[20px]">pan_tool</span>
            <span className="text-xs font-mono font-bold tracking-wider uppercase">Live Valve Override</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Manual Control
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Directly control irrigation zones and NPK nutrient injection valves across your manifold.
          </p>
        </div>

        <div className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>● Hardware Connected</span>
        </div>
      </div>

      {/* Section 1: Water Zones in Responsive 2-Column Grid on Desktop */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-500">
            Water Zones
          </h3>
          <span className="text-xs font-mono font-medium text-blue-600">
            {zones.filter(z => z.isManualOn).length} of {zones.length} Active
          </span>
        </div>

        {/* 2-Column Grid on md/lg Desktop, 1-Column on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {zones.map((zone) => {
            const isOn = zone.isManualOn;
            return (
              <div 
                key={zone.id}
                className={`bg-white rounded-3xl p-5 shadow-card border transition-all duration-300 ${
                  isOn 
                    ? 'border-blue-400/80 ring-2 ring-blue-500/20 shadow-glow-blue' 
                    : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Left: Icon and Zone Details */}
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                      isOn 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'bg-blue-50 text-blue-600'
                    }`}>
                      <span className="material-symbols-outlined text-[26px]">water_drop</span>
                    </div>
                    
                    <div className="min-w-0">
                      <h4 className="font-display font-bold text-base sm:text-lg text-slate-900 truncate">
                        {zone.name}
                      </h4>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {zone.crop} • Flow: {isOn ? '12.4 L/min' : '0.0 L/min'}
                      </p>
                      
                      {/* Valve Status Badge */}
                      <div className="mt-2 flex items-center gap-1.5">
                        {isOn ? (
                          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/50">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                            <span>🟢 Running</span>
                            <span className="text-emerald-600 font-normal">
                              • Started {zone.runningDurationText || 'just now'}
                            </span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-200/60">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                            <span>○ Valve Off</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Tactile Toggle Switch (Large Touch Target) */}
                  <div className="flex flex-col items-center shrink-0">
                    <button
                      type="button"
                      onClick={() => onToggleZone(zone.id)}
                      className={`relative inline-flex h-10 w-18 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isOn ? 'bg-blue-600' : 'bg-slate-200'
                      }`}
                      role="switch"
                      aria-checked={isOn}
                    >
                      <span className="sr-only">Toggle {zone.name}</span>
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-9 w-9 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out flex items-center justify-center ${
                          isOn ? 'translate-x-8 text-blue-600' : 'translate-x-0 text-slate-400'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px] font-bold">
                          {isOn ? 'power_settings_new' : 'circle'}
                        </span>
                      </span>
                    </button>
                    <span className="text-[11px] font-mono font-bold mt-1 text-slate-500">
                      {isOn ? 'ON' : 'OFF'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Nutrient Injection (Kept separate from irrigation zones) */}
      <div className="space-y-3">
        <div className="px-1">
          <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-500">
            Nutrient Injection
          </h3>
        </div>

        <div className={`bg-white rounded-3xl p-5 shadow-card border transition-all duration-300 ${
          npkActive 
            ? 'border-emerald-400/80 ring-2 ring-emerald-500/20 shadow-glow-green' 
            : 'border-slate-100 hover:border-slate-200'
        }`}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                npkActive 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'bg-emerald-50 text-emerald-600'
              }`}>
                <span className="material-symbols-outlined text-[26px]">science</span>
              </div>
              
              <div className="min-w-0">
                <h4 className="font-display font-bold text-base sm:text-lg text-slate-900 truncate">
                  NPK Solution Valve
                </h4>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  Proportional bio-fertigation injector (19:19:19 bio-solution)
                </p>
                
                <div className="mt-2">
                  {npkActive ? (
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-200/50">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                      <span>🟢 NPK Injection Active</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                      <span>○ Valve Off</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Toggle Switch */}
            <div className="flex flex-col items-center shrink-0">
              <button
                type="button"
                onClick={onToggleNpk}
                className={`relative inline-flex h-10 w-18 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  npkActive ? 'bg-emerald-600' : 'bg-slate-200'
                }`}
                role="switch"
                aria-checked={npkActive}
              >
                <span className="sr-only">Toggle NPK Injection</span>
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-9 w-9 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out flex items-center justify-center ${
                    npkActive ? 'translate-x-8 text-emerald-600' : 'translate-x-0 text-slate-400'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] font-bold">
                    {npkActive ? 'check' : 'circle'}
                  </span>
                </span>
              </button>
              <span className="text-[11px] font-mono font-bold mt-1 text-slate-500">
                {npkActive ? 'ON' : 'OFF'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

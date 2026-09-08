import React, { useState } from 'react';

export default function HomeScreen({ 
  onNavigate, 
  zones, 
  fieldConditions, 
  onShowToast, 
  unreadAlertCount 
}) {
  const [isScanning, setIsScanning] = useState(false);
  const activeValvesCount = zones.filter(z => z.isManualOn).length;

  const handleRescan = () => {
    setIsScanning(true);
    onShowToast('Pinging all 16 soil sensors and solenoid nodes...', 'success');
    setTimeout(() => {
      setIsScanning(false);
      onShowToast('Mesh scan complete: All telemetry channels calibrated (100% link)', 'success');
    }, 1500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6 animate-in fade-in duration-300">
      {/* Farmer Welcome & Greeting Header */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              Good Morning, Ravi
            </h1>
            <span className="text-2xl sm:text-3xl animate-bounce">👋</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            టమోటా పంట పర్యవేక్షణ • Cycle Day 44 (Vegetative Stage) • Field 01 Gudlavalleru
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="font-mono uppercase tracking-wider text-[11px]">Telemetry Active</span>
          </div>
        </div>
      </section>

      {/* Top 4 Key Metric Summary Cards (Desktop Grid) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-card border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Crop Health</span>
            <span className="font-mono text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1 block">94%</span>
            <span className="text-[11px] text-emerald-700 font-medium mt-0.5 block">Bio-Vigor Optimal</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">spa</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-card border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Soil Moisture</span>
            <span className="font-mono text-2xl sm:text-3xl font-extrabold text-blue-600 mt-1 block">31%</span>
            <span className="text-[11px] text-blue-700 font-medium mt-0.5 block">Field A (Irrigating)</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">water_drop</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-card border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Canopy Temp</span>
            <span className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1 block">31°C</span>
            <span className="text-[11px] text-slate-500 font-medium mt-0.5 block">Ambient clear 29°C</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">thermostat</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-card border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Pest Risk</span>
            <span className="font-mono text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1 block">LOW</span>
            <span className="text-[11px] text-slate-500 font-medium mt-0.5 block">AI Scanner Ready</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">bug_report</span>
          </div>
        </div>
      </section>

      {/* Dynamic Farm Health Hero Banner (Full Width Desktop Spread) */}
      <section className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-xl p-6 sm:p-8 space-y-4">
        {/* Glow ambient decorations */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-44 h-44 opacity-15 pointer-events-none">
          <svg className="w-full h-full text-emerald-300" fill="none" viewBox="0 0 100 100">
            <path d="M50 0C50 27.6142 27.6142 50 0 50C27.6142 50 50 72.3858 50 100C50 72.3858 72.3858 50 100 50C72.3858 50 50 27.6142 50 0Z" fill="currentColor"></path>
          </svg>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 z-10 relative">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-300 text-xs font-mono font-bold tracking-wide">
              <span className="material-symbols-outlined text-[15px]">spa</span>
              <span>BIO-VIGOR: {fieldConditions.bioVigor}% • STABLE</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold pt-1">
              Your farm is healthy today 🌱
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              Crop health is good. Field conditions are currently optimal for tomato growth, transpiration, and root respiration across all 4 sub-main zones.
            </p>
          </div>

          <div className="flex items-center md:flex-col md:items-end justify-between border-t md:border-t-0 border-white/15 pt-3 md:pt-0">
            <div className="text-left md:text-right">
              <span className="font-mono text-3xl sm:text-4xl font-extrabold text-emerald-300 block">
                {fieldConditions.canopyTemp}°C
              </span>
              <span className="text-[10px] font-mono tracking-wider text-blue-200 uppercase">
                Canopy Microclimate
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/15 relative z-10">
          <div className="flex items-center gap-2 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="font-mono text-[11px] text-blue-100 uppercase tracking-wider">
              Live Solenoid Mesh: Online (16 Active Nodes)
            </span>
          </div>

          <button 
            type="button"
            onClick={handleRescan}
            disabled={isScanning}
            className="self-start sm:self-auto flex items-center gap-1.5 text-emerald-300 hover:text-white font-mono text-xs uppercase tracking-wider bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full active:scale-95 transition-all"
          >
            <span className={`material-symbols-outlined text-[16px] ${isScanning ? 'animate-spin' : ''}`}>
              sync
            </span>
            <span>{isScanning ? 'Scanning Mesh Sensors...' : 'Re-scan Sensor Telemetry'}</span>
          </button>
        </div>
      </section>

      {/* ESSENTIAL OPERATIONS - 2x2 Responsive Grid on Tablet/Desktop */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
            Essential Operations
          </span>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider font-mono">
            Quick Access
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 1. Irrigation Control */}
          <button
            type="button"
            onClick={() => onNavigate('irrigation')}
            className="w-full flex items-center justify-between p-5 bg-white rounded-3xl shadow-card border border-slate-100 hover:border-blue-300 hover:shadow-card-hover active:scale-[0.99] transition-all group text-left"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[30px]">water_drop</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-lg text-slate-900">
                    Irrigation Control
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-mono font-bold">
                    3 MODES
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Manual valve override, timer schedules & automated sensing
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400 group-hover:text-blue-600 text-[26px] transition-colors shrink-0">
              chevron_right
            </span>
          </button>

          {/* 2. AI Crop Advisor */}
          <button
            type="button"
            onClick={() => onNavigate('advisory-ai')}
            className="w-full flex items-center justify-between p-5 bg-white rounded-3xl shadow-card border border-slate-100 hover:border-emerald-300 hover:shadow-card-hover active:scale-[0.99] transition-all group text-left"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[30px]">psychology</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-lg text-slate-900">
                    Advisory System
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold">
                    AI AGENT
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Instant leaf disease diagnosis & bio-remedy guidance
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400 group-hover:text-emerald-600 text-[26px] transition-colors shrink-0">
              chevron_right
            </span>
          </button>

          {/* 3. Field Alerts */}
          <button
            type="button"
            onClick={() => onNavigate('alerts')}
            className="w-full flex items-center justify-between p-5 bg-white rounded-3xl shadow-card border border-slate-100 hover:border-amber-300 hover:shadow-card-hover active:scale-[0.99] transition-all group text-left"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[30px]">warning</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-lg text-slate-900">
                    Field Alerts
                  </span>
                  {unreadAlertCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-mono font-bold">
                      {unreadAlertCount} ACTIVE
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Low moisture warnings, heatwave notices & hardware alerts
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400 group-hover:text-amber-600 text-[26px] transition-colors shrink-0">
              chevron_right
            </span>
          </button>

          {/* 4. Farm Overview */}
          <button
            type="button"
            onClick={() => onNavigate('farm-overview')}
            className="w-full flex items-center justify-between p-5 bg-white rounded-3xl shadow-card border border-slate-100 hover:border-indigo-300 hover:shadow-card-hover active:scale-[0.99] transition-all group text-left"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[30px]">agriculture</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-lg text-slate-900">
                    Farm Overview
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-mono font-bold">
                    2.5 ACRES
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Plot summary, vital sensor matrix & morning field walk logger
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400 group-hover:text-indigo-600 text-[26px] transition-colors shrink-0">
              chevron_right
            </span>
          </button>
        </div>
      </section>

      {/* Real-time Field Snapshot Matrix: 4 Columns on Desktop */}
      <section className="bg-white rounded-3xl p-6 shadow-card border border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-blue-600 text-[22px]">dataset</span>
            <span className="font-display font-bold text-base text-slate-900">Live Field Sensor Matrix</span>
          </div>
          <span className="text-xs font-mono text-slate-400">Telemetry Stream Active</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Avg Soil Moisture</span>
            <span className="font-mono text-xl sm:text-2xl font-bold text-blue-700 mt-1 block">{fieldConditions.soilMoisture}%</span>
            <span className="text-[11px] text-emerald-600 block mt-1">Field A Sensor</span>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Soil Temperature</span>
            <span className="font-mono text-xl sm:text-2xl font-bold text-amber-700 mt-1 block">26°C</span>
            <span className="text-[11px] text-slate-500 block mt-1">Normal Range (24–28°C)</span>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Water Storage</span>
            <span className="font-mono text-xl sm:text-2xl font-bold text-cyan-700 mt-1 block">{fieldConditions.waterStorage}%</span>
            <span className="text-[11px] text-slate-500 block mt-1">Sub-tank A Available</span>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Active Drips</span>
            <span className="font-mono text-xl sm:text-2xl font-bold text-indigo-700 mt-1 block">{activeValvesCount} of 4</span>
            <span className="text-[11px] text-blue-600 block mt-1">Solenoids Energized</span>
          </div>
        </div>
      </section>
    </div>
  );
}

import React, { useState } from 'react';
import ManualMode from './irrigation/ManualMode';
import TimerMode from './irrigation/TimerMode';
import AutomatedMode from './irrigation/AutomatedMode';

export default function IrrigationScreen({ 
  zones, 
  onToggleZone, 
  npkActive, 
  onToggleNpk, 
  onEmergencyStop, 
  onShowToast, 
  onNavigate,
  fieldConditions
}) {
  // Top-level mode selector: 'manual' | 'timer' | 'automated'
  const [activeMode, setActiveMode] = useState('manual');
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const modes = [
    { id: 'manual', label: 'Manual Control', icon: 'pan_tool', subtitle: 'Direct Valve Control' },
    { id: 'timer', label: 'Timer Control', icon: 'schedule', subtitle: 'Schedule Duration' },
    { id: 'automated', label: 'Automated Control', icon: 'smart_toy', subtitle: 'Autonomous Sensing' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6 animate-in fade-in duration-300">
      {/* Top Header Navigation Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => onNavigate('home')}
            className="w-10 h-10 rounded-2xl bg-white shadow-card border border-slate-200/80 flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-all"
            aria-label="Go back to Home"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              Irrigation Control
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-mono">
              Plot 01 • Main Bio-IoT Valve Manifold (16 Solenoid Mesh)
            </p>
          </div>
        </div>

        {/* Live mode status pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          <span className="uppercase tracking-wider font-mono text-[11px]">{activeMode} ACTIVE</span>
        </div>
      </div>

      {/* TOP-LEVEL MODE SELECTOR: [ MANUAL | TIMER | AUTOMATED ] */}
      <div className="bg-slate-200/80 p-1.5 rounded-3xl grid grid-cols-3 gap-1.5 shadow-inner border border-slate-300/60 max-w-2xl mx-auto">
        {modes.map((mode) => {
          const isActive = activeMode === mode.id;
          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => setActiveMode(mode.id)}
              className={`py-3 sm:py-3.5 px-3 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 active:scale-98 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`material-symbols-outlined text-[20px] sm:text-[22px] ${isActive ? 'fill-1' : ''}`}>
                  {mode.icon}
                </span>
                <span className="font-display font-bold text-xs sm:text-sm tracking-tight">
                  {mode.label}
                </span>
              </div>
              <span className={`text-[10px] mt-0.5 font-medium hidden sm:block ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                {mode.subtitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mode Content Render: Manual vs Timer vs Automated */}
      {activeMode === 'manual' && (
        <ManualMode 
          zones={zones} 
          onToggleZone={onToggleZone} 
          npkActive={npkActive} 
          onToggleNpk={onToggleNpk} 
          onBack={() => onNavigate('home')}
        />
      )}

      {activeMode === 'timer' && (
        <TimerMode 
          zones={zones} 
          onShowToast={onShowToast}
          onTimerRunningChange={setIsTimerRunning}
        />
      )}

      {activeMode === 'automated' && (
        <AutomatedMode 
          zones={zones} 
          onShowToast={onShowToast}
          fieldConditions={fieldConditions}
        />
      )}

      {/* EMERGENCY STOP BUTTON: STOP ALL IRRIGATION */}
      <div className="pt-4 max-w-2xl mx-auto">
        <button
          type="button"
          onClick={onEmergencyStop}
          className="w-full min-h-[58px] rounded-3xl bg-red-600 hover:bg-red-700 active:scale-98 text-white font-display font-bold text-base sm:text-lg tracking-wide flex items-center justify-center gap-3 shadow-lg shadow-red-600/25 transition-all"
        >
          <span className="material-symbols-outlined text-[26px]">dangerous</span>
          <span>STOP ALL IRRIGATION</span>
        </button>
        <p className="text-xs text-slate-500 text-center mt-2 font-medium">
          Master emergency shutoff switch across all sub-main manifolds
        </p>
      </div>
    </div>
  );
}

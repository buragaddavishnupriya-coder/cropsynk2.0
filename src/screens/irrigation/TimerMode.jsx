import React, { useState, useEffect } from 'react';

export default function TimerMode({ 
  zones, 
  onShowToast, 
  onTimerRunningChange 
}) {
  // Selection state
  const [selectedZoneIds, setSelectedZoneIds] = useState(['zone-1', 'zone-3']); // Default example selection
  
  // Duration state in seconds (default 30 min = 1800s)
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);

  // Timer run state
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(1800);
  const [remainingSeconds, setRemainingSeconds] = useState(1800);

  // Toggle valve selection
  const handleToggleSelect = (id) => {
    if (isRunning) return; // Locked while timer is running
    setSelectedZoneIds(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  // Adjust time steppers
  const adjustTime = (type, delta) => {
    if (isRunning) return;
    if (type === 'hours') {
      setHours(prev => Math.max(0, Math.min(23, prev + delta)));
    } else if (type === 'minutes') {
      setMinutes(prev => Math.max(0, Math.min(59, prev + delta)));
    } else if (type === 'seconds') {
      setSeconds(prev => Math.max(0, Math.min(59, prev + delta)));
    }
  };

  // Quick preset selection
  const setQuickTime = (mins) => {
    if (isRunning) return;
    if (mins >= 60) {
      setHours(Math.floor(mins / 60));
      setMinutes(mins % 60);
      setSeconds(0);
    } else {
      setHours(0);
      setMinutes(mins);
      setSeconds(0);
    }
  };

  // Start timer
  const handleStartTimer = () => {
    const total = hours * 3600 + minutes * 60 + seconds;
    if (selectedZoneIds.length === 0) {
      onShowToast('Please select at least one irrigation zone.', 'warning');
      return;
    }
    if (total <= 0) {
      onShowToast('Please set an irrigation duration.', 'warning');
      return;
    }

    setTotalSeconds(total);
    setRemainingSeconds(total);
    setIsRunning(true);
    setIsPaused(false);
    if (onTimerRunningChange) onTimerRunningChange(true);

    const zoneNames = zones
      .filter(z => selectedZoneIds.includes(z.id))
      .map(z => z.shortName)
      .join(' & ');
    onShowToast(`Timer started for ${zoneNames} (${Math.ceil(total / 60)} min)`, 'success');
  };

  // Pause / Resume
  const handleTogglePause = () => {
    if (isPaused) {
      setIsPaused(false);
      onShowToast('Timer resumed', 'success');
    } else {
      setIsPaused(true);
      onShowToast('Timer paused', 'warning');
    }
  };

  // Stop Timer
  const handleStopTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    if (onTimerRunningChange) onTimerRunningChange(false);
    onShowToast('Irrigation timer stopped by user', 'warning');
  };

  // Timer countdown effect
  useEffect(() => {
    let interval = null;
    if (isRunning && !isPaused && remainingSeconds > 0) {
      interval = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            if (onTimerRunningChange) onTimerRunningChange(false);
            onShowToast('Timer completed! All scheduled valves shut off.', 'success');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused, remainingSeconds]);

  // Format seconds to HH:MM:SS or MM:SS
  const formatTime = (totalSec) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    if (h > 0) {
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Selected zone objects
  const selectedZones = zones.filter(z => selectedZoneIds.includes(z.id));

  // Progress for circle
  const progressPercent = totalSeconds > 0 
    ? (remainingSeconds / totalSeconds) * 100 
    : 0;
  const strokeDashoffset = 565 - (565 * progressPercent) / 100;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Info */}
      <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 mb-1">
            <span className="material-symbols-outlined text-[20px]">schedule</span>
            <span className="text-xs font-mono font-bold tracking-wider uppercase">Schedule Your Irrigation</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Timer Control
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Set a duration for the selected valves and let CropSync handle the timing automatically.
          </p>
        </div>

        <div>
          {isRunning ? (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>🟢 Timer Running</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
              <span className="material-symbols-outlined text-[15px]">tune</span>
              <span>Schedule Setup</span>
            </div>
          )}
        </div>
      </div>

      {/* When Timer is Running: Dedicated Countdown Display */}
      {isRunning ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-blue-200 ring-2 ring-blue-500/20 flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto">
          {/* Running Status Pill */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm sm:text-base">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>{isPaused ? '🟡 Timer Paused' : '🟢 Timer Running'}</span>
          </div>

          {/* Large Circular Countdown Display */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-2">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="100"
                className="stroke-slate-100"
                strokeWidth="16"
                fill="transparent"
              />
              <circle
                cx="50%"
                cy="50%"
                r="100"
                className={`${isPaused ? 'stroke-amber-500' : 'stroke-blue-600'} transition-all duration-1000 ease-linear`}
                strokeWidth="16"
                strokeDasharray="628"
                strokeDashoffset={628 - (628 * progressPercent) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Centered Countdown Readout */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
                Time Remaining
              </span>
              <span className="font-mono text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight my-1">
                {formatTime(remainingSeconds)}
              </span>
              <span className="text-xs sm:text-sm text-blue-600 font-semibold">
                {selectedZones.length} valve{selectedZones.length > 1 ? 's' : ''} actively running
              </span>
            </div>
          </div>

          {/* Active Operating Valves List */}
          <div className="w-full bg-blue-50/70 border border-blue-100 rounded-2xl p-4 text-left">
            <span className="text-xs font-mono font-bold text-blue-800 uppercase tracking-wider block mb-2">
              Operating Valves
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedZones.map(z => (
                <div key={z.id} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-blue-200 text-xs sm:text-sm font-semibold text-slate-800 shadow-xs">
                  <span className="material-symbols-outlined text-[18px] text-blue-600">water_drop</span>
                  <span>{z.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Control Buttons: Pause & Stop Timer */}
          <div className="grid grid-cols-2 gap-4 w-full pt-2">
            <button
              onClick={handleTogglePause}
              className={`h-14 py-3 px-4 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all active:scale-98 shadow-sm ${
                isPaused 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                  : 'bg-amber-100 hover:bg-amber-200 text-amber-900'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">
                {isPaused ? 'play_arrow' : 'pause'}
              </span>
              <span>{isPaused ? 'Resume Timer' : 'Pause Timer'}</span>
            </button>

            <button
              onClick={handleStopTimer}
              className="h-14 py-3 px-4 rounded-2xl font-bold text-sm sm:text-base bg-red-100 hover:bg-red-200 text-red-700 flex items-center justify-center gap-2 transition-all active:scale-98 shadow-sm"
            >
              <span className="material-symbols-outlined text-[22px]">stop_circle</span>
              <span>Stop Timer</span>
            </button>
          </div>
        </div>
      ) : (
        /* Setup Flow: 2-Column Responsive Layout on Desktop/Tablet */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: STEP 1: SELECT VALVES */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">1</span>
                <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-700">
                  Select Irrigation Zones
                </h3>
              </div>
              <span className="text-xs font-mono font-semibold text-blue-600">
                {selectedZoneIds.length} of {zones.length} Selected
              </span>
            </div>

            <div className="space-y-2.5">
              {zones.map((zone) => {
                const isSelected = selectedZoneIds.includes(zone.id);
                return (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => handleToggleSelect(zone.id)}
                    className={`w-full text-left rounded-2xl p-4 transition-all duration-200 flex items-center justify-between gap-3 border shadow-xs active:scale-98 ${
                      isSelected 
                        ? 'bg-blue-50/90 border-blue-500 ring-2 ring-blue-500/20' 
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-500'
                      }`}>
                        <span className="material-symbols-outlined text-[22px]">water_drop</span>
                      </div>
                      <div className="min-w-0">
                        <div className="font-display font-bold text-sm sm:text-base text-slate-900 truncate">
                          {zone.name}
                        </div>
                        <div className="text-xs text-slate-500 truncate">
                          {zone.crop}
                        </div>
                      </div>
                    </div>

                    {/* Checkbox Icon Box */}
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                      isSelected 
                        ? 'bg-blue-600 border-blue-600 text-white' 
                        : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && (
                        <span className="material-symbols-outlined text-[20px] font-bold">check</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Valves Summary */}
            {selectedZones.length > 0 ? (
              <div className="bg-slate-100/90 rounded-2xl p-3.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-blue-600">checklist</span>
                  <span className="font-bold text-slate-800">
                    {selectedZones.length} valve{selectedZones.length > 1 ? 's' : ''} selected:
                  </span>
                </div>
                <div className="mt-1 text-slate-600 font-medium pl-6">
                  {selectedZones.map(z => z.name).join(' • ')}
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 rounded-2xl p-3 text-xs text-amber-800 border border-amber-200/60 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">warning</span>
                <span>Select at least one valve above to enable timer.</span>
              </div>
            )}
          </div>

          {/* Right Column: STEP 2: SET TIMER (Circular Dial & Controls) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-700">
                  Set Timer Duration
                </h3>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-slate-100 flex flex-col items-center justify-between space-y-5">
              {/* Circular Dial Representation */}
              <div className="relative w-56 h-56 sm:w-60 sm:h-60 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-dashed border-blue-200 animate-spin" style={{ animationDuration: '30s' }}></div>
                <div className="w-48 h-48 sm:w-52 sm:h-52 rounded-full bg-gradient-to-b from-blue-50 to-indigo-50/60 border border-blue-100 flex flex-col items-center justify-center shadow-inner text-center">
                  <span className="font-mono text-[10px] sm:text-xs tracking-widest text-blue-600 uppercase font-bold">
                    Target Duration
                  </span>
                  <div className="font-mono text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
                    {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                  </div>
                  <span className="text-xs text-slate-500 font-medium mt-1">
                    {hours > 0 ? `${hours} hr ` : ''}{minutes} min {seconds > 0 ? `${seconds} sec` : ''}
                  </span>
                </div>
              </div>

              {/* Stepper Controls: Hours, Minutes, Seconds */}
              <div className="grid grid-cols-3 gap-3 w-full max-w-md">
                {/* Hours */}
                <div className="flex flex-col items-center bg-slate-50 rounded-2xl p-3 border border-slate-200/80">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase mb-1">Hours</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => adjustTime('hours', -1)}
                      className="w-8 h-8 rounded-full bg-white shadow-xs border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold active:scale-95"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold text-lg text-slate-900 w-6 text-center">
                      {String(hours).padStart(2, '0')}
                    </span>
                    <button
                      type="button"
                      onClick={() => adjustTime('hours', 1)}
                      className="w-8 h-8 rounded-full bg-white shadow-xs border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Minutes */}
                <div className="flex flex-col items-center bg-blue-50/70 rounded-2xl p-3 border border-blue-200/80">
                  <span className="text-[10px] font-mono font-bold text-blue-700 uppercase mb-1">Minutes</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => adjustTime('minutes', -5)}
                      className="w-8 h-8 rounded-full bg-white shadow-xs border border-blue-200 text-blue-700 hover:bg-blue-100 flex items-center justify-center font-bold active:scale-95"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold text-lg text-blue-900 w-6 text-center">
                      {String(minutes).padStart(2, '0')}
                    </span>
                    <button
                      type="button"
                      onClick={() => adjustTime('minutes', 5)}
                      className="w-8 h-8 rounded-full bg-white shadow-xs border border-blue-200 text-blue-700 hover:bg-blue-100 flex items-center justify-center font-bold active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Seconds */}
                <div className="flex flex-col items-center bg-slate-50 rounded-2xl p-3 border border-slate-200/80">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase mb-1">Seconds</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => adjustTime('seconds', -10)}
                      className="w-8 h-8 rounded-full bg-white shadow-xs border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold active:scale-95"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold text-lg text-slate-900 w-6 text-center">
                      {String(seconds).padStart(2, '0')}
                    </span>
                    <button
                      type="button"
                      onClick={() => adjustTime('seconds', 10)}
                      className="w-8 h-8 rounded-full bg-white shadow-xs border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center justify-center gap-2 w-full">
                {[10, 20, 30, 60].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setQuickTime(preset)}
                    className="px-4 py-2 rounded-full bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 font-semibold text-xs transition-colors border border-slate-200 active:scale-95"
                  >
                    {preset === 60 ? '1 hr' : `${preset} min`}
                  </button>
                ))}
              </div>

              {/* Large Primary Action Button: Start Irrigation Timer */}
              <button
                type="button"
                onClick={handleStartTimer}
                disabled={selectedZoneIds.length === 0}
                className="w-full min-h-[56px] rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-display font-bold text-base flex items-center justify-center gap-2.5 shadow-md shadow-blue-600/25 active:scale-98 transition-all"
              >
                <span className="material-symbols-outlined text-[24px]">timer</span>
                <span>Start Irrigation Timer ({selectedZones.length} Valves)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

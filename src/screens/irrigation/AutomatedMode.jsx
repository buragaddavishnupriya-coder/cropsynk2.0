import React, { useState, useEffect } from 'react';

export default function AutomatedMode({ 
  zones: parentZones, 
  onShowToast, 
  fieldConditions 
}) {
  // Automation state: 'active' | 'paused' | 'off'
  const [automationState, setAutomationState] = useState('active');
  const [showInactiveZones, setShowInactiveZones] = useState(false);

  // Local simulated automated zones state so sensor changes can trigger autonomous actions
  const [autoZones, setAutoZones] = useState([
    {
      id: 'zone-1',
      name: 'Zone 1 — Field A',
      shortName: 'Field A',
      crop: 'Tomato Bed',
      isIrrigating: true,
      moisture: 31,
      threshold: 35,
      reason: 'Soil moisture is below the preferred level.',
      runTimeMin: 12,
    },
    {
      id: 'zone-2',
      name: 'Zone 2 — Field B',
      shortName: 'Field B',
      crop: 'Chilli Plot',
      isIrrigating: false,
      moisture: 42,
      threshold: 35,
      reason: 'Optimal root zone hydration.',
      runTimeMin: 0,
    },
    {
      id: 'zone-3',
      name: 'Zone 3 — Greenhouse',
      shortName: 'Greenhouse',
      crop: 'Bell Peppers',
      isIrrigating: true,
      moisture: 28,
      threshold: 35,
      reason: 'Soil moisture is low.',
      runTimeMin: 8,
    },
    {
      id: 'zone-4',
      name: 'Zone 4 — Nursery',
      shortName: 'Nursery',
      crop: 'Seedling Trays',
      isIrrigating: false,
      moisture: 52,
      threshold: 40,
      reason: 'Saturated for germination.',
      runTimeMin: 0,
    }
  ]);

  // Live telemetry values
  const [telemetry, setTelemetry] = useState({
    soilMoisture: 31,
    temperature: 31,
    humidity: 68,
    waterFlow: 12.4
  });

  // Simulated minor telemetry drift every 8 seconds when active
  useEffect(() => {
    if (automationState !== 'active') return;
    const timer = setInterval(() => {
      setTelemetry(prev => ({
        ...prev,
        waterFlow: Number((12.0 + Math.random() * 0.8).toFixed(1)),
        temperature: Math.random() > 0.6 ? (prev.temperature === 31 ? 32 : 31) : prev.temperature
      }));
    }, 8000);
    return () => clearInterval(timer);
  }, [automationState]);

  // Automation controls
  const handlePause = () => {
    if (automationState === 'paused') {
      setAutomationState('active');
      onShowToast('Automation resumed: CropSync is monitoring field sensors', 'success');
    } else {
      setAutomationState('paused');
      onShowToast('Automation paused: Automatic valve cycling suspended', 'warning');
    }
  };

  const handleTurnOff = () => {
    if (automationState === 'off') {
      setAutomationState('active');
      onShowToast('Automation turned ON: autonomous valve management active', 'success');
    } else {
      setAutomationState('off');
      onShowToast('Automation turned OFF: all automated valves closed', 'warning');
    }
  };

  // Demo simulation triggers for judges/farmers to test reactive decisions
  const handleSimulateSatiation = () => {
    setAutoZones(prev => prev.map(z => {
      if (z.id === 'zone-1') {
        return {
          ...z,
          moisture: 39,
          isIrrigating: false,
          reason: 'Moisture target achieved (39%). Valve automatically shut.'
        };
      }
      return z;
    }));
    setTelemetry(prev => ({ ...prev, soilMoisture: 39, waterFlow: 6.2 }));
    onShowToast('Zone 1 soil moisture rose to 39% (>35%). Irrigation completed automatically!', 'success');
  };

  const handleSimulateDrought = () => {
    setAutoZones(prev => prev.map(z => {
      if (z.id === 'zone-1') {
        return {
          ...z,
          moisture: 30,
          isIrrigating: true,
          reason: 'Soil moisture is below the preferred level.',
          runTimeMin: 1
        };
      }
      return z;
    }));
    setTelemetry(prev => ({ ...prev, soilMoisture: 30, waterFlow: 12.4 }));
    onShowToast('Zone 1 soil moisture dropped to 30% (<35%). Zone 1 automatically activated!', 'warning');
  };

  // Filter active and inactive valves
  const activeValves = automationState === 'off' 
    ? [] 
    : autoZones.filter(z => z.isIrrigating);
  const inactiveValves = automationState === 'off'
    ? autoZones
    : autoZones.filter(z => !z.isIrrigating);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Info */}
      <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <span className="material-symbols-outlined text-[20px]">smart_toy</span>
            <span className="text-xs font-mono font-bold tracking-wider uppercase">Smart Irrigation</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Automated Irrigation
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            CropSync automatically activates valves when field conditions indicate that irrigation is needed.
          </p>
        </div>

        <div>
          {automationState === 'active' && (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>● Automation Active</span>
            </div>
          )}
          {automationState === 'paused' && (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>🟡 Automation Paused</span>
            </div>
          )}
          {automationState === 'off' && (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-500 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              <span>⚪ Automation Disabled</span>
            </div>
          )}
        </div>
      </div>

      {/* CURRENT AUTOMATED STATUS - Prominent Status Card */}
      <div className={`rounded-3xl p-6 shadow-card border transition-all duration-300 ${
        automationState === 'active' 
          ? 'bg-gradient-to-br from-emerald-50 via-white to-blue-50 border-emerald-200 ring-2 ring-emerald-500/20' 
          : automationState === 'paused'
            ? 'bg-amber-50/70 border-amber-200'
            : 'bg-slate-100 border-slate-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
              automationState === 'active'
                ? 'bg-emerald-600 text-white'
                : automationState === 'paused'
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-400 text-white'
            }`}>
              <span className="material-symbols-outlined text-[30px]">
                {automationState === 'active' ? 'auto_mode' : automationState === 'paused' ? 'pause_circle' : 'power_settings_new'}
              </span>
            </div>
            <div>
              <span className="font-display font-bold text-xl text-slate-900 block">
                {automationState === 'active' && '🟢 Automation Active'}
                {automationState === 'paused' && '🟡 Automation Paused'}
                {automationState === 'off' && '⚪ Automation Off'}
              </span>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {automationState === 'active' 
                  ? 'CropSync is actively monitoring your field conditions & moisture sensors.' 
                  : automationState === 'paused'
                    ? 'Automated valve cycling is currently suspended.'
                    : 'System will not trigger valves automatically.'}
              </p>
            </div>
          </div>

          <div className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-100 text-blue-800 font-bold text-xs sm:text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span>{activeValves.length} Valves Active</span>
          </div>
        </div>
      </div>

      {/* ACTIVE VALVES SECTION - Responsive 2-Column Grid on Desktop */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-600">
            Currently Running Valves ({activeValves.length})
          </h3>
          <span className="text-xs text-emerald-700 font-semibold">
            ● Irrigating Based On Field Conditions
          </span>
        </div>

        {activeValves.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center shadow-card border border-slate-100">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-[30px]">check_circle</span>
            </div>
            <h4 className="font-display font-bold text-lg text-slate-900">All Field Moisture Levels Optimal</h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
              No valves require water right now. CropSync continuously monitors soil moisture and will autonomously energize valves if moisture falls below 35%.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeValves.map((valve) => (
              <div 
                key={valve.id}
                className="bg-white rounded-3xl p-5 shadow-card border border-blue-200 ring-1 ring-blue-400/30 space-y-4"
              >
                {/* Valve Top Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shrink-0">
                      <span className="material-symbols-outlined text-[26px]">water_drop</span>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base sm:text-lg text-slate-900">
                        {valve.name}
                      </h4>
                      <p className="text-xs text-slate-500">{valve.crop}</p>
                    </div>
                  </div>

                  {/* Irrigating Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                    <span>IRRIGATING</span>
                  </div>
                </div>

                {/* Moisture Comparison & Stats */}
                <div className="grid grid-cols-3 gap-2 bg-slate-50 rounded-2xl p-3 border border-slate-100 text-center">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Soil Moisture</span>
                    <span className="font-mono font-bold text-lg text-blue-700">{valve.moisture}%</span>
                  </div>
                  <div className="border-x border-slate-200">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Threshold</span>
                    <span className="font-mono font-semibold text-lg text-slate-700">{valve.threshold}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Running</span>
                    <span className="font-mono font-semibold text-lg text-emerald-700">{valve.runTimeMin} min</span>
                  </div>
                </div>

                {/* Reason Explanation */}
                <div className="flex items-start gap-2.5 text-xs text-slate-600 bg-blue-50/70 p-3 rounded-xl border border-blue-100">
                  <span className="material-symbols-outlined text-[18px] text-blue-600 shrink-0 mt-0.5">info</span>
                  <span><strong>Reason:</strong> {valve.reason}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* INACTIVE VALVES (Collapsible Section) */}
      <div className="bg-white rounded-3xl p-5 shadow-card border border-slate-100">
        <button
          type="button"
          onClick={() => setShowInactiveZones(!showInactiveZones)}
          className="w-full flex items-center justify-between text-left py-1 text-slate-700 hover:text-slate-900"
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              Other Inactive Zones ({inactiveValves.length})
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <span>{showInactiveZones ? 'Collapse' : 'Expand'}</span>
            <span className="material-symbols-outlined text-[18px]">
              {showInactiveZones ? 'expand_less' : 'expand_more'}
            </span>
          </div>
        </button>

        {showInactiveZones && (
          <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {inactiveValves.map(valve => (
              <div key={valve.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                  <span className="font-semibold text-slate-800">{valve.name}</span>
                  <span className="text-slate-400">({valve.moisture}% moisture)</span>
                </div>
                <span className="text-[11px] text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
                  ○ Not irrigating
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AUTOMATED DECISION CARD */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50/70 rounded-3xl p-5 sm:p-6 shadow-card border border-blue-200/80">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm text-2xl">
            🧠
          </div>
          <div>
            <h4 className="font-display font-bold text-base sm:text-lg text-slate-900">
              Why is CropSync irrigating?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Soil moisture in Field A (31%) and Greenhouse (28%) has fallen below the recommended 35% threshold. CropSync activated Zone 1 and Zone 3 automatically to maintain vegetative vigor during peak daylight hours.
            </p>
          </div>
        </div>
      </div>

      {/* SENSOR STATUS: Field Conditions 4 Cards Grid */}
      <div className="space-y-3">
        <div className="px-1">
          <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-500">
            Field Conditions (Live Sensor Telemetry)
          </h3>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Soil Moisture */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-card border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center justify-between text-blue-600 mb-1">
              <span className="material-symbols-outlined text-[22px]">water_drop</span>
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Moisture</span>
            </div>
            <div className="font-mono text-2xl font-bold text-slate-900">
              {telemetry.soilMoisture}%
            </div>
            <span className="text-[11px] text-slate-500 mt-1">Field A Sensor</span>
          </div>

          {/* Temperature */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-card border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center justify-between text-amber-600 mb-1">
              <span className="material-symbols-outlined text-[22px]">thermostat</span>
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Temp</span>
            </div>
            <div className="font-mono text-2xl font-bold text-slate-900">
              {telemetry.temperature}°C
            </div>
            <span className="text-[11px] text-slate-500 mt-1">Canopy ambient</span>
          </div>

          {/* Humidity */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-card border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center justify-between text-cyan-600 mb-1">
              <span className="material-symbols-outlined text-[22px]">humidity_percentage</span>
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Humidity</span>
            </div>
            <div className="font-mono text-2xl font-bold text-slate-900">
              {telemetry.humidity}%
            </div>
            <span className="text-[11px] text-slate-500 mt-1">Relative air</span>
          </div>

          {/* Water Flow */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-card border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center justify-between text-emerald-600 mb-1">
              <span className="material-symbols-outlined text-[22px]">speed</span>
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Flow</span>
            </div>
            <div className="font-mono text-2xl font-bold text-slate-900">
              {telemetry.waterFlow} <span className="text-xs font-normal text-slate-500">L/min</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1">Sub-main manifold</span>
          </div>
        </div>
      </div>

      {/* Demo Simulation Bar */}
      <div className="bg-slate-100/90 rounded-2xl p-4 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
          <span className="material-symbols-outlined text-[18px] text-indigo-600">science</span>
          <span className="font-bold">Interactive Prototype Controls:</span>
        </div>
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleSimulateSatiation}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs active:scale-95 transition-all"
            title="Simulate soil moisture rising to 39% to shut off Zone 1"
          >
            Simulate Satiation (Moisture 39%)
          </button>
          <button
            type="button"
            onClick={handleSimulateDrought}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs active:scale-95 transition-all"
            title="Simulate soil moisture dropping below 35% to trigger Zone 1"
          >
            Simulate Dry (Moisture 30%)
          </button>
        </div>
      </div>

      {/* AUTOMATED MODE CONTROLS: Pause Automation & Turn Off Automation */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        <button
          type="button"
          onClick={handlePause}
          className={`h-14 py-3 px-5 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all active:scale-98 shadow-sm ${
            automationState === 'paused'
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">
            {automationState === 'paused' ? 'play_circle' : 'pause_circle'}
          </span>
          <span>{automationState === 'paused' ? 'Resume Automation' : 'Pause Automation'}</span>
        </button>

        <button
          type="button"
          onClick={handleTurnOff}
          className={`h-14 py-3 px-5 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all active:scale-98 shadow-sm ${
            automationState === 'off'
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">
            {automationState === 'off' ? 'power_settings_new' : 'power_off'}
          </span>
          <span>{automationState === 'off' ? 'Turn On Automation' : 'Turn Off Automation'}</span>
        </button>
      </div>
    </div>
  );
}

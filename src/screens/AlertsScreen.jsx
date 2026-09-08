import React, { useState } from 'react';

export default function AlertsScreen({ 
  alerts, 
  onResolveAlert, 
  onShowToast, 
  onNavigate 
}) {
  const [filter, setFilter] = useState('all');

  const activeAlerts = alerts.filter(a => !a.resolved);

  const filteredAlerts = activeAlerts.filter(a => {
    if (filter === 'all') return true;
    if (filter === 'critical') return a.category === 'critical';
    if (filter === 'warning') return a.category === 'warning';
    if (filter === 'hardware') return a.category === 'notice';
    return true;
  });

  const handleAction = (alert) => {
    if (alert.id === 'alert-1') {
      onShowToast('Actuated Zone B drip cycle. Moisture replenishment in progress.', 'success');
      onResolveAlert(alert.id);
    } else if (alert.id === 'alert-2') {
      onShowToast('Scheduled evening irrigation cycle at 6:00 PM.', 'success');
      onResolveAlert(alert.id);
    } else {
      onShowToast('Marked battery notice for next scheduled maintenance walk.', 'success');
      onResolveAlert(alert.id);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6 animate-in fade-in duration-300">
      {/* Navigation Header */}
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
              Field Alerts
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-mono">
              {activeAlerts.length} Active Alert{activeAlerts.length !== 1 ? 's' : ''} Require Immediate Attention
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-50 text-red-700 border border-red-200/80 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
          <span className="font-mono uppercase text-[11px]">Live Sensor Sync</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto py-1">
        {[
          { id: 'all', label: 'All Alerts' },
          { id: 'critical', label: 'Critical Moisture' },
          { id: 'warning', label: 'Climate & Heatwave' },
          { id: 'hardware', label: 'Sensor Hardware' },
        ].map(item => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
              filter === item.id 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Alert Cards: Responsive 2-Column Grid on Tablet/Desktop */}
      <div>
        {filteredAlerts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-card border border-slate-100 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[32px]">check_circle</span>
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900">No Active Alerts</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md">
              All moisture, hardware, and climate variables are balanced and operating within optimal physiological limits.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAlerts.map(alert => (
              <div 
                key={alert.id}
                className="bg-white rounded-3xl p-5 shadow-card border border-slate-100 flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${alert.iconBg} ${alert.iconColor}`}>
                    <span className="material-symbols-outlined text-[26px]">
                      {alert.icon}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 truncate">
                        {alert.title}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-400 shrink-0">
                        {alert.time}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      {alert.description}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      onResolveAlert(alert.id);
                      onShowToast('Alert snoozed for 2 hours', 'warning');
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Snooze
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAction(alert)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold text-white shadow-xs active:scale-95 transition-all ${
                      alert.category === 'critical' 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-emerald-600 hover:bg-emerald-700'
                    }`}
                  >
                    {alert.category === 'critical' ? 'Trigger Drip Cycle' : 'Acknowledge'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Subtle Field Status Assurance Banner */}
      <div className="p-5 rounded-3xl bg-blue-50/80 border border-blue-100/80 flex items-center gap-4">
        <span className="material-symbols-outlined text-[30px] text-blue-600 shrink-0">
          verified
        </span>
        <div className="min-w-0">
          <span className="font-display font-bold text-base text-slate-900 leading-snug block">
            All Other Zones Operating Normally
          </span>
          <span className="text-xs sm:text-sm text-slate-600 block mt-0.5">
            Main Pump, Soil pH meters, and Nursery Pods fully operational and synced with Krishi IoT Cloud.
          </span>
        </div>
      </div>
    </div>
  );
}

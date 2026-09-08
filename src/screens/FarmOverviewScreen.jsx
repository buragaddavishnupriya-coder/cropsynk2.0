import React, { useState } from 'react';

export default function FarmOverviewScreen({ onNavigate, onShowToast }) {
  const [showLogModal, setShowLogModal] = useState(false);
  const [logNotes, setLogNotes] = useState('Crop canopy foliage is vibrant. Zone 1 drip emitters inspected; flow uniform.');
  const [isLogged, setIsLogged] = useState(false);

  const bannerImgUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuCp_ePU1sOhitL7dw5dOPL5pm9Sst4GKdHobpHUXSX1TZw7IrflasxaUGOky128u838va3mT9TWL-X28l3oAMXvH1sJFSbUwbLwxulZ21RQnAAVuPnOREVKeiUY-GGDWfIVmkxXiaFnlgRiRZYbJokOAtCc5-Rc98ZwRHtehL5W9uM60I7OXqPrplDCi7ySLCFpaSUCv6R65ecJlRa3ZjLX5Jc8DhCtgwtb2mkMglCXPMWvfbMO6IUWNA";

  const handleSaveLog = (e) => {
    e.preventDefault();
    setIsLogged(true);
    setShowLogModal(false);
    onShowToast('Morning field walk logged successfully to Krishi Cloud!', 'success');
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
              Farm Overview
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-mono">
              Green Valley Farm • Plot 01 Gudlavalleru Central
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-mono text-[11px] uppercase">Live Field Cadastre</span>
        </div>
      </div>

      {/* Ambient Morning Field Image Strip */}
      <div className="relative w-full h-48 sm:h-64 rounded-3xl overflow-hidden shadow-card border border-slate-100">
        <img 
          src={bannerImgUrl} 
          alt="Tomato farm in morning sunlight" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent flex items-end p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full text-white gap-3">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-300 block mb-1">
                Crop Growth Cycle
              </span>
              <p className="font-display font-bold text-xl sm:text-2xl">
                Tomato Vegetative Stage (Day 42 of 90)
              </p>
            </div>
            <div className="self-start sm:self-auto bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 text-sm font-medium border border-white/20">
              <span className="material-symbols-outlined text-[18px] text-amber-300">wb_sunny</span>
              <span>29°C Clear Sky • Calm Wind</span>
            </div>
          </div>
        </div>
      </div>

      {/* Farm Quick Summary Card */}
      <div className="w-full bg-white rounded-3xl p-6 shadow-card border border-slate-100">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="flex flex-col items-center pt-2 sm:pt-0">
            <span className="material-symbols-outlined text-blue-600 text-[28px] mb-1.5">potted_plant</span>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Primary Crop</span>
            <span className="font-display font-bold text-lg sm:text-xl text-slate-900 mt-1">Tomato (Arka Rakshak)</span>
          </div>

          <div className="flex flex-col items-center pt-3 sm:pt-0 sm:pl-4">
            <span className="material-symbols-outlined text-blue-600 text-[28px] mb-1.5">straighten</span>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Total Cultivated Area</span>
            <span className="font-display font-bold text-lg sm:text-xl text-slate-900 mt-1">2.5 Acres (4 Zones)</span>
          </div>

          <div className="flex flex-col items-center pt-3 sm:pt-0 sm:pl-4">
            <span className="material-symbols-outlined text-blue-600 text-[28px] mb-1.5">terrain</span>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Soil Horizon Profile</span>
            <span className="font-display font-bold text-lg sm:text-xl text-slate-900 mt-1">Loamy Sand (pH 6.8)</span>
          </div>
        </div>
      </div>

      {/* Core Metrics: 4-Column Grid on Desktop */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-500">
            Field Vital Sensors
          </h2>
          <span className="text-xs font-mono text-slate-400">Updated 2m ago</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Soil Moisture */}
          <div className="bg-white rounded-3xl p-5 shadow-card border border-slate-100 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">water_drop</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold uppercase">
                Optimal
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Soil Moisture</span>
              <div className="font-mono text-3xl font-bold text-slate-900 mt-1">
                48<span className="text-base font-normal text-slate-500 ml-1">%</span>
              </div>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '48%' }}></div>
            </div>
          </div>

          {/* Soil Temperature */}
          <div className="bg-white rounded-3xl p-5 shadow-card border border-slate-100 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">device_thermostat</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono text-[10px] font-bold uppercase">
                Normal
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Soil Temp</span>
              <div className="font-mono text-3xl font-bold text-slate-900 mt-1">
                26<span className="text-base font-normal text-slate-500 ml-1">°C</span>
              </div>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: '55%' }}></div>
            </div>
          </div>

          {/* Water Storage */}
          <div className="bg-white rounded-3xl p-5 shadow-card border border-slate-100 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">storage</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 font-mono text-[10px] font-bold uppercase">
                Available
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Water Storage</span>
              <div className="font-mono text-3xl font-bold text-slate-900 mt-1">
                72<span className="text-base font-normal text-slate-500 ml-1">%</span>
              </div>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-cyan-600 h-full rounded-full" style={{ width: '72%' }}></div>
            </div>
          </div>

          {/* Active Drips */}
          <div className="bg-white rounded-3xl p-5 shadow-card border border-slate-100 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">valve</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold uppercase">
                Running
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Active Drips</span>
              <div className="font-mono text-3xl font-bold text-slate-900 mt-1">
                3 <span className="text-base font-normal text-slate-500">of 4</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="w-3 h-3 rounded-full bg-blue-600"></span>
              <span className="w-3 h-3 rounded-full bg-blue-600"></span>
              <span className="w-3 h-3 rounded-full bg-blue-600"></span>
              <span className="w-3 h-3 rounded-full bg-slate-200"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Field Action: Log Morning Field Walk */}
      <div className="pt-2 max-w-xl mx-auto">
        <button
          type="button"
          onClick={() => setShowLogModal(true)}
          className={`w-full min-h-[56px] rounded-3xl font-display font-bold text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-md active:scale-98 transition-all ${
            isLogged 
              ? 'bg-emerald-600 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">
            {isLogged ? 'task_alt' : 'checklist'}
          </span>
          <span>{isLogged ? 'Morning Field Walk Logged for Today ✓' : 'Log Morning Field Walk'}</span>
        </button>
      </div>

      {/* Field Walk Log Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 w-full max-w-md shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-blue-600 text-[26px]">checklist</span>
                <h3 className="font-display font-bold text-xl text-slate-900">Log Morning Field Walk</h3>
              </div>
              <button 
                onClick={() => setShowLogModal(false)}
                className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveLog} className="space-y-4">
              <div>
                <label className="text-xs font-mono font-bold text-slate-500 uppercase block mb-1.5">
                  Agronomist Observations &amp; Notes
                </label>
                <textarea
                  value={logNotes}
                  onChange={(e) => setLogNotes(e.target.value)}
                  rows={4}
                  className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  placeholder="Record crop vigor, pest signs, soil firmness, drip uniformity..."
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                  Quick Sensor Validation Tags
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {['No Pests', 'Moist Loam', 'Healthy Canopy', 'Valves Clear', 'No Leaks'].map(tag => (
                    <span key={tag} className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 font-medium">
                      ✓ {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="py-3 rounded-2xl border border-slate-200 text-slate-600 font-bold text-xs sm:text-sm hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-sm"
                >
                  Save to Krishi Cloud
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

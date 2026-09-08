import React, { useState } from 'react';

export default function ProfileScreen({ 
  profile, 
  onLogout, 
  onShowToast, 
  onNavigate 
}) {
  const [selectedLanguage, setSelectedLanguage] = useState('Bilingual');

  const handleCopyPhone = () => {
    navigator.clipboard?.writeText(profile.phone);
    onShowToast('Phone number copied to clipboard: ' + profile.phone, 'success');
  };

  const handleToggleLanguage = () => {
    const nextLang = selectedLanguage === 'Bilingual' ? 'English' : selectedLanguage === 'English' ? 'తెలుగు' : 'Bilingual';
    setSelectedLanguage(nextLang);
    onShowToast(`App language switched to ${nextLang}`, 'success');
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
              Farmer Profile
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-mono">
              CropSync Account &amp; Farm ID
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
          <span className="material-symbols-outlined text-[15px]">verified</span>
          <span className="font-mono text-[11px] uppercase">Active Account</span>
        </div>
      </div>

      {/* Responsive Layout: 2 Columns on Tablet/Desktop, Stack on Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Farmer Photo & Core Identity */}
        <div className="md:col-span-4 bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-slate-100 flex flex-col items-center text-center justify-center relative overflow-hidden">
          <div className="relative mb-4">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-blue-600 to-emerald-500 shadow-lg">
              <img 
                src={profile.avatarUrl} 
                alt={profile.name} 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="absolute bottom-1.5 right-1.5 w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[16px]">eco</span>
            </div>
          </div>

          <h2 className="font-display font-bold text-2xl text-slate-900">
            {profile.name}
          </h2>
          
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-medium">
            <span>{profile.role}</span>
          </div>

          <div className="mt-2 text-xs font-mono text-blue-700 font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Kisan ID #{profile.kisanId}
          </div>

          <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-500">
            <span className="material-symbols-outlined text-[16px] text-blue-600">location_on</span>
            <span>{profile.location}</span>
          </div>
        </div>

        {/* Right Column: Personal & Contact Information */}
        <div className="md:col-span-8 bg-white rounded-3xl p-6 shadow-card border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                Personal &amp; Contact Information
              </h3>
              <span className="text-[10px] font-mono text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                Verified Contact
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {/* Phone */}
              <div className="flex items-center justify-between py-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">call</span>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-400">Phone Number</div>
                    <div className="font-mono text-sm sm:text-base font-semibold text-slate-800">{profile.phone}</div>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={handleCopyPhone}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-700 flex items-center gap-1 text-xs font-medium transition-colors"
                  title="Copy Phone Number"
                >
                  <span className="material-symbols-outlined text-[16px]">content_copy</span>
                  <span>Copy</span>
                </button>
              </div>

              {/* Email */}
              <div className="flex items-center justify-between py-3.5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono uppercase text-slate-400">Email Address</div>
                    <div className="text-sm sm:text-base text-slate-800 font-medium truncate">{profile.email}</div>
                  </div>
                </div>
              </div>

              {/* App Language Switcher */}
              <div className="flex items-center justify-between py-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">translate</span>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-400">App Interface Language</div>
                    <div className="text-sm sm:text-base text-slate-800 font-semibold">{selectedLanguage} (Telugu / English)</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleToggleLanguage}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-mono text-xs font-bold transition-colors border border-blue-200/60"
                >
                  Switch Language
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Member since: June 2023</span>
            <span className="text-emerald-600 font-medium">Synced with PM-Kisan Portal</span>
          </div>
        </div>
      </div>

      {/* Farm & Landholding Wide Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-slate-100 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">agriculture</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">
                {profile.farmName}
              </h3>
              <p className="text-xs text-slate-500 font-mono uppercase">
                {profile.farmPlot}
              </p>
            </div>
          </div>
          <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-xs font-bold">
            {profile.verifiedDate}
          </span>
        </div>

        {/* 4 Metrics in Grid: 2 cols on mobile, 4 cols on tablet/desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="text-slate-400 font-mono text-[10px] uppercase">Total Area</div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-slate-900 mt-1">{profile.totalArea}</div>
            <span className="text-[11px] text-slate-500 mt-0.5 block">Irrigated farmland</span>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="text-slate-400 font-mono text-[10px] uppercase">Soil Type</div>
            <div className="font-display text-base sm:text-lg font-bold text-slate-900 mt-1">{profile.soilType}</div>
            <span className="text-[11px] text-slate-500 mt-0.5 block">High drainage index</span>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="text-slate-400 font-mono text-[10px] uppercase">Current Sown Crop</div>
            <div className="font-display text-base sm:text-lg font-bold text-blue-700 mt-1">Tomato</div>
            <span className="text-[11px] text-slate-500 mt-0.5 block">Vegetative (Day 42)</span>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="text-slate-400 font-mono text-[10px] uppercase">Farm Location</div>
            <div className="font-display text-sm sm:text-base font-bold text-slate-900 mt-1 truncate">Gudlavalleru, AP</div>
            <span className="text-[11px] text-slate-500 mt-0.5 block">Central Krishna Zone</span>
          </div>
        </div>
      </div>

      {/* Bottom Actions Row */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => onShowToast('Profile editing form opened.', 'success')}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-98 text-slate-800 font-display font-bold text-sm flex items-center justify-center gap-2 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">edit</span>
          <span>Edit Profile</span>
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 active:scale-95 font-bold text-sm flex items-center justify-center gap-1.5 transition-all border border-red-200/60"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span>Log Out from Kisan Account</span>
        </button>
      </div>
    </div>
  );
}

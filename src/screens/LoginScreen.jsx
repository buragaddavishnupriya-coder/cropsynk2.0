import React, { useState } from 'react';

export default function LoginScreen({ onLogin, onShowToast }) {
  const [username, setUsername] = useState('ravi.farmer99');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [language, setLanguage] = useState('English');

  const handleSubmit = (e) => {
    e.preventDefault();
    onShowToast(`Welcome back, Ravi! Telemetry mesh connected for Field 01.`, 'success');
    onLogin();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between p-4 sm:p-6 max-w-md mx-auto relative antialiased">
      {/* Ambient background glow accents */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 -left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Brand & Header Section */}
      <header className="pt-6 pb-4 text-center relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-blue-800 shadow-xl shadow-blue-800/20 mb-3 p-2">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            <rect width="100" height="100" rx="24" fill="#0D47A1" />
            <path d="M50 20C45 28 32 38 32 54C32 64 40 72 50 72C60 72 68 64 68 54C68 38 55 28 50 20Z" fill="#4ADE80" />
            <path d="M50 32C46 38 38 46 38 56C38 63 43 68 50 68C57 68 62 63 62 56C62 46 54 38 50 32Z" fill="#EFF6FF" />
            <path d="M50 38V64" stroke="#0D47A1" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M50 50L58 44" stroke="#0D47A1" strokeWidth="3" strokeLinecap="round" />
            <circle cx="50" cy="22" r="3.5" fill="#F59E0B" />
          </svg>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-xs font-mono font-bold text-blue-800 mb-2 tracking-wide uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Bio-IoT Precision Platform
        </div>

        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900">
          CropSync 2.0
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          Smart Farming. Smarter Decisions.
        </p>
      </header>

      {/* Login Card */}
      <main className="w-full bg-white rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-900/5 border border-slate-200/80 relative z-10">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Welcome Back
            </h2>
            <span className="text-2xl">👋</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Sign in to control your irrigation and crop sensors
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center justify-between">
              <span>Username or Phone</span>
              <span className="text-[10px] text-emerald-600 font-semibold">Auto-detected Field 01</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <span className="material-symbols-outlined text-[20px]">person</span>
              </div>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username or mobile" 
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center justify-between">
              <span>Password</span>
              <button 
                type="button" 
                onClick={() => onShowToast('Password recovery link sent to registered mobile.', 'warning')}
                className="text-[11px] text-blue-600 font-semibold hover:underline"
              >
                Forgot?
              </button>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <span className="material-symbols-outlined text-[20px]">lock</span>
              </div>
              <input 
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password" 
                className="w-full pl-11 pr-11 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Remember Me & Quick Biometric */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 accent-blue-600"
              />
              <span className="text-xs font-semibold text-slate-700">Remember me</span>
            </label>
            
            <span className="inline-flex items-center gap-1 text-xs text-blue-700 font-medium bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
              <span className="material-symbols-outlined text-[15px]">fingerprint</span>
              <span>Biometric enabled</span>
            </span>
          </div>

          {/* Primary Action Button */}
          <button 
            type="submit"
            className="w-full mt-3 py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-display font-bold text-base tracking-wide shadow-lg shadow-blue-600/25 transition flex items-center justify-center gap-2"
          >
            <span>LOGIN TO HARVEST HUB</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500 font-medium">
            New farmer?{' '}
            <button 
              type="button"
              onClick={() => onShowToast('New farm registration opened for Andhra Pradesh region.', 'success')}
              className="text-blue-600 font-bold hover:underline"
            >
              Register New Farm Hub
            </button>
          </p>
        </div>
      </main>

      {/* Bottom Multilingual Selector for Rural Accessibility */}
      <footer className="mt-6 pt-4 pb-2 text-center relative z-10">
        <p className="text-[11px] uppercase tracking-wider text-slate-400 font-mono font-bold mb-2">
          Select Language / భాష / भाषा
        </p>
        <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 shadow-xs">
          {['English', 'తెలుగు', 'हिन्दी'].map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => {
                setLanguage(lang);
                onShowToast(`Language set to ${lang}`, 'success');
              }}
              className={`px-3.5 py-1 rounded-full font-semibold text-xs transition-all ${
                language === lang 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-slate-400 font-mono mt-3">
          Krishi IoT Cloud v2.4.1 • Offline Mesh Ready
        </p>
      </footer>
    </div>
  );
}

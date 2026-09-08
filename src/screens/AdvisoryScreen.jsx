import React, { useState } from 'react';

export default function AdvisoryScreen({ onNavigate, onShowToast }) {
  const [isScanning, setIsScanning] = useState(false);
  const [showDiagnosis, setShowDiagnosis] = useState(true);

  const leafImageUrl = "https://lh3.googleusercontent.com/aida/AEtjO1XKj-Cz16qUeGzO8yYiRS71Fot3eqF6GZrC19AQrtueXtZBdUAu0dd43cXy-lA8ObKPdkzVcwSreEsRfg4Ei434Wv8Eu3kvJl9UO3u3_dhKgs71OPKTvzgDP_fdobX5_RNGvwyZLb09Pfld1-HE2tk_aYkQSJd3HZb4Ba3EWuSCsVo7SD5RqStaN7TZ315TbfewaioYsNy1raTO_TrBgvny69v4itvzk4v1KKpRArkTFpOMd3myi0SFaF2U";

  const handleRunScan = () => {
    setIsScanning(true);
    setShowDiagnosis(false);
    onShowToast('Analyzing leaf pathology using bio-vision neural network...', 'success');
    
    setTimeout(() => {
      setIsScanning(false);
      setShowDiagnosis(true);
      onShowToast('Diagnosis complete: Early Blight detected with 94% confidence', 'success');
    }, 1800);
  };

  const handleApplyAdvisory = () => {
    onShowToast('Applied AI recommendations: Drip schedule adjusted to prevent splash dispersion', 'success');
    onNavigate('irrigation');
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
              AI Crop Advisor
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-mono">
              Bio-Pathology Neural Diagnostic System • In-Field Assistance
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-mono text-[11px] uppercase">AI Model v4.2 Online</span>
        </div>
      </div>

      {/* Description Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-card border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-lg text-slate-900">
            Instant Plant Pathology Diagnostic Scanner
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Capture or upload a photo of your crop leaf or fruit for computer-vision diagnosis and agrochemical remedies.
          </p>
        </div>

        {/* Action Buttons: Take Photo & Upload Image */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleRunScan}
            disabled={isScanning}
            className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white shadow-md shadow-blue-600/20 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">photo_camera</span>
            <span>Take In-Field Photo</span>
          </button>

          <button
            type="button"
            onClick={handleRunScan}
            disabled={isScanning}
            className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-98 text-slate-800 border border-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">photo_library</span>
            <span>Upload Image</span>
          </button>
        </div>
      </div>

      {/* 2-COLUMN RESPONSIVE LAYOUT ON DESKTOP */}
      {/* Left: Leaf Scan Viewport | Right: AI Analysis Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Leaf Scan Viewport */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 shadow-card border border-slate-100 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                Leaf Sample Viewport
              </span>
              <span className="text-xs font-mono text-emerald-600 font-semibold">
                Plot 01 — Tomato Bed
              </span>
            </div>

            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
              <img 
                src={leafImageUrl} 
                alt="Tomato leaf sample diagnosis" 
                className={`w-full h-full object-cover transition-opacity duration-300 ${isScanning ? 'opacity-70' : 'opacity-100'}`}
              />

              {/* Active Scan Pill */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5 border border-white/15 shadow-sm">
                <span className="material-symbols-outlined text-[15px] animate-pulse">center_focus_strong</span>
                <span>{isScanning ? 'Analyzing Tissue...' : 'Active Scan'}</span>
              </div>

              {/* Neural Network Scanner Bounding Box Overlay */}
              <div className="absolute inset-8 border-2 border-dashed border-emerald-400/80 rounded-2xl pointer-events-none flex items-center justify-center">
                {isScanning ? (
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent absolute animate-bounce"></div>
                ) : (
                  <div className="bg-slate-900/85 backdrop-blur-md border border-emerald-400/50 text-emerald-300 px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>Target Concentric Lesion [Detected]</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRunScan}
            disabled={isScanning}
            className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-display font-bold text-sm flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all"
          >
            <span className={`material-symbols-outlined text-[20px] ${isScanning ? 'animate-spin' : ''}`}>
              {isScanning ? 'progress_activity' : 'search_check'}
            </span>
            <span>{isScanning ? 'Processing Neural Scan...' : 'Re-Diagnose Leaf Sample'}</span>
          </button>
        </div>

        {/* Right Column: AI Analysis Result Sheet */}
        <div className="lg:col-span-7">
          {showDiagnosis ? (
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-emerald-200 ring-1 ring-emerald-400/30 space-y-5 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-mono font-bold uppercase mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                      <span>Pathogen Detected</span>
                    </div>
                    <h3 className="font-display font-bold text-2xl text-slate-900">
                      Tomato Early Blight
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-slate-500 italic mt-0.5">
                      Alternaria solani (Fungal Foliar Pathogen)
                    </p>
                  </div>

                  <div className="flex flex-col items-end bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200">
                    <span className="font-mono text-3xl font-extrabold text-emerald-700">94%</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Confidence Score</span>
                  </div>
                </div>

                {/* Severity & Spread Risk Matrix */}
                <div className="grid grid-cols-2 gap-3 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <div>
                    <span className="text-slate-400 font-mono text-[10px] uppercase block">Infection Stage</span>
                    <span className="font-bold text-sm sm:text-base text-amber-700 mt-0.5 block">Moderate (Lesion count: 6)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono text-[10px] uppercase block">Spread Risk</span>
                    <span className="font-bold text-sm sm:text-base text-red-600 mt-0.5 block">High (Humidity &gt;65%)</span>
                  </div>
                </div>

                {/* Agronomic Recommendations */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                    Recommended Agronomic Remedies
                  </h4>
                  
                  <div className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                    <div className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/60">
                      <span className="material-symbols-outlined text-[20px] text-emerald-700 shrink-0 mt-0.5">eco</span>
                      <div>
                        <strong className="text-slate-900 block text-xs sm:text-sm">1. Bio-Fungicide Treatment</strong>
                        Apply <em>Trichoderma viride</em> or 5% Neem Seed Kernel Extract (NSKE) spray during evening hours to suppress spore formation.
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-2xl bg-blue-50/70 border border-blue-200/60">
                      <span className="material-symbols-outlined text-[20px] text-blue-700 shrink-0 mt-0.5">science</span>
                      <div>
                        <strong className="text-slate-900 block text-xs sm:text-sm">2. Targeted Chemical Intervention</strong>
                        For acute leaf spot arrest: Spray Copper Oxychloride 50 WP (2.5 g/L) or Mancozeb 75 WP (2 g/L).
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-2xl bg-indigo-50/70 border border-indigo-200/60">
                      <span className="material-symbols-outlined text-[20px] text-indigo-700 shrink-0 mt-0.5">water_drop</span>
                      <div>
                        <strong className="text-slate-900 block text-xs sm:text-sm">3. Irrigation Schedule Adjustment</strong>
                        Discontinue overhead sprinklers. Run sub-surface drip in Zone 1 to keep upper foliage dry and prevent splash spread.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button: Push to Irrigation Control */}
              <button
                type="button"
                onClick={handleApplyAdvisory}
                className="w-full min-h-[52px] rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 active:scale-98 transition-all mt-4"
              >
                <span className="material-symbols-outlined text-[22px]">tune</span>
                <span>Apply Advisory to Irrigation Schedule</span>
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center shadow-card border border-slate-100 flex flex-col items-center justify-center h-full min-h-[360px]">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-[32px] animate-spin">progress_activity</span>
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900">Neural Network Diagnosing...</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Extracting foliar symptom vectors, lesion geometry, and chlorotic ring contours.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

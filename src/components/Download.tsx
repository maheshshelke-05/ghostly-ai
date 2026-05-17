'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download as DownloadIcon, Monitor, Shield, Zap, CheckCircle2, ChevronDown } from 'lucide-react';

export default function Download() {
  const [showVersions, setShowVersions] = useState(false);
  
  const currentVersion = "v1.1.8";
  const versions = ["v1.1.8", "v1.1.7", "v1.1.6", "v1.1.5", "v1.1.4"];

  return (
    <section className="py-32 bg-[#0f172a] relative overflow-hidden" id="download">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-7xl font-display font-black text-white mb-8 tracking-tight">
            Download Ghostly AI
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium mb-12">
            The world's most powerful, completely free, and invisible AI copilot for technical interviews.
          </p>
          
          <div className="flex flex-col items-center gap-8">
            <a 
              href={`https://github.com/Maheshshelke05/ghostly-releases/releases/download/${currentVersion}/ghostly-${currentVersion.replace('v', '')}-setup.exe`}
              className="group relative flex items-center gap-4 px-16 py-8 bg-orange-500 text-white font-black rounded-3xl shadow-[0_20px_50px_rgba(249,115,22,0.3)] hover:scale-105 hover:bg-orange-600 active:scale-95 transition-all"
            >
              <DownloadIcon className="w-10 h-10 group-hover:animate-bounce" />
              <div>
                <div className="text-2xl">Download for Windows</div>
                <div className="text-sm opacity-70 font-bold uppercase tracking-widest mt-1">Current Version {currentVersion}</div>
              </div>
            </a>

            <div className="relative">
              <button 
                onClick={() => setShowVersions(!showVersions)}
                className="flex items-center gap-2 text-slate-400 font-bold hover:text-white transition-colors"
              >
                <span>Previous Versions</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showVersions ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {showVersions && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl z-20"
                  >
                    {versions.map((v, i) => (
                      <a 
                        key={i} 
                        href={`https://github.com/Maheshshelke05/ghostly-releases/releases/download/${v}/ghostly-${v.replace('v', '')}-setup.exe`}
                        className="block px-6 py-3 text-sm font-bold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors border-b border-slate-700 last:border-0"
                      >
                        {v} Setup (.exe)
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto border-t border-slate-800 pt-16 relative z-10">
          <div>
            <h4 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
              <Monitor className="w-6 h-6 text-orange-500" />
              System Requirements
            </h4>
            <ul className="space-y-4 text-slate-400 font-bold">
              {[
                "Windows 10 / 11 (64-bit)",
                "Active Internet Connection",
                "Working Microphone & Speakers",
                "Deepgram API Key (Free tier)",
                "Any AI Provider Key (Gemini Recommended)"
              ].map((req, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
              <Zap className="w-6 h-6 text-orange-500" />
              Quick Start
            </h4>
            <div className="space-y-6">
              {[
                "Download and run the setup.exe file",
                "Enter your API keys in settings",
                "Open your interview platform",
                "Press Ctrl+H to start invisible capture"
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-xs font-black text-white shrink-0 border border-slate-700">
                    {i + 1}
                  </div>
                  <p className="text-slate-400 font-bold text-sm leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
    </section>
  );
}

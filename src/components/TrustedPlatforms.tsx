'use client';

import { motion } from 'motion/react';

export default function TrustedPlatforms() {
  const platforms = [
    'Zoom', 'Google Meet', 'Microsoft Teams', 'HackerRank', 'LeetCode', 'CodeSignal', 
    'Pramp', 'Karat', 'Superset', 'CoderPad', 'Codility', 'Skype', 'Webex', 'BlueJeans'
  ];

  return (
    <section className="py-24 bg-white border-y border-slate-50" id="compatibility">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-display font-black text-slate-950 mb-16 tracking-tight">
          Works with Any Platform
        </h2>
        
        <div className="relative overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-40 before:bg-linear-to-r before:from-white before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-40 after:bg-linear-to-l after:from-white after:to-transparent after:z-10">
          <div className="flex gap-16 items-center animate-scroll-x whitespace-nowrap grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            {/* Double the array for seamless scrolling */}
            {[...platforms, ...platforms].map((platform, i) => (
              <div key={i} className="flex items-center gap-4 text-3xl font-black text-slate-900 px-8 py-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-orange-500 text-xl">👻</span>
                {platform}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

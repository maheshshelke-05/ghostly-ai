'use client';

import { motion } from 'motion/react';

const testimonials = [
  { name: "Alex K.", role: "Software Engineer", company: "Google", content: "Ghostly AI was my secret weapon. The invisible overlay is absolute magic—no one suspected a thing during the live coding session.", initials: "AK", color: "bg-blue-500" },
  { name: "Sarah M.", role: "Backend Dev", company: "Amazon", content: "The real-time transcription from Deepgram is incredibly accurate. It caught every detail of the system design question.", initials: "SM", color: "bg-orange-500" },
  { name: "David L.", role: "Frontend Lead", company: "Meta", content: "I love that it's 100% local. My API keys stay on my machine, and my privacy is guaranteed. Phenomenal tool.", initials: "DL", color: "bg-purple-500" },
  { name: "Elena R.", role: "Full Stack", company: "Microsoft", content: "Switching between Gemini and GPT-4o on the fly is a game changer. Different models excel at different types of logic.", initials: "ER", color: "bg-green-500" },
  { name: "James T.", role: "DevOps Engineer", company: "Netflix", content: "The Screen Analysis feature (Ctrl+H) is a lifesaver for those tricky architectural diagrams. Instant insights.", initials: "JT", color: "bg-indigo-500" },
  { name: "Maya P.", role: "AI Researcher", company: "OpenAI", content: "Clean, fast, and completely invisible. It's the most polished interview tool I've ever used. Worth every penny for the source.", initials: "MP", color: "bg-rose-500" },
];

export default function Testimonials() {
  const row1 = testimonials.slice(0, 3);
  const row2 = testimonials.slice(3, 6);

  return (
    <section className="py-24 bg-white overflow-hidden relative" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-8">
          What Our Users Say
        </h2>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
          Join thousands of developers who have aced their interviews with Ghostly AI.
        </p>
      </div>

      <div className="space-y-8">
        {/* Row 1: Left to Right */}
        <div className="relative flex overflow-hidden">
          <div className="flex gap-8 animate-scroll-x whitespace-nowrap">
            {[...row1, ...row1, ...row1].map((t, idx) => (
              <div 
                key={idx}
                className="w-[450px] flex-shrink-0 bg-slate-50 p-10 rounded-[40px] border border-slate-100 whitespace-normal group hover:bg-white hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex items-center gap-5 mb-8">
                  <div className={`w-14 h-14 rounded-[20px] ${t.color} flex items-center justify-center text-white font-black text-xl shadow-lg`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-black text-slate-900 text-lg">{t.name}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {t.role} <span className="text-orange-500/40 mx-1">•</span> {t.company}
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 italic leading-relaxed text-base font-medium">
                  "{t.content}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="relative flex overflow-hidden">
          <div className="flex gap-8 animate-scroll-x-reverse whitespace-nowrap">
            {[...row2, ...row2, ...row2].map((t, idx) => (
              <div 
                key={idx}
                className="w-[450px] flex-shrink-0 bg-slate-50 p-10 rounded-[40px] border border-slate-100 whitespace-normal group hover:bg-white hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex items-center gap-5 mb-8">
                  <div className={`w-14 h-14 rounded-[20px] ${t.color} flex items-center justify-center text-white font-black text-xl shadow-lg`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-black text-slate-900 text-lg">{t.name}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {t.role} <span className="text-orange-500/40 mx-1">•</span> {t.company}
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 italic leading-relaxed text-base font-medium">
                  "{t.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

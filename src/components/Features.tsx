'use client';

import { motion } from 'motion/react';
import { Shield, Mic, Zap, Search, MessageSquare, Lock } from 'lucide-react';

const features = [
  {
    emoji: "🎙️",
    title: "Live Voice Transcription + AI Answer",
    description: "Captures interviewer's voice from Zoom/Meet/Teams in real-time using Deepgram Nova-2. After 2.5 seconds of silence, AI automatically answers the question. Completely hands-free — you just read the answer.",
    tag: "Most Used"
  },
  {
    emoji: "🖥️",
    title: "Screenshot + Instant AI Solution",
    description: "Press Ctrl+E to capture your screen. AI analyzes the coding problem and returns: complete solution with comments, time/space complexity, step-by-step dry run, edge cases, and alternative approaches.",
    tag: "DSA · System Design · SQL"
  },
  {
    emoji: "💬",
    title: "In-Interview AI Chat",
    description: "Ask anything mid-interview without taking a screenshot. Maintains conversation context for follow-up questions. Works for concept explanations, code reviews, and quick clarifications.",
    tag: "Context Aware"
  },
  {
    emoji: "👤",
    title: "Deep Personalization",
    description: "Fill your resume once — name, skills, projects, experience. The AI answers 'Tell me about yourself' using YOUR actual background. Sounds 100% authentic, not generic.",
    tag: "Game Changer"
  },
  {
    emoji: "🛡️",
    title: "Completely Invisible to Screen Share",
    description: "Uses Electron's content protection API. Ghostly AI is excluded from all screen capture — OBS, Zoom screen share, Teams recording. The interviewer literally cannot see it.",
    tag: "Stealth Tech"
  },
  {
    emoji: "🎯",
    title: "Company-Specific AI Answers",
    description: "Set company name, position, and tone before each interview. AI tailors every answer for that specific company and role. Engineered for maximum accuracy and professional results.",
    tag: "Dynamic Tone"
  },
  {
    emoji: "📋",
    title: "Full Session History",
    description: "Every interview saved with all Q&A pairs, duration, company, position, and features used. Review your past interviews, copy answers, track your progress.",
    tag: "Learn & Improve"
  },
  {
    emoji: "⚡",
    title: "Always Up to Date",
    description: "Automatically checks for updates on startup. Downloads in background, installs on restart. You always have the latest features and improvements.",
    tag: "Auto Updates"
  },
  {
    emoji: "🔧",
    title: "Full Customization",
    description: "10+ keyboard shortcuts for hands-free operation. Adjustable window opacity (20-100%). Custom AI instructions per session. Move window anywhere on screen.",
    tag: "Pro Tools"
  }
];

export default function Features() {
  return (
    <section className="py-32 bg-white relative overflow-hidden" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-display font-black tracking-tight mb-8"
        >
          Everything You Need to Ace <br/>
          Any <span className="gradient-text italic">Interview.</span>
        </motion.h2>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium mb-24">
          9 powerful features, all completely free.
        </p>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              whileHover={{ y: -8 }}
              className="p-10 bg-white border border-slate-100 rounded-[40px] shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 relative flex flex-col items-start text-left group"
            >
              <div className="text-5xl mb-8 group-hover:scale-110 transition-transform duration-500">
                {feature.emoji}
              </div>
              
              {feature.tag && (
                <div className="mb-4">
                  <span className="badge badge-orange !text-[9px]">{feature.tag}</span>
                </div>
              )}

              <h4 className="text-2xl font-display font-black text-slate-900 mb-5 tracking-tight">
                {feature.title}
              </h4>
              <p className="text-slate-500 leading-relaxed text-sm font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

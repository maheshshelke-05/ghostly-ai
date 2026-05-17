'use client';

import { motion } from 'motion/react';
import { Download, Monitor, Activity, Zap } from 'lucide-react';

const steps = [
  {
    emoji: "⬇️",
    title: "Download & Install",
    description: "Download the free Windows installer (one click, no account needed). Install takes under 30 seconds."
  },
  {
    emoji: "🔑",
    title: "Add Your Free API Keys",
    description: "Get free API keys from Google AI Studio (Gemini) and Groq — both completely free, takes 2 minutes. Paste them in the app. That's it."
  },
  {
    emoji: "🎯",
    title: "Setup Your Interview",
    description: "Enter company name, position, and your profile (resume details). AI will personalize every answer for your specific interview."
  },
  {
    emoji: "🎙️",
    title: "Test Audio",
    description: "Quick audio test to verify system audio capture is working. The app captures Zoom/Meet audio — not your microphone."
  },
  {
    emoji: "👻",
    title: "Go Invisible & Interview",
    description: "Press Ctrl+B to hide the app. Join your interview. Press Ctrl+E for screen problems, or use AI Answer for verbal questions. Read answers naturally."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-32 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-8">
            How It Works
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            From download to acing your interview in 5 minutes
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-16 relative">
          {/* Connecting Line (Desktop) */}
          <div className="absolute left-[39px] top-10 bottom-10 w-0.5 bg-slate-100 hidden md:block"></div>

          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="flex items-start gap-10 group relative"
            >
              <div className="w-20 h-20 bg-white border border-slate-100 rounded-[28px] shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 text-4xl z-10 relative">
                {step.emoji}
              </div>
              <div className="pt-4">
                <h4 className="text-2xl font-display font-black text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
                  {step.title}
                </h4>
                <p className="text-slate-500 text-lg leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

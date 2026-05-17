'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { 
    q: "Is Ghostly AI really invisible during screen sharing?", 
    a: "Yes. Using the Windows WDA_EXCLUDEFROMCAPTURE API, Ghostly AI's overlay is invisible to system-level screen capture tools like Zoom, Microsoft Teams, Google Meet, OBS, and Discord. It only exists on your physical monitor." 
  },
  { 
    q: "Which AI providers are supported?", 
    a: "We support a wide range of providers including Google Gemini, OpenAI GPT-4o, Anthropic Claude, Groq (Llama3/Mixtral), Grok, and local models via Ollama and Gemma." 
  },
  { 
    q: "Are my API keys safe?", 
    a: "Ghostly AI is 100% local. Your API keys are stored only on your machine and are never sent to our servers. We have zero telemetry and no cloud backends." 
  },
  { 
    q: "Does it work on Mac or Linux?", 
    a: "Currently, Ghostly AI is built specifically for Windows to leverage the direct capture exclusion APIs. Mac and Linux versions are in the research phase." 
  },
  { 
    q: "What is Deepgram and do I need to pay for it?", 
    a: "Deepgram is our chosen audio transcription engine because it's the fastest in the world (Nova-2 model). They offer a very generous free tier ($200 credits) which lasts for hundreds of hours of interviews." 
  },
  { 
    q: "Can I use it for non-technical interviews?", 
    a: "Absolutely. While optimized for code analysis via Ctrl+H, the real-time audio transcription and AI chat work for any conversational scenario." 
  },
  { 
    q: "How is the source code different from the free app?", 
    a: "The source code ($300) includes the complete Electron + React project, allowing you to build custom features, change styling, or integrate your own internal AI models." 
  },
  { 
    q: "Will I get banned for using this?", 
    a: "Ghostly AI is designed for stealth, but we always encourage responsible use. It's an assistant, not a replacement for your skills. Use it to clarify concepts and verify your thoughts." 
  },
];

interface FAQItemProps {
  key?: any;
  q: string;
  a: string;
  isOpen: boolean;
  onClick: () => void;
}

function FAQItem({ q, a, isOpen, onClick }: FAQItemProps) {
  return (
    <div className={`rounded-[32px] overflow-hidden mb-4 transition-all duration-300 border ${isOpen ? 'bg-white border-orange-200 shadow-xl' : 'bg-slate-50 border-slate-100'}`}>
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-8 text-left transition-all"
      >
        <span className={`font-black text-lg transition-colors ${isOpen ? 'text-orange-600' : 'text-slate-950 pr-8'}`}>{q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={isOpen ? 'text-orange-600' : 'text-slate-400'}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-8 pt-0 text-slate-500 leading-relaxed font-bold">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-32 bg-white" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight mb-8">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Everything you need to know about the world's most stealthy AI copilot.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <FAQItem
              key={idx}
              q={faq.q}
              a={faq.a}
              isOpen={openIdx === idx}
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

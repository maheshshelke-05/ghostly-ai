'use client';

import { motion } from 'motion/react';
import { Shield, Zap, Lock } from 'lucide-react';

export default function VideoShowcase() {
  return (
    <section className="py-32 bg-[#f8fafc]" id="demo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight mb-8">
            See Ghostly AI in Action
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Watch how it works in a real technical interview
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Nice Frame */}
          <div className="rounded-[40px] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.12)] border border-slate-200 bg-white p-4">
            <div className="rounded-[32px] overflow-hidden aspect-video">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/PFvDDzwfiF0?si=_S2V9LbTwvASrqF1" 
                title="Ghostly AI Full Demo" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Stats below video */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
            {[
              { title: "9 Features", desc: "All completely free" },
              { title: "8 AI Providers", desc: "Including 100% free options" },
              { title: "10+ Shortcuts", desc: "Fully hands-free operation" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className="p-10 bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="text-2xl font-display font-black text-slate-950 mb-2">{stat.title}</div>
                <div className="text-slate-500 font-medium">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

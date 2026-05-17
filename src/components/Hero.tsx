'use client';

import { motion } from 'motion/react';
import { Download, Play, MousePointer2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-white">
      {/* Background Orbs */}
      <div className="orb w-[800px] h-[800px] bg-orange-100 -top-40 -left-40 opacity-40 animate-pulse"></div>
      <div className="orb w-[600px] h-[600px] bg-purple-100 -bottom-20 -right-20 opacity-30 animate-pulse [animation-delay:2s]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <motion.div variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-orange-50 text-orange-600 rounded-full border border-orange-100 shadow-sm mb-10">
              <span className="text-[12px] font-black uppercase tracking-[0.2em]">✨ 100% Free Forever — Bring Your Own API Key</span>
            </div>
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="text-[clamp(2.5rem,8vw,6.5rem)] font-display font-black leading-[0.95] mb-8 tracking-tighter text-slate-950 max-w-5xl"
          >
            The Invisible AI That <br/>
            <span className="gradient-text">Wins Your Interviews.</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl md:text-2xl text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Ghostly AI sits silently on your screen during Zoom, Meet & Teams interviews. 
            It listens, reads your screen, and gives you instant AI answers — 
            completely invisible to screen sharing.
          </motion.p>

          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center gap-6 mb-16 justify-center"
          >
            <a 
              href="https://github.com/Maheshshelke05/ghostly-releases/releases/download/v1.1.8/ghostly-1.1.8-setup.exe"
              className="btn-primary flex items-center gap-3 px-12 py-6 text-lg"
            >
              <Download className="w-6 h-6" />
              <span>Download Free — v1.1.8</span>
            </a>
            <a 
              href="#demo"
              className="btn-secondary flex items-center gap-3 px-12 py-6 text-lg group"
            >
              <Play className="w-5 h-5 fill-slate-700 group-hover:scale-110 transition-transform" />
              Watch Demo
            </a>
          </motion.div>

          <motion.p 
            variants={fadeInUp}
            className="text-sm font-bold text-slate-400 mb-20 uppercase tracking-[0.2em]"
          >
            No subscription. No watermark. Just your API key.
          </motion.p>

          {/* Hero Visual Video */}
          <motion.div 
            variants={fadeInUp}
            className="relative w-full max-w-5xl mx-auto"
          >
            <div className="absolute -inset-10 bg-linear-to-r from-orange-500/10 to-purple-500/10 rounded-[100px] blur-3xl opacity-50"></div>
            <div className="animate-float relative z-10 w-full aspect-video rounded-[40px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border-[12px] border-white bg-white">
              <iframe 
                className="w-full h-full shadow-inner"
                src="https://www.youtube.com/embed/nkp4gt54GE4?si=NmvhjN9K27bF7XiY" 
                title="Ghostly AI Full Demo" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>

          {/* Trusted Platforms Logos */}
          <div className="mt-32 w-full pt-12 border-t border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-12">Works invisibly on:</p>
            <div className="relative overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-32 before:bg-linear-to-r before:from-white before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-32 after:bg-linear-to-l after:from-white after:to-transparent after:z-10">
              <div className="flex gap-20 items-center animate-scroll-x-fast grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
                {[
                  'Zoom', 'Google Meet', 'Microsoft Teams', 'HackerRank', 'LeetCode', 'CodeSignal', 'Pramp', 'Zoom', 'Google Meet', 'Microsoft Teams', 'HackerRank', 'LeetCode', 'CodeSignal', 'Pramp'
                ].map((logo, i) => (
                  <span key={i} className="text-2xl font-black text-slate-900 whitespace-nowrap">{logo}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Scroll to Explore</span>
        <div className="w-6 h-10 border-2 border-slate-200 rounded-full flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-orange-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

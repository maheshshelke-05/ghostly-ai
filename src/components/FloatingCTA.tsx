'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X } from 'lucide-react';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const downloadSection = document.getElementById('download');
      
      if (downloadSection) {
        const sectionTop = downloadSection.offsetTop;
        if (scrollY > 400 && scrollY < sectionTop - 600) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else if (scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
        >
          <a
            href="https://github.com/Maheshshelke05/ghostly-releases/releases/download/v1.1.8/ghostly-1.1.8-setup.exe"
            className="flex items-center gap-3 px-8 py-4 bg-slate-950 text-white font-black rounded-full shadow-2xl hover:scale-105 transition-all active:scale-95 group leading-none"
          >
            <Download className="w-5 h-5 group-hover:animate-bounce text-orange-500" />
            <span>GET GHOSTLY AI v1.1.8</span>
          </a>
          <button
            onClick={() => setIsDismissed(true)}
            className="p-2 bg-white border border-slate-200 rounded-full shadow-lg hover:bg-slate-50 transition-colors"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { motion } from 'motion/react';
import { Github, Twitter, Linkedin, Mail, Heart, ArrowUp, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white py-24 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-8">
              <span className="text-3xl">👻</span>
              <span className="text-2xl font-display font-black tracking-tighter text-slate-950">
                Ghostly<span className="text-orange-500">AI</span>
              </span>
            </Link>
            <p className="text-slate-500 font-medium max-w-sm leading-relaxed mb-8">
              Helping developers build confidence and ace their technical interviews with the most stealthy AI assistant in the world.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Github className="w-5 h-5" />, href: "https://github.com/Maheshshelke05" },
                { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com/in/Maheshshelke05" },
                { icon: <Twitter className="w-5 h-5" />, label: "Twitter", href: "https://twitter.com/Maheshshelke05" },
                { icon: <Mail className="w-5 h-5" />, href: "mailto:msshelke0505@gmail.com" }
              ].map((social, i) => (
                <a key={i} href={social.href} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-orange-500 hover:bg-orange-50 transition-all border border-slate-100">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Product</h4>
            <ul className="space-y-4 font-bold text-sm text-slate-600">
              <li><a href="#features" className="hover:text-orange-500 transition-colors">Features</a></li>
              <li><a href="#demo" className="hover:text-orange-500 transition-colors">Demo Video</a></li>
              <li><a href="#pricing" className="hover:text-orange-500 transition-colors">Pricing</a></li>
              <li><a href="#download" className="hover:text-orange-500 transition-colors">Download</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Company</h4>
            <ul className="space-y-4 font-bold text-sm text-slate-600">
              <li><a href="#creator" className="hover:text-orange-500 transition-colors">About Developer</a></li>
              <li><a href="#faq" className="hover:text-orange-500 transition-colors">FAQ</a></li>
              <li><Link to="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-orange-500 transition-colors">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8 text-xs font-bold text-slate-400">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 uppercase tracking-widest text-center">
            <span>© {currentYear} Mahesh Shelke</span>
            <span className="flex items-center gap-2 uppercase tracking-widest">Built with <Heart className="w-3 h-3 text-red-500 fill-current" /> in AI Studio</span>
          </div>
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 group hover:text-slate-900 transition-colors uppercase tracking-widest"
          >
            Back to Top
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <div className="mt-12 p-8 bg-slate-50 rounded-[32px] border border-slate-100">
          <div className="flex items-start gap-4">
            <Shield className="w-5 h-5 text-slate-400 shrink-0" />
            <p className="text-[10px] text-slate-500 font-bold leading-relaxed uppercase tracking-widest">
              Ghostly AI is intended for preparation purposes only. Users are responsible for ethical use and compliance with all interview platform policies.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

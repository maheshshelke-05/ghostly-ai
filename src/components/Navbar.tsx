'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Download, Github, LogIn, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { signOut } from '../lib/supabase';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => { await signOut(); navigate('/'); };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '/#features' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Demo', href: '/#demo' },
    { name: 'Providers', href: '/#providers' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Reviews', href: '/#reviews' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Download', href: '/#download' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'py-3 bg-white/70 backdrop-blur-2xl border-b border-slate-100 shadow-xl shadow-slate-900/5' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.span 
              className="text-3xl"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              👻
            </motion.span>
            <span className="text-2xl font-display font-black tracking-tighter text-slate-900 leading-none">
              Ghostly<span className="text-orange-500">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6 text-sm font-bold text-slate-500">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href}
                  className="hover:text-orange-500 transition-colors uppercase tracking-widest text-[11px]"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              <a href="https://github.com/Maheshshelke05" target="_blank" rel="noreferrer"
                className="text-slate-400 hover:text-slate-900 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              {user ? (
                <div className="flex items-center gap-2">
                  <Link to="/dashboard"
                    className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 rounded-full border border-orange-100 hover:bg-orange-100 transition-all">
                    {user.user_metadata?.avatar_url ? (
                      <img src={user.user_metadata.avatar_url} className="w-5 h-5 rounded-full" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-orange-500" />
                    )}
                    <span className="text-xs font-bold text-orange-600 max-w-[100px] truncate">
                      {user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]}
                    </span>
                  </Link>
                  <button onClick={handleSignOut}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-slate-500 hover:text-red-500 border border-slate-200 hover:border-red-200 transition-all">
                    <LogOut className="w-3.5 h-3.5" /> Logout
                  </button>
                </div>
              ) : (
                <Link to="/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-slate-700 border border-slate-200 hover:border-orange-300 hover:text-orange-600 transition-all">
                  <LogIn className="w-3.5 h-3.5" /> Login
                </Link>
              )}
              <a href="https://github.com/Maheshshelke05/ghostly-releases/releases/download/v1.1.8/ghostly-1.1.8-setup.exe"
                className="btn-primary flex items-center gap-2 !py-2.5 !px-6 !text-xs !rounded-full">
                <Download className="w-4 h-4" />
                <span>Download Free</span>
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[-1] md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-4 right-4 mt-2 bg-white rounded-3xl border border-slate-100 shadow-2xl p-6 md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="px-4 py-3 rounded-xl text-lg font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-slate-50">
                 <a 
                  href="https://github.com/Maheshshelke05/ghostly-releases/releases/download/v1.1.8/ghostly-1.1.8-setup.exe"
                  className="btn-primary w-full flex items-center justify-center gap-3 !py-4"
                >
                  <Download className="w-5 h-5" />
                  Download for Windows
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

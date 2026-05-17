'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Download, LogOut, LayoutDashboard, User, CreditCard, Home } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { signOut } from '../lib/supabase';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    setIsMobileMenuOpen(false);
    await signOut();
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsMobileMenuOpen(false); }, [location.pathname]);

  const landingLinks = [
    { name: 'Features', href: '/#features' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Demo', href: '/#demo' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'FAQ', href: '/#faq' },
  ];

  const dashboardLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { name: 'Profile', href: '/profile', icon: <User className="w-3.5 h-3.5" /> },
    { name: 'Pricing', href: '/pricing', icon: <CreditCard className="w-3.5 h-3.5" /> },
  ];

  const displayName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'User';
  const avatar = user?.user_metadata?.avatar_url;
  const isActive = (href: string) => location.pathname === href;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || user
          ? 'py-3 bg-white/80 backdrop-blur-2xl border-b border-slate-100 shadow-lg shadow-slate-900/5'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2 group">
            <motion.span
              className="text-2xl"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >👻</motion.span>
            <span className="text-xl font-display font-black tracking-tighter text-slate-900">
              Ghostly<span className="text-orange-500">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">

            {user ? (
              /* ── LOGGED IN NAV ── */
              <>
                <div className="flex items-center gap-1 bg-slate-50 rounded-2xl p-1 border border-slate-100">
                  {dashboardLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                        isActive(link.href)
                          ? 'bg-white text-orange-600 shadow-sm border border-orange-100'
                          : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'
                      }`}
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  ))}
                </div>

                {/* User pill */}
                <div className="flex items-center gap-2">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-3 py-2 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-orange-200 hover:shadow-md transition-all"
                  >
                    {avatar ? (
                      <img src={avatar} alt={displayName} className="w-6 h-6 rounded-full object-cover" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-xs font-black text-orange-500">
                        {displayName[0].toUpperCase()}
                      </div>
                    )}
                    <span className="text-xs font-bold text-slate-700 max-w-[80px] truncate">{displayName}</span>
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold text-slate-400 hover:text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              /* ── LOGGED OUT NAV ── */
              <>
                <div className="flex items-center gap-5">
                  {landingLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="text-[11px] font-bold text-slate-500 hover:text-orange-500 transition-colors uppercase tracking-widest"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 border border-slate-200 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50 transition-all"
                  >
                    Login
                  </Link>
                  <a
                    href="https://github.com/Maheshshelke05/ghostly-releases/releases/download/v1.1.8/ghostly-1.1.8-setup.exe"
                    className="btn-primary flex items-center gap-2 !py-2 !px-5 !text-xs !rounded-xl"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Free
                  </a>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[-1] md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-4 right-4 mt-2 bg-white rounded-3xl border border-slate-100 shadow-2xl p-5 md:hidden"
            >
              {user ? (
                <>
                  {/* Mobile logged in */}
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-2xl mb-4 border border-orange-100">
                    {avatar ? (
                      <img src={avatar} className="w-9 h-9 rounded-xl object-cover" />
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-orange-200 flex items-center justify-center font-black text-orange-600">
                        {displayName[0].toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-black text-slate-800">{displayName}</p>
                      <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 mb-4">
                    {dashboardLinks.map((link) => (
                      <Link key={link.name} to={link.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors ${
                          isActive(link.href) ? 'bg-orange-50 text-orange-600' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {link.icon} {link.name}
                      </Link>
                    ))}
                  </div>
                  <button onClick={handleSignOut}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-red-500 bg-red-50 border border-red-100">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  {/* Mobile logged out */}
                  <div className="flex flex-col gap-1 mb-4">
                    {landingLinks.map((link) => (
                      <Link key={link.name} to={link.href}
                        className="px-4 py-3 rounded-xl text-sm font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                        {link.name}
                      </Link>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 pt-4 border-t border-slate-50">
                    <Link to="/login" className="w-full py-3 rounded-xl text-sm font-bold text-center text-slate-700 border border-slate-200 hover:border-orange-300 hover:text-orange-600 transition-all">
                      Login
                    </Link>
                    <a href="https://github.com/Maheshshelke05/ghostly-releases/releases/download/v1.1.8/ghostly-1.1.8-setup.exe"
                      className="btn-primary w-full flex items-center justify-center gap-2 !py-3">
                      <Download className="w-4 h-4" /> Download Free
                    </a>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

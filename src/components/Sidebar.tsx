'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, User, CreditCard, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { signOut } from '../lib/supabase';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Pricing', href: '/pricing', icon: CreditCard },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const displayName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'User';
  const avatar = user?.user_metadata?.avatar_url;

  const handleSignOut = async () => {
    setMobileOpen(false);
    await signOut();
    navigate('/');
  };

  const isActive = (href: string) => location.pathname === href;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 px-6 py-6 mb-2 group" onClick={() => setMobileOpen(false)}>
        <motion.span className="text-2xl" animate={{ y: [0, -3, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
          👻
        </motion.span>
        <span className="text-lg font-display font-black tracking-tighter text-slate-900">
          Ghostly<span className="text-orange-500">AI</span>
        </span>
      </Link>

      {/* User pill */}
      <div className="mx-4 mb-6 p-3 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100">
        <div className="flex items-center gap-3">
          {avatar ? (
            <img src={avatar} alt={displayName} className="w-9 h-9 rounded-xl object-cover border-2 border-orange-200" />
          ) : (
            <div className="w-9 h-9 rounded-xl bg-orange-200 flex items-center justify-center font-black text-orange-600 text-sm">
              {displayName[0].toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-black text-slate-800 truncate">{displayName}</p>
            <p className="text-[10px] text-slate-400 font-medium truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 px-3 mb-3">Navigation</p>
        {navItems.map(({ name, href, icon: Icon }) => (
          <Link
            key={name}
            to={href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all duration-200 group ${
              isActive(href)
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive(href) ? 'text-white' : ''}`} />
            {name}
            {isActive(href) && (
              <motion.div layoutId="activeIndicator" className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70" />
            )}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-100">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 group"
        >
          <LogOut className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 min-h-screen bg-white border-r border-slate-100 fixed left-0 top-0 bottom-0 z-40 shadow-sm">
        <SidebarContent />
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 px-4 py-3 flex items-center justify-between shadow-sm">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl">👻</span>
          <span className="text-lg font-display font-black tracking-tighter text-slate-900">
            Ghostly<span className="text-orange-500">AI</span>
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 shadow-2xl md:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

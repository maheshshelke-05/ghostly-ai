'use client';

import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { signOut } from '../lib/supabase';
import { LogOut, Mail, User, Shield, Calendar } from 'lucide-react';

export default function Profile() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  const handleSignOut = async () => { await signOut(); navigate('/'); };

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const avatar = user?.user_metadata?.avatar_url;
  const joinedDate = user?.created_at ? new Date(user.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : '—';

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin" />
    </div>
  );

  const infoRows = [
    { icon: <User className="w-4 h-4" />, label: 'Full Name', value: displayName },
    { icon: <Mail className="w-4 h-4" />, label: 'Email', value: user?.email || '—' },
    { icon: <Shield className="w-4 h-4" />, label: 'Auth Provider', value: 'Google' },
    { icon: <Calendar className="w-4 h-4" />, label: 'Member Since', value: joinedDate },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">👻</span>
            <span className="text-xl font-display font-black tracking-tighter text-slate-900">
              Ghostly<span className="text-orange-500">AI</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors">Dashboard</Link>
            <Link to="/profile" className="text-xs font-bold text-orange-500 border-b-2 border-orange-500 pb-0.5">Profile</Link>
            <Link to="/pricing" className="text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors">Pricing</Link>
            <button onClick={handleSignOut} className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors ml-2">
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="text-2xl font-display font-black text-slate-900 mb-8">My Profile</h1>

          {/* Avatar Card */}
          <div className="bg-white rounded-[28px] border border-slate-100 shadow-sm p-8 mb-4 flex items-center gap-6">
            {avatar ? (
              <img src={avatar} alt={displayName} className="w-20 h-20 rounded-2xl object-cover border-2 border-orange-200" />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl font-black text-orange-500">
                {displayName[0].toUpperCase()}
              </div>
            )}
            <div>
              <h2 className="text-xl font-display font-black text-slate-900">{displayName}</h2>
              <p className="text-sm text-slate-500 font-medium">{user?.email}</p>
              <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-green-50 border border-green-100 rounded-full text-xs font-bold text-green-600">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Active Account
              </span>
            </div>
          </div>

          {/* Info Rows */}
          <div className="bg-white rounded-[28px] border border-slate-100 shadow-sm overflow-hidden mb-4">
            {infoRows.map((row, i) => (
              <div key={i} className={`flex items-center gap-4 px-8 py-5 ${i < infoRows.length - 1 ? 'border-b border-slate-50' : ''}`}>
                <span className="text-slate-400">{row.icon}</span>
                <div className="flex-1">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-0.5">{row.label}</p>
                  <p className="text-sm font-bold text-slate-800">{row.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-[28px] border border-red-100 shadow-sm p-6">
            <p className="text-xs font-black uppercase tracking-widest text-red-400 mb-4">Account Actions</p>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-50 border border-red-100 text-red-500 font-bold text-sm hover:bg-red-100 transition-all"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

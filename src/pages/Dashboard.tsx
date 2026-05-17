'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { Download, Crown, Zap, User, Check } from 'lucide-react';

interface Subscription {
  plan: 'free' | 'pro';
  status: string;
  expires_at: string | null;
}

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [sub, setSub] = useState<Subscription | null>(null);
  const [subLoading, setSubLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from('subscriptions')
      .select('plan, status, expires_at')
      .eq('user_id', user.id)
      .single()
      .then(({ data }) => {
        setSub(data as Subscription);
        setSubLoading(false);
      });
  }, [user]);

  const isPro = sub?.plan === 'pro' && sub?.status === 'active';
  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const avatar = user?.user_metadata?.avatar_url;

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

        {/* Welcome Header */}
        <div className="flex items-center gap-4 mb-8">
          {avatar ? (
            <img src={avatar} alt={displayName} className="w-14 h-14 rounded-2xl object-cover border-2 border-orange-200 shadow-sm" />
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-orange-500/20">
              {displayName[0].toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-display font-black text-slate-900">Hey, {displayName}! 👋</h1>
            <p className="text-sm text-slate-400 font-medium">{user?.email}</p>
          </div>
          {isPro && (
            <span className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-black rounded-full shadow-lg shadow-orange-500/30">
              <Crown className="w-3.5 h-3.5" /> PRO
            </span>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Plan Card */}
          <div className={`p-6 rounded-[24px] border-2 ${isPro ? 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200' : 'bg-white border-slate-100'} shadow-sm`}>
            <div className="flex items-center gap-2 mb-3">
              {isPro ? <Crown className="w-5 h-5 text-orange-500" /> : <Zap className="w-5 h-5 text-slate-400" />}
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Plan</span>
            </div>
            {subLoading ? (
              <div className="h-8 w-20 bg-slate-100 rounded-lg animate-pulse" />
            ) : (
              <>
                <p className={`text-2xl font-display font-black ${isPro ? 'text-orange-500' : 'text-slate-900'}`}>
                  {isPro ? 'PRO ⚡' : 'Free'}
                </p>
                {isPro && sub?.expires_at && (
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Expires: {new Date(sub.expires_at).toLocaleDateString('en-IN')}
                  </p>
                )}
                {!isPro && (
                  <Link to="/pricing" className="text-xs font-bold text-orange-500 hover:underline mt-1 inline-block">
                    Upgrade to Pro →
                  </Link>
                )}
              </>
            )}
          </div>

          {/* App Version */}
          <div className="p-6 rounded-[24px] bg-white border-2 border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🖥️</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">App Version</span>
            </div>
            <p className="text-2xl font-display font-black text-slate-900">v1.1.8</p>
            <p className="text-xs text-slate-400 font-medium mt-1">Latest stable release</p>
          </div>

          {/* Account */}
          <div className="p-6 rounded-[24px] bg-white border-2 border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-5 h-5 text-slate-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Account</span>
            </div>
            <p className="text-2xl font-display font-black text-slate-900">Active ✅</p>
            <p className="text-xs text-slate-400 font-medium mt-1">Google account linked</p>
          </div>
        </div>

        {/* Download Section */}
        <div className="bg-slate-950 rounded-[32px] p-8 mb-6 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">👻</span>
                <h2 className="text-xl font-display font-black text-white">Download Ghostly AI</h2>
              </div>
              <p className="text-slate-400 font-medium text-sm mb-3">
                {isPro ? '⚡ You have Pro — enjoy zero ads & priority AI!' : 'Free plan — all features with ads.'}
              </p>
              <div className="flex flex-wrap gap-2">
                {['Screen Invisible', 'Live Transcription', 'AI Chat', 'Screen Analysis'].map(f => (
                  <span key={f} className="flex items-center gap-1 text-xs font-bold text-slate-300 bg-slate-800 px-3 py-1 rounded-full">
                    <Check className="w-3 h-3 text-green-400" /> {f}
                  </span>
                ))}
              </div>
            </div>
            <a
              href="https://github.com/Maheshshelke05/ghostly-releases/releases/download/v1.1.8/ghostly-1.1.8-setup.exe"
              className="btn-primary flex items-center gap-2 whitespace-nowrap !py-4 !px-8"
            >
              <Download className="w-5 h-5" />
              Download for Windows
            </a>
          </div>
        </div>

        {/* Upgrade Banner */}
        {!isPro && !subLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="p-6 rounded-[24px] bg-gradient-to-r from-orange-500 to-amber-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl shadow-orange-500/20"
          >
            <div>
              <p className="text-white font-black text-lg mb-1">🚀 Upgrade to Pro — ₹199/month</p>
              <p className="text-orange-100 font-medium text-sm">Remove all ads, get faster AI responses & PRO badge in app.</p>
            </div>
            <Link to="/pricing"
              className="bg-white text-orange-600 font-extrabold px-6 py-3 rounded-2xl hover:bg-orange-50 transition-all whitespace-nowrap text-sm shadow-lg">
              See Plans →
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

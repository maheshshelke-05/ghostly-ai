'use client';

import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [err, setErr] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate('/dashboard');
  }, [user, loading, navigate]);

  const handleGoogle = async () => {
    setGoogleLoading(true);
    const error = await signInWithGoogle();
    if (error) { setErr(error.message); setGoogleLoading(false); }
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 relative overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-orange-100 -top-40 -left-40 opacity-50" />
      <div className="orb w-[400px] h-[400px] bg-purple-100 -bottom-40 -right-40 opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <motion.span className="text-4xl" animate={{ y: [0, -5, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
              👻
            </motion.span>
            <span className="text-3xl font-display font-black tracking-tighter text-slate-900">
              Ghostly<span className="text-orange-500">AI</span>
            </span>
          </Link>
          <h1 className="text-2xl font-display font-black text-slate-900 mb-2">Welcome back 👋</h1>
          <p className="text-slate-500 font-medium text-sm">Sign in to access your dashboard & subscription</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-2xl p-8">
          {/* Google Button */}
          <motion.button
            onClick={handleGoogle}
            disabled={googleLoading}
            whileHover={{ scale: googleLoading ? 1 : 1.02, y: googleLoading ? 0 : -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border-2 border-slate-200 bg-white hover:border-orange-300 hover:bg-orange-50/40 transition-all duration-200 font-bold text-slate-700 text-sm shadow-sm hover:shadow-md"
          >
            {googleLoading ? (
              <svg className="animate-spin w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            {googleLoading ? 'Signing in...' : 'Continue with Google'}
          </motion.button>

          {err && (
            <p className="mt-4 text-xs font-semibold px-4 py-2.5 rounded-xl bg-red-50 border border-red-100 text-red-500 text-center">
              ⚠️ {err}
            </p>
          )}

          <div className="mt-6 pt-6 border-t border-slate-50 text-center">
            <p className="text-xs text-slate-400 font-medium">
              New user? Account automatically created on first login.
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 font-medium mt-6">
          By continuing, you agree to our{' '}
          <Link to="/privacy" className="text-orange-500 hover:underline">Privacy Policy</Link>
        </p>
      </motion.div>
    </div>
  );
}

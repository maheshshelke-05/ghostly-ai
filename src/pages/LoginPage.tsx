'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from '../lib/supabase';

export default function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const reset = (m: 'login' | 'signup') => {
    setMode(m); setError(''); setSuccess('');
    setFullName(''); setEmail(''); setPassword('');
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    const err = await signInWithGoogle();
    if (err) { setError(err.message); setGoogleLoading(false); }
    // on success → redirected by Supabase OAuth
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (mode === 'signup' && !fullName.trim()) { setError('Full name required'); return; }
    if (!email || !password) { setError('Email and password required'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }

    setLoading(true);
    if (mode === 'login') {
      const err = await signInWithEmail(email, password);
      if (err) setError('Invalid email or password');
      else navigate('/');
    } else {
      const err = await signUpWithEmail(email, password, fullName.trim());
      if (err) setError(err.message);
      else setSuccess('Account created! Check your email to verify.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-20">
      {/* Background orbs */}
      <div className="orb w-[500px] h-[500px] bg-orange-100 -top-20 -left-20 opacity-40" />
      <div className="orb w-[400px] h-[400px] bg-purple-100 -bottom-20 -right-20 opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <motion.span
              className="text-4xl"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >👻</motion.span>
            <span className="text-3xl font-display font-black tracking-tighter text-slate-900">
              Ghostly<span className="text-orange-500">AI</span>
            </span>
          </Link>
          <h1 className="text-2xl font-display font-black text-slate-900 mb-2">
            {mode === 'login' ? 'Welcome back 👋' : 'Create your account'}
          </h1>
          <p className="text-slate-500 font-medium text-sm">
            {mode === 'login' ? 'Login to manage your subscription' : 'Join thousands of developers acing interviews'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-2xl shadow-slate-900/8 p-8">

          {/* Tab switcher */}
          <div className="flex gap-2 p-1.5 bg-slate-50 rounded-2xl mb-6">
            {(['login', 'signup'] as const).map((m) => (
              <button
                key={m}
                onClick={() => reset(m)}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
                style={{
                  background: mode === m ? 'linear-gradient(135deg, #eb9245, #d97706)' : 'transparent',
                  color: mode === m ? '#fff' : '#94a3b8',
                  boxShadow: mode === m ? '0 2px 8px rgba(235,146,69,0.35)' : 'none',
                }}
              >
                {m === 'login' ? 'Login' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Google Button */}
          <motion.button
            onClick={handleGoogle}
            disabled={googleLoading}
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl border-2 border-slate-200 bg-white hover:border-orange-200 hover:bg-orange-50/30 transition-all duration-200 font-bold text-slate-700 text-sm mb-5"
          >
            {googleLoading ? (
              <svg className="animate-spin w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            Continue with Google
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <AnimatePresence>
              {mode === 'signup' && (
                <motion.div
                  key="fullname"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                    </span>
                    <input
                      type="text" placeholder="Full Name" value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-100 text-sm font-medium text-slate-800 outline-none transition-all focus:border-orange-400 focus:bg-white placeholder:text-slate-400"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </span>
              <input
                type="email" placeholder="Email address" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-100 text-sm font-medium text-slate-800 outline-none transition-all focus:border-orange-400 focus:bg-white placeholder:text-slate-400"
              />
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <input
                type="password" placeholder="Password (min 6 chars)" value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-100 text-sm font-medium text-slate-800 outline-none transition-all focus:border-orange-400 focus:bg-white placeholder:text-slate-400"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="text-xs font-semibold px-4 py-2.5 rounded-xl bg-red-50 border border-red-100 text-red-500">
                  ⚠️ {error}
                </motion.p>
              )}
              {success && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="text-xs font-semibold px-4 py-2.5 rounded-xl bg-green-50 border border-green-100 text-green-600">
                  ✅ {success}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              type="submit" disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01, y: loading ? 0 : -1 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3.5 rounded-2xl text-sm font-extrabold text-white flex items-center justify-center gap-2 mt-1"
              style={{
                background: loading ? 'rgba(235,146,69,0.5)' : 'linear-gradient(135deg, #eb9245, #d97706)',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(235,146,69,0.4)',
                cursor: loading ? 'not-allowed' : 'pointer',
                border: 'none',
              }}
            >
              {loading
                ? <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Loading...</>
                : mode === 'login' ? '🚀 Login' : '✨ Create Account'
              }
            </motion.button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-400 font-medium mt-6">
          By continuing, you agree to our{' '}
          <Link to="/privacy" className="text-orange-500 hover:underline">Privacy Policy</Link>
        </p>
      </motion.div>
    </div>
  );
}

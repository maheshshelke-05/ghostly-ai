'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';

export default function AppLogin() {
  const [status, setStatus] = useState<'checking' | 'loggedIn' | 'noSession' | 'loggingIn'>('checking');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setStatus(data.session ? 'loggedIn' : 'noSession');
    });
  }, []);

  const handleGoogleLogin = async () => {
    setStatus('loggingIn');
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/app-login` },
    });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="orb w-[400px] h-[400px] bg-orange-100 -top-20 -left-20 opacity-40" />
      <div className="orb w-[300px] h-[300px] bg-purple-100 -bottom-20 -right-20 opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm text-center relative z-10"
      >
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-2xl p-10">
          <motion.div
            className="text-5xl mb-6"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >👻</motion.div>

          {status === 'checking' && (
            <>
              <div className="w-8 h-8 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin mx-auto mb-4" />
              <p className="text-sm text-slate-400">Checking session...</p>
            </>
          )}

          {status === 'loggedIn' && (
            <>
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Already Logged In!</h2>
              <p className="text-sm text-slate-400">
                Switch back to Ghostly AI app — it will unlock automatically.
              </p>
            </>
          )}

          {status === 'loggingIn' && (
            <>
              <div className="w-8 h-8 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin mx-auto mb-4" />
              <h2 className="text-lg font-bold text-slate-900 mb-2">Redirecting to Google...</h2>
              <p className="text-sm text-slate-400">Please complete login</p>
            </>
          )}

          {status === 'noSession' && (
            <>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Login to Unlock App</h2>
              <p className="text-sm text-slate-400 mb-6">
                Sign in with Google — Ghostly AI app will unlock automatically
              </p>
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl font-bold text-sm hover:opacity-90 transition-opacity"
                style={{
                  background: 'linear-gradient(135deg, #eb9245, #d97706)',
                  color: '#fff',
                  boxShadow: '0 4px 16px rgba(235,146,69,0.35)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

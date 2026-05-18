'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';

const CALLBACK_URL = 'http://127.0.0.1:7842/callback';

export default function ElectronLogin() {
  const [status, setStatus] = useState<'init' | 'ready' | 'loggingIn' | 'sending' | 'done' | 'error'>('init');
  const [errorMsg, setErrorMsg] = useState('');

  const sendTokensToApp = async (accessToken: string, refreshToken: string) => {
    setStatus('sending');
    try {
      const url = `${CALLBACK_URL}?access_token=${encodeURIComponent(accessToken)}&refresh_token=${encodeURIComponent(refreshToken)}`;
      const res = await fetch(url, { mode: 'cors' });
      if (res.ok) {
        setStatus('done');
      } else {
        throw new Error('Server responded with ' + res.status);
      }
    } catch (e: any) {
      setStatus('error');
      setErrorMsg('App se connect nahi ho paya. App open hai? Error: ' + e.message);
    }
  };

  useEffect(() => {
    // Sign out existing session so user always does fresh login
    supabase.auth.signOut().then(() => {
      // Check if returning from Google OAuth (hash has tokens)
      const hash = window.location.hash;
      if (hash && hash.includes('access_token')) {
        setStatus('loggingIn'); // will be handled by onAuthStateChange
      } else {
        setStatus('ready');
      }
    });
  }, []);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        await sendTokensToApp(session.access_token, session.refresh_token);
      }
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setStatus('loggingIn');
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/electron-login` },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#f8fafc' }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-2xl p-10 text-center">

          <motion.div className="text-5xl mb-5" animate={{ y: [0, -6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            👻
          </motion.div>
          <h1 className="text-xl font-black text-slate-900 mb-1">Ghostly AI</h1>
          <p className="text-xs text-slate-400 mb-8">App Login</p>

          {(status === 'init' || status === 'loggingIn' || status === 'sending') && (
            <div className="flex flex-col items-center gap-3">
              <div className="w-7 h-7 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin" />
              <p className="text-sm text-slate-400">
                {status === 'init' && 'Preparing...'}
                {status === 'loggingIn' && 'Logging in...'}
                {status === 'sending' && 'Sending to app...'}
              </p>
            </div>
          )}

          {status === 'ready' && (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-slate-500">
                Google se login karo — <strong>Ghostly AI app</strong> automatically unlock ho jayega
              </p>
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl font-bold text-sm hover:opacity-90 transition-opacity"
                style={{
                  background: 'linear-gradient(135deg, #eb9245, #d97706)',
                  color: '#fff',
                  boxShadow: '0 4px 20px rgba(235,146,69,0.4)',
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
            </div>
          )}

          {status === 'done' && (
            <div className="flex flex-col items-center gap-3">
              <div className="text-4xl">✅</div>
              <p className="text-base font-bold text-green-600">Login Successful!</p>
              <p className="text-sm text-slate-400">Ghostly AI app unlock ho gaya.<br />Yeh tab band kar sakte ho.</p>
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center gap-3">
              <div className="text-4xl">❌</div>
              <p className="text-sm text-red-500 text-center">{errorMsg}</p>
              <button onClick={() => setStatus('ready')} className="text-sm text-orange-500 underline cursor-pointer">
                Try Again
              </button>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}

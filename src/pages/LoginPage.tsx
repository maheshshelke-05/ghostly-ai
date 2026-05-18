'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

type Screen = 'login' | 'signup' | 'verify';

export default function LoginPage() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState<Screen>('login');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const switchTo = (s: Screen) => {
    setScreen(s); setError('');
    setFullName(''); setPassword(''); setOtp(['','','','','','']);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    if (!email.trim() || !password) { setError('Email aur password required hai'); return; }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) setError('Email ya password galat hai');
    else navigate('/dashboard');
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    if (!fullName.trim()) { setError('Full name enter karo'); return; }
    if (!email.trim()) { setError('Email required hai'); return; }
    if (password.length < 6) { setError('Password min 6 characters hona chahiye'); return; }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email.trim(), password,
      options: { data: { full_name: fullName.trim() } },
    });
    if (error) {
      if (error.message.toLowerCase().includes('already')) setError('Yeh email already registered hai. Login karo.');
      else setError(error.message);
    } else {
      setScreen('verify');
    }
    setLoading(false);
  };

  const handleOtpChange = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp]; next[i] = val.slice(-1); setOtp(next);
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  };
  const handleOtpKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    const token = otp.join('');
    if (token.length < 6) { setError('6-digit code enter karo'); return; }
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({ email: email.trim(), token, type: 'email' });
    if (error) setError('Code galat hai ya expire ho gaya');
    else navigate('/dashboard');
    setLoading(false);
  };

  const btnCls = "w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity";
  const btnStyle = {
    background: loading ? 'rgba(235,146,69,0.4)' : 'linear-gradient(135deg, #eb9245, #d97706)',
    color: '#fff' as const, border: 'none' as const,
    cursor: loading ? 'not-allowed' as const : 'pointer' as const,
    boxShadow: loading ? 'none' : '0 4px 20px rgba(235,146,69,0.35)',
  };
  const Spin = () => <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 relative overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-orange-100 -top-40 -left-40 opacity-50" />
      <div className="orb w-[400px] h-[400px] bg-purple-100 -bottom-40 -right-40 opacity-30" />

      <motion.div initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="w-full max-w-sm relative z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <motion.span className="text-4xl" animate={{ y: [0, -5, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>👻</motion.span>
            <span className="text-3xl font-display font-black tracking-tighter text-slate-900">Ghostly<span className="text-orange-500">AI</span></span>
          </Link>
          <h1 className="text-2xl font-display font-black text-slate-900 mb-1">
            {screen === 'verify' ? 'Email Verify Karo 📧' : screen === 'signup' ? 'Account Banao 🚀' : 'Welcome Back 👋'}
          </h1>
          <p className="text-slate-500 font-medium text-sm">
            {screen === 'verify' ? `6-digit code bheja gaya: ${email}` : 'Email se login karo'}
          </p>
        </div>

        <div className="bg-white rounded-[32px] border border-slate-100 shadow-2xl overflow-hidden">
          <AnimatePresence mode="wait">

            {/* LOGIN */}
            {screen === 'login' && (
              <motion.div key="login" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.18 }}>
                <div className="flex gap-1 p-2" style={{ borderBottom: '1px solid #f1f5f9' }}>
                  {(['login', 'signup'] as const).map(m => (
                    <button key={m} onClick={() => switchTo(m)} className="flex-1 py-2 rounded-xl text-sm font-bold transition-all"
                      style={{ background: screen === m ? 'linear-gradient(135deg, #eb9245, #d97706)' : 'transparent', color: screen === m ? '#fff' : '#94a3b8', border: 'none', cursor: 'pointer' }}>
                      {m === 'login' ? 'Login' : 'Sign Up'}
                    </button>
                  ))}
                </div>
                <form onSubmit={handleLogin} className="p-6 flex flex-col gap-3">
                  <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none border-2 border-slate-200 focus:border-orange-400 transition-colors" />
                  <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none border-2 border-slate-200 focus:border-orange-400 transition-colors" />
                  {error && <p className="text-xs font-semibold px-3 py-2 rounded-xl bg-red-50 border border-red-100 text-red-500">⚠️ {error}</p>}
                  <button type="submit" disabled={loading} className={btnCls} style={btnStyle}>
                    {loading ? <><Spin /> Loading...</> : 'Login'}
                  </button>
                </form>
              </motion.div>
            )}

            {/* SIGNUP */}
            {screen === 'signup' && (
              <motion.div key="signup" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.18 }}>
                <div className="flex gap-1 p-2" style={{ borderBottom: '1px solid #f1f5f9' }}>
                  {(['login', 'signup'] as const).map(m => (
                    <button key={m} onClick={() => switchTo(m)} className="flex-1 py-2 rounded-xl text-sm font-bold transition-all"
                      style={{ background: screen === m ? 'linear-gradient(135deg, #eb9245, #d97706)' : 'transparent', color: screen === m ? '#fff' : '#94a3b8', border: 'none', cursor: 'pointer' }}>
                      {m === 'login' ? 'Login' : 'Sign Up'}
                    </button>
                  ))}
                </div>
                <form onSubmit={handleSignup} className="p-6 flex flex-col gap-3">
                  <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none border-2 border-slate-200 focus:border-orange-400 transition-colors" />
                  <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none border-2 border-slate-200 focus:border-orange-400 transition-colors" />
                  <input type="password" placeholder="Password (min 6 chars)" value={password} onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none border-2 border-slate-200 focus:border-orange-400 transition-colors" />
                  {error && <p className="text-xs font-semibold px-3 py-2 rounded-xl bg-red-50 border border-red-100 text-red-500">⚠️ {error}</p>}
                  <button type="submit" disabled={loading} className={btnCls} style={btnStyle}>
                    {loading ? <><Spin /> Loading...</> : 'Create Account → Send OTP'}
                  </button>
                </form>
              </motion.div>
            )}

            {/* OTP VERIFY */}
            {screen === 'verify' && (
              <motion.div key="verify" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                <form onSubmit={handleVerify} className="p-6 flex flex-col gap-4">
                  <div className="flex gap-2 justify-center">
                    {otp.map((digit, i) => (
                      <input key={i} ref={el => { otpRefs.current[i] = el; }}
                        type="text" inputMode="numeric" maxLength={1} value={digit}
                        onChange={e => handleOtpChange(i, e.target.value)}
                        onKeyDown={e => handleOtpKey(i, e)}
                        className="text-center font-black text-xl rounded-xl outline-none transition-all border-2"
                        style={{ width: 44, height: 52, borderColor: digit ? '#eb9245' : '#e2e8f0', background: digit ? '#fff7ed' : '#f8fafc', color: '#1e293b' }}
                      />
                    ))}
                  </div>
                  {error && <p className="text-xs font-semibold px-3 py-2 rounded-xl bg-red-50 border border-red-100 text-red-500 text-center">⚠️ {error}</p>}
                  <button type="submit" disabled={loading} className={btnCls} style={btnStyle}>
                    {loading ? <><Spin /> Verifying...</> : 'Verify & Login ✓'}
                  </button>
                  <button type="button" onClick={() => switchTo('signup')} className="text-sm text-center text-slate-400 hover:text-slate-600 transition-colors" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    ← Wapas
                  </button>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        <p className="text-center text-xs text-slate-400 font-medium mt-6">
          By continuing, you agree to our{' '}
          <Link to="/privacy" className="text-orange-500 hover:underline">Privacy Policy</Link>
        </p>
      </motion.div>
    </div>
  );
}

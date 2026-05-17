'use client';

import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { signOut } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Check, X, Crown, MessageCircle, LogOut, Download } from 'lucide-react';

const plans = [
  {
    id: 'free',
    icon: '👻',
    name: 'Free',
    price: '₹0',
    period: 'forever',
    desc: 'All features, with ads',
    highlight: false,
    features: [
      { text: 'All 9 features unlocked', ok: true },
      { text: 'Unlimited interview sessions', ok: true },
      { text: 'Screen analysis & live transcription', ok: true },
      { text: 'Interview history', ok: true },
      { text: 'Auto updates', ok: true },
      { text: 'Ads between sessions', ok: false },
      { text: 'Standard AI speed', ok: false },
    ],
    cta: 'Download Free',
    ctaHref: 'https://github.com/Maheshshelke05/ghostly-releases/releases/download/v1.1.8/ghostly-1.1.8-setup.exe',
    ctaExternal: true,
  },
  {
    id: 'pro',
    icon: '⚡',
    name: 'Pro',
    price: '₹199',
    period: 'per month',
    desc: 'Zero ads, faster AI, PRO badge',
    highlight: true,
    features: [
      { text: 'Everything in Free', ok: true },
      { text: 'Zero ads — completely clean UI', ok: true },
      { text: 'Faster AI response priority', ok: true },
      { text: 'PRO badge in app', ok: true },
      { text: 'Priority support', ok: true },
      { text: 'Early access to new features', ok: true },
      { text: 'Cancel anytime', ok: true },
    ],
    cta: 'Contact to Upgrade',
    ctaHref: 'https://wa.me/919022604252?text=Hi Mahesh, I want to upgrade to Pro plan for Ghostly AI.',
    ctaExternal: true,
  },
  {
    id: 'source',
    icon: '💎',
    name: 'Source Code',
    price: '₹40,000',
    period: 'one-time',
    desc: 'Full codebase ownership',
    highlight: false,
    dark: true,
    features: [
      { text: 'Complete Electron + React source', ok: true },
      { text: 'All 9 features included', ok: true },
      { text: 'Brand it as your own product', ok: true },
      { text: 'Commercial use allowed', ok: true },
      { text: 'Build & sell your own version', ok: true },
      { text: 'Priority support from developer', ok: true },
      { text: 'One-time payment, lifetime access', ok: true },
    ],
    cta: 'Contact on WhatsApp',
    ctaHref: 'https://wa.me/919022604252?text=Hi Mahesh, I want to buy the Ghostly AI source code.',
    ctaExternal: true,
  },
];

export default function PricingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => { await signOut(); navigate('/'); };

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-100 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">👻</span>
            <span className="text-xl font-display font-black tracking-tighter text-slate-900">
              Ghostly<span className="text-orange-500">AI</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link to="/dashboard" className="text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors">Dashboard</Link>
                <Link to="/profile" className="text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors">Profile</Link>
                <Link to="/pricing" className="text-xs font-bold text-orange-500 border-b-2 border-orange-500 pb-0.5">Pricing</Link>
                <button onClick={handleSignOut} className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors ml-2">
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/#pricing" className="text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors">Home</Link>
                <Link to="/login" className="btn-primary !py-2 !px-5 !text-xs !rounded-full">Login</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-orange-50 text-orange-600 rounded-full border border-orange-100 mb-6">
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">💳 Simple Pricing</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight mb-4">
            Choose Your <span className="gradient-text">Plan</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto font-medium">
            Start free forever. Upgrade for a cleaner, faster experience.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ y: -6 }}
              className={`relative flex flex-col rounded-[36px] overflow-hidden border-2 ${
                plan.highlight ? 'border-orange-400 shadow-2xl shadow-orange-500/15' :
                plan.dark ? 'border-slate-800 bg-slate-950' : 'border-slate-100 bg-white shadow-sm'
              }`}
            >
              {plan.highlight && (
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center py-2 text-xs font-black uppercase tracking-widest">
                  ⭐ Most Popular
                </div>
              )}
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${
                    plan.dark ? 'bg-slate-800' : plan.highlight ? 'bg-orange-50' : 'bg-slate-50'
                  }`}>{plan.icon}</div>
                  <div>
                    <h3 className={`text-lg font-display font-black ${plan.dark ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                    <p className={`text-xs font-medium ${plan.dark ? 'text-slate-400' : 'text-slate-400'}`}>{plan.desc}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <span className={`text-4xl font-display font-black ${plan.dark ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                  <span className={`text-sm font-bold ml-2 ${plan.dark ? 'text-slate-500' : 'text-slate-400'}`}>/ {plan.period}</span>
                </div>

                <div className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-3">
                      {f.ok
                        ? <Check className={`w-4 h-4 shrink-0 ${plan.highlight ? 'text-orange-500' : plan.dark ? 'text-purple-400' : 'text-green-500'}`} />
                        : <X className="w-4 h-4 shrink-0 text-slate-300" />
                      }
                      <span className={`text-sm font-medium ${
                        plan.dark ? (f.ok ? 'text-slate-300' : 'text-slate-600') : (f.ok ? 'text-slate-700' : 'text-slate-400')
                      }`}>{f.text}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={plan.ctaHref}
                  target={plan.ctaExternal ? '_blank' : undefined}
                  rel="noreferrer"
                  className={`w-full py-3.5 rounded-2xl text-sm font-extrabold flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 ${
                    plan.highlight ? 'btn-primary' :
                    plan.dark ? 'bg-purple-600 text-white hover:bg-purple-500' :
                    'btn-secondary'
                  }`}
                >
                  {plan.id === 'free' && <Download className="w-4 h-4" />}
                  {plan.id === 'pro' && <Crown className="w-4 h-4" />}
                  {plan.id === 'source' && <MessageCircle className="w-4 h-4" />}
                  {plan.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <div className="max-w-2xl mx-auto text-center p-6 bg-orange-50 rounded-[24px] border border-orange-100">
          <p className="text-sm font-bold text-orange-700">
            💡 All plans use <strong>your own API keys</strong> (Gemini/Groq free keys work great).
            Pro removes ads and gives priority AI speed. Both have all 9 features.
          </p>
        </div>
      </div>
    </div>
  );
}

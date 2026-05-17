'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, X, MessageCircle, ArrowRight, Zap, Crown, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    id: 'free',
    icon: '👻',
    name: 'Free',
    price: '₹0',
    period: '/ forever',
    badge: null,
    badgeColor: '',
    desc: 'All features, supported by ads',
    color: '#64748b',
    borderColor: 'border-slate-200',
    bg: 'bg-white',
    btnClass: 'btn-secondary',
    btnText: 'Download Free',
    btnHref: '#download',
    features: [
      { text: 'All 9 features unlocked', ok: true },
      { text: 'Unlimited interview sessions', ok: true },
      { text: 'Screen analysis & live transcription', ok: true },
      { text: 'Interview history', ok: true },
      { text: 'Auto updates', ok: true },
      { text: 'Stealth mode', ok: true },
      { text: 'Works with free API keys', ok: true },
      { text: 'Ads shown between sessions', ok: false, note: true },
      { text: 'Standard AI response speed', ok: false, note: true },
    ],
  },
  {
    id: 'pro',
    icon: '⚡',
    name: 'Pro',
    price: '₹199',
    period: '/ month',
    badge: 'Most Popular',
    badgeColor: 'badge-orange',
    desc: 'Zero ads, faster AI, priority support',
    color: '#eb9245',
    borderColor: 'border-orange-400',
    bg: 'bg-white',
    btnClass: 'btn-primary',
    btnText: 'Get Pro →',
    btnHref: '/login',
    features: [
      { text: 'Everything in Free', ok: true },
      { text: 'Zero ads — completely clean UI', ok: true },
      { text: 'Faster AI response priority', ok: true },
      { text: 'PRO badge in app', ok: true },
      { text: 'Priority support from developer', ok: true },
      { text: 'Early access to new features', ok: true },
      { text: 'Cancel anytime', ok: true },
      { text: 'No ads ever', ok: true },
      { text: 'Best experience guaranteed', ok: true },
    ],
  },
  {
    id: 'source',
    icon: '💎',
    name: 'Source Code',
    price: '₹40,000',
    period: 'one-time',
    badge: 'Full Ownership',
    badgeColor: 'badge-purple',
    desc: 'Complete codebase — build your own product',
    color: '#8b5cf6',
    borderColor: 'border-slate-800',
    bg: 'bg-slate-950',
    btnClass: '',
    btnText: 'Contact on WhatsApp',
    btnHref: 'https://wa.me/919022604252?text=Hi Mahesh, I want to buy the Ghostly AI source code.',
    features: [
      { text: 'Complete Electron + React source code', ok: true },
      { text: 'All 9 features included', ok: true },
      { text: 'Brand it as your own product', ok: true },
      { text: 'Commercial use allowed', ok: true },
      { text: 'Build & sell your own version', ok: true },
      { text: 'Priority support from developer', ok: true },
      { text: 'Full documentation included', ok: true },
      { text: 'One-time payment, lifetime access', ok: true },
      { text: 'No modifications by us — code only', ok: true },
    ],
  },
];

export default function Licensing() {
  const [formData, setFormData] = useState({ name: '', message: '', position: '' });

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi Mahesh, I'm ${formData.name}. ${formData.message}. I work as ${formData.position}.`;
    window.open(`https://wa.me/919022604252?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="py-32 bg-white relative overflow-hidden" id="pricing">
      {/* bg orbs */}
      <div className="orb w-[600px] h-[600px] bg-orange-100 -top-40 -right-40 opacity-30" />
      <div className="orb w-[500px] h-[500px] bg-purple-100 -bottom-40 -left-40 opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-orange-50 text-orange-600 rounded-full border border-orange-100 mb-8">
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">💳 Simple Pricing</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight mb-6">
            Choose Your <span className="gradient-text">Plan</span>
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Start free forever. Upgrade when you want a cleaner, faster experience.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className={`relative flex flex-col rounded-[40px] border-2 ${plan.borderColor} ${plan.bg} overflow-hidden`}
              style={{
                boxShadow: plan.id === 'pro'
                  ? '0 20px 60px rgba(235,146,69,0.15)'
                  : plan.id === 'source'
                  ? '0 20px 60px rgba(0,0,0,0.2)'
                  : '0 4px 24px rgba(0,0,0,0.06)',
              }}
            >
              {/* Popular badge */}
              {plan.badge && (
                <div className="absolute top-6 right-6">
                  <span className={`badge ${plan.badgeColor}`}>{plan.badge}</span>
                </div>
              )}

              <div className="p-10 flex flex-col flex-1">
                {/* Icon + Name */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                    style={{
                      background: plan.id === 'source'
                        ? 'rgba(139,92,246,0.15)'
                        : plan.id === 'pro'
                        ? 'rgba(235,146,69,0.12)'
                        : '#f8fafc',
                    }}
                  >
                    {plan.icon}
                  </div>
                  <div>
                    <h3
                      className="text-xl font-display font-black"
                      style={{ color: plan.id === 'source' ? '#fff' : '#0f172a' }}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className="text-xs font-medium"
                      style={{ color: plan.id === 'source' ? 'rgba(255,255,255,0.4)' : '#94a3b8' }}
                    >
                      {plan.desc}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <span
                    className="text-5xl font-display font-black"
                    style={{ color: plan.id === 'source' ? '#fff' : '#0f172a' }}
                  >
                    {plan.price}
                  </span>
                  <span
                    className="text-sm font-bold ml-2"
                    style={{ color: plan.id === 'source' ? 'rgba(255,255,255,0.35)' : '#94a3b8' }}
                  >
                    {plan.period}
                  </span>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-10 flex-1">
                  {plan.features.map((f, fi) => (
                    <div key={fi} className="flex items-start gap-3">
                      {f.ok ? (
                        <Check
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: plan.id === 'pro' ? '#eb9245' : plan.id === 'source' ? '#8b5cf6' : '#10b981' }}
                        />
                      ) : (
                        <X className="w-4 h-4 shrink-0 mt-0.5 text-slate-300" />
                      )}
                      <span
                        className="text-sm font-medium"
                        style={{
                          color: plan.id === 'source'
                            ? f.ok ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)'
                            : f.ok ? '#334155' : '#94a3b8',
                        }}
                      >
                        {f.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                {plan.id === 'source' ? (
                  <a
                    href={plan.btnHref}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-4 rounded-2xl text-sm font-extrabold flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
                    style={{
                      background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                      color: '#fff',
                      boxShadow: '0 4px 20px rgba(139,92,246,0.35)',
                    }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    {plan.btnText}
                  </a>
                ) : plan.id === 'pro' ? (
                  <Link
                    to={plan.btnHref}
                    className="btn-primary w-full text-center flex items-center justify-center gap-2 py-4"
                  >
                    <Crown className="w-4 h-4" />
                    {plan.btnText}
                  </Link>
                ) : (
                  <a
                    href={plan.btnHref}
                    className="btn-secondary w-full text-center flex items-center justify-center gap-2 py-4"
                  >
                    {plan.btnText}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison note */}
        <div className="max-w-2xl mx-auto text-center mb-24 p-8 bg-orange-50 rounded-[32px] border border-orange-100">
          <p className="text-sm font-bold text-orange-700">
            💡 <strong>Free plan</strong> has all features — just with ads between sessions.{' '}
            <strong>Pro</strong> removes all ads and gives you a faster, cleaner experience.
            Both use your own API keys.
          </p>
        </div>

        {/* WhatsApp Contact Form */}
        <div className="max-w-3xl mx-auto p-12 bg-slate-950 rounded-[48px]">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/20">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-display font-black text-white mb-2">Contact on WhatsApp</h3>
            <p className="text-slate-400 font-medium">Questions about Pro or Source Code? Message directly.</p>
          </div>
          <form onSubmit={handleWhatsApp} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text" placeholder="Your Name" required
                className="w-full px-5 py-4 rounded-2xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-orange-500 transition-all text-sm font-medium placeholder:text-slate-600"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="text" placeholder="Your Position (e.g. SDE)" required
                className="w-full px-5 py-4 rounded-2xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-orange-500 transition-all text-sm font-medium placeholder:text-slate-600"
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
            </div>
            <textarea
              placeholder="Your message..." required rows={3}
              className="w-full px-5 py-4 rounded-2xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-orange-500 transition-all resize-none text-sm font-medium placeholder:text-slate-600"
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
            <button type="submit" className="w-full btn-primary py-4 flex items-center justify-center gap-3">
              Send on WhatsApp <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

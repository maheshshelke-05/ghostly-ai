'use client';

import { ArrowLeft, Ghost, Shield, Lock, EyeOff, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white selection:bg-orange-100 italic font-medium">
      {/* Simple Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
            <span className="text-sm font-bold text-gray-500 group-hover:text-gray-900 transition-colors">Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <Ghost className="w-5 h-5 text-orange-500" />
            <span className="font-display font-bold">GhostlyAI</span>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-gray-900 mb-6 tracking-tight">Privacy Policy</h1>
            <p className="text-xl text-gray-500 leading-relaxed italic">
              Empowering you with total control over your data.
            </p>
          </div>

          <div className="space-y-12">
            <section className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-orange-100 rounded-2xl">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-2xl font-display font-bold">The Golden Rule</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Ghostly AI is designed to be **100% Local**. We do not have servers that store your interview data, audio recordings, or AI conversations. 
              </p>
              <p className="text-gray-600 leading-relaxed">
                Everything stays on your machine. Period.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
                <Lock className="w-6 h-6 text-orange-500" />
                1. Data Collection
              </h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>We do not collect any personally identifiable information (PII). There is no "Sign Up" process and no user accounts exist on our end.</p>
                <p>Ghostly AI performs real-time audio transcription and screen analysis. This data is processed in real-time and is never uploaded to Ghostly AI servers.</p>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
                <EyeOff className="w-6 h-6 text-orange-500" />
                2. Third-Party AI Providers
              </h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Ghostly AI acts as a bridge between your desktop environment and your chosen AI providers (Gemini, OpenAI, Anthropic, etc.).</p>
                <p>When you use these providers, you are subject to their respective privacy policies. Ghostly AI strictly passes the data you provide to the API endpoint you configure via your own API keys.</p>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
                <UserCheck className="w-6 h-6 text-orange-500" />
                3. Responsible Use
              </h3>
              <div className="space-y-4 text-gray-600 leading-relaxed italic">
                <p>Ghostly AI is an educational tool designed for practice and preparation. We encourage responsible and ethical use of the platform and are not liable for any misuse of the tool during actual professional evaluations.</p>
              </div>
            </section>
          </div>

          <div className="mt-24 pt-12 border-t border-gray-100 text-center">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Last Updated: May 2026</p>
            <Link to="/" className="text-orange-500 font-bold hover:underline">Return to Home</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

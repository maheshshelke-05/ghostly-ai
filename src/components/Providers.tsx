'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, CpuIcon as Chips, Zap, Code2, Globe, Brain } from 'lucide-react';

const providers = [
  {
    id: "gemini",
    name: "Google Gemini",
    models: ["Gemini 2.0 Flash", "Gemini 1.5 Pro"],
    description: "The fastest and most efficient model for real-time code analysis. Excellent context window.",
    isFree: true,
    icon: <Globe className="w-6 h-6" />,
    color: "from-blue-400 to-blue-600",
    snippet: "const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash' });"
  },
  {
    id: "openai",
    name: "OpenAI",
    models: ["GPT-4o", "GPT-4 Turbo"],
    description: "The gold standard for logical reasoning and complex algorithm explanations.",
    isFree: false,
    icon: <Chips className="w-6 h-6" />,
    color: "from-green-400 to-green-600",
    snippet: "const response = await openai.chat.completions.create({ model: 'gpt-4o' });"
  },
  {
    id: "groq",
    name: "Groq",
    models: ["Llama-3-70B", "Mixtral-8x7B"],
    description: "Insane speeds powered by LPU™ technology. Near-instant responses for high-pressure situations.",
    isFree: true,
    icon: <Zap className="w-6 h-6" />,
    color: "from-orange-400 to-orange-600",
    snippet: "const chat = await groq.chat.completions.create({ model: 'llama3-70b-8192' });"
  },
  {
    id: "anthropic",
    name: "Anthropic",
    models: ["Claude 3.5 Sonnet", "Claude 3 Opus"],
    description: "Deeply nuanced code explanations and highly accurate type-safe suggestions.",
    isFree: false,
    icon: <Brain className="w-6 h-6" />,
    color: "from-purple-400 to-purple-600",
    snippet: "const msg = await anthropic.messages.create({ model: 'claude-3-5-sonnet-20240620' });"
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    models: ["Llama 3.1", "Claude 3.5", "GPT-4o"],
    description: "Connect your OpenRouter API key to access any model in the world via a single endpoint. Unified model switching.",
    isFree: true,
    icon: <Code2 className="w-6 h-6" />,
    color: "from-cyan-400 to-blue-500",
    snippet: "const res = await openrouter.chat.completions.create({ model: 'meta-llama/llama-3.1-405b' });"
  },
  {
    id: "ollama",
    name: "Ollama / Local",
    models: ["Gemma 2", "Llama 3", "Codi-7B"],
    description: "Run models locally on your GPU for 100% offline privacy and zero latency costs.",
    isFree: true,
    icon: <Cpu className="w-6 h-6" />,
    color: "from-slate-400 to-slate-600",
    snippet: "ollama run gemma2"
  },
];

export default function Providers() {
  const providersData = [
    { name: "Google Gemini ⭐", free: "✅ 1M tokens/day", speed: "⚡⚡⚡⚡", vision: "✅ Yes", best: "Screen Analysis, DSA", link: "https://aistudio.google.com/app/apikey" },
    { name: "Groq ⚡", free: "✅ 14,400 req/day", speed: "⚡⚡⚡⚡⚡", vision: "✅ Llama Scout", best: "Live Answers", link: "https://console.groq.com/keys" },
    { name: "OpenRouter", free: "✅ 10 Free Models", speed: "⚡⚡⚡", vision: "Partial", best: "Backup, Variety", link: "https://openrouter.ai/keys" },
    { name: "Ollama", free: "✅ 100% Free Local", speed: "PC Dependent", vision: "✅ Some", best: "Privacy, Offline", link: "https://ollama.com/download" },
    { name: "OpenAI", free: "❌ Paid", speed: "⚡⚡⚡⚡", vision: "✅ Yes", best: "Code Quality", link: "https://platform.openai.com/api-keys" },
    { name: "Anthropic", free: "❌ Paid", speed: "⚡⚡⚡", vision: "✅ Yes", best: "Long Explanations", link: "https://console.anthropic.com" },
    { name: "Grok (xAI)", free: "✅ Limited Free", speed: "⚡⚡⚡", vision: "✅ Yes", best: "Latest Knowledge", link: "https://console.x.ai" },
    { name: "Gemma", free: "✅ Free", speed: "⚡⚡", vision: "❌ No", best: "Lightweight Tasks", link: "https://aistudio.google.com" },
  ];

  const orModels = [
    "DeepSeek R1", "Llama 3.3 70B", "Qwen 2.5 72B", "Nemotron 70B", "Gemini 2.0 Flash", 
    "Gemini 1.5 Flash", "Mistral 7B", "Llama 3.1 8B", "Phi-4", "Auto (Best)"
  ];

  return (
    <section className="py-32 bg-white" id="providers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-8">
            Choose Your AI Provider
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Works with 8 AI providers. Multiple completely free options.
          </p>
        </div>

        {/* Recommended Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 p-6 bg-orange-50 border border-orange-100 rounded-3xl flex items-center gap-4 text-orange-800 font-bold justify-center"
        >
          <span className="text-2xl">💡</span>
          <p>Recommended Free Setup: Gemini (screen analysis) + Groq (live answers) = Zero cost, maximum performance</p>
        </motion.div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-[40px] border border-slate-100 shadow-xl bg-white mb-24">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-8 font-black uppercase text-[10px] tracking-widest text-slate-400">Provider</th>
                <th className="p-8 font-black uppercase text-[10px] tracking-widest text-slate-400">Free Tier</th>
                <th className="p-8 font-black uppercase text-[10px] tracking-widest text-slate-400">Speed</th>
                <th className="p-8 font-black uppercase text-[10px] tracking-widest text-slate-400">Vision</th>
                <th className="p-8 font-black uppercase text-[10px] tracking-widest text-slate-400">Best For</th>
                <th className="p-8 font-black uppercase text-[10px] tracking-widest text-slate-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {providersData.map((p, i) => (
                <tr key={i} className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="p-8 font-bold text-slate-900">{p.name}</td>
                  <td className="p-8 text-sm font-medium text-slate-600">{p.free}</td>
                  <td className="p-8 text-orange-500 font-black">{p.speed}</td>
                  <td className="p-8 text-sm font-medium text-slate-600">{p.vision}</td>
                  <td className="p-8 text-sm font-medium text-slate-600">{p.best}</td>
                  <td className="p-8">
                    <a 
                      href={p.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-orange-500 font-black text-[10px] uppercase tracking-widest hover:underline"
                    >
                      Get Key
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* OpenRouter Models */}
        <div className="text-center">
          <h3 className="text-2xl font-display font-black text-slate-950 mb-12 uppercase tracking-wide">
            OpenRouter — 10 Free Models Available
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {orModels.map((model, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -4, scale: 1.05 }}
                className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm font-bold text-sm text-slate-700 hover:border-orange-200 transition-all cursor-default"
              >
                {model}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

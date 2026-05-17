'use client';

import { motion } from 'motion/react';
import { Check, X } from 'lucide-react';

const comparisonData = {
  tools: [
    { name: "Ghostly AI", price: "Free Forever", highlighted: true },
    { name: "LockedIn AI", price: "₹6,000+", highlighted: false },
    { name: "Chiku AI", price: "₹1,200+", highlighted: false },
    { name: "Final Round AI", price: "₹8,000+", highlighted: false },
  ],
  features: [
    { name: "Real-Time AI Responses", values: [true, true, true, true] },
    { name: "Screen Capture Analysis", values: [true, true, true, true] },
    { name: "All Features 100% Free", values: [true, false, false, false] },
    { name: "100% System Invisibility", values: [true, false, false, false] },
    { name: "Multiple AI Providers", values: [true, false, true, false] },
    { name: "No Subscriptions", values: [true, false, false, false] },
    { name: "Zero Data Telemetry", values: [true, "Unknown", "Unknown", "Unknown"] },
    { name: "Private & Local Keys", values: [true, false, false, false] },
  ]
};

export default function ComparisonTable() {
  return (
    <section className="py-32 bg-[#f8fafc]" id="comparison">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight mb-8">
            Market Comparison
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Most interview AI tools on the market are expensive subscriptions. Ghostly AI provides these premium features 100% free.
          </p>
        </div>

        <div className="relative overflow-x-auto rounded-[40px] border border-slate-200 bg-white shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-8 py-8 text-xs font-black text-slate-400 uppercase tracking-widest">Feature</th>
                {comparisonData.tools.map((tool, idx) => (
                  <th 
                    key={idx} 
                    className={`px-8 py-8 text-center ${tool.highlighted ? 'bg-orange-50/50 ring-2 ring-inset ring-orange-500/20' : ''}`}
                  >
                    <div className={`text-sm font-black uppercase tracking-widest mb-1 ${tool.highlighted ? 'text-orange-600' : 'text-slate-900'}`}>
                      {tool.name}
                    </div>
                    <div className={`text-[10px] font-bold ${tool.highlighted ? 'text-orange-400' : 'text-slate-400'}`}>
                      {tool.price}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonData.features.map((feature, fIdx) => (
                <tr key={fIdx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6 text-sm font-bold text-slate-700">{feature.name}</td>
                  {feature.values.map((val, vIdx) => (
                    <td 
                      key={vIdx} 
                      className={`px-8 py-6 text-center ${comparisonData.tools[vIdx].highlighted ? 'bg-orange-50/20' : ''}`}
                    >
                      <div className="flex justify-center text-sm font-bold">
                        {val === true ? (
                          <Check className={`w-6 h-6 ${comparisonData.tools[vIdx].highlighted ? 'text-orange-500' : 'text-green-500'}`} strokeWidth={3} />
                        ) : val === false ? (
                          <X className="w-6 h-6 text-slate-300" strokeWidth={3} />
                        ) : (
                          <span className="text-slate-400 uppercase text-[10px] tracking-widest">{val}</span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

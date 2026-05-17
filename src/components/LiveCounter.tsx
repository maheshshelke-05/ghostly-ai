'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'motion/react';

interface CounterProps {
  value: number;
  suffix?: string;
  label: string;
}

function Counter({ value, suffix = "", label }: CounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
  }, [springValue]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-display font-black text-orange-600 mb-2">
        {displayValue.toLocaleString()}{suffix}
      </div>
      <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}

export default function LiveCounter() {
  return (
    <section className="py-20 bg-white" id="stats">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          <Counter value={10000} suffix="+" label="Downloads" />
          <Counter value={8} label="AI Providers" />
          <Counter value={1.2} suffix="s" label="Avg Response" />
          <Counter value={0} label="Data Leaks" />
        </div>
      </div>
    </section>
  );
}

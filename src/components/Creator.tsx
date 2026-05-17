'use client';

import { motion } from 'motion/react';
import { Github, Twitter, Linkedin, Mail, Coffee, Globe, ArrowRight } from 'lucide-react';

const socials = [
  { icon: <Github className="w-5 h-5" />, label: "GitHub", href: "https://github.com/Maheshshelke05", color: "hover:text-black hover:bg-slate-100" },
  { icon: <Twitter className="w-5 h-5" />, label: "Twitter", href: "https://twitter.com/Maheshshelke05", color: "hover:text-blue-400 hover:bg-blue-50" },
  { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", href: "https://linkedin.com/in/Maheshshelke05", color: "hover:text-blue-700 hover:bg-blue-50" },
  { icon: <Mail className="w-5 h-5" />, label: "Email", href: "mailto:msshelke0505@gmail.com", color: "hover:text-orange-500 hover:bg-orange-50" },
  { icon: <Globe className="w-5 h-5" />, label: "Portfolio", href: "https://maheshshelke.com", color: "hover:text-purple-500 hover:bg-purple-50" },
  { icon: <Coffee className="w-5 h-5" />, label: "Support", href: "#", color: "hover:text-amber-600 hover:bg-amber-50" },
];

export default function Creator() {
  return (
    <section className="py-32 bg-white" id="creator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-slate-50 rounded-[48px] p-12 md:p-20 border border-slate-100 flex flex-col md:flex-row items-center gap-12">
          <div className="relative shrink-0">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-[40px] overflow-hidden shadow-2xl border-4 border-white rotate-3 bg-purple-100">
              <img 
                src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Mahesh&backgroundColor=f5d0fe" 
                alt="Mahesh Shelke" 
                className="w-full h-full object-cover p-4"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="text-center md:text-left">
            <div className="badge badge-orange mb-4">DevOps & Cloud Engineer</div>
            <h2 className="text-4xl md:text-5xl font-display font-black text-slate-950 mb-6 tracking-tight">
              Mahesh Shelke
            </h2>
            <div className="space-y-6 text-lg text-slate-500 font-medium leading-relaxed mb-10">
              <p>
                👋 Hi, I&apos;m Mahesh Shelke, a passionate Cloud & DevOps Engineer from Pune, India. 
                I specialize in building production-grade cloud infrastructure—from zero to scalable, automated, and cost-optimized systems.
              </p>
              <p>
                Currently, I&apos;m actively looking for full-time Cloud / DevOps roles while building real-world projects through freelancing to stay hands-on and continuously level up.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-bold text-slate-700 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2">🔍 Currently: Open to Roles</div>
                <div className="flex items-center gap-2">💼 Freelancing: Real Projects</div>
                <div className="flex items-center gap-2">🌱 Learning: New Tech</div>
                <div className="flex items-center gap-2">🤝 Open to: Collaborations</div>
              </div>
              <div className="text-slate-950 font-black italic text-xl border-l-4 border-orange-500 pl-6 py-2">
                &quot;Automate Everything. Break Nothing.&quot;
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {[
                { icon: <Github className="w-5 h-5" />, label: "GitHub", href: "https://github.com/Maheshshelke05" },
                { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", href: "https://linkedin.com/in/Maheshshelke05" },
                { icon: <Twitter className="w-5 h-5" />, label: "Twitter", href: "https://twitter.com/Maheshshelke05" },
                { icon: <Mail className="w-5 h-5" />, label: "Email", href: "mailto:msshelke0505@gmail.com" }
              ].map((link, idx) => (
                <a 
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 bg-white rounded-2xl border border-slate-100 text-slate-400 hover:text-orange-500 hover:border-orange-200 transition-all shadow-sm"
                  title={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

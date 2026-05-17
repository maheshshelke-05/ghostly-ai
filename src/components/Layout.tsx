'use client';

import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SEO from './SEO';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen selection:bg-orange-100 selection:text-orange-900 bg-white">
      <SEO />
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}

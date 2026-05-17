'use client';

import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import SEO from './SEO';
import { useAuth } from '../hooks/useAuth';

const authPages = ['/dashboard', '/profile', '/pricing'];

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user } = useAuth();
  const location = useLocation();

  const isAuthPage = user && authPages.includes(location.pathname);

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-slate-50 selection:bg-orange-100 selection:text-orange-900">
        <SEO />
        <Sidebar />
        {/* Content shifted right for sidebar */}
        <main className="md:ml-64 min-h-screen pt-16 md:pt-0">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen selection:bg-orange-100 selection:text-orange-900 bg-white">
      <SEO />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

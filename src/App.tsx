/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SmoothScroll from './components/SmoothScroll';
import ScrollToTop from './components/ScrollToTop';
import Hero from './components/Hero';
import TrustedPlatforms from './components/TrustedPlatforms';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import VideoShowcase from './components/VideoShowcase';
import Providers from './components/Providers';
import Licensing from './components/Licensing';
import Creator from './components/Creator';
import Download from './components/Download';
import Privacy from './pages/Privacy';
import ScrollProgress from './components/ScrollProgress';
import LiveCounter from './components/LiveCounter';
import ComparisonTable from './components/ComparisonTable';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import FloatingCTA from './components/FloatingCTA';
import LoginPage from './pages/LoginPage';
import AuthCallback from './pages/AuthCallback';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import PricingPage from './pages/PricingPage';

function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Hero />
      <TrustedPlatforms />
      <LiveCounter />
      <Features />
      <HowItWorks />
      <VideoShowcase />
      <ComparisonTable />
      <Providers />
      <Testimonials />
      <Licensing />
      <FAQ />
      <Creator />
      <Download />
      <FloatingCTA />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <SmoothScroll>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/pricing" element={<PricingPage />} />
          </Routes>
        </Layout>
      </SmoothScroll>
    </Router>
  );
}



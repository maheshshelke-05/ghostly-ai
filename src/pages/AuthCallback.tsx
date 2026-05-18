'use client';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { motion } from 'motion/react';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      // Always go to /app-login — it will send token to app and close tab
      if (data.session) navigate('/app-login');
      else navigate('/login');
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-10 h-10 rounded-full border-4 border-orange-200 border-t-orange-500"
      />
    </div>
  );
}

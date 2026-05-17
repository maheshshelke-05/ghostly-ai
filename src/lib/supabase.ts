import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: true, autoRefreshToken: true },
});

export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/auth/callback` },
  });
  return error;
};

export const signInWithEmail = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return error;
};

export const signUpWithEmail = async (email: string, password: string, fullName: string) => {
  const { error } = await supabase.auth.signUp({
    email, password,
    options: { data: { full_name: fullName } },
  });
  return error;
};

export const signOut = async () => { await supabase.auth.signOut(); };

export const getUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data.user;
};

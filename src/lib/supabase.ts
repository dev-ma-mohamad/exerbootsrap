import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';

// Environment variable retrieval with dual Vite / Next.js prefix compatibility
const rawUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL || 
  '';

const rawKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  '';

// Check if credentials are genuine (not empty or default placeholders)
export const isSupabaseConfigured = Boolean(
  rawUrl && 
  rawKey && 
  rawUrl.startsWith('https://') && 
  !rawUrl.includes('placeholder') &&
  !rawUrl.includes('YOUR_') &&
  !rawKey.includes('placeholder') &&
  !rawKey.includes('YOUR_')
);

// Fallback dummy URL to prevent createClient from throwing on initialization if keys aren't set yet
const sanitizedUrl = isSupabaseConfigured ? rawUrl : 'https://placeholder-project.supabase.co';
const sanitizedKey = isSupabaseConfigured ? rawKey : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder';

export const supabase: SupabaseClient = createClient(sanitizedUrl, sanitizedKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
});

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role?: 'student' | 'instructor' | 'admin';
  created_at?: string;
  updated_at?: string;
}

export interface UserProgressData {
  completed_lessons: number[];
  current_lesson_id: number;
  progress_percent: number;
  updated_at?: string;
}

export interface QuizResultRecord {
  id?: string;
  user_id: string;
  score: number;
  total_questions: number;
  passed: boolean;
  certificate_id?: string;
  issued_at?: string;
}

// ==============================================================================
// AUTHENTICATION OPERATIONS
// ==============================================================================

export async function signUpWithEmail(email: string, password: string, fullName: string) {
  if (!isSupabaseConfigured) {
    // Offline local simulation
    const mockUser: User = {
      id: 'local-' + Date.now(),
      app_metadata: {},
      user_metadata: { full_name: fullName },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      email: email,
    };
    const mockSession: Session = {
      access_token: 'local-token-' + Date.now(),
      refresh_token: 'local-refresh-' + Date.now(),
      expires_in: 3600,
      token_type: 'bearer',
      user: mockUser,
    };
    localStorage.setItem('bs_academy_local_user', JSON.stringify({ user: mockUser, profile: { id: mockUser.id, email, full_name: fullName } }));
    return { data: { user: mockUser, session: mockSession }, error: null };
  }

  const result = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
      emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/` : undefined,
    },
  });

  if (!result.error && result.data.user) {
    // Ensure profile row exists
    await upsertProfile({
      id: result.data.user.id,
      email: result.data.user.email || email,
      full_name: fullName,
    });
  }

  return result;
}

export async function signInWithEmail(email: string, password: string) {
  if (!isSupabaseConfigured) {
    const rawLocal = localStorage.getItem('bs_academy_local_user');
    if (rawLocal) {
      const parsed = JSON.parse(rawLocal);
      return { data: { user: parsed.user, session: { user: parsed.user } as Session }, error: null };
    }
    const mockUser: User = {
      id: 'local-demo',
      app_metadata: {},
      user_metadata: { full_name: 'طالب الأكاديمية' },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      email: email,
    };
    return { data: { user: mockUser, session: { user: mockUser } as Session }, error: null };
  }

  return await supabase.auth.signInWithPassword({ email, password });
}

export async function signOutUser() {
  if (!isSupabaseConfigured) {
    localStorage.removeItem('bs_academy_local_user');
    return { error: null };
  }
  return await supabase.auth.signOut();
}

export async function requestPasswordReset(email: string) {
  if (!isSupabaseConfigured) {
    return { data: {}, error: null };
  }
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/#type=recovery` : undefined,
  });
}

export async function updatePassword(newPassword: string) {
  if (!isSupabaseConfigured) {
    return { data: {}, error: null };
  }
  return await supabase.auth.updateUser({ password: newPassword });
}

// ==============================================================================
// DATABASE OPERATIONS
// ==============================================================================

export async function fetchProfile(userId: string): Promise<UserProfile | null> {
  if (!isSupabaseConfigured) {
    const rawLocal = localStorage.getItem('bs_academy_local_user');
    if (rawLocal) return JSON.parse(rawLocal).profile || null;
    return null;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.warn('[Supabase] fetchProfile error:', error.message);
    return null;
  }
  return data;
}

export async function upsertProfile(profile: Partial<UserProfile> & { id: string }): Promise<UserProfile | null> {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      id: profile.id,
      email: profile.email,
      full_name: profile.full_name,
      avatar_url: profile.avatar_url,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.warn('[Supabase] upsertProfile error:', error.message);
    return null;
  }
  return data;
}

export async function fetchProgress(userId: string): Promise<UserProgressData | null> {
  if (!isSupabaseConfigured) {
    const completed = JSON.parse(localStorage.getItem('bs_academy_completed') || '[]');
    return {
      completed_lessons: completed,
      current_lesson_id: 1,
      progress_percent: Math.round((completed.length / 20) * 100),
    };
  }

  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.warn('[Supabase] fetchProgress error:', error.message);
  }
  return data || null;
}

export async function saveProgress(userId: string, progress: UserProgressData) {
  if (!isSupabaseConfigured) {
    localStorage.setItem('bs_academy_completed', JSON.stringify(progress.completed_lessons));
    return { success: true };
  }

  const { data, error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: userId,
      completed_lessons: progress.completed_lessons,
      current_lesson_id: progress.current_lesson_id,
      progress_percent: progress.progress_percent,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' })
    .select()
    .single();

  if (error) {
    console.warn('[Supabase] saveProgress error:', error.message);
    return { success: false, error };
  }
  return { success: true, data };
}

export async function recordQuizResult(result: QuizResultRecord) {
  if (!isSupabaseConfigured) {
    localStorage.setItem('bs_academy_quiz_score', String(result.score));
    if (result.certificate_id) {
      localStorage.setItem('bs_academy_cert_id', result.certificate_id);
    }
    return { success: true };
  }

  const { data, error } = await supabase
    .from('quiz_results')
    .insert({
      user_id: result.user_id,
      score: result.score,
      total_questions: result.total_questions,
      passed: result.passed,
      certificate_id: result.certificate_id,
      issued_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.warn('[Supabase] recordQuizResult error:', error.message);
    return { success: false, error };
  }
  return { success: true, data };
}

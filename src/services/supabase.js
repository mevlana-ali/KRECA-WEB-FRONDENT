import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase URL veya Anon Key bulunamadı. .env dosyasını kontrol edin:\n' +
    'VITE_SUPABASE_URL=...\nVITE_SUPABASE_ANON_KEY=...'
  );
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || '',
  {
    global: {
      fetch: async (url, options) => {
        const token = localStorage.getItem('adminToken');
        if (token) {
          const headers = new Headers(options?.headers);
          headers.set('Authorization', `Bearer ${token}`);
          options.headers = headers;
        }
        return fetch(url, options);
      }
    }
  }
);

export default supabase;

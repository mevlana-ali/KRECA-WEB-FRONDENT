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
          let isValid = false;
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.exp * 1000 > Date.now()) {
              isValid = true;
            }
          } catch (e) {
            // Invalid JWT format
          }

          if (isValid) {
            const headers = new Headers(options?.headers);
            headers.set('Authorization', `Bearer ${token}`);
            options.headers = headers;
          } else {
            localStorage.removeItem('adminToken');
          }
        }
        return fetch(url, options);
      }
    }
  }
);

export default supabase;

import type { Environment } from "@/interface/env";

export const ENV: Environment = {
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  PAGE_SIZE: 10,
};

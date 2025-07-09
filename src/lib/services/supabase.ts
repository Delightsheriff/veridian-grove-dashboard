import { createClient } from "@supabase/supabase-js";
import { ENV } from "../constants";
const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPEBASE_KEY);

export default supabase;

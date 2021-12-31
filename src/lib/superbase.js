import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tfqhdmcajutynbogqkna.supabase.co';
const SUPABASE_PUBLIC_KEY =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDkzOTE3NSwiZXhwIjoxOTU2NTE1MTc1fQ.YrJ1io0rnyB34LY0YbV5CEk-jQ1K3jptGUjf_AHjs3U';

// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
export default supabase;

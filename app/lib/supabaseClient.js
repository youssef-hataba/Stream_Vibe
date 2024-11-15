import { createClient } from '@supabase/supabase-js';

const supabaseUrl ="https://ukliqbgifzzqsozkbmfq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbGlxYmdpZnp6cXNvemtibWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5NDE2NzUsImV4cCI6MjA0NjUxNzY3NX0.oYOV9_ay8wqdxzvt31d6vJkWmsVqPJ_4EFDR4Xetjk4";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
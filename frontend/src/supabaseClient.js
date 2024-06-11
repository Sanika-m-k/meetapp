import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hbuzexfjenxcvnyxcoca.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhidXpleGZqZW54Y3ZueXhjb2NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwMDE3NjcsImV4cCI6MjAzMjU3Nzc2N30.eefxP5zYXeI9igb3e_3LwMOGavjR9dlSUamygFMjWns';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

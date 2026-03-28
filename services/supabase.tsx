import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://woavodqclvclnpzltjao.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvYXZvZHFjbHZjbG5wemx0amFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2NTI4MDgsImV4cCI6MjA5MDIyODgwOH0.NZFLoWSpgpcdGe4ilD4zeIwz3po6h-NR8X0pj-kGjGc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pkzstbyojpplfbrskjfj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrenN0YnlvanBwbGZicnNramZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyMDA0OTgsImV4cCI6MjA5NTc3NjQ5OH0.lKwMTWFvDIxuzI4DH_C3NGIhN_Wtjjf8WturC7O6vJQ'

export const supabase = createClient(supabaseUrl, supabaseKey)